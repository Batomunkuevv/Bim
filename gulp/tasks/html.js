import fileinclude from "gulp-file-include";
import typograf from 'gulp-typograf';

const typografOptions = {
  locale: ['ru', 'en-US'],
  htmlEntity: { type: 'digit' },
  disableRule: ['ru/optalign/*'],
  enableRule: ['ru/money/ruble'],
  safeTags: [
    ['<\\?php', '\\?>'],
    ['<no-typography>', '</no-typography>']
  ]
}

export const html = () => {
  return app.gulp.src(app.path.src.html)

    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>'
      })
    ))

    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, 'images/'))
    .pipe(typograf(typografOptions))


    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream())
}