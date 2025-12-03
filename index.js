/// Player 1
let player = { name: "Player", chips: 200 }
let cards = [], sum = 0, hasBlackJack = false, isAlive = false, message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips

/// Player 2
let player2 = { name: "Player 2", chips: 200 }
let cards2 = [], sum2 = 0, hasBlackJack2 = false, isAlive2 = false, message2 = ""
let messageElm = document.getElementById("message-elm")
let sumElm2 = document.getElementById("sum-elm2") || document.getElementById("sum-elm")
let cardsElm2 = document.getElementById("cards-el2") || document.getElementById("cards-elm")
let playerElm = document.getElementById("player-elm")
playerElm.textContent = player2.name + ": $" + player2.chips

/// Winner message
let messageEl3 = document.getElementById("message-el3")

/// Random card function
function getRandomCard() {
    let num = Math.floor(Math.random() * 13) + 1
    return (num === 1) ? 11 : (num > 10 ? 10 : num)
}
function getRandomCard2() { return getRandomCard() }

/// Start Player 1
function startGame() {
    isAlive = true
    cards = [getRandomCard(), getRandomCard()]
    sum = cards[0] + cards[1]
    renderGame()
}

/// Render Player 1
function renderGame() {
    cardsEl.textContent = "Cards: " + cards.join(" ")
    sumEl.textContent = "Sum: " + sum
    if (sum < 21) message = "Do you want to draw a new card?"
    else if (sum === 21) { message = "Blackjack! Player 1 wins!"; hasBlackJack = true; isAlive = false; finalizeGame() }
    else { message = "Player 1 is out!"; isAlive = false; finalizeGame() }
    messageEl.textContent = message
}

/// Player 1 new card
function newCard() { if(isAlive && !hasBlackJack){ let card=getRandomCard(); sum+=card; cards.push(card); renderGame() } }

/// Player 1 stand
function standCard() { if(isAlive){ message=`Player 1 stands with ${sum} points.`; isAlive=false; finalizeGame() } messageEl.textContent = message }

/// Start Player 2
function startGames() {
    isAlive2 = true
    cards2 = [getRandomCard2(), getRandomCard2()]
    sum2 = cards2[0] + cards2[1]
    renderGame2()
}

/// Render Player 2
function renderGame2() {
    cardsElm2.textContent = "Cards: " + cards2.join(" ")
    sumElm2.textContent = "Sum: " + sum2
    if (sum2 < 21) message2 = "Do you want to draw a new card?"
    else if (sum2 === 21) { message2 = "Blackjack! Player 2 wins!"; hasBlackJack2 = true; isAlive2=false; finalizeGame() }
    else { message2 = "Player 2 is out!"; isAlive2=false; finalizeGame() }
    messageElm.textContent = message2
}

/// Player 2 new card
function newCards() { if(isAlive2 && !hasBlackJack2){ let card=getRandomCard2(); sum2+=card; cards2.push(card); renderGame2() } }

/// Player 2 stand
function standCards() { if(isAlive2){ message2=`Player 2 stands with ${sum2} points.`; isAlive2=false; finalizeGame() } messageElm.textContent = message2 }

/// Winner logic
function finalizeGame() {
    let winnerMessage=""
    if(sum>21 && sum2>21) winnerMessage="Both players are out!"
    else if(sum>21){ winnerMessage="Player 2 wins!"; player2.chips+=10; player.chips-=10 }
    else if(sum2>21){ winnerMessage="Player 1 wins!"; player.chips+=10; player2.chips-=10 }
    else if(sum>sum2){ winnerMessage="Player 1 wins!"; player.chips+=10; player2.chips-=10 }
    else if(sum2>sum){ winnerMessage="Player 2 wins!"; player2.chips+=10; player.chips-=10 }
    else winnerMessage="It's a tie!"
    messageEl3.textContent=winnerMessage
    updateUI()
    setTimeout(resetCards,2000)
}

/// Update chips UI
function updateUI() { playerEl.textContent=player.name+": $"+player.chips; playerElm.textContent=player2.name+": $"+player2.chips }

/// Reset cards
function resetCards() {
    cards=[]; sum=0; hasBlackJack=false; isAlive=false
    cards2=[]; sum2=0; hasBlackJack2=false; isAlive2=false
    cardsEl.textContent="Cards:"; sumEl.textContent="Sum:"; messageEl.textContent="Ready for new round!"
    cardsElm2.textContent="Cards:"; sumElm2.textContent="Sum:"; messageElm.textContent="Ready for new round!"
    messageEl3.textContent=""
}
