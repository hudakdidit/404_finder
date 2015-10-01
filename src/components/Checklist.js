import React, {Component} from 'react';
import ChecklistItem from './ChecklistItem';

export default class Checklist extends Component {
  render() {
    const {items, total, complete, site} = this.props;
    const keys = Object.keys(this.props.items);
    const createItem = function(key, index) {
      const item = items[key];
      const {refs, complete, notes} = item;
      return (
        <div key={index + 'brokenlink'}>
          <ChecklistItem link={key} complete={complete} notes={item.notes} refs={refs}/> 
        </div>
      );
    }
    return (
      <div>
        <h1>{site} Errors: {complete} of {total} resolved.</h1>
        <p>{total - complete} left to resolve.</p>
        {keys.map(createItem)}
      </div>
    );
  }
}