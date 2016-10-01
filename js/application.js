define([
'appModels/diagramModel',
'appViews/diagramView',
'jquery',
'backbone'
], function(diagramModel, DiagramView, $, Backbone){

	var Application = (function() {
		var appView;
		var appModel;
		var self = null;

		// Constructor
		var module = function() {
			self = this;
		};

		// Methods
		module.prototype =
		{
			constructor: module,
			init: function() {
				self.initModel();
				self.initView();
			},
			initView: function() {
				appView = new DiagramView({el: $(".diagram-widget"), model: appModel});
			},
			initModel: function() {
				appModel = new diagramModel();
			}
		};

		return module;
	})();
	return Application;
});

