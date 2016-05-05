module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        'bower-install-simple': {
            prod: {
                options: {
                    cwd: "config",
                    production: true
                }
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'src/web/javascript/**/*.js',
                'src/web/spec/**/*.js'
            ],
            options: {
                jshintrc: 'config/.jshintrc'
            }
        },
        clean: {
            'bootstrap-fonts': ['src/main/resources/public/fonts/'],
            'build': [
                'src/main/resources/public/assets/oxides-grid-portal.css',
                'src/main/resources/public/assets/oxides-grid-portal.js',
                'src/main/resources/public/assets/oxides-grid-portal.min.js',
                'src/main/resources/public/assets/oxides-grid-portal.min.js.map'
            ]
        }
    });

    grunt.task.registerTask('install', [
        'bower-install-simple'
    ]);
    grunt.task.registerTask('check', [
        'jshint'
    ]);
    grunt.task.registerTask('build', [
        'jshint',
        'clean'
    ]);
    grunt.registerTask('default', []);
};
