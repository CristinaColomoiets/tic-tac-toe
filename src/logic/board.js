import { WinnerCombination } from "../components/Constants/Constants"

export const checkWinner = (boardToCheck) =>{
    // checking all win combinations (if X or O won)
    for (const combo of WinnerCombination){
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

export const checkEndGame = (newBoard) => {
  return newBoard.every((square)=> square != null)
}