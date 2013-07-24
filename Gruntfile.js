module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> | <%= pkg.homepage && pkg.homepage %> */'
		},
		jasmine: {
			src: 'src/js/mtabs.js',
			options: {
				vendor: 'src/js/libs/*.js',
				helpers: 'tests/jasmine/lib/jasmine-jquery.js',
				specs: 'tests/jasmine/spec/**/*.js'
			}
		},
		jshint: {
			files: [
				'Gruntfile.js',
				'src/**/*.js',
				'tests/spec/**/*.js',
				'!**/libs/*.js',
				'!**/*.min.js'
			],
			options: {
				globals: {
					window: true,
					document: true,
					jQuery: true
				}
			}
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', '<file_strip_banner:src/js/<%= pkg.name %>.js>'],
				dest: 'src/js/<%= pkg.name %>.<%= pkg.version %>.min.js'
			}
		},
		// uglify: {}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['jshint', 'jasmine']);
	grunt.registerTask('default', ['jshint', 'jasmine']);
};