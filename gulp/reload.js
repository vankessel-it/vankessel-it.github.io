module.exports = function( gulp, plugins ) {
	return function() {
		return plugins.browserSync.reload();
	};
};
