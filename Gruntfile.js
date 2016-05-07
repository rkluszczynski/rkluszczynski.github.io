module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        'bower-install-simple': {
            prod: {
                options: {
                    cwd: "src",
                    production: true
                }
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'app/app.component.js',
                'app/main.js'
            ],
            options: {
                jshintrc: 'config/.jshintrc'
            }
        },
        concat: {
            js: {
                src: [
                    'node_modules/es6-shim/es6-shim.min.js',
                    'node_modules/zone.js/dist/zone.js',
                    'node_modules/reflect-metadata/Reflect.js',
                    'node_modules/rxjs/bundles/Rx.umd.js',
                    'node_modules/@angular/core/core.umd.js',
                    'node_modules/@angular/common/common.umd.js',
                    'node_modules/@angular/compiler/compiler.umd.js',
                    'node_modules/@angular/platform-browser/platform-browser.umd.js',
                    'node_modules/@angular/platform-browser-dynamic/platform-browser-dynamic.umd.js',
                ],
                dest: 'app/rkluszczynski-github-io.js'
            }
        },
        uglify: {
            js: {
                files: {
                    'app/rkluszczynski-github-io.min.js': [
                        'app/rkluszczynski-github-io.js'
                    ]
                },
                options: {
                    sourceMap: true
                }
            }
        },
        clean: {
            'build': [
                'app/rkluszczynski-github-io.js',
                'app/rkluszczynski-github-io.min.js',
                'app/rkluszczynski-github-io.min.js.map'
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
        // 'jshint',
        'clean',
        'concat:js',
        'uglify:js'
    ]);
    grunt.registerTask('default', []);
};
