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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-sass');

    // результат команды grunt
    grunt.registerTask('compile', ['sass']);
    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);

};
