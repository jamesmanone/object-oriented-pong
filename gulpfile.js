const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('default', () => {
  gulp.src([
    'js/src/classes/ball.js',
    'js/src/classes/board.js',
    'js/src/classes/paddles/paddle.js',
    'js/src/classes/paddles/computer-paddle.js',
    'js/src/classes/paddles/player-paddle.js',
    'js/src/classes/game.js',
    'js/src/app.js'
  ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['default'] );
});
