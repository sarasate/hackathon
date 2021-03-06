import { get } from "lodash";
import { propose, bucketize } from "sondier-mediation";

Template.scoring.onRendered(function() {
  this.autorun(function() {
    const issue = Cases.findOne(Session.get("case"));
    if (!issue) return;
    const maxCount =
      Questions.find({
        $or: [{ moduleId: 0 }, { moduleId: { $in: issue.selectedModules } }]
      }).fetch().length * 3;
    const scoreCount = Questions.find({
      $or: [{ moduleId: 0 }, { moduleId: { $in: issue.selectedModules } }]
    }).fetch().length;
    Session.set("maxCount", maxCount);
    Session.set("scoreCount", scoreCount);
  });
});

Template.scoring.helpers({
  questions: () => {
    const issue = Cases.findOne(Session.get("case"));
    if (!issue) return;
    console.log(issue);
    Session.get("case");
    const questionsArray = Questions.find({
      $or: [{ moduleId: 0 }, { moduleId: { $in: issue.selectedModules } }]
      // caseId: Session.get("case")
    }).fetch();
    console.log(questionsArray);
    return questionsArray;
  },
  answer: _id => {
    const answer = Answers.findOne({
      questionId: _id,
      user: Session.get("user"),
      caseId: Session.get("case")
    });
    console.log(answer.value);
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
      user: Session.get("user"),
      caseId: Session.get("case")
    });
    return get(answer, "weight");
  },
  answerId: _id => {
    const answer = Answers.findOne({
      questionId: _id,
      user: Session.get("user"),
      caseId: Session.get("case")
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

    const issue = Cases.findOne({ _id: thisCase });

    const user1 = issue.email1;

    const enabledQuestions = Questions.find({
      $or: [{ moduleId: 0 }, { moduleId: { $in: issue.selectedModules } }]
    }).fetch();

    const questionIds = enabledQuestions.map(question => question._id);

    const answersBlack = Answers.find({ user: user1 }).fetch();

    const answersWhite = Answers.find({
      user: "dummy",
      questionId: { $in: questionIds }
    }).fetch();

    answersBlack.map(answer => {
      answer.id = answer.questionId;
    });

    answersWhite.map(answer => {
      answer.id = answer.questionId;
    });

    const param = { black: answersBlack, white: answersWhite };
    const proposal = propose(param);

    const consents = bucketize(param, proposal.consent);

    consents.map(consent => {
      consent.approved = true;
      consent.initial = true;
      return consent;
    });
    console.log(consents);

    const buckets = bucketize(param, proposal.dissent);

    console.log(buckets);

    Consensus.find({ caseId: Session.get("case") }).forEach(function(doc) {
      Consensus.remove({ _id: doc._id });
    });

    [...buckets, ...consents].forEach(bucket => {
      //Add case id to bucket
      bucket.caseId = Session.get("case");
      Consensus.insert(bucket);
    });
    // Buckets.insert(bucket);
  }
});
