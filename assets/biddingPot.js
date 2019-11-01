
var playerPot = 100;
var playerBet;
var houseBank = 10000;
var playerHand;
var dealerHand;

function balancePlayerPot() {
    if (playerHand > dealerHand && playerHand <= 21) {
        playerPot = playerPot + (playerBet * 6);
    } else {
        playerPot = playerPot - playerBet;
    };
    if (playerHand > 21) {
        playerPot = playerPot - playerBet;
    }
}