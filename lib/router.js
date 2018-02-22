
FlowRouter.route("/:case/:user", {
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
    BlazeLayout.render("layout", { top: "header", main: "Questionnaire" });
  }
});

FlowRouter.route("/scoring/:case/:user", {
  name: "scoring",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { top: "header", main: "Scoring" });
  }
});

FlowRouter.route("/proposal/:case/:user", {
  name: "proposal",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { top: "header", main: "Proposal" });
  }
});

FlowRouter.route("/summary/:case/:user", {
  name: "summary",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", { top: "header", main: "Summary" });
  }
});
