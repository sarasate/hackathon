import { Template } from "meteor/templating";

Template.Questionnaire.onCreated(function() {});

Template.Questionnaire.helpers({
  questions: () => {
    return Questions.find().fetch();
  }
});
