module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    update: true
                },
                files: [{
                    expand: true,
                    cwd: 'public_html/css/scss/*.scss',
                    dest: 'public_html/css/',
                    ext: 'main.css'
                }]
            }
        },
		shell: {
			dev:{
				command:'node server.js'
			}
			// запуск сервера через скрипт shell'a https://www.npmjs.com/package/grunt-shell
		},

		watch: {
			fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            sass: {
                files: ['public_html/css/scss/*.scss'],
                tasks: ['sass']
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    livereload: true
                }
            }
			// запуск watcher'a, который следит за изенениями файлов  templates/*.xml
			// и если они изменяются, то запускает таск сборки шаблонов (grunt fest)
		},
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public_html/css/main.css': 'public_html/css/scss/main.scss'
                }
            }
        },
		concurrent: {
			tasks:['shell','watch']
			// одновременный запуска shell'a и watcher'a https://www.npmjs.com/package/grunt-concurrent
		},
        requirejs: {
            build: { /* Подзадача */
                options: {
                    almond: true,
                    baseUrl: "public_html/js",
                    mainConfigFile: "public_html/js/main.js",
                    name: "main",
                    optimize: "none",
                    out: "public_html/js/build/main.js"
                }
            }
        },
        concat: {
            js: { 
                separator: ';\n',
                src: [
                    'public_html/js/lib/sweetalert-dev.js',
                    'public_html/js/lib/konva.min.js',
                    'public_html/js/build/main.js',
                    'public_html/js/lib/jquery-ui-1.10.4.custom.js'
                ],
                dest: 'public_html/js/build.js'
            },
            css: {
                separator: '',
                src: [
                    'public_html/css/sweetalert.css',
                    'public_html/css/main.css',
                    'public_html/css/bootstrap.css',
                    'public_html/css/bootstrap-theme.css'
                ],
                dest: 'public_html/css/poliglot.css'
            }
        },
        cssmin:{
            target: {
                files: {
                    'public_html/css/poliglot.min.css': ['public_html/css/poliglot.css']
                }
            }
        },

        uglify: {
            options:{
                mangle: true
            },
            build: { 
                files: {
                    'public_html/js/build.min.js': ['public_html/js/build.js']
                }
            }
        },

		fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }

        },
        qunit: {
            all: ['./public_html/tests/index.html']
        }

    });

	// подключть все необходимые модули
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // результат команды grunt
    grunt.registerTask('build', ['fest','sass','requirejs','concat', 'uglify','cssmin']);
    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);

};
