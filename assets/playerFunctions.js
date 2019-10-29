// user arrives at landing page
// user click start button
// ajax call for new deck
var thisDeck;
// creates a new, shuffled deck to play this game with
function getDeck(){
    $.ajax ({
        url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        method: "GET"
    }).then(function(newDeck){
        // defines deck ID for the game to refference
        thisDeck = newDeck.deck_id;
    })

};
//draw a card for player
function drawCard(hand){
    $.ajax ({
        url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/draw/?count=1",
        method: "GET"
    }).then(function(drawnCard) {
        // grabs card code so that card can be assigned to proper hand
        var cardName = drawnCard.code; 
        giveCard(cardName, hand);
    })

};

function drawDealerCard(){

}
//assign card to users hadn
function giveCard(cardName, hand){
$.ajax({
    url: "https://deckofcardsapi.com/api/deck/<" + thisDeck + "/pile/" + hand + "/add/?cards=" + cardName,
    method: "GET"
}).then(function() {

});
// draw card for dealer -->drawCard()
// assign card to dealer -->giuveCard()
//one more time
//score players hand
function getScore() {

};
//display score to player --> or at least show cards.
// users bet is placed
function placeBet(){

}
// user chooses hit or stay
function playerHit() {
    var cardDiv = $("<div class-'playerCard'");
    //draw a card
    //get value and image from card
    //append the info to cardDiv
    //append the new card to player hand
   

};

function playerStay() {

}
// dealer hits if under 17
function dealerPlay() {

}
// score are compared and a winner is chosen.
function chooseWinner() {

}
// reset and do it asgain


