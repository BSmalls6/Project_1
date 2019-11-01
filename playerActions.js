// All of the variables we need to create the deck
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

    $("#hit").on("click", function (event) {
        event.preventDefault();
        var hitURL = "https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1";
    
        $.ajax({
            url: hitURL,
            method: "GET"
        }).then(function (hit) {
            console.log(hit.cards[0].code);
            hitCard = hit.cards[0].code
            addHit(hitCard);
        });
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

