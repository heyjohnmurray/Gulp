// WHAT SHOULD RV GULP INCLUDE
// sass :: ADDED
// jshint/lint ------ add this next
// jsuglify :: ADDED
// image minify :: ADDED (got png crush to work but not pngquant, seems to use optipng by default)
// generate sprite sheets (optional) :: USE https://github.com/aslansky/css-sprite :: i think if you had a folder in images called sprites then only have it look at that folder
// bourbon compatiblity (optional)

//gulp constants
var gulp = require('gulp');

//utility plugins
var header = require('gulp-header');
var notify = require('gulp-notify');
var changed = require('gulp-changed');
var livereload = require('gulp-livereload');

//core plugins
var sass = require('gulp-sass');
var uglify = require('gulp-uglifyjs');
var imagemin = require('gulp-imagemin');
var spritesmith = require("gulp.spritesmith");

var currDate = new Date();

//default 'gulp' task
gulp.task('default', ['sass']);

/**
 * Print out some friendly info on an error and end
 * cleanly so that watch doesn't break.
 *
 * @param {Error} err
 */
function handleError(err) {
  console.log('Plugin error: ' + err.plugin);
  console.log('Message: ' + err.message);

  this.emit('end');
}

//sass task
gulp.task('sass', function(){
	var stream = gulp.src('data/assets/sass/**/*.scss')
		.pipe(sass().on('error', handleError))
		.pipe(header('/* compiled at ' + currDate.getHours() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' on ' + (currDate.getMonth()+1) + '-' + currDate.getDate() + '-' + currDate.getFullYear() + ' */' + '\n'))//compiled time stamp
		.pipe(gulp.dest('data/assets/css/'))
		.pipe(livereload())
		.pipe(notify({
			message: 'SASS has been compiled'
		}));

  return stream;
});

//js task :: this task could probably have gulp-changed added to it so it only compresses changed js files
gulp.task('js', function(){
	return gulp.src('data/assets/js/**/*.js')//right now this compiles everything in the js folder, but you could pass an array of files like   gulp.src(['public/js/*.js', 'bower_components/**/*.js'])
		.pipe(uglify('data/project.min.js', {
			outSourceMap: true
		}))
		.pipe(header('/* compiled at ' + currDate.getHours() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' on ' + (currDate.getMonth()+1) + '-' + currDate.getDate() + '-' + currDate.getFullYear() + ' */' + '\n'))//compiled time stamp
		.pipe(gulp.dest('data/assets/js/'))
		.pipe(notify({
			message: 'JS has been compiled' //no 'message' parameter defaults to list of files affected
		}));
});

//images
gulp.task('images', function () {
  return gulp.src('data/assets/images/**/*')
    .pipe(changed('data/assets/images-min/'))
    .pipe(imagemin({
    	optimizationLevel: 3,
    	progressive: true,
    	interlaced: true
    	}))
    .pipe(gulp.dest('data/assets/images-min/'));
});

//sprites

// THIS SYNTAX WORKS BUT IT'S NOT WHAT I USE FOR EVERYTHING ELSE
gulp.task('sprites', function () {
  var spriteData = gulp.src('data/assets/images/sprites/**/*')
  .pipe(spritesmith({
    imgName: 'data/assets/images/sprite.png',
    cssName: '_sprites.scss'
  }));
  spriteData.img.pipe(gulp.dest('data/assets/images/'));
  spriteData.css.pipe(gulp.dest('data/assets/sass/project/partials/'));
});

// THIS IS THE SYNTAX I WANT BUT IT'S NOT WORKING QUITE RIGHT.
// gulp.task('sprites', function () {
//   return gulp.src('assets/images/sprites/')
//     .pipe(spritesmith({
//       imgName: 'sprites.png',
//       cssName: '_sprites.scss'
//       }))
//     .pipe(gulp.dest('assets/images/'))
//     .pipe(gulp.dest('assets/sass/project/partials/'));
// });

//watch
gulp.task('watch', function(){
  livereload.listen();

  // watch our files that we don't build but run through the webserver.
  gulp.watch('data/**/*.html').on('change', livereload.changed);
  gulp.watch('data/**/*.php').on('change', livereload.changed);

  //sass watch
	gulp.watch('data/assets/sass/**/*.scss', ['sass']); //watch any sass file change
	//js watch
  //watch only root-level .js file change :: don't care about lib or plugin folders
	gulp.watch('data/assets/js/*.js', ['js']);

});


//	NOTES:
//	gulp.dest is relative to the folder that gulp was installed in