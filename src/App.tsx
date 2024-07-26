import { useState, useEffect } from 'react'
import './App.css'


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

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        setpopUpWinnerOpened(true);
      }, 1000)
    }else{
      setpopUpWinnerOpened(false);
      
    }
  }, 
  [winner])


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

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      // TODO: check if game is over
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
        board.map((_, index)=>{
          return (
            <Square 
              key={index} 
              index={index}
              updateBoard = {updateBoard}

            >
            {board[index]}
            </Square>
          )
        })
      }
    </section>

    <section className="turn">
      <Square isTurned={true} isSelected={turn == TURNS.X}>{TURNS.X}</Square>
      <Square isTurned={true} isSelected={turn == TURNS.O}>{TURNS.O}</Square>
    </section>

      {
        popUpWinnerOpened && (
          <section className='pop-up-winner'>
            <div className='pop-up-text'>
              <h2>
                {
                  winner == false
                  ? 'Empate'
                  : 'Ganó: '
                }
              </h2>

              <div className="won">
                {
                  winner 
                  &&
                  <Square>{winner}</Square>
                }
              </div>

              <button onClick={resetGame}>Empezar de nuevo</button>
            </div>
          </section>

        )
      }
  </main>
  )
}

export default App
