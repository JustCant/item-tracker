module.exports = function(grunt) {
    grunt.initConfig({
      cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'app/assets/css/main.min.css': ['assets/css/main.css']
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
            files: ['app/character/*.js', 'app/dashboard/*.js', 'app/*.js'],
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
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'cssmin', 'watch']);
};
