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


/*
 * Sorting
 */
search.addWidget(
  instantsearch.widgets.sortBy({
    container: '#sort-by-selector',
    items: [
      {label: 'Sort by FEATURED', value: 'DL_index_main'},
      {label: 'Sort by OLDEST', value: 'DL_index_year_asc'},
      {label: 'Sort by NEWEST', value: 'DL_index_year_dec'},
      {label: 'Sort by LOWEST HOURS/MILEAGE', value: 'DL_index_milage_asc'},
      {label: 'Sort by HIGHEST HOURS/MILEAGE', value: 'DL_index_milage_dec'},
    ],
    cssClasses: {
      // root:'button',
      select: 'button',
      option: 'button'
    },
  })
);


/***********************************************
 * Search Filters
 ***********************************************/

/*
 * Text search
 */
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'category, model, brand, etc.',
    searchAsYouType: true,
    showSubmit: true,
    autofocus: true,
    // templates:{
    //   submit:'<button type="submit" class="search-btn">Search</button>',
    // },
  })
);

 /*
 * Category
 */
const categoryListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Category',
  },
  cssClasses:{
    // root: 'block',
    header: 'title',
  }

})(instantsearch.widgets.hierarchicalMenu);

search.addWidget(
  categoryListWithPanel({
    container: '#category-list',
    // limit: 5,
    showMore: false,
    // showMoreLimit: 6,
    attributes: [
      'categoryFilter',
      'category_lvl2',
    ],
    templates: {
      item: `
      <label style="{{#isRefined}}font-weight: bold{{/isRefined}}">{{label}} <span>{{count}}</span></label>
      `,   
      // item2: `
      // <a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
      // <label>{{label}} <span>{{count}}</span></label>
      // </a>
      // `,   
    },
  })
);

/*
 * Brand
 */
const brandListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Brand',
  },
  cssClasses:{
    // root: 'block',
    header: 'title',
  },
})(instantsearch.widgets.refinementList);

search.addWidget(
  brandListWithPanel({
    container: '#brand-list',
    attribute: 'brand',
    limit: 5,
    showMore: true,
    templates: {
      item: `
      <label style="{{#isRefined}}font-weight: bold{{/isRefined}}">{{label}} <span>{{count}}</span></label>
      `,
    },
    cssClasses:{
      showMore: 'more-link',
    },
  })
);


/*
 * Model
 */
const modelListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Model',
  },
  cssClasses:{
    // root: 'block',
    header: 'title',
  },
})(instantsearch.widgets.refinementList);

search.addWidget(
  modelListWithPanel({
    container: '#model-list',
    attribute: 'model',
    limit: 5,
    showMore: true,
    templates: {
      item: `
      <label style="{{#isRefined}}font-weight: bold{{/isRefined}}">{{label}} <span>{{count}}</span></label>
      `,     
    },
    cssClasses:{
      showMore: 'more-link',
    },      
  })
);


/*
 * Build Year
 */
const buildYearListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Year',
  },
  cssClasses:{
    // root: 'block',
    header: 'title',
  },
})(instantsearch.widgets.rangeSlider);

search.addWidget(
  buildYearListWithPanel({
    container: '#year-list',
    attribute: 'year',
    precision: 0,
    step: 1,
    pips: false,
    cssClasses: {
      root: 'range-block',
      input: 'js-range-2',
    },
  })
);


/*
 * Hours
 */
const hoursListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Hours',
  },
  cssClasses:{
    // root: 'block',
    header: 'title',
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

/*
 * Location
 */
const locationListWithPanel = instantsearch.widgets.panel({
  templates: {
    header: 'Location',
  },
  cssClasses:{
    // root: 'block',
    header: 'title',
  },  
})(instantsearch.widgets.refinementList);

search.addWidget(
  locationListWithPanel({
    container: '#location-list',
    attribute: 'location',
    templates: {
      item: `
      <label style="{{#isRefined}}font-weight: bold{{/isRefined}}">{{label}} <span>{{count}}</span></label>
      `,     
    }, 
  })
);

/***********************************
 * Current / clear refinements
 ***********************************/
search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    autoHideContainer: true,
    templates: {
      resetLabel: 'Reset',
    },
    cssClasses: {
      button: 'reset-btn'
    }
  })
);

