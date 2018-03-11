import { Template } from "meteor/templating";

Template.questionnaire.onCreated(function() {});

Template.questionnaire.helpers({
  questiontext: function() {
    const counter = Session.get("questionsCount");
    const issue = Cases.findOne(Session.get("case"));
    if (issue) {
      const questionsArray = Questions.find({
        $or: [
          {
            moduleId: 0
          },
          {
            moduleId: {
              $in: issue.selectedModules
            }
          }
        ]
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
        $or: [
          {
            moduleId: 0
          },
          {
            moduleId: {
              $in: issue.selectedModules
            }
          }
        ]
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
      $or: [
        {
          moduleId: 0
        },
        {
          moduleId: {
            $in: issue.selectedModules
          }
        }
      ]
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
    // get questionId and find out type of question ('range' or undefined)
    const issue = Cases.findOne(Session.get("case"));
    if (!issue) return;

    const questionId = Questions.find({
      $or: [
        {
          moduleId: 0
        },
        {
          moduleId: {
            $in: issue.selectedModules
          }
        }
      ]
    }).fetch()[Session.get("questionsCount")]._id;
    const actualQuestion = Questions.findOne({
      _id: questionId
    });
    const actualQuestionType = actualQuestion.type;
    console.log(actualQuestionType);
    // if no questiontype exists (thumbs-up/-down-question) and no answer selected -> return, else counter++ and show next question
    if (!actualQuestionType) {
      if (!$(".thumbs-icon").hasClass("selected")) {
        alert("Please select an answer.");
        return;
      } else {
        let counter = Session.get("questionsCount");
        counter++;
        Session.set("questionsCount", counter);
      }
    }

    $("form.question-form").submit();
    $(".selected").removeClass("selected");
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
    let counter = Session.get("questionsCount");

    console.log(event);
    event.preventDefault();

    const thisUser = Session.get("user");
    const thisCase = Session.get("case");

    const questionId = Questions.find().fetch()[Session.get("questionsCount")]
      ._id;

    const value = event.target.value.value;
    $(".questionnaire-input").val("");

    // if no value entered (in 'range'-question) alert and return
    if (value === "") {
      alert("Please enter value.");
      return;
    }

    // move counter up and show next question
    counter++;
    Session.set("questionsCount", counter);
    // $(".questionnaire-input").val("");

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
      $or: [
        {
          moduleId: 0
        },
        {
          moduleId: {
            $in: issue.selectedModules
          }
        }
      ]
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
      $or: [
        {
          moduleId: 0
        },
        {
          moduleId: {
            $in: issue.selectedModules
          }
        }
      ]
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
