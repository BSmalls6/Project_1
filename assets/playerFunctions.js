var thisDeck = "";
var cardName;
getDeck();
// user arrives at landing page
// user click start button
var playerScore = 0;
var dealerScore = 0;
var playerBank = 100;
var playerBet;
var bet = 0;
// ajax call for new deck


// creates a new, shuffled deck to play this game with
function getDeck() {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        method: "GET"
    }).then(function (newDeck) {
        console.log(newDeck);
        // defines deck ID for the game to refference
        thisDeck = newDeck.deck_id;
    })

};
//draw a card for player
function drawCard() {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/draw/?count=1",
        method: "GET"
    }).then(function (drawnCard) {
        console.log(drawnCard);
        // grabs card code so that card can be assigned to proper hand
        cardName = drawnCard.code;
    })

};

//assign card to user or dealers hand
function giveCard(cardName, hand) {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/<" + thisDeck + "/pile/" + hand + "/add/?cards=" + cardName,
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
            }
            else if (cardScore === "ACE") {
                if (playerScore <= 10) {
                    cardScore = 11;
                    curScore = curScore + cardScore;
                } else {
                    cardScore = 1;
                    curScore = curScore + cardScore;
                }
            } else {
                curScore = curScore + cardScore;
            };
            whosHand(hand);

        }

    });

};
//display score to player --> or at least show cards.
// users bet is placed
function placeBet() {
    playerBet = prompt("Whats your bet??");
    if (playerBet > playerBank) {
        alert("You don't have enough money. Please place a lower bet.");
    }
};
// user chooses hit or stay
function playerHit() {
    var hitBtn = $("<a id='hit' class='waves-effect waves-light btn'>Hit!</a>");
    var stayBtn = $("<a id='stay' class='waves-effect waves-light btn'>Stay</a>");
    //append buttons to player interface div
    $("#hit").on("click", function () {
        drawCard("player");
        getScore("player");
        if (playerScore > 21) {
            alert("Bust! House wins " + playerBet);
            playerBank = playerBank - playberBet;
            confirm("Keep playing?");
        }
    })
    //draw a card
    //get value and image from card
    //append the info to cardDiv
    //append the new card to player hand


};

function whosHand(hand) {
    if (hand === "player") {
        playerScore = playerScore + cardScore;
    }
    if (hand === "dealer") {
        dealerScore = dealerScore + cardScore;
    }
};

function playerStay() {

};
// dealer hits if under 17
function dealerPlay() {

};
// score are compared and a winner is chosen.
function chooseWinner() {

};
// reset and do it asgain

$("#startBtn").on("click", function () {
    drawCard("player");
    giveCard(cardName, "player");
    drawCard("dealer");
    giveCard(cardName, "dealer");
    drawCard("player");
    giveCard(cardName, "player");
    drawCard("dealer");
    giveCard(cardName, "dealer");
    getScore("player");
    placeBet();

});



