import { get } from "lodash";

Template.scoring.onRendered(function() {
  this.autorun(function() {
    const maxCount = Questions.find().fetch().length * 3;
    const scoreCount = Questions.find().fetch().length;
    Session.set("maxCount", maxCount);
    Session.set("scoreCount", scoreCount);
  });
});

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
    console.log(_id)
    console.log(answer)
    return get(answer, "weight");
  },
  answerId: _id => {
    const answer = Answers.findOne({ questionId: _id });
    return get(answer, "_id");
  },
  maxCount: () => {
    return Session.get("maxCount");
  },
  scoreCount: () => {
    return Session.get("scoreCount");
  }
});

Template.scoring.events({
  "click .plus-button": event => {
    const answerId = event.target.id;
    let scoreCount = Session.get("scoreCount");
    const maxCount = Session.get("maxCount");

    if (scoreCount === maxCount) return;

    Session.set("scoreCount", scoreCount + 1);
    Answers.update(answerId, { $inc: { weight: 1 } });
  },
  "click .minus-button": event => {
    const answerId = event.target.id;
    let scoreCount = Session.get("scoreCount");

    if (scoreCount <= 0) return;

    Session.set("scoreCount", scoreCount - 1);
    Answers.update(answerId, { $inc: { weight: -1 } });
  },
  "click .scoring-confirm": function(event) {
    event.preventDefault();
    $(".waiting-for-other-party").addClass("show");
    const thisCase = Session.get("case");
    const thisUser = Session.get("user");
    setTimeout(function() {
      FlowRouter.go("/proposal/" + thisCase + "/" + thisUser);
    }, 5000);
  }
});
