import React, {Component} from 'react';
import ChecklistItem from './ChecklistItem';
import ChecklistSearch from './ChecklistSearch';

export default class Checklist extends Component {
  render() {
    let _items;
    const {items, total, complete, site, search, results, query} = this.props;
    _items = (search ? results : items);

    let keys = Object.keys(_items);
    const createItem = function(key, index) {
      const item = _items[key];
      const {refs, complete, notes} = item;
      return (
        <div key={index + 'brokenlink'}>
          <ChecklistItem link={key} complete={complete} notes={item.notes} refs={refs}/> 
        </div>
      );
    }

    const navbar_style = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 5,
      background: 'white',
      padding: '10px'
    }
    
    return (
      <div>
        <div style={navbar_style}>
        <h1>{site} Errors: {complete} of {total} resolved.</h1>
        <ChecklistSearch query={query} results={this.countResults()}/>
        <p>{total - complete} left to resolve.</p>
        </div>
        <div style={{paddingTop: '250px'}}>
        {keys.map(createItem)}
        </div>
      </div>
    );
  }

  countResults() {
    const {search, results} = this.props;
    if(search) {
      return Object.keys(results).length;
    } else {
      return false;
    }
  }
}