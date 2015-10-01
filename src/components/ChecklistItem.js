import React, {Component} from 'react';
import API from '../lib/API';

const colors = {
  complete: '#bef2bc',
  incomplete: '#edb8b8',
  nonissue: '#00b9e7'
}

export default class ChecklistItem extends Component {
  constructor(props) {
    const {complete, notes, issue} = props;
    super();
    this.state = {
      complete: (complete !== undefined && complete === 'true' ? true : false),
      editing: false,
      issue: (issue !== undefined && issue === 'false' ? false : true),
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

    let style = {
      position: 'relative',
      margin: '0 0 5px 0',
      padding: '1em',
      background: (this.state.complete ? colors.complete : colors.incomplete),
      overflowX: 'auto'
    }

    if(!this.state.issue) {
      style.background = colors.nonissue;
    }

    return (
      <div style={style}>
        <div>
          <input type="checkbox" onChange={this._toggleIssue.bind(this)} checked={this.state.complete}/>
          <label>Resolved</label>
          &nbsp;&nbsp;&nbsp;
          <input type="checkbox" onChange={this._toggleIssue.bind(this)} checked={!this.state.issue}/>
          <label>Not an issue</label>
        </div>
        <h2>{link}</h2>
        {referrers()}
        {this._notes()}
      </div>
    );
  }

  _notes() {
    if(this.state.editing) {
      let style = {width: '100%', height: '150px', padding: '10px'};
      return (<div>
        <textarea style={style} value={this.state.notes} onChange={this._updateNotes.bind(this)} initialValue={this.state.notes} />
        <button onClick={this._saveNotes.bind(this)}>Save</button>
        </div>);
    } else if(this.state.notes !== '') {
      
      return <div onDoubleClick={this._toggleEditing.bind(this)}><strong>Notes:</strong><div>{this.state.notes}</div>
      <button onClick={this._toggleEditing.bind(this)}>edit</button><button onClick={this._deleteNote.bind(this)}>&#215;</button></div>;
    } else {
      return <button onClick={this._toggleEditing.bind(this)}>Add notes</button>;
    }
  }

  _toggleIssue(e) {
    var issue = e.target.checked;
    this.setState({issue: !this.state.issue}, function(){
      API.updateItem({index: this.props.link, item: {issue: this.state.issue}});
    });
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