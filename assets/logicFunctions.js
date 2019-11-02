// creates a new, shuffled deck to play this game with
function getDeck() {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        method: "GET"
    }).then(function (newDeck) {
        console.log("Game Deck");
        console.log("------------------");
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
        console.log("4 cards drawn");
        console.log("------------------");
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

function firstDeal() {
    // puts cards in players hand
    playerHand.push(cardName[0]);
    playerHand.push(cardName[2]);
    // puts cards in dealers hand
    dealerHand.push(cardName[1]);
    dealerHand.push(cardName[3]);
    // logs both arrays
    console.log("Player Hand");
    console.log("------------------");
    console.log(playerHand);
    console.log("Dealer Hand");
    console.log("------------------");
    console.log(dealerHand);
    // displays player cards to user, both face up
    showPlayerCards(playerHand[0], playerHand[1]);
    // displays dealer cards to user, one face down
    showDealerCards(dealerHand[0]);
    console.log("dealer card shown");
    console.log("------------------");
    console.log(dealerHand[0]);
    initPlayerCards(player[0], playerHand[0].trim(), playerHand[1].trim());
};

// assign card to initial users hand
function initPlayerCards(hand, card1, card2) {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/pile/" + hand + "/add/?cards=" + card1 + "," + card2,
        method: "GET"
    }).then(function (cardDealt) {
        console.log("player cards added to hand on API");
        console.log("------------------");
        console.log(cardDealt);
        initDealerCards(player[1], dealerHand[0](), dealerHand[1]());

    })
};

// assign cards to initial dealers hand
function initDealerCards(hand, card1, card2) {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/pile/" + hand + "/add/?cards=" + card1 + "," + card2,
        method: "GET"
    }).then(function (cardDealt) {
        console.log("dealer cards added to hand on API");
        console.log("------------------");
        console.log(cardDealt);
        getPlayerScore("player");
    })
};

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
            setNewRound();
        }
        else {
            compareScores();
        }
    })
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