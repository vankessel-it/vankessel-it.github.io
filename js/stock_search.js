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

var hitTemplate = 
'<div class="vd_item">' +
    '<a href="/stock/{{code}}/"> '+
    '<div><img src="{{primaryImageUrl}}" class="img-fluid" /></div>' +  
    '<div class="delta-Item">' +
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
<a class="{{cssClasses.link}}" href="{{url}}">
<span class="{{cssClasses.label}}"> <img src="/img/categories/{{label}}.png"  width="50"/> </span>
<span class="{{cssClasses.count}}">
  {{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}
</span>
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

