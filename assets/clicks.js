$("#placeBet").on("click", function () {
    //draw cards for setup
    var audio = new Audio('assets/shuffle.wav');
    audio.play();
    drawCards(4);
    // function also sets hands
    // check score for hand
    $("#betting").hide();
    $("#howTo").hide();
    $("#banner").hide();

    $(".actions").show();
    $("#bank").html($("#minBet"))



});

$("#hit").on("click", function () {
    hitCards();
});

$("#stand").on("click", function () {
    dealerPlay();
    playerStay();
});

$("#play").on("click", function () {
    $("#betting").show();
    $("#placeBet").show();
    $("#betLimit").show();
    $("#bank").show();
    $("#play").hide();
    $("#howTo").html("Use the chips to increase or decrease your bet, then click the 'place bet' button to start the round")

});

$("#chipI").on("click", function (event) {
    if (bet < 100) {
        bet += 5;
        $("#minBet").html("$" + bet);
    }
});
$("#chipD").on("click", function (event) {
    if (bet >= 15) {
        bet -= 5;
        $("#minBet").html("$" + bet);
    };
});
