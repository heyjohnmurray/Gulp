//gulp
var gulp = require('gulp');

//plugins
var header = require('gulp-header');
var notify = require('gulp-notify');
var sass = require('gulp-sass');

var currDate = new Date();

//sass task
gulp.task('sass', function(){
	return gulp.src('assets/sass/*.scss')
		.pipe(sass())
		//.pipe(header('/* compiled at ' + currDate.getHours() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' on ' + (currDate.getMonth()+1) + '-' + currDate.getDate() + '-' + currDate.getFullYear() + ' */' + '\n'))//compiled time stamp
		.pipe(gulp.dest('assets/css/'))
		.pipe(notify({ message: 'SASS task complete' }));
})

//time stamp
gulp.task('task'), function(){
  	//return gulp.src('assets/') come back to this
}

//watch
gulp.task('watch', function(){

	//sass watch
	gulp.watch('assets/sass/*.scss', ['sass']);
});

//default 'gulp' task
gulp.task('default', ['sass']);

// NOTES:
// 		gulp.dest is relative to the folder that gulp was installed in