var GRAY_ICON =
  "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg";

var onBtnClick = function (t, opts) {
  var point = prompt("Please enter your point", "0");
  if (point != null) {
    alert(`your point is ${point}`);
  }
};

var Promise = TrelloPowerUp.Promise;

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
      console.log(card);
      return [
        {
          text: card.idShort,
        },
      ];
    });
  },
  'show-settings': function(t, options){
		return t.popup({
			title: 'Settings',
			url: '../html/settings.html',
			height: 184
		});
	},
});

