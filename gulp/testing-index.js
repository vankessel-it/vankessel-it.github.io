module.exports = function( gulp, plugins, paths, config ) {
	return function() {
		return gulp.src( paths.src.root + '/*.html' )
		           .pipe( plugins.index( {
			           'prepend-to-output': function() {
				           return '<html>' +
				                  '<head>' +
				                  '<title>Testing Index</title>' +
				                  '</head>' +
				                  '<body>';
			           },
			           'append-to-output': function() {
				           return '</body>' +
				                  '</html>';
			           },
			           'item-template': function( filepath, filename ) {
				           if ( filepath.indexOf( 'testing.html' ) !== - 1 ) {
					           return '';
				           }

				           return '<li class="index__item"><a class="index__item-link" href="' + filepath + '">' + filepath + '</a></li>';
			           },
			           'outputFile': './testing.html',
			           'relativePath': './'
		           } ) )
		           .pipe( gulp.dest( paths.src.root ) );
	};
};
