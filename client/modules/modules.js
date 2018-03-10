const modules = [
  {
    name: "Child Custody",
    description: "Description of module",
    id: 1
  },
  {
    name: "Child Support",
    description: "Description of module",
    id: 2
  },
  {
    name: "Spousel Support",
    description: "Description of module",
    id: 3
  },
  {
    name: "Division of Property",
    description: "Description of module",
    id: 4
  },
  {
    name: "Household Effects",
    description: "Description of module",
    id: 5
  },
  {
    name: "Taxes",
    description: "Description of module",
    id: 6
  },
  {
    name: "Last Will",
    description: "Description of module",
    id: 7
  },
  {
    name: "Equalization of Surplus",
    description: "Description of module",
    id: 8
  }
];

Template.modules.helpers({
  modules: () => {
    return modules;
  }
});

Template.modules.events({
  "click .module-item": function(event) {
    const target = event.target;
    const id = target.id;
    const caseId = Session.get("case");
    console.log(caseId);
    console.log(id);

    if ($(target).hasClass("selected")) {
      Cases.update(Session.get("case"), {
        $pull: { selectedModules: parseInt(id) }
      });
    } else
      Cases.update(Session.get("case"), {
        $addToSet: { selectedModules: parseInt(id) }
      });

    $(event.target).toggleClass("selected");
  },
  "click .module-selected-button": function(event) {
    event.preventDefault();
    $(".waiting-for-other-party").addClass("show");
    const thisCase = Session.get("case");
    const thisUser = Session.get("user");
    setTimeout(function() {
      FlowRouter.go("/questionnaire/" + thisCase + "/" + thisUser);
    }, 5000);
  }
});

// Set url params in session
Template.modules.onRendered(function() {
  const thisCase = FlowRouter.getParam("case");
  const thisUser = FlowRouter.getParam("user");
  Session.set("user", thisUser);
  Session.set("case", thisCase);

  Cases.update(thisCase, { $set: { selectedModules: [] } });
});
