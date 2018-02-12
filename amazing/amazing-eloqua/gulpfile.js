var gulp = require('gulp'),
    eslint = require('gulp-eslint');

gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
		  "plugins": [
		    "smells"
		  ],
		  "rules": {
		    "smells/no-switch": 1,
		    "smells/no-complex-switch-case": 1,
		    "smells/no-setinterval": 1,
		    "smells/no-this-assign": 1,
		    "camelcase": 1,
	        "comma-dangle": 2,
	        "callback-return": 1,
	        "quotes": 0
		  },
		  envs: [
            'node'
        	]

		}))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful...
});