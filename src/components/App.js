import React, {Component} from 'react';
import Checklist from './Checklist';
import ChecklistStore from '../lib/ChecklistStore';
import ChecklistActions from '../lib/ChecklistActions';

export default class App extends Component {
  constructor(props) {
    super();
    ChecklistActions.updateItems(props.initialDB);
    this.state = {
      items: ChecklistStore.getState().items
    }
  }

  render() {
    return <Checklist items={this.state.items} />;
  }

  componentDidMount() {
    ChecklistStore.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ChecklistStore.unlisten(this._onChange.bind(this));
  }

  _onChange(state) {
    // this.setState(state);
    console.log(state, this);
  }
}