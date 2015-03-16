'use strict';

var CONTENT_TYPES = {
    THUMBNAIL: 0,
    EXPANDABLE: 1
};

module.exports = [

    {
        name: 'Weibo',
        caption: 'My weibo profile',
        contentType: CONTENT_TYPES.THUMBNAIL,
        image: '/src/images/weibo.png',
        externalLink: 'http://weibo.com/u/2479339722',
        tiles: [
            { row: 4, col: 3 }
        ]
    },

    {
        name: 'Twitter',
        caption: 'My twitter profile',
        contentType: CONTENT_TYPES.THUMBNAIL,
        image: '/src/images/twitter.png',
        externalLink: 'https://twitter.com/__PTX__',
        tiles: [
            { row: 2, col: 3 }
        ]
    },


    {
        name: 'Github',
        caption: 'My Github account',
        contentType: CONTENT_TYPES.THUMBNAIL,
        image: '/src/images/github.png',
        externalLink: 'https://github.com/ptx-pluto',
        tiles: [
            { row: 3, col: 3 }
        ]
    },

    {
        name: 'tripple',
        caption: 'this is a tripple tile',
        contentType: CONTENT_TYPES.THUMBNAIL,
        image: '/src/images/profile.jpg',
        tiles: [
            { row: 2, col: 1 },
            { row: 1, col: 1 },
            { row: 2, col: 2 }
        ]
    },

    {
        name: 'profile',
        caption: 'this is a tripple tile',
        contentType: CONTENT_TYPES.THUMBNAIL,
        image: '/src/images/nabla.png',
        tiles: [
            { row: 2, col: 4 },
            { row: 2, col: 5 },
            { row: 3, col: 4 }
        ]
    }

];

module.exports.CONTENT_TYPES = CONTENT_TYPES;
