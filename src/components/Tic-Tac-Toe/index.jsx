import React, { useState } from 'react'
import "./TTT.css"
// const TTT = () => {
//     const [turn, setTurn] = useState('X')
//     const [board, setBoard] = useState(Array(9).fill(null))
//     const [winner, setWinner] = useState(null);
    
//   function checkWinner(board) {
//      const patterns = [
//     [0,1,2],[3,4,5],[6,7,8],
//     [0,3,6],[1,4,7],[2,5,8],
//     [0,4,8],[2,4,6]
//   ];

//   for (let [a, b, c] of patterns) {
//     if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//       return board[a]; // "X" or "O"
//     }
//   }

//   return null;
// }
//     function handleClick(i){
//         if(board[i] || winner) return;
//        const newBoard = [...board];
//        newBoard[i] = turn;
       
//        setBoard(newBoard);
//        const win = checkWinner(newBoard);
//         if (win) {
//         setWinner(win);
//         }
//         else if (!newBoard.includes(null) && !win) {
//   setWinner("Draw");
// }
//         else {
//          setTurn( turn === "X" ? "O" : "X");
//         }
// }

//     function Reset(){
//         setBoard(Array(9).fill(null))
//         setTurn("X")
//         setWinner(null)
// }
      
//   return (
//     <div className='container'>
//         <div className="boxes-container">
//             {board.map((val, i) => (
//                 <button onClick={() => handleClick(i)}className="box">{val}</button>
//           ))}
//         </div>
//         <div className='text-btn'>
//             <h2 className='msg'>
//   {winner === "Draw"
//     ? "The Match ended Draw"
//     : winner
//     ? `Winner is ${winner}`
//     : `Next Player is ${turn}`}
// </h2>
//             <button type="button" className='btns' onClick={Reset}>Restart</button>
//         </div>
//     </div>
//   )
// }
const TTT = () => {

    const [turn, setTurn] = useState("X");
    const [board, setboard] = useState(Array(9).fill(null))
    const [winner, setWinner] = useState(null);

    function checkWinner(board){
        const patterns = [
           [0,1,2],[3,4,5],[6,7,8],
           [0,3,6],[1,4,7],[2,5,8],
           [0,4,8],[2,4,6]
        ];

    for (let [a,b,c] of patterns) {
        if(board[a] && board[a] == board[b] && board[a] == board[c]){
            return board[a];
        }
    }
     return null;
    }



    function handleClick(i){
        
        if(board[i] || winner ) {return;}
        
        const newBoard = [...board];
        newBoard[i] = turn;
        setboard(newBoard);

        const win = checkWinner(newBoard);
        if(win){
            setWinner(win);
        }
        else if (!newBoard.includes(null) && !win) {
            setWinner("Draw");
        }
        else{
            setTurn(turn === "X" ? "O" : "X")
        }
        
        
    }

    function reset(){
        setTurn("X");
        setboard(Array(9).fill(null));
        setWinner(null);
    }
    
    return (
        <div className='container'>
         <div className="boxes-container">
           {board.map((val,i)=> { 
            return (
                <button className='box' onClick={()=> handleClick(i)}>{val}</button>
            )
           })} 
         </div>
         <div className='text-btn'>
             <h2 className='msg'>
               {
                winner == "Draw" ? 
                "The Match ended Draw!":
                winner ?
                `--The Winner is ${winner} !--`:
                `Next Player is ${turn}`
               }
             </h2>
             <button type="button" className='btns' onClick={reset}>Restart</button>
         </div>
     </div>
    )
}
export default TTT
