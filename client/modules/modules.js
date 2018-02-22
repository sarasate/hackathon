const modules = [
	{name: "Modul 1",
	description: "Lorem ipsum" 
	},
	{name: "Modul 2",
	description: "Lorem ipsum" 
	},
	{name: "Modul 3",
	description: "Lorem ipsum" 
	},
	{name: "Modul 4",
	description: "Lorem ipsum" 
	},
	{name: "Modul 5",
	description: "Lorem ipsum" 
	},
	{name: "Modul 6",
	description: "Lorem ipsum" 
	},
	{name: "Modul 7",
	description: "Lorem ipsum" 
	},
	{name: "Modul 8",
	description: "Lorem ipsum" 
	}
]

Template.modules.helpers({

	modules: () => {
		return modules;
	}
	
});

Template.modules.events({
	'click .module-item': function (event) {
		console.log('check')
		$(event.target).toggleClass('selected');
	},
	'click .module-selected-button': function(event) {
		event.preventDefault();
		$('.waiting-for-other-party').addClass('show');
		const thisCase = Session.get('case');
		const thisUser = Session.get('user');
		setTimeout(function() {
					FlowRouter.go('/questionnaire/' + thisCase + '/' + thisUser);
		}, 10000);

	}
})