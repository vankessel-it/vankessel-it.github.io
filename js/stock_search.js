/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
    'WDP1J0JZTG',
    '509957b941974d9661923cd5f8f630a8'
  );
  
  const search = instantsearch({
    indexName: 'DL_index_main',
    searchClient,
  });
  
var hitTemplate = 
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
  
  // search.addWidget(
  //   instantsearch.widgets.refinementList({
  //     container: '#brand-list',
  //     attribute: 'brand',
  //   })
  // );
 
  // search.addWidget(
  //   instantsearch.widgets.rangeSlider({
  //     container: '#buildYear-list',
  //     attribute: 'buildYear',
  //   })
  // );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#location-list',
      attribute: 'location',
    })
  );

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
  
  search.addWidget(
    instantsearch.widgets.hierarchicalMenu({
      container: '#brand-list',
      attributes: [
        'brandmodel_lvl1',
        'brandmodel_lvl2',
      ],
    })
  );

  search.addWidget(
    instantsearch.widgets.hierarchicalMenu({
      container: '#classification-list',
      attributes: [
        'classifications_lvl1',
        'classifications_lvl2',
      ],
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: hitTemplate,
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