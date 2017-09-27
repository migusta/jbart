var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Works Model
 * ==========
 */

var Work = new keystone.List('Work', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Work.add({
	title: { type: String, required: true },
	thumb: { type: Types.CloudinaryImage },
	image: { type: Types.CloudinaryImage },
	isOnDefault: {type: Boolean, defautl:false}
});

Work.register();
