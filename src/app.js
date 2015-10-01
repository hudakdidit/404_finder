import React from 'react';
import App from './components/App';
let site = null;

$.get('/api')
.done(function(data){
  site = data.url;
  $.get(data.name + '_db.json')
  .done(function(data) {
    React.render(<App site={site} initialDB={data}/>, $('#checklist')[0]);
  }).fail(function(err) {
    console.log(err);
    $('#checklist').text('Database could not be found.');
  });
}).fail(function(err) {
  console.log('Cannot get /api');
});
