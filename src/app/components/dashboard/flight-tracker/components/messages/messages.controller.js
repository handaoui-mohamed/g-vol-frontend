class FlightMessagesController {
	constructor($rootScope, $scope, $element, $timeout, $filter, AccountDetails, SocketService, Toast, MessageService, FlightNotification) {
		'ngInject';
		this.$root = $rootScope;
		this.$element = $element;
		this.$timeout = $timeout;
		this.$filter = $filter;
		this.$scope = $scope;
		this.accountDetails = AccountDetails;
		this.socket = SocketService.io;
		this.messageService = MessageService;
		this.toast = Toast;
		this.flightNotification = FlightNotification;
	}

	$onInit() {
		this.messages = [];
		this.newMsgCount = 0; 			// inititilize new messages count for notification
		// remove all new messages socket listeners
		this.socket.removeAllListeners('messages/' + this.flightId);
		this.listenForNewMessages();	// listen for new messages
		this.$scope.$on("messages" + this.flightId, () => {
			this.messages = [];
			this.getFlightMessages()
		});
		// get current account ID
		this.accountDetails.identity().then((account) => this.accountId = account._id);
		// fetch current flight messages
		this.getFlightMessages();

		// get message container, used to scroll to bottom when new message
		this.messageContainer = angular.element(this.$element[0].querySelector('md-content'))[0];
	}

	// previous 10 messages
	loadOldMessages() {
		this.getFlightMessages(this.messages.length, 10);
	}


	getFlightMessages(skip = 0, limit = 20) {
		this.messageService.query({ flightId: this.flightId, skip, limit }, (messages) => {
			this.messages.unshift(...messages.map((message) => {
				// convert sentAt date
				message.sentAt = this.convertDate(message.createdAt);
				return message;
			}));
			this.scrollToBottom();
		}, (error) => { this.toast.serverError(error); });
	}

	convertDate(ISODate) {
		return this.$filter('date')(new Date(ISODate), 'dd/MM HH:mm');
	}

	// sockets functions
	// send a new message to all flight team members
	sendMessage() {
		this.socket.emit('new-message/' + this.flightId, JSON.stringify({
			params: { flightId: this.flightId },
			body: { content: this.newMessage }
		}));
		this.newMessage = null; // empty message text input
	}

	// listen for new messages from flight team members
	listenForNewMessages() {
		this.socket.on('messages/' + this.flightId, (data) => {
			data = JSON.parse(data);
			let newMessage = data.message;
			newMessage.sentAt = this.convertDate(newMessage.createdAt);
			this.$scope.$apply(() => {
				// show new message notification
				this.showNotification(newMessage.accountId);
				// add new message to messages
				this.messages.push(newMessage);
				// scroll to the latest new message
				this.scrollToBottom();
			});
		});
	}

	// view functions
	// toggle messages container
	toggle() {
		this.isOpen = !this.isOpen;
		if (this.isOpen) this.scrollToBottom();
	}

	// remove new message notification
	removeNotification() {
		this.newMsgCount = 0;
		this.flightNotification.initMessages(this.flightId);
	}

	// show new message notification only if sender is not the current account
	showNotification(accountId) {
		if (!this.isFocused && this.$root.currentAccount._id !== accountId) {
			this.newMsgCount++;
			this.flightNotification.newMessage(this.flightId);
		}
		// if (this.newMsgCount !== 0 /*and flight not focused*/) this.notification = true;
	}

	scrollToBottom() {
		this.$timeout(() => {
			this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
		}, 0);
	}
}

export default FlightMessagesController;