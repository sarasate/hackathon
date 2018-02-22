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
};

Meteor.startup(() => {
  runFixtures();
});
