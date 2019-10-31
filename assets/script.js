var increaseBet = 10;
$(document).ready(function () {
    $("#chipI").on("click", function (event) {
        increaseBet+=5;
        $("#minBet").html(increaseBet);
var decreaseBet = 10;             
        $("#chipD").on("click", function (event) {
        decreaseBet-=5;
        $("#minBet").html(decreaseBet);
        });
    });
});
