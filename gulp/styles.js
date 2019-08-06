module.exports = function( gulp, plugins, paths, config ) {
	return function() {
		// Which browsers should be prefixed
		var browsers = [
			'ie >= 10',
			'ie_mob >= 10',
			'ff >= 30',
			'chrome >= 34',
			'safari >= 7',
			'opera >= 23',
			'ios >= 7',
			'android >= 4.4',
			'bb >= 10'
		];

		return gulp.src( [ paths.src.css + '/*.css', '!' + paths.src.css + '/vendor/*.css' ] )
		           .pipe( plugins.autoprefixer( browsers ) )
		           .pipe( plugins.size( { title: 'Styles: Theme' } ) )
		           .pipe( gulp.dest( paths.src.css ) )
		           .pipe( plugins.browserSync.stream() );
	};
};
