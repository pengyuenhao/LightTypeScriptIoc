//引用插件模块
let gulp = require("gulp");
let tsify = require("tsify");
let concat = require("gulp-concat");
let browserify = require("browserify");
let minify = require("gulp-minify");
let source = require("vinyl-source-stream");
let order = require("gulp-order");
//获取Node插件和工作路径
let workSpaceDir = ".";

gulp.task('default', function () {
	gulp.src("bin/debug/**/*.js")
		//.pipe(minify({
		//	ignoreFiles: ['.combo.js', '-min.js']
		//}))
		.pipe(order([
			"IocConst.js",
			"Prototype.js",
			"Bind/Binding.js",
			"Bind/Binder.js",
			"Bind/BindConst.js",
			"Decorator/DecoratorClassBinding.js",
			"Decorator/DecoratorClassBinder.js",
			"Decorator/DecoratorConst.js",
			"Injector/InjectFactory.js",
			"Injector/Injector.js",
			"Injector/InjectBinding.js",
			"Injector/InjectBinder.js",
			"Injector/InjectDecorator.js",
			"Command/ICommandBinder.js",
			"Command/CommandConst.js",
			"Command/CommandBinding.js",
			"Command/CommandBinder.js",
			"Command/Command.js",
			"Context/Context.js",
		]))
		.pipe(concat("ioc.js"))
		.pipe(gulp.dest("bin/release/"))
});
//使用browserify，转换ts到js，并输出到bin/js目录
/* gulp.task("default", function () {
	return browserify({
		basedir: workSpaceDir,
		//是否开启调试，开启后会生成jsmap，方便调试ts源码，但会影响编译速度
		debug: true,
		entries: ['src/test/Main.ts'],
		cache: {},
		packageCache: {}
	})
		//使用tsify插件编译ts
		.plugin(tsify)
		.bundle()
		//使用source把输出文件命名为bundle.js
		.pipe(source('Main.js'))
		//把bundle.js复制到bin/js目录
		.pipe(gulp.dest(workSpaceDir + "/bin/js"));
}); */