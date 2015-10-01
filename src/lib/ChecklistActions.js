import alt from './alt';
class ChecklistActions {
  updateItem(item) {
    this.dispatch(item);
  }
  updateItems(items) {
    this.dispatch(items);
  }
}

export default alt.createActions(ChecklistActions);