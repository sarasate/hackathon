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

  // QUESTIONS
  Questions.upsert(
    { _id: "asD4dT" },
    {
      text:
        "How many days should John be allowed to see the child every two weeks?",
      type: "range",
      unit: "days",
      template: "DIVORCE"
    }
  );

  Questions.upsert(
    { _id: "0Zu8d3" },
    {
      text:
        "How many weeks per year should John be allowed to make holidays together with the child?",
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
      text:
        'How much more than the statutory amount should John pay?',
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
      text:
        "What is the total amount of the compensation Linda should pay for the marital home?",
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

  // ANSWERS

  // How many days should John be allowed to see the child every two weeks?
  Answers.upsert(
    { _id: "asdf10" },
    {
      questionId: "asD4dT",
      value: "3",
      weight: 1,
      user: "john",
      caseId: "DQiwKn"
    }
  );

  // How many weeks per year should John be allowed to make holidays together with the child?
  Answers.upsert(
    { _id: "asdf11" },
    {
      questionId: "0Zu8d3",
      value: "4",
      weight: 1,
      user: "john",
      caseId: "DQiwKn"
    }
  );

  // Should John pay the health insurance coverage for the child?
  Answers.upsert(
    { _id: "asdf12" },
    {
      questionId: "8z7UTS",
      value: false,
      weight: 0.5,
      user: "john",
      caseId: "DQiwKn"
    }
  );

  // How much more than the statutory amount of the \"Düsseldorfer Tabelle\" should John pay?
  Answers.upsert(
    { _id: "asdf13" },
    {
      questionId: "ACZ24d",
      value: "100",
      weight: 0,
      user: "john",
      caseId: "DQiwKn"
    }
  );

  // Should John keep the car?
  Answers.upsert(
    { _id: "asdf14" },
    {
      questionId: "Bn76tR",
      value: true,
      weight: 0.5,
      user: "john",
      caseId: "DQiwKn"
    }
  );

  // What is the total amount of the compensation Linda should pay for the marital home?
  Answers.upsert(
    { _id: "asdf15" },
    {
      questionId: "hE34Rz",
      value: "200000",
      weight: 0,
      user: "john",
      caseId: "DQiwKn"
    }
  );

  // Should Linda receive tax refunds?
  Answers.upsert(
    { _id: "asdf16" },
    {
      questionId: "WuKjX2",
      value: false,
      weight: 0.5,
      user: "john",
      caseId: "DQiwKn"
    }
  );

  Cases.upsert(
    { _id: "DQiwKn" },
    {
      user1: "linda",
      user2: "john",
      template: "DIVORCE"
    }
  );
};

Meteor.startup(() => {
  runFixtures();
});
