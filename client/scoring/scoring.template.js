import { get } from "lodash";

Template.scoring.helpers({
  questions: () => {
    return (questionsArray = Questions.find().fetch());
  },
  answer: _id => {
    const answer = Answers.findOne({ questionId: _id });
    return get(answer, "value");
  },
  weight: _id => {
    const answer = Answers.findOne({ questionId: _id });
    return get(answer, "weight");
  }
});

Template.scoring.events({
  "click .plus-button": event => {
    console.log(event);
  },
  'click .scoring-confirm': function(event) {
		event.preventDefault();
		$('.waiting-for-other-party').addClass('show');
		const thisCase = Session.get('case');
		const thisUser = Session.get('user');
		setTimeout(function() {
					FlowRouter.go('/proposal/' + thisCase + '/' + thisUser);
		}, 10000);

	}
});
