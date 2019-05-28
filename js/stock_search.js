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

var hitTemplate_algolia = 
'<article class="hit">' +
    '<a href="/stock/{{code}}/"> '+
    '<div class="product-picture-wrapper">' +
      '<div class="product-picture"><img src="{{primaryImageUrl}}" class="img-fluid" /></div>' +
    '</div>' +
    '<div class="product-desc-wrapper">' +
      '<div class="product-name"><small class="text-muted">{{{_highlightResult.code.value}}}</small></div>' +
      '<div class="product-type">{{{_highlightResult.brand.value}}}</div>' +
      '<div class="product-type">{{{_highlightResult.model.value}}}</div>' +
      '<div class="product-type"><small class="text-muted">Sold new</small> {{{buildYear}}}</div>' +
    '</div>' +
    '</a>'+
'</article>';
//<i class="fa fa-phone"></i>
// https://cdn.jsdelivr.net/npm/instantsearch.css@7.1.1/themes/algolia.css
// Auto-applied classes by Angolia: ais-Hits, ais-Hits-list, ais-Hits-item
// .ais-Hits-item,
// .ais-Results-item {
//   margin-top: 1rem;
//   margin-left: 1rem;
//   padding: 1rem;
//   width: calc(25% - 1rem);
//   border: 1px solid #c4c8d8;
//   -webkit-box-shadow: 0 2px 5px 0px #e3e5ec;
//   box-shadow: 0 2px 5px 0px #e3e5ec; }
//   .ais-Panel-body .ais-InfiniteHits-item, .ais-Panel-body
//   .ais-InfiniteResults-item, .ais-Panel-body
//   .ais-Hits-item, .ais-Panel-body
//   .ais-Results-item {
//     margin: 0.5rem 0 0.5rem 1rem; }

//delta-zoom-image


var hitTemplate = 
'<a href="/stock/{{code}}/"> '+

  '<div class="container delta-hit">'+
    
    '<div class="row ">'+
      '<div class="col delta-zoom-image">'+
        '<img src="{{primaryImageUrl}}" alt="{{code}}"></img> '+
      '</div>'+
    '</div>'+
    '<div class="row delta-hit-title delta-nopadding">'+
      '<div class="col">{{_highlightResult.brand.value}} {{_highlightResult.model.value}}</div> '+
    '</div>'+
    // '<div class="row delta-hit-title delta-nopadding">'+
    //   '<div class="col">{{_highlightResult.description.value}}</div> '+
    // '</div>'+

    '<div class="row delta-hit-subtitle delta-nopadding">'+
      '<div class="col ">New cutting edge</div> '+
    '</div>'+

    '<div class="row delta-hit-reference delta-nopadding">'+
      '<div class="col">Reference: {{_highlightResult.code.value}} <span class="badge badge-success">EPA</span><span class="badge badge-warning">CE</span></div> '+
    '</div>'+    
  
    '<div class="row delta-hit-body delta-nopadding">'+
      '<div class="col">' +
        '<i class="fa fa-map-marker delta-hit-icon"></i> {{{location}}}' +
      '</div>' +
    '</div>'+

    '<div class="row delta-hit-body delta-nopadding">'+
      '<div class="col">' +
        '<i class="fa fa-calendar delta-hit-icon"></i> {{{buildYear}}}' +
      '</div>' +
      '<div class="col">' +
        '<i class="fa fa-clock delta-hit-icon"></i> {{{hours}}}' +
      '</div>' +
    '</div>'+

  '</div>'+
'</a>';

var hitTemplate21052019_card = 
'<div class="card">' +
    '<img class="card-img-top" src="{{primaryImageUrl}}" alt="{{code}}"></img> '+
    '<a href="/stock/{{code}}/"> '+
    '<div class="card-header">{{code}}</BR><small>New cutting edge</small></div> '+
    '<div class="delta-hit-item">' +
      '<div><small class="text-muted">{{{_highlightResult.code.value}}}</small></div>' +
      '<div>{{{_highlightResult.brand.value}}}</div>' +
      '<div>{{{_highlightResult.model.value}}}</div>' +
      '<div><small class="text-muted">Sold new</small> {{{buildYear}}}</div>' +
    '</div>' +
    '</a>'+
'</div>';


