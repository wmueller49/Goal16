const game16 = new Game16();
game16.start();

var movesTaken = 0;
var prevNum = 0;
var turn;

var row1notCounted = true;
var row2notCounted = true;
var row3notCounted = true;
var col1notCounted = true;
var col2notCounted = true;
var col3notCounted = true;
var diag1notCounted = true;
var diag2notCounted = true;

var humanScore = 0;
var computerScore = 0;


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

  function updateScore(){
      console.log("updateScore called");
      console.log("Human score: " + humanScore);
      console.log("row1 is win: " + r1IsWin(board));
      console.log("col1 is win: " + col1IsWin(board));
      console.log("column1 has been counted: " + col1notCounted);

      if(row1notCounted && r1IsWin(board)){
        humanScore++;
        row1notCounted = false;
      }

      if(row2notCounted && r2IsWin(board)){
        humanScore++;
        row2notCounted = false;
      }

      if(row3notCounted && r3IsWin(board)){
        humanScore++;
        row3notCounted = false;
      }

      if(col1notCounted && col1IsWin(board)){
        humanScore++;
        col1notCounted = false;
      }

      if(col2notCounted && col2IsWin(board)){
        humanScore++;
        col2notCounted = false; 
      }

      if(col3notCounted && col3IsWin(board)){
        humanScore++;
        col3notCounted = false;
      }

      if(diag1notCounted && diag1IsWin(board)){
        humanScore++;
        diag1notCounted = false;
      }

      if(diag2notCounted && diag2IsWin(board)){
        humanScore++;
        diag2notCounted = false;
      }
      document.getElementById("playScore").innerText = "Player score: " + humanScore;
    }

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
        updateScore();
        const availablePositions = board.positions.filter((p) => p.innerText === '');
        
        if(availablePositions.length == 0){
          if(humanScore > computerScore){
            document.getElementById("winner").innerText = "You win!";
          }
          else if(humanScore < computerScore){
            document.getElementById("winner").innerText = "You lost.";
          }
          else{
            document.getElementById("winner").innerText = "You tied.";
          }
        }

        else if(movesTaken == 2){
          turn++;
          prevNum = 0;
          board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
        }
      }
    }
}

function ComputerPlayer(board){

  function updateScore(){
      if(row1notCounted && r1IsWin(board)){
        computerScore++;
        row1notCounted = false;
      }

      if(row2notCounted && r2IsWin(board)){
        computerScore++;
        row2notCounted = false;
      }

      if(row3notCounted && r3IsWin(board)){
        computerScore++;
        row3notCounted = false;
      }

      if(col1notCounted && col1IsWin(board)){
        computerScore++;
        col1notCounted = false;
      }

      if(col2notCounted && col2IsWin(board)){
        computerScore++;
        col2notCounted = false; 
      }

      if(col3notCounted && col3IsWin(board)){
        computerScore++;
        col3notCounted = false;
      }

      if(diag1notCounted && diag1IsWin(board)){
        computerScore++;
        diag1notCounted = false;
      }

      if(diag2notCounted && diag2IsWin(board)){
        computerScore++;
        diag2notCounted = false;
      }

      document.getElementById("compScore").innerText = "Computer score: " + computerScore;
    }

  this.takeTurn = function(){
    console.log("Computer move");
    
    movesTaken = 0;
    const availablePositions = board.positions.filter((p) => p.innerText === '');

    if(availablePositions.length > 0){
      var index1 = Math.floor(Math.random() * availablePositions.length);
      var index2 = Math.floor(Math.random() * availablePositions.length);

      var num1 = Math.floor(Math.random() * 17);
      console.log(num1);

      var num2 = Math.floor(Math.random() * (17 - num1));
      console.log(num2);

      availablePositions[index1].innerText = num1;
      availablePositions[index2].innerText = num2;
      updateScore();
      turn++;
    }
    else{
      if(humanScore > computerScore){
        document.getElementById("winner").innerText = "You win!";
      }
      else if(humanScore < computerScore){
        document.getElementById("winner").innerText = "You lost.";
      }
      else{
        document.getElementById("winner").innerText = "You tied.";
      }
    }
  }

}

/**
  Checks rows
  **/

function r1IsWin(board){
  if((board.positions[0].innerText != '') && (board.positions[1].innerText != '') && (board.positions[2].innerText != '')){
    var is16 = Number(board.positions[0].innerText) + Number(board.positions[1].innerText) + Number(board.positions[2].innerText);
    return is16 === 16;
  }
  else{
    return false;
  }
}

function r2IsWin(board){
  if((board.positions[3].innerText != '') && (board.positions[4].innerText != '') && (board.positions[5].innerText != '')){
    var is16 = Number(board.positions[3].innerText) + Number(board.positions[4].innerText) + Number(board.positions[5].innerText);
    return is16 === 16;
  }
  else{
    return false;
  }
}

function r3IsWin(board){
  if((board.positions[6].innerText != '') && (board.positions[7].innerText != '') && (board.positions[8].innerText != '')){
    var is16 = Number(board.positions[6].innerText) + Number(board.positions[7].innerText) + Number(board.positions[8].innerText);
    return is16 === 16;
  }
  else{
    return false;
  }
}

/**
  Checks cols
  **/


function col1IsWin(board){
  if((board.positions[0].innerText != '') && (board.positions[3].innerText != '') && (board.positions[6].innerText != '')){
    var is16 = Number(board.positions[0].innerText) + Number(board.positions[3].innerText) + Number(board.positions[6].innerText);
    return is16 === 16;
  }
  else{
    return false;
  }
}

function col2IsWin(board){
  if((board.positions[1].innerText != '') && (board.positions[4].innerText != '') && (board.positions[7].innerText != '')){
    var is16 = Number(board.positions[1].innerText) + Number(board.positions[4].innerText) + Number(board.positions[7].innerText);
    return is16 === 16;
  }
  else{
    return false;
  }
}

function col3IsWin(board){
  if((board.positions[2].innerText != '') && (board.positions[5].innerText != '') && (board.positions[8].innerText != '')){
    var is16 = Number(board.positions[2].innerText) + Number(board.positions[5].innerText) + Number(board.positions[8].innerText);
    return is16 === 16;
  }
  else{
    return false;
  }
}

/**
  Checks diags
  **/

function diag1IsWin(board){
  if((board.positions[0].innerText != '') && (board.positions[4].innerText != '') && (board.positions[8].innerText != '')){
    var is16 = Number(board.positions[0].innerText) + Number(board.positions[4].innerText) + Number(board.positions[8].innerText);
    return is16 === 16;
  }
  else{
    return false;
  }
}

function diag2IsWin(board){
  if((board.positions[2].innerText != '') && (board.positions[4].innerText != '') && (board.positions[6].innerText != '')){
    var is16 = Number(board.positions[2].innerText) + Number(board.positions[4].innerText) + Number(board.positions[8].innerText);
    return is16 === 16;
  }
  else{
    return false;
  }
}