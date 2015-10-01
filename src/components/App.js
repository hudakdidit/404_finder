import React, {Component} from 'react';
import Checklist from './Checklist';
import ChecklistStore from '../lib/ChecklistStore';
import ChecklistActions from '../lib/ChecklistActions';
import objectAssign from 'object-assign';

export default class App extends Component {
  constructor(props) {
    super();
    ChecklistActions.updateItems(props.initialDB);
    const store = ChecklistStore.getState();
    const state = objectAssign(store, this._getStats(store)); 
    this.state = state;
  }

  render() {
    return <Checklist site={this.props.site} {...this.state} />;
  }

  componentDidMount() {
    ChecklistStore.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ChecklistStore.unlisten(this._onChange.bind(this));
  }

  _onChange(state) {
    this.setState(objectAssign(state, this._getStats(state)));
  }

  _getStats(state) {
    const links = Object.keys(state.items);
    const total = links.length;
    let complete = 0;
    links.map( function(link){
      if(state.items[link].complete === 'true'){
        complete++
      }
    });

    return {
      total: total,
      complete: complete
    }
  }
}