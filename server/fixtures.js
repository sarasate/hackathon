const runFixtures = function() {
  Questions.upsert(
    { _id: "0CZ24d" },
    {
      text: "Wieviel Unterhalt soll gezahlt werden?",
      type: "range",
      unit: "Euro",
      lowerBound: "0",
      upperBound: "1000",
      template: "DIVORCE"
    }
  );

  Cases.upsert(
    { _id: "DQiwKn" },
    {
      user1: "Jane",
      user2: "John",
      template: "DIVORCE"
    }
  );
};

Meteor.startup(() => {
  runFixtures();
});
