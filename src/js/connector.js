var Promise = TrelloPowerUp.Promise;
var GRAY_ICON =
  "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg";

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
