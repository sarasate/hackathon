Template.invite.events({
	'click .email-submit-button': function(event) {
		event.preventDefault();
		const thisCase = Session.get('case');
		const thisUser = Session.get('user');
		FlowRouter.go('/modules/' + thisCase + '/' + thisUser);
	}
});

Template.layout.onRendered(function() {
  const thisCase = FlowRouter.getParam("case");
  const thisUser = FlowRouter.getParam("user");
  Session.set("user", thisUser);
  Session.set("case", thisCase);
});
