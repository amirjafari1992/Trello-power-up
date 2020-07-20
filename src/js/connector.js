var Promise = TrelloPowerUp.Promise;
var GRAY_ICON =
  "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg";

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
              fetch(
                `https://beta.perkimator.com/callback/powerup?apiKey=${key}`,
                {
                  method: "POST", // *GET, POST, PUT, DELETE, etc.
                  mode: "cors", // no-cors, *cors, same-origin
                  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                  credentials: "same-origin", // include, *same-origin, omit
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  redirect: "follow", // manual, *follow, error
                  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                  body: JSON.stringify(data), // body data type must match "Content-Type" header
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
    return t.get("card", "private", "perkiPoint").then(function (perkiPoint) {
      return [
        {
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