var hitTemplate21052019 = 
'<div>' +
    '<a href="/stock/{{code}}/"> '+
    '<div class="delta-imageWrapper"><img src="{{primaryImageUrl}}" class="img-fluid" /></div>' +  
    '<div class="delta-hit-item">' +
      '<div><small class="text-muted">{{{_highlightResult.code.value}}}</small></div>' +
      '<div>{{{_highlightResult.brand.value}}}</div>' +
      '<div>{{{_highlightResult.model.value}}}</div>' +
      '<div><small class="text-muted">Sold new</small> {{{buildYear}}}</div>' +
    '</div>' +
    '</a>'+
'</div>';

var noResultsTemplate =
'<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

var iconFilterTemplate = 
`
<a class="{{cssClasses.link}} delta-search" href="{{url}}">
<img src="/img/categories/{{label}}.png"/>
<span class="{{cssClasses.count}}">
  {{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}
</span>
<small><div class="text-secondary text-center">{{label}}</div></small>
</a>
`;

var iconFilterTemplate_24052019 = 
`
<a class="{{cssClasses.link}} delta-search" href="{{url}}">
<span class="{{cssClasses.label}}"> <img src="/img/categories/{{label}}.png"/> </span>
<span class="{{cssClasses.count}}">
  {{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}
</span>
<small><div class="text-secondary">{{label}}</div></small>
</a>
`;

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

search.addWidget(
  instantsearch.widgets.hitsPerPage({
    container: '#hits-per-page',
    items: [
      { label: '20 hits per page', value: 20, default: true },
      { label: '50 hits per page', value: 50 },
      { label: '100 hits per page', value: 100 },
    ],
  })
);


search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    autoHideContainer: true,
  })
);

search.addWidget(
  instantsearch.widgets.currentRefinements({
    container: '#current-refinements',
  })
);

search.addWidget(
  instantsearch.widgets.menu({
    container: '#iconFilter-list',
    attribute: 'filter',
    sortBy: ['name:desc'],
    templates: {
      item: iconFilterTemplate,
    },

  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#location-list',
    attribute: 'location',
  })
);
  
search.addWidget(
  instantsearch.widgets.hierarchicalMenu({
    container: '#brand-list',
    attributes: [
      'brand',
      'brand_lvl2',
    ],
  })
);

search.addWidget(
  instantsearch.widgets.hierarchicalMenu({
    container: '#category-list',
    attributes: [
      'category',
      'category_lvl2',
    ],
  })
);

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
'<a href="/stock/"'+data.code+'"/"> '+

  '<div class="container delta-hit">'+
      
    '<div class="row">'+
      '<div class="col delta-hit-image">'+
        
        '<img src="'+data.primaryImageUrl+'" alt="'+data.code+'" onerror="imgError(this);"></img> '+
     
      '</div>'+
    '</div>'+
    
    '<div class="row delta-hit-title delta-nopadding">'+
      '<div class="col">'+data._highlightResult.brand.value + ' ' + data._highlightResult.model.value+'</div> '+
    '</div>'+

    '<div class="row delta-hit-subtitle delta-nopadding">'+
      '<div class="col">'+data.advertTitle+'</div> '+
    '</div>';

    content +=
    '<div class="row delta-hit-reference delta-nopadding">'+

      '<div class="col-1">' +
        '<i class="fa fa-key delta-hit-icon"></i>' +
      '</div>' +

      '<div class="col-5">' + 
        data._highlightResult.code.value +
      '</div>';

      '<div class="col">' 
      // '<div class="col">Reference: '+ data._highlightResult.code.value;
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
          data.hours +'h'+
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
          data.mileage +'km'+
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
    if(!data.tags.includes("S")){
      content+=
      '<div class="row delta-hit-subtitle delta-nopadding">'+
        '<div class="col badge-danger">SOLD</div> '+
      '</div>';
    }

    content += '</div>';

content +=    
  '</div>'+ 
'</a>';      
    
  return content;
  };
}

function imgError(image) {
  image.onerror = "";
  image.src = "/img/default_image_tn.jpg";
  return true;
}

// 
// '<div class="col">' +
//   '<i class="fa fa-calendar delta-hit-icon"></i> {{{buildYear}}}' +
// '</div>' +
// '<div class="col">' +
//   '<i class="fa fa-clock delta-hit-icon"></i> {{{hours}}}' +
// '</div>' +


// '</div>'+


  // search.addWidget(
  //   instantsearch.widgets.toggleRefinement({
  //     container: '#toggle-new',
  //     attribute: 'used',
  //     templates: {
  //       labelText: 'New Machines ({{ count }})',
  //     },
  //     on: false,
  //   })
  // );

  // search.addWidget(
  //   instantsearch.widgets.rangeSlider({
  //     container: '#buildYear-list',
  //     attribute: 'buildYear',
  //   })
  // );

