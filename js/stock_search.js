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
    hitsPerPage: 9,
  })
);

var noResultsTemplate =
'<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

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
    cssClasses: {
      select: 'button',
      option: 'button'
    },
  })
);

search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    autoHideContainer: true,
    templates: {
      resetLabel: '<a href="#" class="reset-btn">reset filter options</a>',
    },
    cssClasses: {
      button: 'reset-btn'
    }
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

// Start Brand Panel
const brandListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Brand',
  },
})(instantsearch.widgets.refinementList);

search.addWidget(
  brandListWithPanel({
    container: '#brand-list',
    attribute: 'brand',
    limit: 5,
    showMore: true,
  })
);
// End Brand Panel

// Start Model Panel
const modelListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Model',
  },
})(instantsearch.widgets.refinementList);

search.addWidget(
  modelListWithPanel({
    container: '#model-list',
    attribute: 'model',
    limit: 5,
    showMore: true,
  })
);
// End Model Panel


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
      'categoryFilter',
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
    container: '#year-list',
    attribute: 'year',
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
    cssClasses: {
      list: 'list',
      item: ['block'],
    },
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    // scrollTo: 'header',
    showFirst: true,
    showPrevious: true,
    showNext: true,
    showLast: true,
    totalPages: 99,
    cssClasses: {
      root :'pagination',
      previousPageItem: 'prev',
      nextPageItem: 'next',
      selectedItem :'is-active',
    }
  })
);

search.start();


function newFunction() {
  return function hitFunction(data){
    var content =  

  '<figure><a href="/stock/'+data.code+'" class="delta-hit-link"><img src="'+data.primaryImageUrl+'"  alt="" onerror="imgError(this);"></a></figure>'+

  '<h4>'+data._highlightResult.brand.value + ' ' + data._highlightResult.model.value+'</h4>'+

  '<ul>';
    if(data.advertTitle){
      content+= '<li>'+data.advertTitle+'</li>';
    }
    
		content+='<li><strong>Reference number</strong>'+data._highlightResult.code.value +'</li>';
    content+='<li><strong>Machine type</strong>'+data.subcategory+'</li>';

    if(data.buildYear!==0){
      content+=
      '<li><strong>Year</strong>'+data.buildYear+'</li>';
    }

    if(data.undercarriage!==''){
      content+=
      '<li><strong>Undercarriage / Tires</strong>'+data.undercarriage+'</li>';
    }
    
    if(data.location!=="Other"){
      content+=
      '<li><strong>Location</strong>'+data.location+'</li>';
    }
        
    if(data.hours!==0){
      content+=
      '<li><strong>Hours</strong>'+data.hours.toLocaleString() +' h'+'</li>';
    } 

    if(data.mileage!==0){
      content+=
      '<li><strong>Mileage</strong>'+data.mileage.toLocaleString() +' km'+'</li>';
    } 

    if(data.epaCertified){
      content+= '<li><strong>US certificate</strong>EPA</li>';
    }
    
    if(data.ceCertified){
      content+= '<li><strong>EEA certificate</strong>CE</li>';
    }
    
    if(data.tags.includes("R")){
      content+= '<li><strong>RESERVED</strong></li>';
    }

    if(data.tags.includes("S")){
      content+= '<li><strong>SOLD</strong></li>';
    }

    if(data.price!==0){
      content+=
      '<li><strong>PRICE</strong>'+data.price +' &euro;'+'</li>';
    } else {
      content+='<li><strong>PRICE</strong>on request</li>';
    }

content +=    
  '</ul>';
    
  return content;
  };
}

function imgError(image) {
  image.onerror = "";
  image.src = "/img/default_image_tn.jpg";
  return true;
}