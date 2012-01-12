var oscMessageList = Backbone.View.extend({
    initialize: function () {
           },



events: {
// any user events (clicks etc) we want to respond to
},


// grab and populate our main template
render: function () {
// once again this is using ICanHaz.js, but you can use whatever
this.el = ich.app(this.model.toJSON());


// store a reference to our movie list
this.movieList = this.$('#movieList');


return this;
},


addMovie: function (movie) {
var view = new MovieView({model: movie});


// here we use our stored reference to the movie list element and
// append our rendered movie view.
this.movieList.append(view.render().el);
},


removeMovie: function (movie) {
// here we can use the html ID we stored to easily find
// and remove the correct element/elements from the view if the
// collection tells us it's been removed.
this.$('#' + movie.get('htmlId')).remove();
}
});