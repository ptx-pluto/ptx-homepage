(function(){
    'use strict';

    PTX.VisualGraph = Class.create({

        /**
         * @param options.container
         * @param {number} [options.width]
         * @param {number} [options.height]
         */
        initialize: function(options){
            this.$container = options.container;
            this.$canvas = document.createElement('canvas');
            this.$container.appendChild(this.$canvas);
            var width = options.width,
                height = options.height;
            if (_.isUndefined(width) || _.isUndefined(height)) {
                var ss = getComputedStyle(this.$container);
                width = parseInt(ss.getPropertyValue('width').split('px')[0]);
                height = parseInt(ss.getPropertyValue('height').split('px')[0]);
            }
            this.width = width;
            this.height = height;
            this.$canvas.width = width;
            this.$canvas.height = height;
        }

    });

})();