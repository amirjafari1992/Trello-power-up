console.log("hello world!");
// window.TrelloPowerUp.initialize({
//   "card-badges": function (t, opts) {
//     return t.card('all')
//     .then(function(card) {
//       console.log(card)
//       return[{
//         text: card.idShort
//       }]
//     })
//   },
// });

var GRAY_ICON =
  "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg";

var onBtnClick = function (t, opts) {
  var point = prompt("Please enter your point", "0");
  if (point != null) {
    alert(`your point is ${point}`);
  }
};

window.TrelloPowerUp.initialize({
  "card-buttons": function (t, opts) {
    return [
      {
        // usually you will provide a callback function to be run on button click
        // we recommend that you use a popup on click generally
        icon: GRAY_ICON, // don't use a colored icon here
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
});
