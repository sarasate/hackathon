import { Template } from "meteor/templating";

Template.questionnaire.onCreated(function() {});

Template.questionnaire.helpers({
  questiontext: function() {
    const counter = Session.get("questionsCount");
    const issue = Cases.findOne(Session.get("case"));
    if (issue) {
      const questionsArray = Questions.find({
        $or: [{ moduleId: 0 }, { moduleId: { $in: issue.selectedModules } }]
      }).fetch();
      if (questionsArray[counter]) {
        return questionsArray[counter].text;
      }
    }
  },
  range: () => {
    const counter = Session.get("questionsCount");
    const issue = Cases.findOne(Session.get("case"));
    if (issue) {
      const questionsArray = Questions.find({
        $or: [{ moduleId: 0 }, { moduleId: { $in: issue.selectedModules } }]
      }).fetch();
      if (questionsArray[counter]) {
        return questionsArray[counter].type === "range";
      }
    }
  }
});

Template.questionnaire.onCreated(function() {
  Session.set("questionsCount", 0);

  this.autorun(function() {
    const issue = Cases.findOne(Session.get("case"));
    if (!issue) return;

    const numberOfQuestions = Questions.find({
      $or: [{ moduleId: 0 }, { moduleId: { $in: issue.selectedModules } }]
    }).fetch().length;
    console.log(numberOfQuestions);
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
    $(".selected").removeClass("selected");
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
    console.log(event);
    event.preventDefault();

    const thisUser = Session.get("user");
    const thisCase = Session.get("case");

    const issue = Cases.findOne(Session.get("case"));
    if (!issue) return;

    const questionId = Questions.find({
      $or: [{ moduleId: 0 }, { moduleId: { $in: issue.selectedModules } }]
    }).fetch()[Session.get("questionsCount")]._id;

    const value = event.target.value.value;
    $(".questionnaire-input").val("");

    if (value === "") return;

    Answers.insert({
      user: thisUser,
      caseId: thisCase,
      value: value,
      questionId: questionId,
      weight: 1
    });
  },
  "click .thumbs-up": function() {
    const thisUser = Session.get("user");
    const thisCase = Session.get("case");

    const issue = Cases.findOne(Session.get("case"));
    if (!issue) return;

    const questionId = Questions.find({
      $or: [{ moduleId: 0 }, { moduleId: { $in: issue.selectedModules } }]
    }).fetch()[Session.get("questionsCount")]._id;

    const value = true;
    Answers.insert({
      user: thisUser,
      caseId: thisCase,
      value: value,
      questionId: questionId,
      weight: 1
    });
  },
  "click .thumbs-down": function() {
    const thisUser = Session.get("user");
    const thisCase = Session.get("case");
    const issue = Cases.findOne(Session.get("case"));
    if (!issue) return;

    const questionId = Questions.find({
      $or: [{ moduleId: 0 }, { moduleId: { $in: issue.selectedModules } }]
    }).fetch()[Session.get("questionsCount")]._id;

    const value = false;
    Answers.insert({
      user: thisUser,
      caseId: thisCase,
      value: value,
      questionId: questionId,
      weight: 1
    });
  }
});
