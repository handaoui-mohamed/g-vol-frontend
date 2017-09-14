import "./team-dialog.scss";

class TeamDialogController {
	constructor($mdDialog, AccountService, Toast, Team, FlightId, FlightTeamService) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.toast = Toast;
		this.accountService = AccountService;
		this.flightTeamService = FlightTeamService;
		this.team = Team;
		this.flightId = FlightId;
	}

	close() {
		this.$mdDialog.cancel();
	}

	removeMember(accountId) {
		this.flightTeamService.delete({ flightId: this.flightId }, { accountId }, (team) => {
			delete this.team[accountId];
		}, (error) => { this.toast.serverError(error); });
	}
}

export default TeamDialogController;