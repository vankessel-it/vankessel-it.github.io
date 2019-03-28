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
`
<div class="card" style="width: 215px; height: 280px" title = "{{code}}">
    <img class="card-img-left" src="{{primaryImageUrl}}" alt="{{code}}" />
    <div class="card-body">
    <small class="text-muted">
        {{#helpers.highlight}}{ "attribute": "code" }{{/helpers.highlight}}
    </small><br>
    <small class="text-muted">Brand </small>{{{_highlightResult.brand.value}}}<br>
    <small class="text-muted">Model </small>{{{_highlightResult.model.value}}}<br>
    <small class="text-muted">Sold new </small>{{buildYear}}<br>
    </div>
</div>
`

var hitTemplateTmp =
'<article class="hit">' +
    '<div class="product-picture-wrapper">' +
      '<div class="product-picture"><img src="{{primaryImageUrl}}" /></div>' +
    '</div>' +
    '<div class="product-desc-wrapper">' +
      '<div class="product-name">{{{_highlightResult.code.value}}}</div>' +
      '<div class="product-type">{{{_highlightResult.model.value}}}</div>' +
      '<div class="product-price">${{price}}</div>' +
    '</div>' +
'</article>';

var noResultsTemplate =
'<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';
  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#searchbox',
    })
  );

  search.addWidget(
    instantsearch.widgets.currentRefinements({
      container: '#current-refinements',
    })
  );
  
  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#brand-list',
      attribute: 'brand',
    })
  );
 
  search.addWidget(
    instantsearch.widgets.rangeSlider({
      container: '#buildYear-list',
      attribute: 'buildYear',
    })
  );

  search.addWidget(
    instantsearch.widgets.toggleRefinement({
      container: '#toggle-new',
      attribute: 'used',
      templates: {
        labelText: 'New Machines ({{ count }})',
      },
      on: false,
    })
  );
  
  search.addWidget(
    instantsearch.widgets.hierarchicalMenu({
      container: '#categories',
      attributes: [
        'category',
        'subcategory',
      ],
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: hitTemplate,
      },
    })
  );
  
  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination',
    })
  );
  
search.addWidget(
  instantsearch.widgets.sortBy({
    container: '#sort-by-selector',
    items: [
      {label: 'FEATURED', value: 'DL_index_main'},
      {label: 'OLDEST', value: 'DL_index_year_asc'},
      {label: 'NEWEST', value: 'DL_index_year_dec'},
      {label: 'HIGHEST HOURS/MILEAGE', value: 'DL_index_milage_asc'},
      {label: 'LOWEST HOURS/MILEAGE', value: 'DL_index_milage_dec'},
    ],
  })
);

search.start();