const game16 = new Game16();
game16.start();

var movesTaken = 0;
var prevNum = 0;
var turn;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Game16(){
  const board = new Board();
  const humanPlayer = new HumanPlayer(board);
  const computerPlayer = new ComputerPlayer(board);
  turn = 0;

  this.start = function(){
    const config = { childList: true };
    const observer = new MutationObserver(() => takeTurn());
    board.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  }

  function takeTurn(){
    if(turn % 2 === 0){
      humanPlayer.takeTurn();
    }
    else{
      computerPlayer.takeTurn();
    }
  }
}

function Board(){
  this.positions = Array.from(document.querySelectorAll('.col'));
}

function HumanPlayer(board){

    this.takeTurn = function() {
      board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
    }

    function handleTurnTaken(event){
      if(movesTaken < 2 && (event.target.innerText == '')){
        var num1 = prompt("Enter a number", "");
        while(num1 > (16-prevNum)){
          num1 = prompt("Invalid input, enter a new number", "");
        }

        prevNum = num1;
        event.target.innerText = num1;
        movesTaken++;

        if(movesTaken == 2){
          turn++;
          prevNum = 0;
          board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
        }
      }
    }

}

function ComputerPlayer(board){

  this.takeTurn = function(){
    console.log("Computer move");
    
    movesTaken = 0;
    const availablePositions = board.positions.filter((p) => p.innerText === '');
    console.log(availablePositions);


    
    var index1 = Math.floor(Math.random() * availablePositions.length);
    var index2 = Math.floor(Math.random() * availablePositions.length);

    var num1 = Math.floor(Math.random() * 17);
    console.log(num1);

    var num2 = Math.floor(Math.random() * (17 - num1));
    console.log(num2);

    availablePositions[index1].innerText = num1;
    availablePositions[index2].innerText = num2;
    turn++;
  }

}