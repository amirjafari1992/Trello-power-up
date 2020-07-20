/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var apiToken = document.getElementById('apiToken');

t.render(function(){
  return Promise.all([
    t.get('board', 'private', 'apiTokenId')
  ])
  .spread(function(rate){
    if(rate != null) {
      apiToken.value = rate;
    }
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});

document.getElementById('save').addEventListener('click', function(){
  return t.set('board', 'private', 'apiTokenId', apiToken.value)
  .then(function(){
    t.closePopup();
  })
})