let counter = 0;
Template.proposal.onRendered(function() {
  Session.set("consensusCount", 0);
  this.autorun(function() {
    const numberOfConsensus = Consensus.find({
      caseId: Session.get("case"),
      initial: { $ne: true }
    }).fetch().length;
    const count = Session.get("consensusCount");
    const thisCase = Session.get("case");
    const thisUser = Session.get("user");
    if (count !== 0 && count === numberOfConsensus) {
      $(".consensus").hide();
      $(".waiting-for-other-party").addClass("show");

      setTimeout(function() {
        FlowRouter.go("/summary/" + thisCase + "/" + thisUser);
      }, 5000);

      //   Calculate result
      const buckets = Consensus.find({ caseId: Session.get("case") }).fetch();

      let approvedCount = 0;
      let totalCount = 0;
      let result = 0;
      buckets.map(bucket => {
        const bucketCount = Math.max(bucket.black.length, bucket.white.length);
        console.log(bucketCount);
        if (bucket.approved === true) {
          totalCount = totalCount + bucketCount;
          approvedCount = approvedCount + bucketCount;
        } else if (bucket.approved === false) {
          totalCount = totalCount + bucketCount;
        }
      });

      result = approvedCount / totalCount;

      const newResult = Results.findOne({ caseId: Session.get("case") });

      if (newResult)
        Results.upsert(newResult._id, {
          caseId: Session.get("case"),
          value: result
        });
      else Results.insert({ caseId: Session.get("case"), value: result });
    }
  });
});

Template.thisConsensus.helpers({
  thisItems: function() {
    let counter = Session.get("consensusCount");
    const consensusArray = Consensus.find({
      caseId: Session.get("case"),
      initial: { $ne: true }
    }).fetch();
    const thisConsensus = consensusArray[counter];
    if (!thisConsensus) {
      return;
    }

    const allItems = [];
    const thisBlack = thisConsensus.black;
    thisBlack.forEach(item => {
      allItems.push(item);
    });
    const thisWhite = thisConsensus.white;
    thisWhite.forEach(item => {
      allItems.push(item);
    });
    return allItems;
  },
  questionText: function() {
    const thisQuestion = Questions.findOne({ _id: this.id });
    console.log(this);
    return thisQuestion.text;
  },
  consensusAnswer: function() {
    const thisValue = this.value;
    if (thisValue === true) {
      return "YES";
    } else if (thisValue === false) {
      return "NO";
    } else {
      return thisValue;
    }
  },
  unit: function() {
    const thisQuestion = Questions.findOne({ _id: this.id });
    if (!thisQuestion) {
      return;
    }

    return thisQuestion.unit;
  }
});

Template.thisConsensus.events({
  "click .next-question": function() {
    if (!$(".thumbs-icon").hasClass("selected")) {
      alert("Please accept or decline this consensus proposal.");
      return;
    }
    $("form.question-form").submit();
    let counter = Session.get("consensusCount");
    counter++;
    Session.set("consensusCount", counter);
    $(".selected").removeClass("selected");
    // $(".questionnaire-input").val("");
  },
  "click .previous-question": function() {
    let counter = Session.get("consensusCount");
    counter--;
    Session.set("consensusCount", counter);
  },
  "click .thumbs-icon": function(event) {
    console.log(event);
    const dissentId = Consensus.find({
      caseId: Session.get("case"),
      initial: { $ne: true }
    }).fetch()[Session.get("consensusCount")]._id;

    $(".selected").removeClass("selected");
    $(event.target).toggleClass("selected");
    if ($(event.target).hasClass("thumbs-up")) {
      Consensus.update(dissentId, { $set: { approved: true } });
    }
    if ($(event.target).hasClass("thumbs-down")) {
      console.log(dissentId);
      Consensus.update(dissentId, { $set: { approved: false } });
    }
  }
});
