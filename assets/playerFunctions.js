$(document).ready(function () {
    $("#betting").hide();
    $("#placeBet").hide();
    $("#betLimit").hide();
    $("#bank").hide();
    $(".playerCards").hide();
    $(".actions").hide();
    $("#howTo").append("Click the Play Button to get Started");
    var bet = 10;
});
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
var bet = 10;

getDeck();
// ajax call for new deck


// creates a new, shuffled deck to play this game with
function getDeck() {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        method: "GET"
    }).then(function (newDeck) {
        // console.log(newDeck);
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
        // console.log(drawnCard);
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


function showPlayerCards(card1, card2) {
    var pcard1 = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/" + card1 + ".png");
    pcard1.attr("class", "playerCard")
    var pcard2 = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/" + card2 + ".png");
    pcard2.attr("class", "playerCard")

    $(".playerCards").prepend(pcard1, pcard2);
    $(".playerCards").show();
};


function showDealerCards(card1) {
    var dcard1 = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/" + card1 + ".png");
    dcard1.attr("class", "dealerCard")
    var dcard2 = $("<img>").attr('src', "assets/images/cardback.jpeg");
    dcard2.attr("id", "facedown");
    dcard2.attr("class", "dealerCard");

    $(".dealerCards").prepend(dcard1, dcard2);
    $(".dealerCards").show();
};
// function showDealerCards(card1, card2) {
//     var dcard1 = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/"+card1+".png");
//     dcard1
// }



function firstDeal() {
    // puts cards in players hand
    playerHand.push(cardName[0]);
    playerHand.push(cardName[2]);
    // puts cards in dealers hand
    dealerHand.push(cardName[1]);
    dealerHand.push(cardName[3]);
    // logs both arrays
    // console.log(playerHand);
    // console.log(dealerHand);
    showPlayerCards(playerHand[0], playerHand[1]);
    showDealerCards(dealerHand[0]);
    console.log(dealerHand[0]);
    initPlayerCards(player[0], playerHand[0].trim(), playerHand[1].trim());
};

// assign card to initial users hand
function initPlayerCards(hand, card1, card2) {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/pile/" + hand + "/add/?cards=" + card1 + "," + card2,
        method: "GET"
    }).then(function (cardDealt) {
        // console.log(cardDealt);
        initDealerCards(player[1], dealerHand[0].trim(), dealerHand[1].trim());

    })
};
// assign cards to initial dealers hand
function initDealerCards(hand, card1, card2) {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/pile/" + hand + "/add/?cards=" + card1 + "," + card2,
        method: "GET"
    }).then(function (cardDealt) {
        // console.log(cardDealt);
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

        // console.log(curScore);
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

function hitCards() {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/draw/?count=1",
        method: "GET"
    }).then(function (hitCard) {
        var hitCard1 = hitCard.cards[0].code;
        playerHand.push(hitCard1);
        // console.log(hitCard1)

        var phitCard = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/" + hitCard1 + ".png")
        phitCard.attr("class", "playerCard")

        $(".playerCards").append(phitCard);
        getPlayerScore("player")

    });
}

function dealerHit() {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/draw/?count=1",
        method: "GET"
    }).then(function (dealhitCard) {
        var hitCard2 = dealhitCard.cards[0].code;
        dealerHand.push(hitCard2);
        // console.log(hitCard1)

        var dhitCard = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/" + hitCard2 + ".png");
        dhitCard.attr("class", "dealerCard");

        $(".dealerCards").append(dhitCard);
        getPlayerScore("dealer");
        if (dealerScore > 21) {
            dealerBust();
        }
        else {
            compareScores();
        }
    })
};


//display score to player --> or at least show cards.
// users bet is placed

//append buttons to player interface div

//draw a card
//get value and image from card
//append the info to cardDiv
//append the new card to player hand

function dealerBust() {
    $("#betting").show();
    $(".playerCards").hide();
    $(".actions").hide();
    // need to change this to an html popup
    alert("You Win!");
    thisDeck = "";
    cardName = [];
    playerHand = [];
    playerCards = [];
    dealerHand = [];
    dealerCards = [];
    // user arrives at landing page
    // user click start button
    playerScore = 0;
    dealerScore = 0;
    playerBet;
    bet = 10;
};





function playerStay() {
    getPlayerScore("player");
};
// dealer hits if under 17
function dealerPlay() {
    getPlayerScore("dealer");
    console.log(dealerScore);
    if (dealerScore < 17) {
        dealerHit();
    }
    else {
        compareScores();
    }
};
// score are compared and a winner is chosen.
function compareScores() {
    getPlayerScore("player");
    getPlayerScore("dealer");

    if (playerScore > dealerScore){
        playerBank = (bet + (bet * 1.5));
        console.log(playerBank);
        dealerBust();
    }
    else {
        playerBank = playerBank - bet;
        console.log(playerBank);
        dealerBust();
    }


};
// reset and do it asgain

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






