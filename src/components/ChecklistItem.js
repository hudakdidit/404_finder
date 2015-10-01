import React, {Component} from 'react';
import API from '../lib/API';

export default class ChecklistItem extends Component {
  constructor(props) {
    const {complete, notes} = props;
    super();
    this.state = {
      completed: (complete !== undefined ? complete : false),
      editing: false,
      notes: (notes !== undefined ? notes : '')
    }
  }

  render() {
    const {refs, link} = this.props;
    const referrer = function(ref, i) {
      return <a key={'referrer_'+ i} href={ref}>{ref}</a>;
    }
    const referrers = function(ref, i) {
      if(refs === undefined) {
        return false;
      } else {
        return <div><strong>Referrers:</strong>{refs.map(referrer)}</div>
      }
    }
    const style = {
      margin: '0 0 5px 0',
      padding: '1em',
      background: (this.state.complete ? '#bef2bc' : '#edb8b8'),
      overflowX: 'auto'
    }
    return (
      <div style={style}>
        <input type="checkbox" onChange={this._handleToggleCheckbox.bind(this)} checked={this.state.complete}/>
        <label>{link}</label>
        {referrers()}
        {this._notes()}
      </div>
    );
  }

  _notes() {
    if(this.state.editing) {
      return (<div>
        <textarea value={this.state.notes} onChange={this._updateNotes.bind(this)} initialValue={this.state.notes} />
        <button onClick={this._saveNotes.bind(this)}>Save</button>
        </div>);
    } else if(this.state.notes !== '') {
      return <div><strong>Notes:</strong><div>{this.state.notes}</div>
      <button onClick={this._toggleEditing.bind(this)}>edit</button><button onClick={this._deleteNote.bind(this)}>&#215;</button></div>;
    } else {
      return <button onClick={this._toggleEditing.bind(this)}>Add notes</button>;
    }
  }

  _handleToggleCheckbox(e) {
    var complete = e.target.checked;
    this.setState({complete: complete}, function(){
      API.updateItem({index: this.props.link, item: {complete: this.state.complete}});
    });
  }

  _toggleEditing() {
    this.setState({editing: !this.state.editing})
  }

  _updateNotes(e) {
    this.setState({notes: e.target.value});
  }

  _saveNotes() {
    API.updateItem({index: this.props.link, item: {notes: this.state.notes}});
    this._toggleEditing();
  }

  _deleteNote() {
    this.setState({notes: ''}, function() {
      console.log('API UPDATE ACTION')
      API.updateItem({index: this.props.link, item: {notes: this.state.notes}});
    });
  }
}