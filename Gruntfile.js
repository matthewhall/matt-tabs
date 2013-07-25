module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
				'tests/jasmine/spec/**/*.js'
			],
			options: {
				ignores: [
					'**/libs/*.js',
					'**/*.min.js'
				],
				globals: {
					window: true,
					document: true,
					jQuery: true
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> | <%= pkg.homepage && pkg.homepage %> */\n'
			},
			dist: {
				files: {
					'src/js/<%= pkg.name %>.<%= pkg.version %>.min.js': ['src/js/mtabs.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('test', ['jshint', 'jasmine']);
	grunt.registerTask('min', ['uglify']);
	grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);
};