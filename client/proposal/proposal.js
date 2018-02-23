let counter = 0;
Template.proposal.onRendered(function() {
  Session.set("consensusCount", 0);
  this.autorun(function() {
    const numberOfConsensus = Consensus.find().fetch().length;
    const count = Session.get("consensusCount");
    const thisCase = Session.get("case");
    const thisUser = Session.get("user");
    if (count !== 0 && count === numberOfConsensus) {
      $(".consensus").hide();
      $(".waiting-for-other-party").addClass("show");
      setTimeout(function() {
        FlowRouter.go("/summary/" + thisCase + "/" + thisUser);
      }, 5000);
    }
  });
});

Template.thisConsensus.helpers({
  thisItems: function() {
    let counter = Session.get("consensusCount");
    const consensusArray = Consensus.find().fetch();
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
    const thisValue = this.value.toString();
    if (thisValue === true) {
      return "ACCEPT";
    } else if (thisValue === false) {
      return "DECLINE";
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
    $(".selected").removeClass("selected");
    $(event.target).toggleClass("selected");
  }
});
