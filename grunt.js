/*global module:false*/
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> | <%= pkg.homepage && pkg.homepage %> */'
		},
		lint: {
			files: ['grunt.js', 'src/**/*.js']
		},
		// qunit: {
		// 	files: ['tests/**/*.html']
		// },
		// concat: {
		// 	dist: {
		// 		src: ['<banner:meta.banner>', '<file_strip_banner:src/js/<%= pkg.name %>.js>'],
		// 		dest: 'js/<%= pkg.name %>.js'
		// 	}
		// },
		min: {
			dist: {
				src: ['<banner:meta.banner>', '<file_strip_banner:src/js/<%= pkg.name %>.js>'],
				dest: 'src/js/<%= pkg.name %>.<%= pkg.version %>.min.js'
			}
		},
		// watch: {
		// 	files: '<config:lint.files>',
		// 	tasks: 'lint qunit'
		// },
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {
				jQuery: true
			}
		},
		uglify: {}
	});
	
	// Default task.
	grunt.registerTask('default', 'min');
};