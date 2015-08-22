define(function(require) {
    var Backbone = require('backbone');
    var Feedbacks = require('collection/FeedbackCollection');

    return Backbone.View.extend({
        initialize: function(options) {
			this.options = options;
			_.bindAll(this, 'render');
		},

        render: function(posts) {
            var that = this;
        	this.collection = new Feedbacks();
            
            this.$el.html(JST["assets/admin_templates/manager-feedback-list.html"]({
            	//posts: posts.fetch()
            }));

            PostItemRow = Backbone.View.extend({
                tagName: 'tr',
                initialize: function(options) {
                    _.bindAll(this, 'render');
                    //this.model.bind('change', this.render);
                },

                render: function() {
                    this.$el.empty();

                    this.$el.append($('<td><a href="/#!/f/'+ this.model.alias +'">' + this.model.title + '</a></td>'));
                    this.$el.append($('<td>'+ this.model.created +'</td>'));
                    this.$el.append('<td><span class="label label-'+ (this.model.state == 'publish' ? 'success' : 'default') +'">'+ this.model.state +'</span></td>');
                    this.$el.append($('<td><a href="/#!/manager/feedback/'+ this.model.alias +'/edit">edit</a> | <a href="/#!/post/'+ this.model.alias +'delete">delete</a></td>'));

                    return this;
                }

            });

            this.collection.fetch({
                success: function (collection, response, options) {
                    var tbody = $('#postList');
                    console.log(collection, response);
                    response.forEach(function(post) {
                        var itemView = new PostItemRow({
                            model: post
                        });

                        tbody.append(itemView.render().el);
                    });
                }
            });

            

            return this;
        }
    });
});
