import alt from './alt';
class ChecklistActions {
  updateItem(item) {
    this.dispatch(item);
  }
  updateItems(items) {
    this.dispatch(items);
  }
  filterItems(search) {
    this.dispatch(search);
  }
}

export default alt.createActions(ChecklistActions);