import { useState, useEffect } from 'react'
import './App.css'
import confetti from 'canvas-confetti'


const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({children, isSelected, updateBoard, index, isTurned})=>{
  
  const className = `square ${isSelected ? 'is-selected' : ''} ${isTurned ? 'is-turned' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )  
}


const winnerCombin = [
  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,3,6],
  [1,4,7],
  [2,6,8],

  [0,4,8],
  [2,4,6],
]


function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  const [popUpWinnerOpened, setpopUpWinnerOpened] = useState(false);


  const checkEndGame = (newBoard) => {
    return newBoard.every((square)=> square != null)
  }


  const updateBoard = (index) =>{
    // with return we stop filling in, if the box already has a sign or has a winner
    if(board[index] || winner)return


    // safe the last turn on the board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //switch the turn and safe it according to the last click
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //check the winner
    const newWinner = checkWinner(newBoard)

    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }


  const checkWinner = (boardToCheck) =>{
    // checking all win combinations (if X or O won)
    for (const combo of winnerCombin){
      const [a, b, c] = combo
      if(
        boardToCheck[a]
        &&
        boardToCheck[a] == boardToCheck[b]
        &&
        boardToCheck[a] == boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }


  // Using useEffect with other useState for execute setTimeOut, because this one no works alone
  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        setpopUpWinnerOpened(true);
      }, 700)
    }else{
      setpopUpWinnerOpened(false);
      
    }
  }, 
  [winner])


  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  

  return ( 
  <main className='board'>

    <h1 className="name-game">Tic-Tac-Toe</h1>

    <section className='game'>
      {
        board.map((square, index)=>{
          return (
            <Square 
              key={index} 
              index={index}
              updateBoard = {updateBoard}
            >
            {square}
            </Square>
          )
        })
      }
    </section>

    <section className="turn">
      <Square isTurned={true} isSelected={turn == TURNS.X}>{TURNS.X}</Square>
      <Square isTurned={true} isSelected={turn == TURNS.O}>{TURNS.O}</Square>
    </section>

    <button onClick={resetGame}>reset game</button>

      {
        popUpWinnerOpened && (

          <section className='pop-up-winner'>
            <div className='pop-up-text'>
              <h2>
                {
                  winner == false
                  ? 'Tie'
                  : 'Won: '
                }
              </h2>

              <div className="won">
                {
                  winner 
                  &&
                  <Square>{winner}</Square>
                }
              </div>

              <button onClick={resetGame}>Start again</button>
            </div>
          </section>

        )
      }
  </main>
  )
}

export default App
