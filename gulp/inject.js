module.exports = function( gulp, plugins, paths, config, callback ) {
	return function() {
		return gulp.src( paths.src.root + '/*.html' )
		           .pipe( plugins.inject( gulp.src( [ paths.src.root + '/template-parts/*.html' ] ), {
			           starttag: '<!-- inject:{{path}} -->',
			           relative: true,
			           transform: function( filepath, file ) {
				           return file.contents.toString( 'utf8' )
			           }
		           } ) )
		           .pipe( plugins.size( { title: 'Injected: HTML partials' } ) )
		           .pipe( plugins.inject(
			           gulp.src( [ paths.src.css + '/**/*.css' ], { read: false } )
			               .pipe( plugins.sort( {
				               asc: false
			               } ) ), {
				           relative: true,
				           transform: function( filepath ) {
					           return '<link rel="stylesheet" href="' + filepath + '" type="text/css" media="all" />';
				           }
			           } ) )
		           .pipe( plugins.size( { title: 'Injected: Stylesheets' } ) )
		           .pipe( plugins.inject(
			           gulp.src( [ paths.src.js + '/**/*.js' ], { read: false } )
			               .pipe( plugins.sort( {
				               asc: false
			               } ) ), {
				           relative: true,
				           transform: function( filepath ) {
					           return '<script src="' + filepath + '"></script>';
				           }
			           } ) )
		           .pipe( plugins.size( { title: 'Injected: Javascript' } ) )
		           .pipe( gulp.dest( paths.src.root ) );
	};
};
