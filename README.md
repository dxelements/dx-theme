# dx-theme

An open source theme for the Predix Design System. This theme is based on [px-theme](https://github.com/predixdesignsystem/px-colors-design) but uses no proprietary colors or fonts. It uses the [system font stack](https://css-tricks.com/snippets/css/system-font-stack/) and the [Material Design color palette](https://www.materialui.co/colors) from [dx-colors-design](https://github.com/dxelements/dx-colors-design).

## Install in your project

Install this module using bower:

```bash
$ bower install --save dxelements/dx-theme
```

**Use the style module**

Load the `dx-theme-styles.html` style module to expose all colors as global CSS variables. Predix Design System components will automatically use the theme.

```html
<link rel="import" href="../dx-theme/dx-theme-styles.html"/>
<custom-style>
  <style include="dx-theme-styles"></style>
</custom-style>
```

Read more about Polymer style modules [here](https://www.polymer-project.org/2.0/docs/devguide/style-shadow-dom#style-modules).

## License (MIT)

See the `LICENSE` file for more information.
