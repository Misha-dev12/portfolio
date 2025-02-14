const { task, watch, src, dest, parallel, series } = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-dart-sass');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const fileinclude = require('gulp-file-include');
const prefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const stream = browserSync.stream;

//----------------------------------- Path ----------------------------//

const path = {
	build: {
		html: 'build',
		css: 'build/css',
		img: 'build/img',
		video: 'build/video',
		js: 'build/js',
		fonts: 'build/fonts',
	},
	src: {
		html: 'src/html/*.html',
		scss: 'src/styles/*.scss',
		cssLib: 'src/css-lib/*.css',
		img: 'src/img/**',
		video: 'src/video/**',
		js: 'src/js/*.js',
		jsLib: 'src/js-lib/*.js',
		fonts: 'src/fonts/**',
	},
	watch: {
		html: 'src/html/**',
		scss: 'src/styles/**',
		cssLib: 'src/css-lib/**',
		js: 'src/js/**',
		jsLib: 'src/js-lib/**',
		img: 'src/img/**',
		video: 'src/video/**',
		fonts: 'src/fonts/**',
	},
};

//----------------------------------- Html ----------------------------//

const html = function () {
	return src(path.src.html)
		.pipe(
			fileinclude({
				prefix: '@@',
				basepath: '@file',
			})
		)
		.pipe(dest(path.build.html))
		.pipe(stream());
};

//----------------------------------- Style ----------------------------//

const styles = function () {
	return (
		// src(['src/styles/*.sass', 'src/styles/*.scss'])
		// src(['src/styles/**/*.sass', 'src/styles/**/*.scss'])
		src(['src/styles/style.scss'])
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(prefixer())
			.pipe(cssnano({ zindex: false }))
			.pipe(rename({ suffix: '.min' }))
			.pipe(sourcemaps.write('.'))
			.pipe(dest(path.build.css))
			.pipe(stream())
	);
};

const styles_without_min = function () {
	return src(path.src.scss)
		.pipe(sass())
		.pipe(prefixer())
		.pipe(dest(path.build.css));
};

//----------------------------------- css_libs ----------------------------//
const css_libs = function () {
	return src(path.src.cssLib).pipe(dest(path.build.css)).pipe(stream());
};

//----------------------------------- Fonts ----------------------------//

const fonts = function () {
	return src(path.src.fonts).pipe(dest(path.build.fonts)).pipe(stream());
};

//----------------------------------- JS ----------------------------//

const lib_scripts = function () {
	return src(path.src.jsLib).pipe(dest(path.build.js));
};

const main_scripts = function () {
	return src(path.src.js)
		.pipe(
			babel({
				presets: [
					[
						'@babel/preset-env',
						{
							exclude: ['transform-regenerator'],
						},
					],
				],
			})
		)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(path.build.js))
		.pipe(stream());
};

const scripts = parallel(main_scripts);

const scripts_without_min = function () {
	return src(path.src.js)
		.pipe(
			babel({
				presets: [
					[
						'@babel/preset-env',
						{
							exclude: ['transform-regenerator'],
						},
					],
				],
			})
		)
		.pipe(dest(path.build.js));
};

//----------------------------------- Image ----------------------------//

const image = function () {
	return src(path.src.img)
		.pipe(imagemin())
		.pipe(dest(path.build.img))
		.pipe(stream());
};
//----------------------------------- Video ----------------------------//

const video = function () {
	return src(path.src.video).pipe(dest(path.build.video)).pipe(stream());
};
//----------------------------------- Serve ----------------------------//

const build = parallel(
	html,
	lib_scripts,
	styles,
	fonts,
	scripts,
	image,
	css_libs,
	video
);

const without_min = parallel(
	styles_without_min,
	scripts_without_min,
	lib_scripts
);

const webserver = function () {
	return browserSync.init({
		server: {
			baseDir: './build',
		},
	});
};

const serve = series(build, function () {
	webserver();
	watch(path.watch.html, html);
	watch(path.watch.scss, styles);
	watch(path.watch.fonts, fonts);
	watch(path.watch.js, scripts);
	watch(path.watch.jsLib, lib_scripts);
	watch(path.watch.img, image);
	watch(path.watch.cssLib, css_libs);
	watch(path.watch.video, video);
});

//----------------------------------- Exports ----------------------------//

exports.build = series(build, without_min);

exports.default = serve;
