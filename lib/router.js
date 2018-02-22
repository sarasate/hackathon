FlowRouter.route("/", {
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { top: "header", main: "index" });
  }
});
