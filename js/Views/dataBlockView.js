define([
'backbone',
'appViews/dataBlockItemView',
'jqueryUI'
], function(Backbone, dataBlockItemView){

    var dataBlockView = Backbone.View.extend({
        tagName: "div",
        className: "data-block",
        template: _.template($('#data-block').html()),
        events: {
            'click .fa-plus-circle': '_createField',
            'mousedown .data-block-header': function (e) {
                this.elCoordinates = this.$el.offset();
            },
            'mouseup .data-block-header': function (e) {
                var self = this;
                var newElCoordinates = this.$el.offset();

                if (newElCoordinates.top !== self.elCoordinates.top || newElCoordinates.left !== self.elCoordinates.left) {
                    return;
                } else {
                    if (e.ctrlKey) {

                        if (self.connection) {
                            jsPlumb.detach(self.connection);
                        }

                        self.$el.animate({
                            opacity: 0
                        }, 500, function () {
                            self.remove();
                        });
                    } else {
                        self.$el.find('.main-content').slideToggle(500);
                        self._slideUpSiblings();
                    };
                }
            }
        },
        initialize: function () {
            var dataBlockCollection;
            var self = this;

            this._setConfig();
            this.model.set('data', new Backbone.Collection([]));

            dataBlockCollection = this.model.get('data');
            dataBlockCollection.on('add', function (item) {
                self._renderItem(item);
            });

            this.render();
        },
        _slideUpSiblings: function () {
            var self = this;
            var $otherBlocks = self.$el.siblings("div");

            if ($otherBlocks.length > 0) {
                $otherBlocks.each(function () {
                    $(this).find('.main-content').slideUp(500);
                });
            };
        },
        _createField: function () {
            var itemName = prompt('Enter new item name', ''),
                newItemObj;

            if (itemName) {
                newItemObj = {
                    itemName: itemName
                };
                this.model.get('data').add(newItemObj);
            }
        },
        _renderItem: function (model) {
            var $itemContainer = this.$el.find('.items');
            var dataBlockItem = new dataBlockItemView({
                model: model
            });

            $itemContainer.append(dataBlockItem.render().el);
            dataBlockItem.$el.slideDown(500);
        },
        _setConfig: function () {
          var left = this.options.opts.coordinates.left,
            top = this.options.opts.coordinates.top;
            width = this.options.opts.width;

          this.model.set({blockName: this.options.opts.name});
          this.$el.css({
                top: top,
                left: left
              })
              .width(width);
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
	return dataBlockView;
})