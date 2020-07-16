console.log("hello world!");
window.TrelloPowerUp.initialize({
  "card-detail-badges": function (t, opts) {
    return t.card('all')
    .then(function(card) {
      console.log(card)
      return[{
        text: card.idShort
      }]
    })
  },
});
