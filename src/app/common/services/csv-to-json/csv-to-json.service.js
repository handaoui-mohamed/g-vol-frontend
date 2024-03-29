class CsvToJsonService {
	// ref: http://stackoverflow.com/a/1293163/2343
	// This will parse a delimited string into an array of
	// arrays. The default delimiter is the comma, but this
	// can be overriden in the second argument.
	fromString(strData, strDelimiter = ",") {
		// Create a regular expression to parse the CSV values.
		let objPattern = new RegExp(
			(
				// Delimiters.
				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

				// Quoted fields.
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

				// Standard fields.
				"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
		);


		// Create an array to hold our data. Give the array
		// a default empty first row.
		let arrData = [];
		let headers = [];
		let headersFound = false;
		let headerIndex = 0;

		// Create an array to hold our individual pattern
		// matching groups.
		let arrMatches = null;


		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while (arrMatches = objPattern.exec(strData)) {

			// Get the delimiter that was found.
			let strMatchedDelimiter = arrMatches[1];

			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {

				// Since we have reached a new row of data,
				// add an empty row to our data array.
				arrData.push({});
				headersFound = true;
				headerIndex = 0;
			}

			let strMatchedValue;

			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
			// captured (quoted or unquoted).
			if (arrMatches[2]) {

				// We found a quoted value. When we capture
				// this value, unescape any double quotes.
				strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");

			} else {

				// We found a non-quoted value.
				strMatchedValue = arrMatches[3];

			}


			// Now that we have our value string, let's add
			// it to the data array.
			if (!headersFound) {
				headers.push(strMatchedValue);
			} else {
				arrData[arrData.length - 1][headers[headerIndex]] = strMatchedValue;
				headerIndex++;
			}
		}

		// Return the parsed data.
		return (arrData);
	}

	fromFile(file) {
		const fromString = this.fromString;
		if (!window.FileReader || !window.File) {
			return Promise.reject('Does not support File API');
		}
		if (!(file instanceof File)) {
			return Promise.reject('Not a file');
		}

		return new Promise((resolve, reject) => {
			let reader = new FileReader();

			reader.onerror = function (err) {
				reject(err);
			};

			// Closure to capture the file information.
			reader.onload = function () {
				let text = reader.result;
				resolve(fromString(text));
			};

			// Read in the image file as a data URL.
			reader.readAsText(file);
		});
	}
}

export default CsvToJsonService;
