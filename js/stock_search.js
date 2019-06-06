/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
    'ZKUT69QG8T',
    'a577b196fd8351e64f8329c6800bfadd'
);

const search = instantsearch({
  indexName: 'DL_index_main',
  searchClient,
  routing: true,
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 50,
  })
);

var noResultsTemplate =
'<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

// var iconFilterTemplate = 
// `
// <a class="{{cssClasses.link}} delta-search-icon" href="{{url}}">
// <img src="/img/categories/{{label}}.png"/>
// <span class="{{cssClasses.count}}">
//   {{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}
// </span>
// <small><div class="text-secondary text-center">{{label}}</div></small>
// </a>
// `;

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  })
);

search.addWidget(
  instantsearch.widgets.sortBy({
    container: '#sort-by-selector',
    items: [
      {label: 'Sort by FEATURED', value: 'DL_index_main'},
      {label: 'Sort by OLDEST', value: 'DL_index_year_asc'},
      {label: 'Sort by NEWEST', value: 'DL_index_year_dec'},
      {label: 'Sort by HIGHEST HOURS/MILEAGE', value: 'DL_index_milage_asc'},
      {label: 'Sort by LOWEST HOURS/MILEAGE', value: 'DL_index_milage_dec'},
    ],
  })
);

// search.addWidget(
//   instantsearch.widgets.hitsPerPage({
//     container: '#hits-per-page',
//     items: [
//       { label: '20 hits per page', value: 20, default: true },
//       { label: '50 hits per page', value: 50 },
//       { label: '100 hits per page', value: 100 },
//     ],
//   })
// );

search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    autoHideContainer: true,
  })
);

search.addWidget(
  instantsearch.widgets.currentRefinements({
    container: '#current-refinements',
    transformItems(items) {
      return items.map(item => ({
        ...item,
        label: item.label,
      }));
    },
  })
);

// search.addWidget(
//   instantsearch.widgets.menu({
//     container: '#iconFilter-list',
//     attribute: 'categoryFilter',
//     sortBy: ['name:desc'],
//     templates: {
//       item: iconFilterTemplate,
//     },
//   })
// );


// Location Panel
const locationListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Location',
  },
})(instantsearch.widgets.refinementList);

search.addWidget(
  locationListWithPanel({
    container: '#location-list',
    attribute: 'location',
  })
);
// Location Panel

// Start Brand Panel
const brandListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Brand/Model',
  },
})(instantsearch.widgets.hierarchicalMenu);

search.addWidget(
  brandListWithPanel({
    container: '#brand-list',
    showMore: true,
    limit: 5,
    // showMoreLimit: 16,
    attributes: [
      'brand',
      'brand_lvl2',
    ],
  })
);
// End Brand Panel

// Start Category Panel
const categoryListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Category',
  },
})(instantsearch.widgets.hierarchicalMenu);

search.addWidget(
  categoryListWithPanel({
    container: '#category-list',
    limit: 5,
    showMore: true,
    // showMoreLimit: 6,
    attributes: [
      'category',
      'category_lvl2',
    ],
  })
);
// End Category Panel


// Start BuildYear Panel
const buildYearListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Year',
  },
})(instantsearch.widgets.rangeSlider);

search.addWidget(
  buildYearListWithPanel({
    container: '#buildYear-list',
    attribute: 'buildYearFilter',
    precision: 0,
    step: 1,
    pips: false,
  })
);
// End BuildYear Panel



// Start Hours Panel
const hoursListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Hours',
  },
})(instantsearch.widgets.rangeSlider);

search.addWidget(
  hoursListWithPanel({
    container: '#hours-list',
    attribute: 'hours',
    precision: 0,
    step: 100,
    pips: false,
  })
);
// End Hours Panel


search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: newFunction(),
      empty: noResultsTemplate,
    },
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
);

search.start();

