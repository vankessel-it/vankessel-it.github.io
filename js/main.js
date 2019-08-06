jQuery( document ).ready( function( $ ) {
	if ( typeof $.mmenu === 'function' ) {
		$( '#nav' ).mmenu( {
			offCanvas: {
				position: 'right'
			}
		}, {
			clone: true
		} );
	}

	var $main = $( '.custom-menu' );
	$( 'ul li ul', $main ).parent( 'li' ).addClass( 'has-children' );


	$('.js-filter-toggle').click(function(){
		$(this).parent().toggleClass('is-open');
	});

	$('.js-image-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		rows: 0,
		asNavFor: '.js-image-nav'
	});

	$('.js-image-nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		rows: 0,
		arrows: false,
		asNavFor: '.js-image-for',
		dots: false,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});

} );