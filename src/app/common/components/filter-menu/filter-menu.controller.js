class FilterMenuController {
  $onInit() {
    this.menuWidth = this.menuWidth || '4';
    this.menuOffset = this.menuOffset || '0 60';
    this.ngModel = this.ngModel || (this.menuType === 'date' ? {} : []);
    this.selectedItems = this.selectedItems || {};
    console.log(this.ngModel);
  }
  selectionChanged(item, index) {
    let itemSelected = this.selectedItems[index];
    let itemIndex = this.ngModel.findIndex(element => element === item.value);
    if (itemSelected && itemIndex === -1) {
      this.ngModel.push(item.value);
    } else if (itemIndex !== -1) {
      this.ngModel.splice(itemIndex, 1);
    }
  }

  filterColumn() {
    this.filtered = (this.menuType === 'date' && (this.ngModel.start || this.ngModel.end)) || (!this.menuType && this.ngModel.length > 0);
    this.onFilter();
  }

  initSelection(item, index) {
    if (this.menuType !== 'date' && this.ngModel.find(element => element === item.value)) {
      this.selectedItems[index] = true;
    }
  }
}

export default FilterMenuController;
