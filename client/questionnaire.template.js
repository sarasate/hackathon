import { Template } from "meteor/templating";

Template.questionnaire.onCreated(function() {});

Template.questionnaire.helpers({
  questions: () => {
    return Questions.find().fetch();
  }
});
