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
    { _id: "questionId01" },
    {
      text:
        "How many days is your spouse allowed to see your child every two weeks?",
      type: "range",
      unit: "days",
      template: "DIVORCE",
      moduleId: 1
    }
  );

  // Q2
  Questions.upsert(
    { _id: "questionId02" },
    {
      text:
        "Should your spouse pay the health insurance coverage for your child?",
      template: "DIVORCE",
      moduleId: 2
    }
  );

  // Q3
  Questions.upsert(
    { _id: "questionId03" },
    {
      text: "What is the total amount of compensation you will pay for the marital home (in USD)?",
      type: "range",
      unit: "USD",
      template: "DIVORCE",
      moduleId: 3
    }
  );

  // Q4
  Questions.upsert(
    { _id: "questionId04" },
    {
      text: "How much more than the statutory amount should your spouse pay (in USD)?",
      type: "range",
      unit: "USD",
      template: "DIVORCE",
      moduleId: 2
    }
  );

    // Q5
    Questions.upsert(
      { _id: "questionId05" },
      {
        text: "Should your spouse pay a dynamic maintenance for your child?",
        template: "DIVORCE",
        moduleId: 0
      }
    );


  // Q6
  Questions.upsert(
    { _id: "questionId06" },
    {
      text:
        "Should the couple share the child custody?",
      template: "DIVORCE",
      moduleId: 0
    }
  );

  // Q7
  Questions.upsert(
    { _id: "questionId07" },
    {
      text: "Is your spouse under obligation to provide maintenance for your child?",
      template: "DIVORCE",
      moduleId: 0
    }
  );

  // Q8
  Questions.upsert(
    { _id: "questionId08" },
    {
      text: "How many weeks per year is your spouse allowed to make holidays together with your child?",
      type: "range",
      unit: "weeks",
      template: "DIVORCE",
      moduleId: 1
    }
  );

  // Q9
  Questions.upsert(
    { _id: "questionId09" },
    {
      text: "Should your spouse receive tax refunds?",
      template: "DIVORCE",
      moduleId: 0
    }
  );

    // Q10
    Questions.upsert(
      { _id: "questionId10" },
      {
        text: "Should your spouse keep the car?",
        template: "DIVORCE",
        moduleId: 0
      }
    );

      // Q11
  Questions.upsert(
    { _id: "questionId11" },
    {
      text: "Should your spouse pay a single payment?",
      template: "DIVORCE",
      moduleId: 4
    }
  );





  // ANSWERS

  // A1 How many days is your spouse allowed to see your child every two weeks?
  Answers.upsert(
    { _id: "answerId01" },
    {
      questionId: "questionId01",
      value: "3",
      weight: 6,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A2 Should your spouse pay the health insurance coverage for your child?
  Answers.upsert(
    { _id: "answerId02" },
    {
      questionId: "questionId02",
      value: false,
      weight: 3,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A3 "What is the total amount of compensation you will pay for the marital home (in USD)?",
  Answers.upsert(
    { _id: "answerId03" },
    {
      questionId: "questionId03",
      value: "167000",
      // weight: 6, 
      weight: 14,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A4 "How much more than the statutory amount should your spouse pay (in USD)?",
  Answers.upsert(
    { _id: "answerId04" },
    {
      questionId: "questionId04",
      value: "200",
      weight: 1,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A5 "Should your spouse pay a dynamic maintenance for your child?",
  Answers.upsert(
    { _id: "answerId05" },
    {
      questionId: "questionId05",
      value: false,
      weight: 1,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A6  "Should the couple share the child custody?",
  Answers.upsert(
    { _id: "answerId06" },
    {
      questionId: "questionId06",
      value: true,
      weight: 4,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A7 "Is your spouse under obligation to provide maintenance for your child?",
  Answers.upsert(
    { _id: "answerId07" },
    {
      questionId: "questionId07",
      value: true,
      weight: 3,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A8 "How many weeks per year is your spouse allowed to make holidays together with your child?",
  Answers.upsert(
    { _id: "answerId08" },
    {
      questionId: "questionId08",
      value: "4",
      weight: 5,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A9 "Should your spouse receive tax refunds?",
  Answers.upsert(
    { _id: "answerId09" },
    {
      questionId: "questionId09",
      value: false,
      weight: 1,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A10 "Should your spouse keep the car?",
  Answers.upsert(
    { _id: "answerId10" },
    {
      questionId: "questionId10",
      value: true,
      weight: 2,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );

  // A11 "Should your spouse pay a single payment?",
  Answers.upsert(
    { _id: "answerId11" },
    {
      questionId: "questionId11",
      value: false,
      weight: 1,
      user: "dummy",
      caseId: "DQiwKn"
    }
  );
};


Meteor.startup(() => {
  runFixtures();
});
