class ClockController {
	constructor($interval) {
		'ngInject';
		this.$interval = $interval;

		// get the current date
		let date = new Date();
		// get current time ex: 10:28
		this.time = date.toTimeString().slice(0, 5);
		// get current formatted data ex: 15/09/2017
		this.date = date.toLocaleString().slice(0, 10);
	}

	$onInit() {
		// excute this function in 60000 milliseconds = 1 min intervals to simulate a real clock
		this.$interval(() => {
			// get the current date
			let date = new Date();
			// get current time ex: 10:28
			this.time = date.toTimeString().slice(0, 5);
			// get current formatted data ex: 15/09/2017
			this.date = date.toLocaleString().slice(0, 10);
		}, 60000);
	}
}

export default ClockController;