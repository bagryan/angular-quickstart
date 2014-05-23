'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            vendors: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/css/',
                        src: ['*.css.map'],
                        dest: 'public/css/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/fonts/',
                        src: ['**'],
                        dest: 'public/fonts/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        concat: {
            vendors: {
                files: [
                    {
                        'public/js/vendors.js': [
                            "bower_components/lodash/dist/lodash.js",
                            "bower_components/jquery/dist/jquery.js",
                            "bower_components/angular/angular.js",
                            "bower_components/angular-resource/angular-resource.js",
                            "bower_components/angular-route/angular-route.js",
                            "bower_components/angular-animate/angular-animate.js",
                            "bower_components/angular-bootstrap/ui-bootstrap-tpls.js"
                        ]
                    },
                    {
                        'public/css/vendors.css': [
                            "bower_components/bootstrap/dist/css/bootstrap.css",
                            "bower_components/bootstrap/dist/css/bootstrap-theme.css"
                        ]
                    }
                ]
            },
            sources: {
                files: [
                    {
                        'public/js/sources.js': [
                            "src/**/*.js"
                        ]
                    },
                    {
                        'public/css/sources.css': [
                            "src/**/*.css"
                        ]
                    }
                ]
            },
            e2e: {
                files: [
                    {
                        'public/js/mocks.js': [
                            "bower_components/angular-mocks/angular-mocks.js",
                            "tests/mocks/*.js"
                        ]
                    }
                ]
            }
        },

        'string-replace': {
            e2e: {
                files: {
                    'public/e2e.html': 'public/index.html'
                },
                options: {
                    replacements: [{
                        pattern: /<!-- @mocks-replacement -->/ig,
                        replacement: '<script src="js/mocks.js"></script>'
                    }]
                }
            }
        },

        ngtemplates: {
            prod: {
                options: {
                    module: "app.templates",
                    standalone: true
                },
                src: "src/templates/**/*.html",
                dest: "public/js/templates.js"
            },
            test: {
                options: {
                    module: "app.templates",
                    standalone: true
                },
                src: "src/templates/**/*.html",
                dest: "tmp/templates-test.js"
            }
        },

        karma: {
            watch: {
                configFile: 'tests/unit.conf.js',
                background: true
            },
            single: {
                configFile: 'tests/unit.conf.js',
                singleRun: true
            }
        },

        watch: {
            templates: {
                files: ["src/templates/**/*.html"],
                tasks: ["ngtemplates:test"]
            },
            unit: {
                files: ["tmp/templates-test.js", "src/**/*.js", "public/js/mocks/mocks-data.js", "tests/unit/**/*.js"],
                tasks: ["karma:watch:run", "concat:sources", "ngtemplates:prod"]
            },
            build: {
                files: ["src/templates/**/*.html", "src/**/*.js", "src/**/*.css"],
                tasks: ["concat:sources", "ngtemplates:prod"]
            }
        },

        protractor: {
            options: {
                configFile: "node_modules/protractor/referenceConf.js",
                keepAlive: true,
                noColor: false,
                args: {}
            },
            e2e: {
                options: {
                    configFile: "tests/e2e.conf.js",
                    args: {
                        seleniumAddress: 'http://angular-quickstart.dev:9515',
                        baseUrl: 'http://angular-quickstart.dev',
                        capabilities: {
                            browserName: 'chrome',
                            chromeOptions: {
                                detach: true
                            }
                        }
                    }
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('default', ["ngtemplates:test", "karma:watch", "watch"]);
    grunt.registerTask('build', ["copy:vendors", "concat:vendors", "concat:sources", "ngtemplates:prod"]);
    grunt.registerTask('unit', ["ngtemplates:test", "karma:single"]);
    grunt.registerTask('e2e', ["build", "concat:e2e", "string-replace:e2e", "protractor:e2e"]);
    grunt.registerTask('test', ["unit", "e2e"]);
};
