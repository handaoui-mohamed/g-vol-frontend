class FilterMenuController {
	$onInit() {
		// default the menu with to 4 units 
		this.menuWidth = this.menuWidth || '4';
		// default the menu offeset to right = 0 and top = 60 units 
		this.menuOffset = this.menuOffset || '0 60';
		// initilize the model depending on menu type
		this.ngModel = this.ngModel || (this.menuType === 'date' ? {} : []);
		// if we have already selected items we keep them, otherwise initilize it
		this.selectedItems = this.selectedItems || {};
	}

	selectionChanged(item, index) {
		// get the selected item
		let itemSelected = this.selectedItems[index];
		// find the selected item from the provided model
		let itemIndex = this.ngModel.findIndex(element => element === item.value);
		// if item is selected and does not existe in the model, we add it
		if (itemSelected && itemIndex === -1) {
			this.ngModel.push(item.value);
		}
		// if item is not selected and does existe in the model, we remove it
		else if (itemIndex !== -1) {
			this.ngModel.splice(itemIndex, 1);
		}
	}

	filterColumn() {
		// this.filtered is only used to color the filter menu icon
		this.filtered = (this.menuType === 'date' && (this.ngModel.start || this.ngModel.end)) || (!this.menuType && this.ngModel.length > 0);
		// execute the provided filter function
		this.onFilter();
	}

	initSelection(item, index) {
		// initilizing multiselect list we predefined value from this.selectedItems
		if (this.menuType !== 'date' && this.ngModel.find(element => element === item.value)) {
			this.selectedItems[index] = true;
		}
	}
}

export default FilterMenuController;
