var inputField = document.getElementById("pointInput");
var button = document.getElementById("savePoint");
var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

t.render(function () {
  return Promise.all([t.get("card", "private", "perkiPoint")]).spread(function (
    perkiPoint
  ) {
    if (perkiPoint != null) {
      inputField.value = perkiPoint;
    } else {
      inputField.value = "0";
    }
  });
});

button.addEventListener("click", function () {
  if (inputField.value != null) {
    var data = "";
    return Promise.all([t.get("board", "private", "apiKey")])
      .spread(function (key) {
        if (key != null) {
          t.set("card", "private", "perkiPoint", inputField.value);

          t.card("all").then(function (card) {
            data = {
              cardId: card.id,
              storyPoints: point,
            };
            axios
              .post(
                `https://beta.perkimator.com/callback/powerup?apiKey=546ccf19-36ed-4117-9faf-4d10eb00c0a5`,
                data
              )
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
