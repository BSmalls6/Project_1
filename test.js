// Shuffle new deck
var deckId = "";
var playerHand = "";
var dealerHand = ""
var players = ["player", "dealer"];
$("#go").on("click", function (event) {
    event.preventDefault();

    // Here we construct our URL
    var shuffleDeck = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

    // Ajax call for current weather
    $.ajax({
        url: shuffleDeck,
        method: "GET"
    }).then(function (response) {
        deckId = response.deck_id;

        initialHand();
    });
    function initialHand() {

        var drawCardsurl = "https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=" + ((players.length) * 2);

        $.ajax({
            url: drawCardsurl,
            method: "GET"
        }).then(function (draw) {
            var firstDeal = (draw.cards);
            // playerPile = 
            // console.log(firstDeal.length);


            // get cards loop:
            for (i = 0; i < firstDeal.length; i++) {
                var curCard = firstDeal[i];
                var numPlayers = players.length;
                var roundsDealt = 0;
                // console.log(curCard);
                // console.log(numPlayers);
                dealCards();

            };
            function dealCards() {
                while (roundsDealt < 1) {
                    for (var j = 0; j < numPlayers; j++) {
                        var curPlayer = numPlayers[j];
                        // giveCardToPlayer(curPlayer, curCard);
                        console.log(curPlayer);
                        console.log(curCard);
                        addCards();
                        roundsDealt++;

                    }
                }
            };

            function addCards(curPlayer, curCard) {
                console.log(curPlayer, curCard);
                var pileAddURL = "https://deckofcardsapi.com/api/deck/" + deckId + "/pile/" + curPlayer + "/add/?cards=" + curCard;
                // var playerHand = curPlayer;
                // var dealerHand = "";

                $.ajax({
                    url: pileAddURL,
                    method: "GET"
                }).then(function (deal) {
                    console.log(deal);

                });

            };
        });


    };
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
