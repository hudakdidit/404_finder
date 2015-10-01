import ChecklistActions from '../lib/ChecklistActions';

class API {
  updateItem(item) {
    ChecklistActions.updateItem(item)
    $.post('/update', item)
    .done(function(data){
      ChecklistActions.updateItems(JSON.parse(data));
    });
  }
}


export default new API();