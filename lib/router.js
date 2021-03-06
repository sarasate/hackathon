FlowRouter.route("/", {
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { top: "header", main: "invite" });
  }
});

FlowRouter.route("/modules/:case/:user", {
  name: "modules",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { top: "header", main: "modules" });
  }
});

FlowRouter.route("/questionnaire/:case/:user", {
  name: "questionnaire",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { top: "header", main: "questionnaire" });
  }
});

FlowRouter.route("/scoring/:case/:user", {
  name: "scoring",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { top: "header", main: "scoring" });
  }
});

FlowRouter.route("/proposal/:case/:user", {
  name: "proposal",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { top: "header", main: "proposal" });
  }
});

FlowRouter.route("/summary/:case/:user", {
  name: "summary",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { top: "header", main: "summary" });
  }
});
