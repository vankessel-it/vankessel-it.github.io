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

	$( '.js-filter-toggle' ).click( function() {
		$( '.js-filter-block' ).toggleClass( 'is-open' );
		$( 'body' ).toggleClass( 'is-filter' );
	} );

	$( '.js-image-for' ).slick( {
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		rows: 0,
		asNavFor: '.js-image-nav'
	} );

	$( '.js-image-nav' ).slick( {
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
	} );

	$( '.js-popup-modal' ).magnificPopup( {
		type: 'inline',
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	} );

	$( '.js-range-1' ).asRange( {
		range: true,
		limit: false
	} );

	$( '.js-range-2' ).asRange( {
		range: true,
		limit: false
	} );

	if ($('#js-from').length){
		$( 'form[id="js-from"]' ).validate( {
			rules: {
				//company: 'required',
				name: 'required',
				//phone: 'required',
				//country: 'required',
				//comment: 'required',
				email: {
					required: true,
					email: true,
				},
			},
			messages: {
				//company: 'This field is required',
				name: 'This field is required',
				//phone: 'This field is required',
				//country: 'This field is required',
				//comment: 'This field is required',
				email: 'Enter a valid email',
			},
			submitHandler: function( form ) {
				$.ajax( {
					url: form.action,
					type: form.method,
					data: $( form ).serialize(),
					success: function( response ) {
						$( '#js-msg' ).html( response );
						$("#js-from")[0].reset();
					}
				} );
			}
		} );
	}
} );