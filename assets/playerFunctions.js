$(document).ready(function () {
    $("#betting").hide();
    $("#placeBet").hide();
    $("#betLimit").hide();
    $("#bank").hide();
    $(".playerCards").hide();
    $(".actions").hide();
    $("#howTo").append("Click the Play Button to get Started");
    
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
            var thisScore = playerScore;
        } else {
            var playHand = curHand.piles.dealer.cards;
            var thisScore = dealerScore;
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
                if (thisScore <= 10) {
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
        if (thisScore > 21) {
            alert(""+ hand + " bust");
            setNewRound();
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


//display score to player --> or at least show cards.
// users bet is placed

//append buttons to player interface div

//draw a card
//get value and image from card
//append the info to cardDiv
//append the new card to player hand

function setNewRound() {
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







