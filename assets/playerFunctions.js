var thisDeck = "";
var cardName = [];
var player = ["player", "dealer"]
var playerHand = [];
var playerCards = [];
var dealerHand = [];
var dealerCards = [];
var playerScore = 0;
var dealerScore = 0;
var playerBank = 100;
var playerBet;
var bet = 10;

//score players hand
function getPlayerScore(hand) {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/pile/" + hand + "/list/",
        method: "GET"
    }).then(function (curHand) {
        console.log("hand being scored");
        console.log("--------------------");
        console.log(curHand);
        // keeps track of the current score of the hand
        var thisScore;
        var curScore = 0;
        // determines if scoring players or dealers hand
        if (hand === "player") {
            var playHand = curHand.piles.player.cards;
            thisScore = playerScore;
            var cardScore = curHand.piles.player.cards;
        } else {
            var playHand = curHand.piles.dealer.cards;
            thisScore = dealerScore;
            var cardScore = curHand.piles.dealer.cards;
        }
        //loops through cards and adds their values together
        for (var i = 0; i < playHand.length; i++) {
            var thisCardScore = cardScore[i].value;
            // determines facecard
            if ( thisCardScore === "JACK" || thisCardScore === "QUEEN" || thisCardScore === "KING") {
                thisCardScore = 10;
                curScore = parseInt(curScore) + parseInt(thisCardScore);
            }
            //determines ace, and ace value, mostly for an added card (hit)
            else if (thisCardScore === "ACE") {
                if (thisScore <= 10) {
                    thisCardScore = 11;
                    curScore = parseInt(curScore) + parseInt(thisCardScore);
                } else {
                    thisCardScore = 1;
                    curScore = parseInt(curScore) + parseInt(thisCardScore);
                }
                // determines numbered card
            } else {
                curScore = parseInt(curScore) + parseInt(thisCardScore);
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
        playerScore = 0;
        playerScore = parseInt(playerScore) + parseInt(curScore);
        console.log(playerScore);
    }
    //determines dealers hand
    if (hand === "dealer") {
        // adds score to reflect card(s) value
        dealerScore = 0;
        dealerScore = parseInt(dealerScore) + parseInt(curScore);
        console.log(dealerScore);
    } else if (hand === "dealer" && curScore < 17) {
        dealerHit();
    }
    

};

function FlipDealerCard(card) {
    $("#facedown").attr('src', "https://deckofcardsapi.com/static/img/" + card + ".png")
}

function hitCards() {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/draw/?count=1",
        method: "GET"
    }).then(function (hitCard) {
        var addPlayerCard = hitCard.cards[0].code;
        playerHand.push(addPlayerCard);
        console.log("player card added to hand");
        console.log("-------------------");
        console.log(addPlayerCard);

        var phitCard = $("<img>").attr('src', "https://deckofcardsapi.com/static/img/" + addPlayerCard + ".png");
        phitCard.attr("class", "playerCard");

        $(".playerCards").append(phitCard);
        addHit("player", addPlayerCard);
        getPlayerScore("player");

    });
}

function setNewRound() {
    $("#play").show();
    $(".dealerCards").hide();
    $(".dealerCards").empty();
    $(".playerCards").hide();
    $(".playerCards").empty();
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

// score are compared and a winner is chosen.
function compareScores() {
    getPlayerScore("player");
    getPlayerScore("dealer");


    if (playerScore > 21) {
        $("#alert").append("Player Bust, You Loose!");
        playerBank = playerBank - bet;
        console.log("Player Bank after loss");
        console.log("--------------------");
        console.log(playerBank);
    }
    if (dealerScore > 21) {
        $("#alert").append("Dealer Bust, You Win!");
        playerBank = (bet + (bet * 1.5));
        console.log(playerBank);
       setNewRound();
    }
    else {
        playerBank = playerBank - bet;
        console.log(playerBank);
        setNewRound();
    }

};





