import { GameState } from "../features/game/gameSlice";

function evaluatePosition(board: GameState["gameArray"]): number {
  const winningPatterns: number[][] = [
    [0, 1, 2], // Horizontal
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Vertical
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonal
    [2, 4, 6],
  ];

  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] === "O" && board[b] === "O" && board[c] === "O") {
      return 10;
    } else if (board[a] === "X" && board[b] === "X" && board[c] === "X") {
      return -10;
    }
  }

  return 0;
}

// function minimax(board: GameState["gameArray"], depth: number, isMaximizing: boolean): number {

//   if ( depth === 0 || !board.includes(false)) {
//     return evaluatePosition(board)
//   }

//   let bestScore = isMaximizing ? -100 : 100

//   board.forEach((tile, i, arr) => {
//     if (!tile) {
//       const newBoard = [...arr]
//       newBoard[i] = isMaximizing ? "X" : "O"
//       const score = minimax(newBoard, depth - 1, !isMaximizing)
//       bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore)
//       console.log("depth:", depth, "index:", i, "best score:", bestScore)
//     }
//   })

//   return bestScore
// }

// function findBestMove(board: GameState["gameArray"]): number {
  
//   let bestScore = -100;
//   let bestMove = -1;

//   board.forEach((tile, i, arr) => {
//     if (!tile) {
//       const newBoard = [...arr]
//       newBoard[i] = "O"
//       const score = minimax(newBoard, 3, true)
//       if (score > bestScore) {
//         bestScore = score
//         bestMove = i
//       }
//     }
//   })
//   console.log(bestMove, bestScore)
//   return bestMove
// }

function minimax(board: GameState["gameArray"], depth: number, isMaximizing: boolean): number {
  let score = evaluatePosition(board)
  if (depth === 0 || !board.includes(false) || score === 10 || score === -10) {
    return score;
  }

  const currentPlayer = isMaximizing ? "O" : "X";
  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestMove = -1;

  board.forEach((tile, i, arr) => {
    if (!tile) {
      const newBoard = [...arr];
      newBoard[i] = currentPlayer;
      const score = minimax(newBoard, depth - 1, !isMaximizing);

      if ((isMaximizing && score > bestScore) || (!isMaximizing && score < bestScore)) {
        bestScore = score;
        bestMove = i;
      }
    }
  });

  return bestMove;
}


export default minimax
