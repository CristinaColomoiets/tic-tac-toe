import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

const board = Array(9).fill(null)


function App() {


  return (
    <>
    <main className='board'>
      <p className="read-the-docs">tic-tac-toe</p>
      <section className='game'></section>
    </main>
    </>
  )
}

export default App
