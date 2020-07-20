var Promise = TrelloPowerUp.Promise;
var GRAY_ICON =
  "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg";

var onBtnClick = function (t, opts) {
  return Promise.all([t.get("card", "private", "perkiPoint")]).spread(function (
    perkiPoint
  ) {
    if (perkiPoint != null) {
      var point = prompt("Please enter your point", perkiPoint);
      badgePoint = perkiPoint;
    } else {
      var point = prompt("Please enter your point", "0");
      badgePoint = "";
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
              fetch(
                `https://beta.perkimator.com/callback/powerup?apiKey=${key}`,
                {
                  method: "POST",
                  body: JSON.stringify(data),
                }
              );
            });
          } else {
            alert("You must add your API KEY frist!");
          }
        })
        .then(function () {});
    }
  });
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
      return [
        {
          text: badgePoint,
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
