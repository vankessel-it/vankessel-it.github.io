module.exports = function( gulp, plugins, paths, config, callback ) {
	return function() {
		return gulp.src( [ paths.src.js + '/**/*.js', '!' + paths.src.js + '/vendor/**/*.js' ] )
		           .pipe( plugins.jshint() )
		           .pipe( plugins.jshint.reporter( 'jshint-stylish' ) )
		           .pipe( plugins.size( { title: 'Javascripts: Theme' } ) )
		           .pipe( gulp.dest( paths.src.js ) );
	};
};
