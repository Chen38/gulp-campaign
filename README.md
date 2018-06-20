## Gulp Starter

For simple H5 development

### Before start

> For sure you have intalled the `yarn` or `npm` in global

### Commands

```bash
# Install the packages
yarn install

# Start the server
yarn start

# Generate sprite image and style
yarn sprite

# Production build
yarn build
```

### CSS compile

Default compiler is *SASS*, but also supports *LESS*. Then you should change with below:

In `./tasks/dev.js`

```diff
Line 100:
- gulp.watch('./src/sass/**/*.scss', ['sass']);
+ gulp.watch('./src/less/**/*.less', ['less']);

Line 104:
- gulp.task('dev', ['sass', 'browserify', 'refresh']);
+ gulp.task('dev', ['less', 'browserify', 'refresh']);
```

And rename the `sass` folder to `less`.

### JavaScript compile

Default using `browserify` and `babelify`, so we can use commonjs and ES6 module.

### Proxy support

Proxy server based on the `browser-sync`'s middleware, more details see [here](https://browsersync.io/docs/options#option-middleware).

### Git hooks

Use eslint to check the staged js files, put the `pre-commit` in `config` folder

```bash
# copy the pre-commit to hooks folder
cp config/pre-commit .git/hooks

# Set it as executable(mac)
chmod +x .git/hooks/pre-commit
```

### Production build

Default is `dist`.
