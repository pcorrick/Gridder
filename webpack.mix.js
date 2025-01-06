let mix = require('laravel-mix')
let NovaExtension = require('laravel-nova-devtool')
const path = require("path");

mix.extend('nova', new NovaExtension())

mix
  .setPublicPath('dist')
  .js('resources/js/field.js', 'js')
  .vue({ version: 3 })
  .postCss('resources/css/field.css', 'css', [
      require('tailwindcss'),
  ])
  .alias({ '@': path.join(__dirname, '../../vendor/laravel/nova/resources/js') })
  .nova('zen0x7/gridder')
