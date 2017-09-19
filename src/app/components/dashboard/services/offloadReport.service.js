class OffloadReport {
	/**
	 * @desc generate an offload report from the offloadlist
	 * @param {*} offloadList 
	 * @return {Object : offloadReport} 
	 * 
	 */
	generate(offloadList) {
		if (offloadList && offloadList.createdAt) {
			// initilize offload report
			let offloadReport = {
				// detailed passengers count
				pax: {
					total: 0,
					male: 0,
					female: 0,
					child: 0,
					infant: 0
				},
				totalWeight: 0,	// total baggage weight
				nbPcs: 0,		// total baggage pieces
				table: []		// contains objects of {pieceId, position}
			}
			angular.forEach(offloadList.table, (row) => {
				offloadReport.pax[row.passengerType]++;
				offloadReport.pax.total++;
				offloadReport.totalWeight += row.totalWeight;
				offloadReport.nbPcs += row.nbPcs;
				offloadReport.table = offloadReport.table.concat(row.offloadBaggage);
			});
			return offloadReport;
		}
	}
}

export default OffloadReport;