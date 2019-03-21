module.exports = function(grunt) {
    grunt.initConfig({
      // concat: {
      //   options: {
      //     separator: '',
      //   },
      //   dist: {
      //     src: ['node_modules/jquery/dist/jquery.min.js', 'node_modules/angular/angular.min.js', 'vendors/angular-route.min.js', 'app/databaseSetup.js', 'app/app.js', 'app/dashboard/*.js', 'app/character/*.js'],
      //     dest: 'main.min.js',
      //   },
      // },
      cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'assets/css/main.min.css': ['assets/css/main.css']
          }
        }
      },
      less: {
          development: {
            files: {
              'assets/css/main.css': ['assets/less/main.less']
            }
          },
      },
      watch: {
          js: {
            files: ['app/character/*.js', 'app/dashboard/*.js', 'app/app.js', 'app/databaseSetup.js'],
            tasks: ['concat'],
            options: {
              spawn: false,
            },
          },
          css: {
            files: ['**/*.css'],
            tasks: ['cssmin'],
            options: {
              spawn: false,
            },
          },
          less: {
            files: ['**/*.less'],
            tasks: ['less'],
            options: {
              spawn: false,
            },
          }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'cssmin', 'watch']);
};
