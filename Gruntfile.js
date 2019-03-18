module.exports = function(grunt) {
    grunt.initConfig({
        // uglify: {
        //   my_target: {
        //     files: {
        //       'main.min.js': ['app/**/*.js']
        //     }
        //   }
        // },
        less: {
            development: {
              files: {
                'assets/css/main.css': ['assets/less/main.less']
              }
            },
        },
        watch: {
            // js: {
            //   files: ['**/*.js'],
            //   tasks: ['uglify'],
            //   options: {
            //     spawn: false,
            //   },
            // },
            css: {
              files: ['**/*.css'],
              tasks: [''],
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

    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'watch']);
};
