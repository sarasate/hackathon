import { get } from "lodash";
import { propose, bucketize } from "/imports/mediation/index";

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
    const answer = Answers.findOne({
      questionId: _id,
      user: Session.get("user")
    });
    console.log(answer.value)
    const thisValue = answer.value;
    if (thisValue === true) {
      return "ACCEPT";
    } else if (thisValue === false) {
      return "DECLINE";
    } else {
      return thisValue;
    }
  },
  weight: _id => {
    const answer = Answers.findOne({
      questionId: _id,
      user: Session.get("user")
    });
    return get(answer, "weight");
  },
  answerId: _id => {
    const answer = Answers.findOne({
      questionId: _id,
      user: Session.get("user")
    });
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

    //   Import mediation

    console.log(thisCase);

    const user1 = Cases.findOne({ _id: thisCase }).user1;
    const user2 = Cases.findOne({ _id: thisCase }).user2;

    const answersBlack = Answers.find({ user: user1 }).fetch();
    const answersWhite = Answers.find({ user: user2 }).fetch();

    answersBlack.map(answer => {
      answer.id = answer.questionId;
    });

    answersWhite.map(answer => {
      answer.id = answer.questionId;
    });

    console.log(answersBlack);

    const param = { black: answersBlack, white: answersWhite };
    const proposal = propose(param);

    console.log(proposal);

    const buckets = bucketize(param, proposal.disent);

    console.log(buckets);

    buckets.forEach(bucket => {
      Consensus.insert(bucket);
    });
    // Buckets.insert(bucket);
  }
});
