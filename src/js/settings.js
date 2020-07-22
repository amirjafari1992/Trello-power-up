/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var apiKey = document.getElementById("apiKey");

t.render(function () {
  return Promise.all([t.get("board", "private", "apiKey")])
    .spread(function (rate) {
      if (rate != null) {
        apiKey.value = rate;
      }
    })
    .then(function () {
      t.sizeTo("#content").done();
    });
});

document.getElementById("save").addEventListener("click", function () {
  return t.set("board", "private", "apiKey", apiKey.value).then(function () {
    t.closePopup();
  });
});
