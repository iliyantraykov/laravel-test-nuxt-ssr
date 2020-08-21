const mix = require('laravel-mix');


const cssArray = [
//    cssPath + 'jquery.fancybox.min.css',
    'node_modules/slick-carousel/slick/slick.css'
];

mix.disableSuccessNotifications();
mix.sourceMaps();
mix.version();

mix
  .combine(cssArray,'public/css/plugins.css')
  .sass('resources/assets/sass/app.scss', 'public/css')
  .sass('resources/assets/sass/app-600.scss', 'public/css')
  .sass('resources/assets/sass/app-960.scss', 'public/css')
  .sass('resources/assets/sass/app-1200.scss', 'public/css')
  .sass('resources/assets/sass/app-1500.scss', 'public/css')
  .sass('resources/assets/sass/app-admin.scss', 'public/css')
  //.js('resources/assets/vue/app.ts', 'public/js')
  .combine(['resources/assets/polyfill/*.js'], 'public/js/polyfill.js')
  .combine(['resources/assets/polyfill_ie11/*.js'], 'public/js/polyfill_ie11.js')
  .copyDirectory('resources/assets/fonts', 'public/fonts');