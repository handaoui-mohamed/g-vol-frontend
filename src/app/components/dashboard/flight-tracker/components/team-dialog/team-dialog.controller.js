import "./team-dialog.scss";

class TeamDialogController {
	constructor($mdDialog, Toast, Team, FlightId, FlightTeamService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.toast = Toast;
		this.flightTeamService = FlightTeamService;
		this.team = Team;			// current flight team
		this.flightId = FlightId;	// current flight ID
	}

	close() {
		this.$mdDialog.cancel();
	}

	// remove selected member from flight
	removeMember(accountId) {
		this.flightTeamService.delete({ flightId: this.flightId }, { accountId }, (team) => {
			// remove member from team object by removing its ID
			delete this.team[accountId];
			this.toast.success("The member was removed successfully", "MEMBER_REMOVED");
		}, (error) => { this.toast.serverError(error); });
	}
}

export default TeamDialogController;