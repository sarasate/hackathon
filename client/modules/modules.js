const modules = [
	{name: "Child Support",
	description: "Description of module" 
	},
	{name: "Spousel Support",
	description: "Description of module" 
	},
	{name: "Division Of Property",
	description: "Description of module" 
	},
	{name: "Marital Home",
	description: "Description of module" 
	},
	{name: "Household Effects",
	description: "Description of module" 
	},
	{name: "Equalization Of Surplus",
	description: "Description of module" 
	},
	{name: "Pension Rights Adjustment",
	description: "Description of module" 
	}, 
	{name: "Last Will",
	description: "Description of module" 
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