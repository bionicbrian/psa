"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            build: {
                src: 'client/js/main.js',
                dest: 'public/js/main.js'
            }
        },
        jade: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'client/',
                    src: '**/*.jade',
                    dest: 'public/',
                    ext: ".html"
                }]
            }
        },
        stylus: {
            compile: {
                src: 'client/styles/main.styl',
                dest: 'public/styles/main.css'
            }
        },
        uglify: {
            libs: {
                files: [{
                    expand: true,
                    cwd: 'client/components',
                    src: '**/*.js',
                    dest: 'public/components'
                }]
            }
        },
        copy: {
            all: {
                // This copies all the html and css into the public/ folder
                expand: true,
                cwd: 'client/',
                src: ['**/*.html', '**/*.css'],
                dest: 'public/',
            },
        },
        connect: {
            server: {
                options: {
                    port: 8088,
                    base: 'public',
                    keepalive: true
                }
            }
        }
    });

    // Load the npm installed tasks
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // The default tasks to run when you type: grunt
    grunt.registerTask('default', ['browserify', 'stylus', 'jade', 'copy']);
    grunt.registerTask('components', ['uglify']);
};
