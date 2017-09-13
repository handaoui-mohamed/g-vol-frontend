class OffloadReport {
	generate(offloadList) {
		if (offloadList && offloadList.createdAt) {
			let offloadReport = {
				pax: {
					total: 0,
					male: 0,
					female: 0,
					child: 0,
					infant: 0
				},
				totalWeight: 0,
				nbPcs: 0,
				table: [/*{pieceId, position}*/]
			}
			offloadList.table.forEach((row) => {
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