module.exports = function (grunt) {

    grunt.initConfig({

		express: {
			// запуск express'a https://www.npmjs.com/package/grunt-express-server
		},

		watch: {
			// запуск watcher'a, который следит за изенениями файлов  templates/*.xml
			// и если они изменяются, то запускает таск сборки шаблонов (grunt fest)
		},
		
		concurrent: {
			// одновременный запуска express'a и watcher'a https://www.npmjs.com/package/grunt-concurrent
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
                            'var <%= name %>Tmpl = <%= contents %> ;',
                            {data: data}
                        );
                    }
                }
            }
        }

    });

	// подключть все необходимые модули
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-fest');

    // результат команды grunt
    grunt.registerTask('default', ['express', 'watch']);
};
