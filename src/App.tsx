import { useState } from 'react'
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


function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null))
 
  const [turn, setTurn] = useState(TURNS.X)

  const updateBoard = (index) =>{

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
  }
  

  return ( 
  <main className='board'>

    <h1 className="read-the-docs">Tic-Tac-Toe</h1>

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
  </main>
  )
}

export default App
