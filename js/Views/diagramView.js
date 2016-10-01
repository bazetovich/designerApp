define([
'backbone',
'appViews/dataBlockView',
'appModels/dataBlockModel'
], function(Backbone, dataBlockView, dataBlockModel){

    var DiagramView = Backbone.View.extend({
        template: _.template($('#diagram-widget').html()),
        events: {
            'click .add-block-btn': '_createDataBlock'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.append(this.template);
        },
        _createDataBlock: function () {
            var dataBlockName = prompt('Enter data block name', ''),
                $dataBlockContainer = this.$el.find('.data-blocks-container'),
                DATA_BLOCK_WIDTH = 200,
                DATA_BLOCK_HEIGHT = 96,
                topMax = $dataBlockContainer.height() - DATA_BLOCK_HEIGHT,
                leftMax = $dataBlockContainer.width() - DATA_BLOCK_WIDTH,
                opts = {},
                left = Math.floor(Math.random() * leftMax),
                top = Math.floor(Math.random() * topMax);

            if (dataBlockName) {
                opts = {
                    name: dataBlockName,
                    width: DATA_BLOCK_WIDTH,
                    coordinates: {
                          left: left,
                          top: top
                    }
                };

                var dataBlock = new dataBlockView({
                    model: new dataBlockModel,
                    opts: opts
                });

                $dataBlockContainer.append(dataBlock.render().el);
                dataBlock.connection = jsPlumb.connect({
                    source: $('.startPointBlock'),
                    target: dataBlock.$el,
                    anchors: ['Right', 'Top'],
                    endpoints:["Blank", "Blank" ],
                    endpointStyle:{
                        fillStyle: '#ccc',
                        radius: 8
                    },
                    connector:[ "Bezier", {
                        curviness: 10
                    }],
                    paintStyle: {
                    strokeStyle: "#ccc",
                    lineWidth: 2
                  }
                });
                jsPlumb.draggable(dataBlock.$el);
                dataBlock.$el.animate({
                    opacity: 1
                }, 500);
                dataBlock._slideUpSiblings();
            }
        },

    });
	return DiagramView;
});