search.addWidget(
  instantsearch.widgets.currentRefinements({
    container: '#current-refinements',
    cssClasses: {
      // root: 'list',
      item: 'block',
      label:'delta_title',
    },
    transformItems(items) {
      return items.map(item => ({
        ...item,
        label: item.label,
      }));
    },
  })
);


/***********************************
 * Render Hits
 ***********************************/
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: deltaHitRenderFunction(),
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


function deltaHitRenderFunction() {
  return function hitFunction(data){

    /* image thumbnail in design 334 x 225
     *
     * Image
     */
    var content='<figure><a href="/stock/'+data.code+'" class="delta-hit-link">';
        
    content+='<img src="'+data.primaryImageUrl+'"  alt="" onerror="imgError(this);">';

    // if(data.primaryImageUrl=='/img/default_image_tn.jpg'){
    //   content+='<span class="available-soon not-available-image">Picture available soon</span>';
    // }
    
    if(data.tags.includes("R")){
      content+='<span class="tag reserved">Reserved</span>';
    }

    if(data.tags.includes("S")){
      content+='<span class="tag sold">Sold</span>';
    }

    if(data.tags.includes("J")){
      content+='<span class="tag arrived">Just<br> Arrived</span>';
    }

  content+='</a></figure>';

  content+='<h4>'+data._highlightResult.brand.value + ' ' + data._highlightResult.model.value+'</h4>';

  content+='<ul>';
  
    /*
     * Advert Title
     */
    if(data.advertTitle){
      content+= '<li class="low">'+data.advertTitle+'</li>';
    } else {
      content+= '<li></li>';
    }
    
    /*
     * Reference Code
     */
		content+='<li><strong>Reference number</strong>'+data._highlightResult.code.value +'</li>';

    /*
     * Build Year
     */
    if(data.buildYear!==0){
      content+=
      '<li><strong>Year</strong>'+data.buildYear+'</li>';
    } else {
      content+= '<li><strong>Year</strong></li>';
    }

    /*
     * Hours / Mileage
     */
    if(data.hours!==0){
      content+=
      '<li><strong>Hours</strong>'+data.hours.toLocaleString() +'</li>';
    } else {

      if(data.mileage!==0){
        content+=
        '<li><strong>Mileage</strong>'+data.mileage.toLocaleString() +' km'+'</li>';
      }  else {
        content+= '<li><strong>Hours</strong>-</li>';
      }

    } 

    /*
     * Location
     */
    if(data.location!=="Other"){
      content+=
      '<li><strong>Location</strong>'+data.location+'</li>';
    } else {
      content+= '<li><strong>Location</strong>-</li>';
    }

    /*
     * Price
     */
    if(data.price!==0){
      content+=
      '<li><strong>PRICE</strong>'+data.price +' &euro;'+'</li>';
    } else {
      content+='<li><strong>PRICE</strong>On request</li>';
    }

    /*
     * Unused
     */
    // content+='<li><strong>Machine type</strong>'+data.subcategory+'</li>';
    // if(data.undercarriage!==''){
    //   content+=
    //   '<li><strong>Undercarriage / Tires</strong>'+data.undercarriage+'</li>';
    // }
  
    // if(data.epaCertified){
    //   content+= '<li><strong>US certificate</strong>EPA</li>';
    // }
    
    // if(data.ceCertified){
    //   content+= '<li><strong>EEA certificate</strong>CE</li>';
    // }
content += '</ul>';
    
  return content;
  };
}

function imgError(image) {
  image.onerror = "";
  image.src = "/img/default_image_tn.jpg";
  return true;
}