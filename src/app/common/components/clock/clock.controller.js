class ClockController {
	constructor($interval) {
		'ngInject';
		this.$interval = $interval;
		let date = new Date();
		this.time = date.toTimeString().slice(0, 5);
		this.date = date.toLocaleString().slice(0, 10);
	}

	$onInit() {
		this.$interval(() => {
			let date = new Date();
			this.time = date.toTimeString().slice(0, 5);
			this.date = date.toLocaleString().slice(0, 10);
		}, 60000);
	}
}

export default ClockController;