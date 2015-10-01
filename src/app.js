import React from 'react';
import App from './components/App';

$.get('db.json')
.done(function(data) {
    React.render(<App initialDB={data}/>, $('#checklist')[0]);
})
.fail(function(err) {
  console.log(err);
  $('#checklist').text('Database could not be found.');
})