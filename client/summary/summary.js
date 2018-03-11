Template.summary.helpers({
  rating: () => {
    return Math.round(Math.random() * 19 + 70);
  }
});

Template.summary.events({
  "click .retry-button": function () {
    alert('The remaining points of conflict will be proposed again in different combinations.')
  }, 
  "click .consult-button": function () {
    alert('Here you will find further consultation possibilities (specialised lawyers / mediators).')
  }, 
}) 
