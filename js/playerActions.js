$(document).ready(function () {
    $("#betting").hide();
    $(".playerCards").hide();
    $(".actions").hide();
    $("#howTo").append("Click the Play Button to get Started")
});

$("#play").on("click", function () {
    $("#betting").show();
    $("#play").hide();
    $("#howTo").html("Use the chips to increase or decrease your bet, then click the 'place bet' button to start the round")

});

$("#placeBet").on("click", function (event) {
//    
   
    $("#betting").hide();
    $("#howTo").hide();
    var pcard1 = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/2H.png")
    pcard1.attr("class", "playerCard")
    var pcard2 = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/2C.png")
    pcard2.attr("class", "playerCard")

    $(".playerCards").prepend(pcard1, pcard2);
    $(".playerCards").show();
    $(".actions").show();

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






// var pcard1 = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/2H.png")
//     pcard1.attr("class" , "playerCard")
//     var pcard2 = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/2C.png")
//     pcard2.attr("class" , "playerCard")

// $(".playerCards").prepend(pcard1 , pcard2);
