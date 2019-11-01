$(document).ready(function () {
    var bet = 10;
    $("#chipI").on("click", function (event) {
        if (bet < 100) {
            bet += 5;
            $("#minBet").html("$" + bet);
        }
    })
    $("#chipD").on("click", function (event) {
        if (bet >= 15) {
            bet -= 5;
            $("#minBet").html("$" + bet);
        }
    })
});

