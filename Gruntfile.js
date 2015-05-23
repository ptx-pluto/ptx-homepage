'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        pathConfig: {
            src: 'src',
            dist: 'dist',
            build: 'build',
            venders: 'venders'
        },

        pkg: grunt.file.readJSON('package.json'),

        watch: {

            all: {
                files: [
                    'src/scripts/**/*.js',
                    'src/styles/scss/**/*.scss'
                ],
                tasks: ['build']
            }

        },

        browserify: {

            build: {
                files: {
                    'build/scripts/app.js': 'src/scripts/app/application.js'
                }
            }

        },

        emberTemplates: {
            options: {
                templateName: function (tName) {
                    return tName.replace('src/scripts/app/templates/', '');
                },
                handlebarsPath: 'venders/handlebars/handlebars.js',
                templateCompilerPath: 'venders/ember/ember-template-compiler.js'
            },

            build: {
                files: {
                    'build/scripts/templates.js': 'src/scripts/app/templates/**/*.hbs'
                }
            }

        },

        copy: {
            build: {
                files: {
                    'build/index.html': 'src/index.build.html'
                }
            }
        },

        compass: {

            options: {
                sassDir: 'src/styles/scss'
            },

            build: {
                options: {
                    cssDir: '<%= pathConfig.build %>/styles'
                }
            }

        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/app.min.js': [
                        'build/scripts/templates.js',
                        'build/scripts/app.js'
                    ]
                }
            }
        },

        concat: {
            options: {
                //separator: ';'
            },
            dist: {
                src: [
                    'venders/jquery/dist/jquery.min.js',
                    'venders/ember/ember.min.js',
                    'venders/snap.svg/dist/snap.svg-min.js',
                    'dist/app.min.js'
                ],
                dest: 'dist/script.min.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', [
        'browserify:build',
        'emberTemplates:build',
        'compass:build'
    ]);

    grunt.registerTask('dist', [
        'build',
        'uglify:dist',
        'concat:dist'
    ]);

};