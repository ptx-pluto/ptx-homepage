'use strict';

var TILE_TYPES = {
    SINGLE: 0,
    TRIPPLE: 1
};

var CONTENT_TYPES = {
    THUMBNAIL: 0,
    EXPANDABLE: 1
};

module.exports = [

    {
        name: 'single',
        caption: 'this is a single tile',
        tileType: TILE_TYPES.SINGLE,
        contentType: CONTENT_TYPES.THUMBNAIL,
        image: '/src/images/weibo.png',
        tiles: [
            { row: 4, col: 3 }
        ]
    },
/*
    {
        name: 'Github',
        caption: 'My Github account',
        tileType: TILE_TYPES.SINGLE,
        contentType: CONTENT_TYPES.THUMBNAIL,
        image: '/src/images/profile.jpg',
        tiles: [
            { row: 4, col: 4 }
        ]
    },
*/

    {
        name: 'Twitter',
        caption: 'My twitter account',
        tileType: TILE_TYPES.SINGLE,
        contentType: CONTENT_TYPES.THUMBNAIL,
        image: '/src/images/twitter.png',
        tiles: [
            { row: 2, col: 3 }
        ]
    },


    {
        name: 'Github',
        caption: 'My Github account',
        tileType: TILE_TYPES.SINGLE,
        contentType: CONTENT_TYPES.THUMBNAIL,
        image: '/src/images/github.png',
        tiles: [
            { row: 3, col: 3 }
        ]
    },

    {
        name: 'tripple',
        caption: 'this is a tripple tile',
        tileType: TILE_TYPES.TRIPPLE,
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
        tileType: TILE_TYPES.TRIPPLE,
        contentType: CONTENT_TYPES.THUMBNAIL,
        image: '/src/images/nabla.png',
        tiles: [
            { row: 2, col: 4 },
            { row: 2, col: 5 },
            { row: 3, col: 4 }
        ]
    }

];

module.exports.TILE_TYPES = TILE_TYPES;
module.exports.CONTENT_TYPES = CONTENT_TYPES;
