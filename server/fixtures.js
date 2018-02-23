const runFixtures = function() {
  // Questions.upsert(
  //   { _id: "8uZ65T" },
  //   {
  //     text: "Wieviel Unterhalt soll gezahlt werden?",
  //     type: "range",
  //     unit: "Euro",
  //     lowerBound: "0",
  //     upperBound: "1000",
  //     template: "DIVORCE"
  //   }
  // );
 
  Questions.upsert(
    { _id: "0CZ24d" },
    {
      text: "Should the couple share the child custody?",
      template: "DIVORCE"
    }
  );

  Questions.upsert(
    { _id: "asD4dT" },
    {
      text: "How many days is John allowed to see the child every two weeks?",
      type: "range",
      unit: "days",
      template: "DIVORCE"
    }
  );

  Questions.upsert(
    { _id: "0Zu8d3" },
    {
      text: "How many weeks per year is John allowed to make holidays together with the child?",
      type: "range",
      unit: "weeks",
      template: "DIVORCE"
    }
  );

  Questions.upsert(
    { _id: "8z7UTS" },
    {
      text: "Should John pay the health insurance coverage for the child?",
      template: "DIVORCE"
    }
  );

  Questions.upsert(
    { _id: "ACZ24d" },
    {
      text: "How much more than the statutory amount of the \"Düsseldorfer Tabelle\" should John pay? ",
      type: "range",
      unit: "Euro",
      template: "DIVORCE"
    }
  );

  Questions.upsert(
    { _id: "Bn76tR" },
    {
      text: "Should John keep the car?",
      template: "DIVORCE"
    }
  ); 

  Questions.upsert(
    { _id: "hE34Rz" },
    {
      text: "What is the total amount of the compensation Linda has to pay for the marital home?",
      type: "range",
      unit: "Euro",
      template: "DIVORCE"
    }
  ); 

  Questions.upsert(
    { _id: "WuKjX2" },
    {
      text: "Should Linda receive tax refunds?",
      template: "DIVORCE"
    }
  ); 


  Cases.upsert(
    { _id: "DQiwKn" },
    {
      user1: "Linda",
      user2: "John",
      template: "DIVORCE"
    }
  );
};

Meteor.startup(() => {
  runFixtures();
});
