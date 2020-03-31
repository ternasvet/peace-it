const { series } = require('gulp');
const { src, dest } = require('gulp');

exports.default = function() {
    return src('src/*.js')
        .pipe(dest('dist/'));
}