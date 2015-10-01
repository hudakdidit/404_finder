import alt from './alt';
import ChecklistActions from './ChecklistActions';

export default class ChecklistStore {
  constructor() {
    this.items = {};
    this.bindListeners({
      handleUpdateItem: ChecklistActions.UPDATE_ITEM,
      handleUpdateItems: ChecklistActions.UPDATE_ITEMS
    })
  }

  handleUpdateItem(item) {
    console.log(item);
  }

  handleUpdateItems(items) {
    this.items = items;
  }
}

export default alt.createStore(ChecklistStore, 'ChecklistStore');