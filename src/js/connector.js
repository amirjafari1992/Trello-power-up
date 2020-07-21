var Promise = TrelloPowerUp.Promise;
var GRAY_ICON =
  "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg";

import axios from "axios";

var onBtnClick = function (t, opts) {
  return Promise.all([t.get("card", "private", "perkiPoint")]).spread(function (
    perkiPoint
  ) {
    if (perkiPoint != null) {
      var point = prompt("Please enter your point", perkiPoint);
    } else {
      var point = prompt("Please enter your point", "0");
    }
    if (point != null) {
      var data = "";
      return Promise.all([t.get("board", "private", "apiKey")])
        .spread(function (key) {
          if (key != null) {
            t.set("card", "private", "perkiPoint", point);
            t.card("all").then(function (card) {
              data = {
                cardId: card.id,
                storyPoints: point,
              };
              axios
                .post(`https://beta.perkimator.com/callback/powerup?apiKey=546ccf19-36ed-4117-9faf-4d10eb00c0a5`, data)
                .then(function (response) {})
                .catch(function (error) {});
            });
          } else {
            alert("You must add your API KEY frist!");
          }
        })
        .then(function () {});
    }
  });
};

var cardButtonCallback = function(t){
  return t.popup({
    title: "Perks points",
    url: 'points.html',
    height: 80
  });
};

window.TrelloPowerUp.initialize({
  "card-buttons": function (t, opts) {
    return [
      {
        icon: GRAY_ICON,
        text: "Perkimator Point",
        callback: cardButtonCallback,
        condition: "edit",
      },
    ];
  },
  "card-badges": function (t, opts) {
    return t.get("card", "private", "perkiPoint").then(function (perkiPoint) {
      return [
        {
          text: perkiPoint,
          color: "purple",
        },
      ];
    });
  },
  "card-detail-badges": function (t, opts) {
    return t.get("card", "private", "perkiPoint").then(function (perkiPoint) {
      return [
        {
          title: 'Perks',
          text: perkiPoint,
          color: "purple",
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
