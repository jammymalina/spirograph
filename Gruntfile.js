module.exports = function(grunt) {
    // Configuration
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/style.css': 'css/sass/style.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        typescript: {
            base: {
                src: ['./*.ts'],
                dest: 'js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    generateTsConfig: true,
                    sourceMap: true,
                    noEmitOnError: false
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    appDir: "js/",
                    baseUrl: ".",
                    dir: "build/",
                    optimize: 'uglify',
                    mainConfigFile: './js/app.js',
                    logLevel: 0,
                    findNestedDependencies: true,
                    fileExclusionRegExp: /^\./,
                    inlineText: true
                }
            }
        },
        watch: {
            css: {
                files: ['css/sass/**/*.scss'],
                tasks: ['build-css']
            },
            ts: {
                files: ['./*.ts'],
                tasks: ['build-ts']
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register tasks
    grunt.registerTask('build-css', ['sass', 'cssmin']);
    grunt.registerTask('build-ts', ['typescript', 'requirejs']);
    grunt.registerTask('build', ['build-css', 'build-ts']);
    grunt.registerTask('default', ['build', 'watch']);
};
