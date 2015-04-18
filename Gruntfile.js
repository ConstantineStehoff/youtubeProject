module.exports = function (grunt) {
 
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
 
    // init required configurations for each task.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
          development: {
            options: {
              paths: ["dist/release/css"]
            },
            files: {"dist/release/css/style.css": "dist/src/less/style.less"}
          },
          production: {
            options: {
              paths: ["dist/release/css"],
              cleancss: true
            },
              files: {"dist/release/css/style.css": "dist/src/less/style.less"}
            }
        },
        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'dist/release/css',
              src: ['dist/release/css/*.css', '!*.min.css'],
              dest: 'dist/release/css',
              ext: '.min.css'
            }]
          }
        },
        watch: {
          styles: {
            files: ['less/*.less'], // which files to watch
            tasks: ['less', 'cssmin'],
            options: {
              nospawn: true
            }
          }
        },
        copy: {
          files: {
            cwd: 'src',  
            src: '**/*',           
            dest: 'dist/src',    
            expand: true          
          },
          jquery: {
            cwd: 'bower_components/jquery/',
            src: 'jquery.min.js',           
            dest: 'dist/release/scripts',    
            expand: true
          },
          angular: {
            cwd: 'bower_components/angular/',
            src: 'angular.js',           
            dest: 'dist/release/scripts',    
            expand: true
          },
          index: {
            cwd: 'dist/src/',
            src: '*.html',           
            dest: 'dist/release/',    
            expand: true  
          }
        },
        clean: ["dist"],
        concat: {
          options: {
            // define a string to put between each file in the concatenated output
            separator: ' '
          },
          dist: {
            // the files to concatenate
            src: [
              'dist/src/scripts/**/*.js'
            ],
            // the location of the resulting JS file
            dest: 'dist/src/scripts/<%= pkg.name %>.js'
          }
        },
        uglify: {
          options: {
            // the banner is inserted at the top of the output
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
            mangle: false,
            compress: false
          },
          dist: {
            files: {
              'dist/release/scripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
            }
          }
        },
        jshint: {
          all: ['Gruntfile.js', 'src/scripts/**/*.js']
        },
        connect: {
          server: {
            options: {
              port: 5000,
              base: 'dist/release',
              keepalive: true
            }
          }
        }
      }
    );
 
    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less'); 
    grunt.loadNpmTasks('grunt-contrib-watch'); 
    grunt.loadNpmTasks('grunt-contrib-cssmin'); 
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');      

    // Default tasks.
    grunt.registerTask('default', ['clean', 'copy:files', 'concat', 'uglify', 'less',
      'cssmin', 'copy:jquery', 'copy:angular', 'copy:index', 'jshint']);
    grunt.registerTask('watch', ['watch', 'jshint']);
    grunt.registerTask('server', ['connect']);
};