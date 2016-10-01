define([
'backbone'
], function(Backbone){

    var dataBlockItemView = Backbone.View.extend({
        tagName: "li",
        className: "item",
        template: _.template($('#data-block-item').html()),
        events: {
            'click .data-block-item-edit': function () {
                var newName = prompt('Enter new item name', '');

                if (newName) {
                    this.model.set({itemName: newName})
                }
            },
            'click .data-block-item-delete': function () {
                this.$el.slideUp(500, function () {
                    this.remove();
                });
            },
        },
        initialize: function () {
            this.listenTo(this.model, "change", this._rerender);
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        _rerender: function () {
            var self = this;
            this.$el.animate({
                opacity: 0
            }, 300, function () {
                self.$el.html(self.template(self.model.toJSON()));
            });

            this.$el.animate({
                opacity: 1
            }, 300)
        }

    });
	return dataBlockItemView;
});