var Promise = TrelloPowerUp.Promise;
var GRAY_ICON =
  "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg";

var ApiKey = "";
var CardID = "";

var onBtnClick = function (t, opts) {
  return Promise.all([t.get("board", "private", "perkiPoint")]).spread(function(perkiPoint){
    if(perkiPoint != null) {
      var point = prompt("Please enter your point", perkiPoint);
    } else {
      var point = prompt("Please enter your point", "0");
    }
  })
  if (point != null) {
    return Promise.all([t.get("board", "private", "apiKey")])
      .spread(function (key) {
        if (key != null) {
          ApiKey = key;
          return t.card("all").then(function (card) {
            CardID = card.id;
            return t.set('board', 'private', 'perkiPoint', point)
          });
        } else {
          alert("You must add you API KEY frist!");
        }
      })
      .then(function () {});
  }
};

window.TrelloPowerUp.initialize({
  "card-buttons": function (t, opts) {
    return [
      {
        icon: GRAY_ICON,
        text: "Perkimator Point",
        callback: onBtnClick,
        condition: "edit",
      },
    ];
  },
  "card-badges": function (t, opts) {
    return t.card("all").then(function (card) {
      // console.log(card);
      return [
        {
          text: card.idShort,
        },
      ];
    });
  },
  "show-settings": function (t, options) {
    return t.popup({
      title: "Perkimator Settings",
      url: "settings.html",
    });
  },
});
