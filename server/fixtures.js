const runFixtures = function() {
  // Questions.upsert(
  //   { _id: "8uZ65T" },
  //   {
  //     text: "Wieviel Unterhalt soll gezahlt werden?",
  //     type: "range",
  //     unit: "USD",
  //     lowerBound: "0",
  //     upperBound: "1000",
  //     template: "DIVORCE",      moduleId:0
  //   }
  // );

  // Q1
  Questions.upsert(
    { _id: "asD4dT" },
    {
      text:
        "How many days should John be allowed to see the child every two weeks?",
      type: "range",
      unit: "days",
      template: "DIVORCE",
      moduleId: 0
    }
  );

  // Q2
  Questions.upsert(
    { _id: "0Zu8d3" },
    {
      text:
        "How many weeks per year should John be allowed to make holidays together with the child?",
      type: "range",
      unit: "weeks",
      template: "DIVORCE",
      moduleId: 0
    }
  );

  // Q3
  Questions.upsert(
    { _id: "8z7UTS" },
    {
      text: "Should John pay the health insurance coverage for the child?",
      template: "DIVORCE",
      moduleId: 0
    }
  );

  // Q4
  Questions.upsert(
    { _id: "ACZ24d" },
    {
      text: "How much more than the statutory amount should John pay?",
      type: "range",
      unit: "USD",
      template: "DIVORCE",
      moduleId: 0
    }
  );

  // Q5
  Questions.upsert(
    { _id: "Bn76tR" },
    {
      text: "Should John keep the car?",
      template: "DIVORCE",
      moduleId: 0
    }
  );

  // Q6
  Questions.upsert(
    { _id: "hE34Rz" },
    {
      text:
        "What is the total amount of the compensation Linda should pay for the marital home?",
      type: "range",
      unit: "USD",
      template: "DIVORCE",
      moduleId: 0
    }
  );

  // Q7
  Questions.upsert(
    { _id: "WuKjX2" },
    {
      text: "Should Linda receive tax refunds? (module 1)",
      template: "DIVORCE",
      moduleId: 1
    }
  );

  // Q8  -   3 more dummy questions
  Questions.upsert(
    { _id: "jfd8i7" },
    {
      text: "DUMMY question 08 / module 2?",
      type: "range",
      unit: "USD",
      template: "DIVORCE",
      moduleId: 2
    }
  );

  // Q9
  Questions.upsert(
    { _id: "Zud6k8" },
    {
      text: "DUMMY question 09 DUMMY module 3",
      template: "DIVORCE",
      moduleId: 3
    }
  );

  // Q10
  Questions.upsert(
    { _id: "hJk87t" },
    {
      text: "DUMMY question 10 DUMMY module 4?",
      template: "DIVORCE",
      moduleId: 4
    }
  );

  // ANSWERS

  // A1 How many days should John be allowed to see the child every two weeks?
  Answers.upsert(
    { _id: "asdf10" },
    {
      questionId: "asD4dT",
      value: "3",
      weight: 6,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A2 How many weeks per year should John be allowed to make holidays together with the child?
  Answers.upsert(
    { _id: "asdf11" },
    {
      questionId: "0Zu8d3",
      value: "4",
      weight: 5,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A3 Should John pay the health insurance coverage for the child?
  Answers.upsert(
    { _id: "asdf12" },
    {
      questionId: "8z7UTS",
      value: false,
      weight: 3,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A4 How much more than the statutory amount of the \"Düsseldorfer Tabelle\" should John pay?
  Answers.upsert(
    { _id: "asdf13" },
    {
      questionId: "ACZ24d",
      value: "100",
      weight: 1,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A5 Should John keep the car?
  Answers.upsert(
    { _id: "asdf14" },
    {
      questionId: "Bn76tR",
      value: true,
      weight: 2,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A6 What is the total amount of the compensation Linda should pay for the marital home?
  Answers.upsert(
    { _id: "asdf15" },
    {
      questionId: "hE34Rz",
      value: "200000",
      weight: 3,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A7 Should Linda receive tax refunds?
  Answers.upsert(
    { _id: "asdf16" },
    {
      questionId: "WuKjX2",
      value: false,
      weight: 1,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A8 - dummy
  Answers.upsert(
    { _id: "answer08" },
    {
      questionId: "jfd8i7",
      value: "80",
      weight: 3,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A09 - dummy
  Answers.upsert(
    { _id: "answer09" },
    {
      questionId: "Zud6k8",
      value: false,
      weight: 2,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A10 - dummy
  Answers.upsert(
    { _id: "answer10" },
    {
      questionId: "hJk87t",
      value: false,
      weight: 4,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );
};

Meteor.startup(() => {
  runFixtures();
});
