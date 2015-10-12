'use strict';

const $ = require('jquery');
require('whatwg-fetch');

const appendEvent = (event, i) => {
  $('.event-container').append(`
    <div>
      <div class="row">
          <div class="col-xs-1">
              <i>${i}.</i>
          </div>
          <div class="col-xs-11">
              <h2>${event.title.$t}</h2>
              <h4>${event.gsx$speaker.$t}</h4>
              <div class="row">
                  <div class="col-md-8">
                      <p class="italic">
                          ${event.gsx$abstract.$t}
                      </p>
                      <p>
                          ${event.gsx$location.$t}
                      </p>
                      <p>
                        <a href="${event.gsx$link.$t}">${event.gsx$link.$t}</a>
                      </p>
                  </div>
                  <div class="col-md-4">
                      <date>
                          ${event.gsx$date.$t}
                      </date>
                  </div>
              </div>
          </div>
      </div>
  `);
}

const eventParser = (events) => {
  let i = 1;
  events.feed.entry.map((event) => {
    console.log(event);
    appendEvent(event, i);
    i++;
  });
}

$(document).ready(() => {
  fetch('https://spreadsheets.google.com/feeds/list/1yi2Xy9_o0qbNXy6OCXoZuVAh7gVRxsFeDUthgUvlMhk/od6/public/values?alt=json')
  .then(function(res){
    if(res.ok){
      return res.json()
    }
  })
  .then((events) => {
    eventParser(events);
  })
  .catch((e) => {
    console.error(e, e.stack);
  });
  
})