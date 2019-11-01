var thisDeck = "";
var cardName = [];
var player = ["player", "dealer"]
var playerHand = [];
var playerCards = [];
var dealerHand = [];
var dealerCards = [];
// user arrives at landing page
// user click start button
var playerScore = 0;
var dealerScore = 0;
var playerBank = 100;
var playerBet;
var bet = 0;

getDeck();
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
function drawCards(cardCount) {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/draw/?count=" + cardCount,
        method: "GET"
    }).then(function (drawnCard) {
        console.log(drawnCard);
        // grabs card code so that card can be assigned to proper hand
        for (var i = 0; i < cardCount; i++) {
            cardName.push(drawnCard.cards[i].code);
        }
        playerCards.push(drawnCard.cards[0].value);
        playerCards.push(drawnCard.cards[2].value);
        dealerCards.push(drawnCard.cards[1].value);
        dealerCards.push(drawnCard.cards[3].value);
        firstDeal();
    })

};

function firstDeal() {
    // puts cards in players hand
    playerHand.push(cardName[0]);
    playerHand.push(cardName[2]);
    // puts cards in dealers hand
    dealerHand.push(cardName[1]);
    dealerHand.push(cardName[3]);
    // logs both arrays
    console.log(playerHand);
    console.log(dealerHand);

    initPlayerCards(player[0], playerHand[0].trim(), playerHand[1].trim());
};

// assign card to initial users hand
function initPlayerCards(hand, card1, card2) {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/pile/" + hand + "/add/?cards=" + card1 + "," + card2,
        method: "GET"
    }).then(function (cardDealt) {
        console.log(cardDealt);
        initDealerCards(player[1], dealerHand[0].trim(), dealerHand[1].trim());

    })
};
// assign cards to initial dealers hand
function initDealerCards(hand, card1, card2) {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/pile/" + hand + "/add/?cards=" + card1 + "," + card2,
        method: "GET"
    }).then(function (cardDealt) {
        console.log(cardDealt);
        getPlayerScore("player");
    })
};
// one more time
//score players hand
function getPlayerScore(hand) {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/pile/" + hand + "/list/",
        method: "GET"
    }).then(function (curHand) {
        // keeps track of the current score of the hand
        var curScore = 0;
        // determines if scoring players or dealers hand
        if (hand === "player") {
            var playHand = curHand.piles.player.cards;
        } else {
            var playHand = curHand.piles.dealer.cards;
        }
        //loops through cards and adds their values together
        for (var i = 0; i < playHand.length; i++) {
            var cardScore = playerCards[i].trim();
            // determines facecard
            if (cardScore === "JACK" || cardScore === "QUEEN" || cardScore === "KING") {
                cardScore = 10;
                curScore = parseInt(curScore) += parseInt(cardScore);
            }
            //determines ace, and ace value, mostly for an added card (hit)
            else if (cardScore === "ACE") {
                if (playerScore <= 10) {
                    cardScore = 11;
                    curScore = parseInt(curScore) + parseInt(cardScore);
                } else {
                    cardScore = 1;
                    curScore = parseInt(curScore) + parseInt(cardScore);
                }
            // determines numbered card
            } else {
                curScore = parseInt(curScore) + parseInt(cardScore);
            };
        }
        // assigns score to appropriate hand
        whosHand(hand, curScore);
       

    });

};

// funstion to determine hand scored
function whosHand(hand, curScore) {
    // determines players hand
    if (hand === "player") {
        // adds score to reflect card(s) value
        playerScore = parseInt(playerScore) + parseInt(curScore);
        console.log(playerScore);
    }
    //determines dealers hand
    if (hand === "dealer") {
        // adds score to reflect card(s) value
        dealerScore = parseInt(dealerScore) + parseInt(curScore);
        console.log(dealerScore);
    }
    
};

function splitPair() {

};

function insuranceCheck() {

};

function insuranceBet() {

};

//display score to player --> or at least show cards.
// users bet is placed
function placeBet() {
    playerBet = prompt("What's your bet??");
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
        drawCard(player[0]);
        getScore(player[1]);
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

function playerStay() {

};
// dealer hits if under 17
function dealerPlay() {

};
// score are compared and a winner is chosen.
function chooseWinner() {

};
// reset and do it asgain

$("#placeBet").on("click", function () {
    //draw cards for setup
    drawCards(4);
    // function also sets hands
    // check score for hand


});

$("#hit").on("click", function (event) {
    event.preventDefault();
    drawCard(player[0]);
        getScore(player[1]);
        if (playerScore > 21) {
            alert("Bust! House wins " + playerBet);
            playerBank = playerBank - playberBet;
            confirm("Keep playing?");
        }
    });




