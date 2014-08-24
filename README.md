angular-embedly-image
=====================

Angular directives and services to use the embed.ly display service for resizing images.

### Installation

Install via bower: 
 * ```bower install angular-embedly-image```
 * Include the file into your project.
 * Add this as dependency to your app ```angular.module('yourApp', ['embedlyImage']);```

### Usage
 * in your app.run(), inject the embedlyImageService and call the ```embedlyImageService.setImageServiceKey()``` method with your embedly display service key.
 * use the directive:
  * ```<img ng-if='image.url' embedly-image="image.url" e-height="1024" e-width="1024" e-mode="resize">```
  * ```<div embedly-image="image.url" e-background="1" e-width="imageSize.x" e-height="imageSize.y" e-mode="crop"  class="image">```

More Examples will follow.


