var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var plumber = require('gulp-plumber');
var gutil = require('gutil');
var notify = require('gulp-notify');
var path = require('path');
var tinypng = require('gulp-tinypng-compress');
var postcss = require('gulp-postcss');
var postcssnext = require('postcss-cssnext');
var cssnano = require('cssnano');
var minify = require('gulp-minify');



// Static Server + watching scss/html files
gulp.task('ribé', ['sass', 'deusvult', 'kompress'], function () {

    browserSync.init({
        server: "./app/web"
    });

    gulp.watch("app/src/scss/*.scss", ['sass']);
    gulp.watch("app/src/scss/*/*.scss", ['sass']);
    gulp.watch("app/src/js/*.js", ['kompress']);
    gulp.watch("app/src/img/*.{png, jpg, jpeg}", ['deusvult']);
    gulp.watch("app/web/*.html").on('change', browserSync.reload);
    gulp.watch("app/web/js/*.js").on('change', browserSync.reload);
});

/**
 * Compile with gulp-ruby-sass + source maps
 */
gulp.task('sass', function () {
    var plugins = [
        postcssnext,
        cssnano()

    ];

    return gulp.src('app/src/scss/app.scss')
        .pipe(plumber({
            errorHandler: notify.onError({
                message: "Je croive que j'ai pas comprendu ça là : <%= error.message %>",
                title: 'Ribéry',
                appIcon: path.join(__dirname, 'rib.png')
            })
        }, function (error) {
            this.emit('end');
        }))
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(gulp.dest('app/web/css/'))
        .pipe(browserSync.stream({match: '**/*.css'}))
        .pipe(notify({
            message: 'La roue tourne a tourné', title: 'Ribéry', appIcon: path.join(__dirname, 'rib.png')
        }));
});

gulp.task('deusvult', function () {
    gulp.src('app/src/img/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: '89A1M2RKVCMlpMWwlA1vBq7UdfhwpTye',
            checkSigs: true,
            sigFile: 'app/src/file_sigs.json',
            log: true,
            summarize: true
        }))
        .pipe(gulp.dest('app/web/img'));
});

gulp.task('kompress', function() {
    gulp.src('app/src/js/*.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('app/web/js'))
});