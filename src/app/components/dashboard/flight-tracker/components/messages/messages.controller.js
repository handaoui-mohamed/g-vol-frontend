class FlightMessagesController {
	constructor($element, $timeout, $filter) {
		'ngInject';
		this.$element = $element;
		this.$timeout = $timeout;
		this.$filter = $filter;
		// add focus
	}

	$onInit() {
		this.accountId = '599c3061817d4114149483dd'; //current clc account
		this.team = [
			{ _id: 1, username: 'usertrc', function: { name: 'trc' } },
			{ _id: 2, username: 'usertl', function: { name: 'tl' } },
			{ _id: 3, username: 'usertb', function: { name: 'tb' } },
			{ _id: this.accountId, username: 'userclc', function: { name: 'clc' } },
		];
		this.team = this.convertTeamArrayToObject();
		this.messages = [
			{ accountId: 1, content: "hello from trc sdlkjflksdjflkjdsfskldfjlskdf", createdAt: "2017-08-30 09:33:02.360Z" },
			{ accountId: 2, content: "hello from tl", createdAt: "2017-08-29 09:34:31.985Z" },
			{ accountId: this.accountId, content: "hello from clc", createdAt: "2017-08-29 09:34:13.029Z" },
			{ accountId: 3, content: "hello from tb", createdAt: "2017-08-29 10:06:19.969Z" },
			{ accountId: 1, content: "hello from trc again", createdAt: "2017-08-29 10:08:14.714Z" },
		].map((message) => {
			message.createdAt = this.convertDate(message.createdAt)
			console.log(message.createdAt)
			return message;
		})

		// get message container
		this.messageContainer = angular.element(this.$element[0].querySelector('md-content'))[0];
	}

	convertDate(ISODate) {
		return this.$filter('date')(new Date(ISODate), 'dd/MM HH:mm');
	}

	convertTeamArrayToObject() {
		let team = {};
		this.team.forEach((account) => {
			team[account._id] = account;
		});
		return team;
	}

	sendMessage() {
		this.messages.push({ accountId: this.accountId, content: this.newMessage, createdAt: this.convertDate((new Date()).toISOString()) });
		this.newMessage = null;
		this.scrollToBottom();
	}

	toggle() {
		this.isOpen = !this.isOpen;
		if (this.isOpen) this.scrollToBottom();
	}

	scrollToBottom() {
		this.$timeout(() => {
			this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
		}, 0);
	}
}

export default FlightMessagesController;