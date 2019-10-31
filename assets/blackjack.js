//global variables
var deck = [2,3,4,5,6,7,8,9,10,10,10,10,11,
            2,3,4,5,6,7,8,9,10,10,10,10,11,
            2,3,4,5,6,7,8,9,10,10,10,10,11,
            2,3,4,5,6,7,8,9,10,10,10,10,11]
var playerHand = [];
var dealerHand = [];

// console.log(deck[0], deck[51]);
// console.log("Welcome to the casino");
//------------------------------------------------------------------------
function drawRandomCard(deck){
    var randomIndex = Math.floor(deck.length * Math.random());
    return deck[randomIndex];
}
//console.log(drawRandomCard(deck));
//------------------------------------------------------------------------
function start(){
    $("#start").click(function(){

    console.log("Give dealer 2 cards");
    })
//assign 2 cards each for dealer and player
playerHand = [drawRandomCard(deck), drawRandomCard(deck)];
dealerHand = [drawRandomCard(deck), drawRandomCard(deck)];
}
//------------------------------------------------------------------------
function getHandValue(hand){
    var sum = 0;
    for(var i = 0; i < hand.length; i++){
        sum += hand[i];
    }
    return sum;
}
start();
//------------------------------------------------------------------------
function stay(){
    $("#stay").click(function(){
    if(getHandValue(dealerHand) = 17){
        console.log("Dealer hand: " + getHandValue(dealerHand));
        //if player chose to stay, move to dealer turn
        //if player chose to hit, call hitMe function
      }
    }); 
}
//------------------------------------------------------------------------
var currentPlayerHand = 0;
var currentDealerHand = 0;

function hitMe(){
    // playerHand.push(drawRandomCard(deck));
    // console.log("New Player Hand: " + playerHand);
    // if(getHandValue(playerHand) > 21){
    //     //playerHand = [drawRandomCard(deck), drawRandomCard(deck)];
    //     document.getElementById("game-status").innerHTML = "Player Hand : BUSTED!";
    // }else{
    //     dealerHand.push(drawRandomCard(deck));
    //     if(getHandValue(playerHand) > 21){
    //         //playerHand = [drawRandomCard(deck), drawRandomCard(deck)];
    //         document.getElementById("game-status").innerHTML = "Dealer Hand : BUSTED!";
    //     }
    // }

    //dealer hit
    check();
    console.log("Dealer Hand: " + dealerHand + "; Dealer Hand Value: " + getHandValue(dealerHand));
    dealerHand.push(drawRandomCard(deck));
    console.log("Dealer Hand: " + dealerHand + "; Dealer Hand Value: " + getHandValue(dealerHand));
    check();
}
document.getElementById("dealer-hand").innerHTML = ("<h4>Dealer Hand: </h4>"  + dealerHand);
document.getElementById("dealer-hand-value").innerHTML = ("<h6>Dealer Hand Value: </h6>"  + getHandValue(dealerHand));
//-----------------------------------------------------------------------------------------------------------------
function check(){
    if(getHandValue(dealerHand) >= 17){
        console.log("Dealer Hand: " + getHandValue(dealerHand) + " Stay!");
        stay();
        console.log("New game!")
        start();//new game
    }else if(getHandValue(dealerHand) > 21){
        document.getElementById('status').innerHTML = 'Dealer: ' + dealerHand + ' <b>Busted! => Dealer lost!</b>'
        document.getElementById("dealer-hand-value").innerHTML = ("<h6>Dealer Hand Value : </h6>"  + getHandValue(dealerHand));
    end();
    }
};
//-----------------------------------------------------------------------------------------------------------------
function end(){
    var winner = -1;
    var score = 0;

    if(getHandValue(dealerHand) > 21){
        console.log("Dealer Busted!");
        console.log("New Game!");
        start();//start new game
    }
}
