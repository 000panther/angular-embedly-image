'use strict';

angular.module('embedlyImage', [])
    .directive('embedlyImage', function(embedlyImageService) {
        return {
            restrict: 'A',
            scope: {
                embedlyImage: '&',
                eHeight: '&',
                eWidth: '&'
            },
            link: function(scope, element, attributes) {
                var oldSource = '';
                var oldHeight = 0;
                var oldWidth = 0;
                var oldMode = '';
                scope.$watchCollection(function() { return scope.embedlyImage() + scope.eHeight() + scope.eWidth() + attributes.eMode} , function() {

                    var originalSource = scope.embedlyImage();
                    if(originalSource != oldSource || oldHeight != scope.eHeight || oldWidth != scope.eWidth) {
                        // parse width and height from other arguments
                        var mode = attributes.eMode ? attributes.eMode : 'crop';
                        var height = scope.eHeight();
                        var width = scope.eWidth();

                        var embedlySource = embedlyImageService.getEmbedlyImage(originalSource, mode, width, height);

                        if(typeof attributes.eBackground != 'undefined') {
                            element.css('background-image', 'url(' + embedlySource + ')');
                        } else {
                            element.attr("src", embedlySource);
                        }
                        oldSource = originalSource;
                        oldHeight = height;
                        oldWidth = width;
                        oldMode = mode;
                    }
                });
            }
        };
    })
    .service('embedlyImageService', function embedlyService() {

        var EMBEDLY_IMAGE_SERVICE = 'http://i.embed.ly/1/image/';

        function setImageServiceKey(key) {
            this.imageServiceKey = key;
        }

        /**
         * Returns the url for the embedly image display service.
         * @param originalUrl
         * @param mode either crop, fill or resize
         * @param width
         * @param height
         * @param extra - color for fill, grow for resize
         */
        function getEmbedlyImage(originalUrl, mode, width, height, extra) {

//			http://i.embed.ly/1/image/resize?url=http%3A%2F%2Ffarm1.staticflickr.com%2F174%2F478152000_a1a85853e6_z.jpg&key=92b31102528511e1a2ec4040d3dc5c07&width=300&height=300
            var parameters = {};
            if(width) {
                parameters.width = width
            }
            if(height) {
                parameters.height = height;
            }
            if(extra && mode == 'fill') {
                parameters.color = extra;
            }
            if(extra && mode == 'resize') {
                parameters.grow = 'true';
            }
            parameters.url = originalUrl;
            parameters.key = this.imageServiceKey;
            return EMBEDLY_IMAGE_SERVICE + mode + '?' + $.param(parameters);
        }

        /**
         * @class embedlyService
         */
        return {
            setImageServiceKey: setImageServiceKey,
            getEmbedlyImage: getEmbedlyImage
        }
    });
