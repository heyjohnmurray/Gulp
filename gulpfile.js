//gulp constants
var gulp = require('gulp');
var browserSync = require('browser-sync');

//plugins
var header = require('gulp-header');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var uglify = require('gulp-uglifyjs');

var currDate = new Date();	

//default 'gulp' task
gulp.task('default', ['sass']);

//sass task
gulp.task('sass', function(){

	return gulp.src('assets/sass/**/*.scss')
		.pipe(sass())
		.pipe(header('/* compiled at ' + currDate.getHours() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' on ' + (currDate.getMonth()+1) + '-' + currDate.getDate() + '-' + currDate.getFullYear() + ' */' + '\n'))//compiled time stamp
		.pipe(gulp.dest('assets/css/'))
		.pipe(notify({
			message: 'SASS has been compiled'
		}));
})

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
})

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

//browserSync
gulp.task('browser-sync', function(){
	var files = [
		'**/**/*'
	];

	browserSync.init(files, {
		server: {
			baseDir: './'
		}
	});
});

// NOTES:
// 		gulp.dest is relative to the folder that gulp was installed in