// Default image: 213x142
function newFunction() {
  return function hitFunction(data){
    var content =  
'<a href="/stock/'+data.code+'" class="delta-hit-link"> '+

  '<div class="container delta-hit">'+

    '<div class="row">'+

     '<div class="col delta-hit-image delta-nopadding">'+
      
        '<img src="'+data.secundaryImageUrl+'" class="img-top" alt="'+data.code+'" onerror="imgError(this);"></img> '+
        '<img src="'+data.primaryImageUrl+'" alt="'+data.code+'" onerror="imgError(this);"></img> '+
      '</div>'+
    '</div>' +
        
    '<div class="row delta-hit-title delta-nopadding">'+
      '<div class="col">'+data._highlightResult.brand.value + ' ' + data._highlightResult.model.value+'</div> '+
    '</div>';

    if(data.advertTitle){
      content+=
      '<div class="row delta-hit-subtitle delta-nopadding">'+
        '<div class="col">'+data.advertTitle+'</div> '+
      '</div>';
    }
    content +=
    '<div class="row delta-hit-body delta-nopadding">'+

      '<div class="col-1">' +
        '<i class="fa fa-key delta-hit-icon"></i>' +
      '</div>' +

      '<div class="col">' + 
        data._highlightResult.code.value +
      '</div>' +
      
      '<div class="col-3">' 
        if(data.epaCertified){
          content += '<span class="badge badge-success">EPA</span>'
        }
        if(data.ceCertified){
          content += '<span class="badge badge-warning">CE</span> '
        }
        content+=
      '</div>'+ 

    '</div>';

    if(data.location!=="Other"){
      content+=
      '<div class="row delta-hit-body delta-nopadding">'+
        '<div class="col-1">' +
          '<i class="fa fa-map-marker delta-hit-icon"></i>'+
        '</div>' +
        '<div class="col">' +
          data.location+'' +
        '</div>' +
      '</div>';
    }
    
    if(data.buildYear!==0){
      content+=
      '<div class="row delta-hit-body delta-nopadding">'+

        '<div class="col-1">' +
          '<i class="fa fa-calendar delta-hit-icon"></i>' +
        '</div>' +

        '<div class="col">' + 
          data.buildYear +
        '</div>'+

      '</div>';
    }
    
    if(data.hours!==0){
      content+=
      '<div class="row delta-hit-body delta-nopadding">'+
       '<div class="col-1">' +
          '<i class="fa fa-clock delta-hit-icon"></i>' +
        '</div>' +
        '<div class="col">' + 
          data.hours.toLocaleString() +' h'+
        '</div>'+
      '</div>';
    } 

    if(data.mileage!==0){
      content+=
      '<div class="row delta-hit-body delta-nopadding">'+
       '<div class="col-1">' +
          '<i class="fa fa-clock delta-hit-icon"></i>' +
        '</div>' +
        '<div class="col">' + 
          data.mileage.toLocaleString() +' km'+
        '</div>'+
      '</div>';
    } 


    if(data.price!==0){
      content+=
      '<div class="row delta-hit-body delta-nopadding">'+
       '<div class="col-1">' +
          '<i class="fa fa-clock delta-hit-icon"></i>' +
        '</div>' +
        '<div class="col">' + 
          data.price +'km'+
        '</div>'+
      '</div>';
    } 
    
    if(data.tags.includes("R")){
      content+=
      '<div class="row delta-hit-subtitle delta-nopadding">'+
        '<div class="col badge-warning">RESERVED</div> '+
      '</div>';
    }
    if(data.tags.includes("S")){
      content+=
      '<div class="row delta-hit-subtitle delta-nopadding">'+
        '<div class="col badge-danger">SOLD</div> '+
      '</div>';
    }

    // content += '</div>';

content +=    
  '</div>'+ //Container
'</a>';  //Anchor
    
  return content;
  };
}

function imgError(image) {
  image.onerror = "";
  image.src = "/img/default_image_tn.jpg";
  return true;
}


