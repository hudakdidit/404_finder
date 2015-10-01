import alt from './alt';
import ChecklistActions from './ChecklistActions';
import objectAssign from 'object-assign';

export default class ChecklistStore {
  constructor() {
    this.search = false;
    this.query = '';
    this.results = {};
    this.items = {};
    this.bindListeners({
      handleUpdateItem: ChecklistActions.UPDATE_ITEM,
      handleUpdateItems: ChecklistActions.UPDATE_ITEMS,
      filterItems: ChecklistActions.FILTER_ITEMS
    })
  }

  handleUpdateItem(obj) {
    let item = this.items[obj.index]
    item = objectAssign(item, obj.item);
  }

  handleUpdateItems(items) {
    this.items = items;
  }

  filterItems(search) {
    if(search === '') {
      this.search = false;
    } else {
      let results = {};
      const foundUrls = Object.keys(this.items).filter(function(url){
        return url.indexOf(search) > -1;
      });
      foundUrls.map(url => results[url] = this.items[url]);
      this.query = search;
      this.search = true;
      this.results = results;
    }
  }
}

export default alt.createStore(ChecklistStore, 'ChecklistStore');