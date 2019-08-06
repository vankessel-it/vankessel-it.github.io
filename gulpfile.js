// Import dependencies
var gulp = require( 'gulp' );
var plugins = require( 'gulp-load-plugins' )( { camelize: true } );
var merge = require( 'merge-stream' );
var node = require( './package.json' );
var runSequence = require( 'run-sequence' );

// Setup plugins
plugins.merge = merge;

// Additional configs
config = {};
config.production = node.production;

// Development setup
if ( ! config.production ) {
	var browserSync = require( 'browser-sync' );

	plugins.browserSync = browserSync.create();
}

// Setup theme paths
var paths = {
	src: {
		css: './css',
		fonts: './fonts',
		images: './img',
		js: './js',
		root: './'
	},
	dist: {
		css: './css',
		fonts: './fonts',
		images: './img',
		js: './js',
		root: './'
	}
};

function getTask( task ) {
	return require( './gulp/' + task )( gulp, plugins, paths, config );
}

// Setup default tasks
gulp.task( 'project:gitignore', getTask( 'project-gitignore' ) );
gulp.task( 'inject', getTask( 'inject' ) );
gulp.task( 'scripts', getTask( 'scripts' ) );
gulp.task( 'styles', getTask( 'styles' ) );
gulp.task( 'testing:index', getTask( 'testing-index' ) );

// Setup development tasks
if ( ! config.production ) {
	gulp.task( 'reload', getTask( 'reload' ) );

	// Compile and serve files
	gulp.task(
		'serve', [ 'inject', 'styles', 'scripts' ], function() {
			plugins.browserSync.init(
				{
					notify: {
						styles: {
							top: 'auto',
							bottom: '0'
						}
					},
					port: 3000,
					server: {
						baseDir: './',
						index: 'index.html'
					}
				}
			);

			gulp.watch( '**/*.css', { cwd: paths.src.css }, [ 'styles' ] );
			gulp.watch( '**/*.js', { cwd: paths.src.js }, [ 'scripts', 'reload' ] );
			gulp.watch( '**/*.{php,html,htm}', { cwd: paths.src.root }, [ 'inject', 'reload' ] );
		}
	);
}

// Compile files and launch development area, the default task
gulp.task(
	'default', function( callback ) {
		if ( ! config.production ) {
			return runSequence(
				'serve',
				callback
			);
		} else {
			return runSequence(
				'deploy',
				callback
			);
		}
	}
);

// Build package
gulp.task(
	'build', function( callback ) {
		if ( ! config.production ) {
			return runSequence(
				'project:gitignore',
				'default',
				callback
			);
		} else {
			return runSequence(
				'project:gitignore',
				'deploy',
				callback
			);
		}
	}
);

// Deploy production files
gulp.task(
	'deploy', function( callback ) {
		return runSequence(
			[ 'inject', 'styles', 'scripts' ],
			callback
		);
	}
);
