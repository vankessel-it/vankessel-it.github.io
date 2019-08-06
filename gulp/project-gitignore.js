module.exports = function( gulp, plugins, paths, config ) {
	return function() {
		var content = '/.idea' + '\n' +
		              '/.htaccess' + '\n' +
		              '/bower_components' + '\n' +
		              '/config.json' + '\n' +
		              '/detail' + '\n' +
		              '/docs' + '\n' +
		              '/plugin-reference.json' + '\n' +
		              '/node_modules' + '\n' +
		              '/npm-debug.log' + '\n' +
		              '/testing.html' + '\n' +
		              '/README.html' + '\n' +
		              '/vendor' + '\n' +
		              '' + '\n' +
		              '.sass-cache' + '\n' +
		              '.DS_Store' + '\n' +
		              '*.psd' + '\n' +
		              '[Tt]humbs.db' + '\n' +
		              '.Trashes' + '\n' +
		              '' + '\n' +
		              '/_additional' + '\n' +
		              '/_examples' + '\n' +
		              '/docs' + '\n' +
		              '/dist' + '\n' +
		              '/yarn-error.log';

		return gulp.src( './*' )
		           .pipe( plugins.file( '.gitignore', content ) )
		           .pipe( gulp.dest( './' ) );
	};
};
