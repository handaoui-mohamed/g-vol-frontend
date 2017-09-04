class FlightMessagesController {
	constructor($scope, $element, $timeout, $filter, $window, SocketService, Toast, MessageService) {
		'ngInject';
		this.$element = $element;
		this.$timeout = $timeout;
		this.$filter = $filter;
		this.$window = $window;
		this.$scope = $scope;
		this.socket = SocketService.io;
		this.messageService = MessageService;
		this.toast = Toast;
	}

	$onInit() {
		// unsub from socket event
		this.socket.removeAllListeners('messages/' + this.flightId);
		this.messages = [];
		this.listenForNewMessages();
		this.accountId = this.$window.localStorage['current_account'];
		this.getFlightMessages();

		// get message container
		this.messageContainer = angular.element(this.$element[0].querySelector('md-content'))[0];
	}

	loadOldMessages() {
		if (this.messageContainer.scrollTop === 0) {
			console.log("test");
			this.getFlightMessages(this.messages.length, 10);
		}
	}


	getFlightMessages(skip = 0, limit = 20) {
		this.messageService.query({ flightId: this.flightId, skip, limit }, (messages) => {
			this.messages.unshift(...messages.map((message) => {
				message.sentAt = this.convertDate(message.createdAt);
				return message;
			}));
		}, (error) => { this.toast.serverError(error); });
	}

	convertDate(ISODate) {
		return this.$filter('date')(new Date(ISODate), 'dd/MM HH:mm');
	}

	// sockets functions
	sendMessage() {
		console.log(this.socket);
		this.socket.emit('new-message/' + this.flightId, JSON.stringify({
			params: { flightId: this.flightId },
			body: { content: this.newMessage }
		}));
		this.newMessage = null;
	}

 
	listenForNewMessages() {
		this.socket.on('messages/' + this.flightId, (data) => {
			console.log(data);
			data = JSON.parse(data);
			let newMessage = data.message;
			newMessage.sentAt = this.convertDate(newMessage.createdAt);
			this.$scope.$apply(() => {
				this.messages.push(newMessage);
			})
			this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
		});
	}

	// view functions
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