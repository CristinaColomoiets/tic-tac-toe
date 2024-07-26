import { useState, useEffect } from "react";
import {Square} from '../Square/Square';

export function WinnerModal({winner, resetGame}){

    const [popUpWinnerOpened, setpopUpWinnerOpened] = useState(false);

    // Using useEffect with other useState for execute setTimeOut, because this one no works alone
    useEffect(() => {
        if (winner) {
            setTimeout(() => {
            setpopUpWinnerOpened(true);
            }, 700)
        }else{
            setpopUpWinnerOpened(false);
            
        }
    },[winner])

    return(
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
    )
    
}