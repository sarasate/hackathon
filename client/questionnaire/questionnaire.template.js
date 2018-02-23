import { Template } from "meteor/templating";

Template.questionnaire.onCreated(function() {});

Template.questionnaire.helpers({
  questiontext: () => {
    const counter = Session.get("questionsCount");
    const questionsArray = Questions.find().fetch();
    if (questionsArray[counter]) {
      return questionsArray[counter].text;
    }
  },
  range: () => {
    const counter = Session.get("questionsCount");
    const questionsArray = Questions.find().fetch();
    if (questionsArray[counter]) {
      return questionsArray[counter].type === "range";
    }
  }
});

Template.questionnaire.onRendered(function() {
  Session.set("questionsCount", 0);

  this.autorun(function() {
    const numberOfQuestions = Questions.find().fetch().length;
    const count = Session.get("questionsCount");
    if (count !== 0 && count === numberOfQuestions) {
      $(".question-item").hide();
      $(".finish-questionnaire-modal").addClass("show");
    }
  });
});

Template.questionnaire.events({
  "click .next-question": function() {
    $("form.question-form").submit();
    let counter = Session.get("questionsCount");
    counter++;
    Session.set("questionsCount", counter);
    // $(".questionnaire-input").val("");
  },
  "click .previous-question": function() {
    let counter = Session.get("questionsCount");
    counter--;
    Session.set("questionsCount", counter);
  },
  "click .thumbs-icon": function(event) {
    $(".selected").removeClass("selected");
    $(event.target).toggleClass("selected");
  },
  "click .continue-to-scoring": function() {
    const thisCase = Session.get("case");
    const thisUser = Session.get("user");
    FlowRouter.go("/scoring/" + thisCase + "/" + thisUser);
  },
  "submit .question-form": event => {
    event.preventDefault();

    const thisUser = Session.get("user");
    const thisCase = Session.get("case");

    const value = event.target.value.value;
    $(".questionnaire-input").val("");

    Answers.insert({ user: thisUser, caseId: thisCase, value: value });
  }
});
