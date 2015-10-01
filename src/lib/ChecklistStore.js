import alt from './alt';
import ChecklistActions from './ChecklistActions';
import objectAssign from 'object-assign';

export default class ChecklistStore {
  constructor() {
    this.items = {};
    this.bindListeners({
      handleUpdateItem: ChecklistActions.UPDATE_ITEM,
      handleUpdateItems: ChecklistActions.UPDATE_ITEMS
    })
  }

  handleUpdateItem(obj) {
    let item = this.items[obj.index]
    item = objectAssign(item, obj.item);
  }

  handleUpdateItems(items) {
    this.items = items;
  }
}

export default alt.createStore(ChecklistStore, 'ChecklistStore');