import React, {Component} from 'react';
import ChecklistActions from '../lib/ChecklistActions';

export default class ChecklistSearch extends Component {
  render() {
    const {results, query} = this.props;
    const style = {
      display: 'block',
      lineHeight: '30px',
      height: '30px',
      padding: '0 10px'
    }
    const total = (!results ? '' : `${results} results found for ${query}.`)
    return (
      <div>
        <input style={style} placeholder="Search" onChange={this._search.bind(this)} />
        <p><strong>{total}</strong></p>
      </div>
    );
  }

  _search(e) {
    ChecklistActions.filterItems(e.target.value);
  }
}