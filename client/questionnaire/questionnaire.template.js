import { Template } from 'meteor/templating';

Template.questionnaire.onCreated(function() {});

Template.questionnaire.helpers({
	questiontext: () => {
		const counter = Session.get('questionsCount');
		const questionsArray = Questions.find().fetch();
		if (questionsArray[counter]) {
			return questionsArray[counter].text;
		}
  },
  range: () => {
    const counter = Session.get('questionsCount');
		const questionsArray = Questions.find().fetch();
		if (questionsArray[counter]) {
			return questionsArray[counter].type === 'range';
		}
  }
});

Template.questionnaire.onRendered(function() {
  Session.set('questionsCount', 0);

  this.autorun(function () {
    const numberOfQuestions = Questions.find().fetch().length;
    const count = Session.get('questionsCount');
    if(count !== 0 && count === numberOfQuestions) {
      $('.question-item').hide();
      $('.finish-questionnaire-modal').addClass('show');
    }
  });
});

Template.questionnaire.events({
	'click .next-question': function() {
		let counter = Session.get('questionsCount');
		counter++;
		Session.set('questionsCount', counter);
  },
  'click .previous-question': function() {
		let counter = Session.get('questionsCount');
		counter--;
		Session.set('questionsCount', counter);
	}
});
