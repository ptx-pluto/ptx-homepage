var _ = require('underscore');

var outlines = require('./outlines.js'),
    utils = require('../utils.js');

module.exports = Class.create({

    promiseContent: function(url){
        this.imgUrl = url;
        return Promise.all([
            utils.promiseImg(this.imgUrl),
            this.promiseAppear()
        ]).then(function(){
            this.$img = this.$.image(this.imgUrl, 0, 0, 350, 350);
            this.$frame = this.$.polygon(outlines.getHexagonArray(this.centerX, this.centerY, this.edge*0.8));
            this.$img.attr({
                'clip-path': this.$frame,
                opacity: 0
            });
            this.$frame.attr({
                fill: 'tomato'
            });
            return Promise.all([
                this.promiseAnimate(this.$img, { 'opacity': 1 }, 800),
                this.promiseAnimate(this.$inner, { 'fill': 'none' }, 800)
            ]);
        }.bind(this));
    }



});