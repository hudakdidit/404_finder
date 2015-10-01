import React, {Component} from 'react';
import ChecklistItem from './ChecklistItem';

export default class Checklist extends Component {
  render() {
    const {items} = this.props;
    const keys = Object.keys(this.props.items);
    const createItem = function(key, index) {
      const item = items[key];
      const {refs, completed, notes} = item;
      return (
        <div key={index + 'brokenlink'}>
          <ChecklistItem link={key} completed={completed} notes={item.notes} refs={refs}/> 
        </div>
      );
    }
    return (
      <div>
        {keys.map(createItem)}
      </div>
    );
  }
}