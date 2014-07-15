// WHAT SHOULD RV GULP INCLUDE
// sass
// jshint/lint
// jsuglify
// image minify
// generate sprite sheets (optional)
// bourbon compatiblity (optional)

//gulp constants
var gulp = require('gulp');

//utility plugins
var header = require('gulp-header');
var notify = require('gulp-notify');

//core plugins
var sass = require('gulp-sass');

var uglify = require('gulp-uglifyjs');

var imagemin = require('gulp-imagemin');

var livereload = require('gulp-livereload');



var currDate = new Date();

//default 'gulp' task
gulp.task('default', ['sass']);

//sass task
gulp.task('sass', function(){

	return gulp.src('assets/sass/**/*.scss')
		.pipe(sass())
		.pipe(header('/* compiled at ' + currDate.getHours() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' on ' + (currDate.getMonth()+1) + '-' + currDate.getDate() + '-' + currDate.getFullYear() + ' */' + '\n'))//compiled time stamp
		.pipe(gulp.dest('assets/css/'))
		.pipe(livereload())
		.pipe(notify({
			message: 'SASS has been compiled'
		}));
});

//js task
gulp.task('js', function(){
  	return gulp.src('assets/js/**/*.js')//right now this compiles everything in the js folder, but you could pass an array of files like   gulp.src(['public/js/*.js', 'bower_components/**/*.js'])
  		.pipe(uglify('project.min.js', {
  			outSourceMap: true
  		}))
  		.pipe(header('/* compiled at ' + currDate.getHours() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' on ' + (currDate.getMonth()+1) + '-' + currDate.getDate() + '-' + currDate.getFullYear() + ' */' + '\n'))//compiled time stamp
  		.pipe(gulp.dest('assets/js/'))
  		.pipe(notify({
  			message: 'JS has been compiled' //no 'message' parameter defaults to list of files affected
  		}));
});

//images
// gulp.task('images', function () {
//     return gulp.src('assets/images/**/*')
//         .pipe(imagemin({ 
//         	optimizationLevel: 3, 
//         	progressive: true, 
//         	interlaced: true
//         	}))
//         .pipe(gulp.dest('assets/images-min/'));
// });

// working syntax for reference :: https://github.com/jgable/gulp-cache/issues/9
// trying to figure out if i can shorten the compression time:
// rv-clt-jmurray [jmurray] ~/GitProjects/Gulp (master) : gulp images
// [15:43:49] Using gulpfile ~/GitProjects/Gulp/gulpfile.js
// [15:43:49] Starting 'images'...
// [15:46:56] gulp-imagemin: Minified 1619 images (saved 24.82 MB - 35.2%)
// [15:46:56] Finished 'images' after 3.1 min


gulp.task('images', function () {
    return gulp.src('assets/images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/images-min/'));
});

//watch
gulp.task('watch', function(){

	//sass watch
	gulp.watch('assets/sass/**/*.scss', ['sass']); //watch any sass file change

	//js watch
	gulp.watch('assets/js/*.js', ['js']) //watch only root-level .js file change :: don't care about lib or plugin folders


	gulp.watch(['/']).on('change', function(file){
		server.changed(file.path);
	})
});



//	NOTES:
//	gulp.dest is relative to the folder that gulp was installed in