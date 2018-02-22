const modules = [
	{name: "Testamentary Dispute Settlement",
	description: "Description of module" 
	},
	{name: "Divorce Settlement",
	description: "Description of module" 
	},
	{name: "Term Sheet (M&A)",
	description: "Description of module" 
	},
	{name: "Investment Agreement",
	description: "Description of module" 
	},
	{name: "Nondisclosure Agreement",
	description: "Description of module" 
	},
	{name: "Domain Purchase Agreement",
	description: "Description of module" 
	},
	{name: "Traffic Accident Litigation",
	description: "Description of module" 
	}, 
	{name: "Hunting agreement",
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