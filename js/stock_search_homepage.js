const searchClient = algoliasearch(
  'ZKUT69QG8T',
  'a577b196fd8351e64f8329c6800bfadd'
);
  
const search = instantsearch({
  indexName: 'DL_index_main',
  searchClient,
  routing: true,
});

{/* <a href="/stock/?menu%5Bfilter%5D=pipelayer">TEST</a> */}
var iconFilterTemplate = 
`
<a class="{{cssClasses.link}}" url="/stock/?menu%5Bfilter%5D={{label}}">
  <span class="{{cssClasses.label}}"><img src="/img/categories/{{label}}.png" height="60"/></span>
  <span class="{{cssClasses.count}}">
    {{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}
  </span>
  <div class="text-secondary">{{label}}</div>
</a>
`;

search.addWidget(
  instantsearch.widgets.menu({
    container: '#iconFilter-list',
    attribute: 'filter',
    limit: 4,
    showMore: true,
    sortBy: ['name:desc'],
    templates: {
      item: iconFilterTemplate,
    },

  })
);

search.start();
