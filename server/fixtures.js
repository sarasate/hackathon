const runFixtures = function () {
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


  // Q1a
  Questions.upsert({
    _id: "questionId01a"
  }, {
    text: "Should your spouse pay the health insurance coverage for your child?",
    template: "DIVORCE",
    moduleId: 0
  });

  // Q3a
  Questions.upsert({
    _id: "questionId02a"
  }, {
    text: "Should your spouse pay a dynamic maintenance for your child?",
    template: "DIVORCE",
    moduleId: 0
  });

  // Q3a
  Questions.upsert({
    _id: "questionId03a"
  }, {
    text: "How many days is your spouse allowed to see your child every two weeks?",
    type: "range",
    unit: "days",
    template: "DIVORCE",
    moduleId: 0
  });

  // Q4a
  Questions.upsert({
    _id: "questionId04a"
  }, {
    text: "Is your spouse under obligation to provide maintenance for your child?",
    template: "DIVORCE",
    moduleId: 0
  });

  // Q5a
  Questions.upsert({
    _id: "questionId05a"
  }, {
    text: "Should your spouse receive tax refunds?",
    template: "DIVORCE",
    moduleId: 0
  });

  // Q6a
  Questions.upsert({
    _id: "questionId06a"
  }, {
    text: "Should your spouse keep the car?",
    template: "DIVORCE",
    moduleId: 0
  });

  // Q7a
  Questions.upsert({
    _id: "questionId07a"
  }, {
    text: "How many weeks per year is your spouse allowed to make holidays together with your child?",
    type: "range",
    unit: "weeks",
    template: "DIVORCE",
    moduleId: 0
  });

  // Q08a
  Questions.upsert({
    _id: "questionId08a"
  }, {
    text: "Should the couple share the child custody?",
    template: "DIVORCE",
    moduleId: 1
  });

  // Q09a
  Questions.upsert({
    _id: "questionId09a"
  }, {
    text: "How much more than the statutory amount should your spouse pay for the child´s maintenance (in USD)?",
    type: "range",
    unit: "USD",
    template: "DIVORCE",
    moduleId: 2
  });

  // Q10a
  Questions.upsert({
    _id: "questionId10a"
  }, {
    text: "What is the total amount of compensation you will pay for the marital home (in USD)?",
    type: "range",
    unit: "USD",
    template: "DIVORCE",
    moduleId: 3
  });

  // Q11a
  Questions.upsert({
    _id: "questionId11a"
  }, {
    text: "Should your spouse pay a single payment?",
    template: "DIVORCE",
    moduleId: 4
  });





  // ANSWERS


  // A1a Should your spouse pay a dynamic maintenance for your child? 
  Answers.upsert({
    _id: "answerId01a"
  }, {
    questionId: "questionId01a",
    value: false,
    weight: 1,
    user: "dummy",
    caseId: "DQiwKn"
  });


  // A2a Should your spouse pay the health insurance coverage for your child?
  Answers.upsert({
    _id: "answerId02a"
  }, {
    questionId: "questionId02a",
    value: false,
    weight: 3,
    user: "dummy",
    caseId: "DQiwKn"
  });

  // A3a How many days is your spouse allowed to see your child every two weeks?
  Answers.upsert({
    _id: "answerId03a"
  }, {
    questionId: "questionId03a",
    value: "3",
    weight: 6,
    user: "dummy",
    caseId: "DQiwKn"
  });

  // A4a "Is your spouse under obligation to provide maintenance for your child?",
  Answers.upsert({
    _id: "answerId04a"
  }, {
    questionId: "questionId04a",
    value: true,
    weight: 3,
    user: "dummy",
    caseId: "DQiwKn"
  });

  // A5a "Should your spouse receive tax refunds?",
  Answers.upsert({
    _id: "answerId05a"
  }, {
    questionId: "questionId05a",
    value: false,
    weight: 1,
    user: "dummy",
    caseId: "DQiwKn"
  });

  // A6a "Should your spouse keep the car?",
  Answers.upsert({
    _id: "answerId06a"
  }, {
    questionId: "questionId06a",
    value: true,
    weight: 2,
    user: "dummy",
    caseId: "DQiwKn"
  });

  // A7a "How many weeks per year is your spouse allowed to make holidays together with your child?",
  Answers.upsert({
    _id: "answerId07a"
  }, {
    questionId: "questionId07a",
    value: "5",
    weight: 5,
    user: "dummy",
    caseId: "DQiwKn"
  });

  // A8a  "Should the couple share the child custody?",
  Answers.upsert({
    _id: "answerId08a"
  }, {
    questionId: "questionId08a",
    value: true,
    weight: 4,
    user: "dummy",
    caseId: "DQiwKn"
  });


  // A9a "How much more than the statutory amount should your spouse pay (in USD)?",
  Answers.upsert({
    _id: "answerId09a"
  }, {
    questionId: "questionId09a",
    value: "280",
    weight: 1,
    user: "dummy",
    caseId: "DQiwKn"
  });

  // A10a "What is the total amount of compensation you will pay for the marital home (in USD)?",
  Answers.upsert({
    _id: "answerId10a"
  }, {
    questionId: "questionId10a",
    value: "226000",
    weight: 6,
    user: "dummy",
    caseId: "DQiwKn"
  });

  // A11a "Should your spouse pay a single payment?",
  Answers.upsert({
    _id: "answerId11a"
  }, {
    questionId: "questionId11a",
    value: false,
    weight: 1,
    user: "dummy",
    caseId: "DQiwKn"
  });
};




Meteor.startup(() => {
  runFixtures();
});