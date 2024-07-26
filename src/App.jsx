import { useState, useEffect } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import {Square} from './components/Square/Square.jsx'
import {TURNS} from './components/Constants/Constants.jsx'
import {checkWinner, checkEndGame} from './logic/board.js'
import {WinnerModal} from './components/WinnerModal/WinnerModal.jsx'


function App() {
  
  const [board, setBoard] = useState(()=>{

    const boardFromStorage = localStorage.getItem('board')

    if(boardFromStorage){
      return JSON.parse(boardFromStorage)
    }

    return Array(9).fill(null)
  })


  const [turn, setTurn] = useState(()=>{

    const turnFromStorage = localStorage.getItem('turn')

    return turnFromStorage ?? TURNS.X
  })


  const [winner, setWinner] = useState(null)

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

    localStorage.setItem('board', JSON.stringify(newBoard))
    localStorage.setItem('turn', newTurn)

    //check the winner
    const newWinner = checkWinner(newBoard)

    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    localStorage.removeItem('board')
    localStorage.removeItem('turn')
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

      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
