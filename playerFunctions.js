var playerScore = 0;
var dealerScore = 0;
var thisDeck = "";



// ajax call for new deck

// creates a new, shuffled deck to play this game with
function getDeck() {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        method: "GET"
    }).then(function (newDeck) {
        // defines deck ID for the game to refference
        thisDeck = newDeck.deck_id;

        for (var i = 0; i < 1; i++) {
            drawCard("player");
            drawCard("dealer");
        };
        getScore("player");
    })

};
//draw a card for player
function drawCard() {
    console.log(thisDeck)
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/draw/?count=1",
        method: "GET"
    }).then(function (drawnCard) {
        // grabs card code so that card can be assigned to proper hand
        var cardName = drawnCard.code;
        giveCard(cardName, hand);
    })

};

//assign card to user or dealers hand
function giveCard(cardName, hand) {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/pile/" + hand + "/add/?cards=" + cardName,
        method: "GET"
    }).then(function (cardDealt) {
        console.log(cardDealt);

    })
};
    // draw card for dealer -->drawCard()
    // assign card to dealer -->giuveCard()
    //one more time
    //score players hand
    function getScore(hand) {
        $.ajax({
            url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/pile/" + hand + "/list/",
            method: "GET"
        }).then(function (curHand) {
            var playerHand = curHand.piles.player.cards;
            for (var i = 0; i < playerHand.length; i++) {
                var curScore = 0;
                var cardScore = playerHand[i];
                if (cardScore === "JACK" || cardScore === "QUEEN" || cardScore === "KING") {
                    cardScore = 10;
                    curScore = curScore + cardScore;
                } else if (cardScoire === "ACE") {
                    cardScore = 11;
                    curScore = curScore + cardScore;
                } else {
                    curScore = curScore + cardScore;
                }
                if (hand === "player") {
                    playerScore = playerScore + cardScore;
                }
                if (hand === "dealer") {
                    dealerScore = dealerScore + cardScore;
                }
            }

        })

    };

    $("#play").on("click", function () {
        getDeck();
        
    
    });
    //display score to player --> or at least show cards.
    // users bet is placed
    // function placeBet() {


    // };
    // // user chooses hit or stay
    // function playerHit() {
    //     var cardDiv = $("<div class-'playerCard'");
    //     //draw a card
    //     //get value and image from card
    //     //append the info to cardDiv
    //     //append the new card to player hand


    // };

    // function playerStay() {

    // };
    // // dealer hits if under 17
    // function dealerPlay() {

    // };
    // // score are compared and a winner is chosen.
    // function chooseWinner() {

    // };
// reset and do it asgain