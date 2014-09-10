module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    concat: {
      options: {
        banner: "/*\n *\n * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT DIRECTLY, INSTEAD BUILD WITH grunt. \n * \n */\n",
        nonull: true
      },
      leaderboard: {
        src: [
          'src/**/*.js'],
        dest: 'dist/leaderboard.js',
      }
    },
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/',
          dest: 'dist',
          src: ['*.js', '!*.min.js'],
          ext: '.min.js',
          extDot: 'first'
        }]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', '<%= concat.leaderboard.src %>'],
      options: {
        globals: {
          module: false,
          jQuery: false,
          window: false,
          setTimeout: false,
          document: false,
          console: false,
          io: false,
          ko: false,
          setInterval: false
        },
        strict: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        eqnull: true,
        noempty: true,
        expr: false,
        trailing: true
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};