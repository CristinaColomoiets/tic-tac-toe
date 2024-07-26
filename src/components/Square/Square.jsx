export const Square = ({children, isSelected, updateBoard, index, isTurned})=>{
  
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
