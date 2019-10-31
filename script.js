// All of the variables we need to create the deck
// deck id
var deckId = "";
// array of players
var players = ["player1", "dealer"];
// the player
var player = players[0];
// the dealer
var dealer = players[1];
// number of rounds dealt.  this isn't relevant for the current build
var roundsDealt = 0;

// The player cards
var pCard1;
var pCard2;
var dCard1;
var dCard2;

// Players hand
var playerHand;
// Dealers hand
var dealerHand;

// This funtion creates the deck, shuffles the cards annd sets each card to a certain variable
function initialHand() {
    // draws a # of cards based on the amount of players
    var drawCardsurl = "https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=" + ((players.length) * 2);

    $.ajax({
        url: drawCardsurl,
        method: "GET"
    }).then(function (draw) {
        var firstDeal = (draw.cards);
        // playerPile = 
        console.log(firstDeal);

        // player cards id's
        var pCard1 = (firstDeal[0].code);
        var pCard2 = (firstDeal[2].code);
        // dealer cards id's
        var dCard1 = (firstDeal[1].code);
        var dCard2 = (firstDeal[3].code);
    });

    function dealCards(pCard1 , pCard2 , dCard1 ,dCard2 ) {

        var pilePlayerURL = "https://deckofcardsapi.com/api/deck/" + deckId + "/pile/" + player + "/add/?cards=" + pCard1 + "," + pCard2;
        var pileDealerURL = "https://deckofcardsapi.com/api/deck/" + deckId + "/pile/" + dealer + "/add/?cards=" + dCard1 + "," + dCard2;

        $.ajax({
            url: pilePlayerURL,
            method: "GET"
        }).then(function (pHand) {
            var playerH = pHand;
            // playerHand = pHand;
        });

        $.ajax({
            url: pileDealerURL,
            method: "GET"
        }).then(function (dHand) {
            var dealH = dHand;
            // dealerHand = dHand;
        });

    };

    function addHit() {
        var playerhitURL = "https://deckofcardsapi.com/api/deck/" + deckId + "/pile/" + playerHand + "/add/?cards=" + hitCard;
        $.ajax({
            url: playerhitURL,
            method: "GET"
        }).then(function (hitt) {
            // console.log(hitt);
            //    console.log(playerHand)
        });
    }

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
        event.preventDefault();

        // Here we construct our URL
        var shuffleDeck = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    
        $.ajax({
            url: shuffleDeck,
            method: "GET"
        }).then(function (response) {
            deckId = response.deck_id;
    
            initialHand();
            dealCards ();
        });
       
       
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



// var pcard1 = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/2H.png")
//     pcard1.attr("class" , "playerCard")
//     var pcard2 = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/2C.png")
//     pcard2.attr("class" , "playerCard")

// $(".playerCards").prepend(pcard1 , pcard2);

