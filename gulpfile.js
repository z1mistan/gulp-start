// Gulp include
import gulp from "gulp";

// Browser-sync include
import browserSync from "browser-sync";

// Url include
import url from "./settings/url.js";

// Option include
import option from "./settings/option.js";

// Del include
import clear from "./task/clear.js";

// Pug include
import pug from "./task/pug.js";

// Scss include
import scss from "./task/scss.js";

// Image include
import image from "./task/image.js";

// Font include
import font from "./task/font.js";

// Js include
import script from "./task/script.js";

// Watching
const watching = () =>{
    gulp.watch(url.pug.watch, pug)
    gulp.watch(url.scss.watch, scss)
    gulp.watch(url.img.watch, image)
    gulp.watch(url.font.watch, font)
    gulp.watch(url.js.watch, script)
}

// Server
const server = () => {
    browserSync.init({
        server: {
            baseDir: url.ready
        }
    })
}

const iconsfont = () => {
    return gulp.src(["./node_modules/@fortawesome/fontawesome-free/webfonts/*{ttf,woff2}","./node_modules/bootstrap-icons/font/fonts/*.{woff,woff2,ttf}"])
    .pipe(gulp.dest(url.ready + "/font"))
}

// Build command
const build = gulp.series(
    clear,
    gulp.parallel(pug,scss,image,font,iconsfont,script)
)

// Devalop command
const develop = gulp.series(
    build,
    gulp.parallel(watching,server)
)

// Default command
export default option.isP
    ? build
    : develop;
