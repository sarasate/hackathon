Template.invite.events({
  "submit .invite-form": function(event) {
    event.preventDefault();
    // Fetch form field.
    const target = event.target;
    console.log(target);
    const issue = {
      user1: target.username1.value,
      email1: target.email1.value,
      user2: target.username2.value,
      email2: target.email2.value,
      template: "DIVORCE"
    };

    const issueId = Cases.insert(issue);

    Session.set("user", issue.email1);
    Session.set("case", issueId);

    const thisCase = Session.get("case");
    const thisUser = Session.get("user");
    FlowRouter.go("/modules/" + thisCase + "/" + thisUser);
  }
});

Template.layout.onRendered(function() {
  const thisCase = FlowRouter.getParam("case");
  const thisUser = FlowRouter.getParam("user");
});
