// Shuffle new deck
var deckId = "";
var players = ["player1", "dealer"];
var playerHand = players[0];
var dealerHand = players[1];
var roundsDealt = 0;

function initialHand() {

    var drawCardsurl = "https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=" + ((players.length) * 2);

    $.ajax({
        url: drawCardsurl,
        method: "GET"
    }).then(function (draw) {
        var firstDeal = (draw.cards);
        // playerPile = 
        console.log(firstDeal);


        // get cards loop:
        // for (i = 0; i < firstDeal.length; i++) {
        var pCard1 = (firstDeal[0].code);
        var pCard2 = (firstDeal[2].code);
        var dCard1 = (firstDeal[1].code);
        var dCard2 = (firstDeal[3].code);

        console.log(pCard1);
        console.log(pCard2);
        console.log(dCard1);
        console.log(dCard2);
        // addCards(pCard1, pCard2 , dCard1 , dCard2);

        var pilePlayerURL = "https://deckofcardsapi.com/api/deck/" + deckId + "/pile/" + playerHand + "/add/?cards=" + pCard1 + "," + pCard2;
        var pileDealerURL = "https://deckofcardsapi.com/api/deck/" + deckId + "/pile/" + dealerHand + "/add/?cards=" + dCard1 + "," + dCard2;

        $.ajax({
            url: pilePlayerURL,
            method: "GET"
        }).then(function (pHand) {
            console.log(pHand);
            // playerHand = pHand;
        });

        $.ajax({
            url: pileDealerURL,
            method: "GET"
        }).then(function (dHand) {
            console.log(dHand);
            // dealerHand = dHand;
        });
        // console.log(numPlayers);
        // dealCards(curCard);
        // };
    });
};

function addHit(){
    var playerhitURL = "https://deckofcardsapi.com/api/deck/" + deckId + "/pile/" + playerHand + "/add/?cards="+hitCard;
    $.ajax({
        url: playerhitURL,
        method: "GET"
    }).then(function (hitt) {
        // console.log(hitt);
    //    console.log(playerHand)
    });
}

//
$("#go").on("click", function (event) {
    event.preventDefault();

    // Here we construct our URL
    var shuffleDeck = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

    $.ajax({
        url: shuffleDeck,
        method: "GET"
    }).then(function (response) {
        deckId = response.deck_id;

        initialHand();
    });

});

$("#show").on("click", function (event) {
    event.preventDefault();

    var playHandurl = "https://deckofcardsapi.com/api/deck/" + deckId + "/pile/" + playerHand + "/list/"
    var dealHandURL = "https://deckofcardsapi.com/api/deck/" + deckId + "/pile/" + dealerHand + "/list/"
    $.ajax({
        url: playHandurl,
        method: "GET"
    }).then(function (hand) {
        console.log(hand);
    });

    $.ajax({
        url: dealHandURL,
        method: "GET"
    }).then(function (dealhand) {
        // console.log(dealhand);
    });
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




// function dealHand(players) {
//     // ajax to pull next player.length * 2 cards from the deck\
//     // loop to give cards to players
//     // 1 - to player
//     giveCardToPlayer(players[0]);
//     // 2 - to dealer
//     giveCardToPlayer(players[1]);
// }


// function startGame() {
//     dealHand(players);
// }






// add cards to piles
// https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S


// shuffle deck
// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/


// list cards in piles
// https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/list
