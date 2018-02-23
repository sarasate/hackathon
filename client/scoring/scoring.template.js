Template.scoring.helpers({
    questions: () => { 
      return questionsArray = Questions.find().fetch();
    },
    answer: () => {
        return 'Das ist eine Antwort';
    }
  });