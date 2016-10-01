define(['backbone'], function(Backbone){

	var dataBlockModel = Backbone.Model.extend({
		defaults: {
			name : "data block"
		}
	});

	 return dataBlockModel;
});