"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            build: {
                src: 'app/js/main.js',
                dest: 'dist/js/main.js'
            }
        },
        jade: {
            compile: {
                src: 'app/index.jade',
                dest: 'dist/index.html'
            }
        },
        stylus: {
            compile: {
                src: 'app/styles/main.styl',
                dest: 'dist/styles/main.css'
            }
        },
        uglify: {
            libs: {
                files: [{
                    expand: true,
                    cwd: 'app/components',
                    src: '**/*.js',
                    dest: 'dist/components'
                }]
            }
        },
        copy: {
            all: {
                // This copies all the html and css into the dist/ folder
                expand: true,
                cwd: 'app/',
                src: ['**/*.html', '**/*.css'],
                dest: 'dist/',
            },
        }
    });

    // Load the npm installed tasks
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // The default tasks to run when you type: grunt
    grunt.registerTask('default', ['browserify', 'stylus', 'jade', 'copy']);
    grunt.registerTask('components', ['uglify']);
};