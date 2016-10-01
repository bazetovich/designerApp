define(['backbone'], function(Backbone){

	var diagramModel = Backbone.Model.extend({
		defaults: {
			type : "diagramWidget"
		}
	});

	 return diagramModel;
});

