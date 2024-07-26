import { GameState } from "../features/game/gameSlice";

export function evaluatePosition(board: GameState["gameArray"]): number {
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
      return 20;
    } else if (board[a] === "X" && board[b] === "X" && board[c] === "X") {
      return -20;
    }
  }

  return 0;
}

function randomScore(): number {
  const a = Math.random()
  let randomScore = 0
  if (a <= 0.333) {
    randomScore = 20
  } else if (a <= 0.666) {
    randomScore = -20
  }
  return randomScore
}

// minimax function uses alpha-beta pruning for optimization, a is for alpha, b is for beta
function minimax(
  board: GameState["gameArray"],
  a: number,
  b: number,
  isMaximizing: boolean,
  unbeatable: boolean,
  depth: number,
): number {
  const score = evaluatePosition(board);
  if (score === 20 || score === -20 || !board.includes(false)) {
    // makes algorithm "stupid" sometimes giving player a chance to win, depth adjustment is needed to make it not too "studid"
    if (!unbeatable && depth >= 2) {
      if (Math.random() < 0.3) {
        // console.log('blind', depth)
        return randomScore()
      }
    }
    if (score === -20) {
      //depth adjustment to make the algorithm resist as long as possible
      return score + depth
    }
    // depth adjustment for achieving victory by the shortest route
    return score - depth;
  }

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (let i = 0; i < board.length; ++i) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = "O";
        const moveScore = minimax(newBoard, a, b, false, unbeatable, depth +1);
        // console.log(`Maximizing: Move: ${i}, MoveScore: ${moveScore}, MaxScore: ${maxScore}`);
        maxScore = Math.max(maxScore, moveScore);
        a = Math.max(a, moveScore)
        if (b <= a) {
          break
        }
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;

    for (let i = 0; i < board.length; ++i) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = "X";
        const moveScore = minimax(newBoard, a, b, true, unbeatable, depth + 1);
        // console.log(`Minimizing: Move: ${i}, MoveScore: ${moveScore}, MinScore: ${minScore}`);
        minScore = Math.min(minScore, moveScore);
        b = Math.min(b, moveScore)
        if (b <= a) {
          break
        }
      }
    }
    return minScore;
  }
}

function findBestMove(board: GameState["gameArray"], unbeatable: boolean) {
  let bestMove = -1;
  let bestScore = -Infinity;
  const scores: number[] = [];

  board.forEach((tile, i, arr) => {
    if (!tile) {
      const newBoard = [...arr];
      newBoard[i] = "O";
      const moveScore = minimax(newBoard, -Infinity, Infinity, false, unbeatable, 0);
      scores.push(moveScore);
      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = i;
        console.log("best score changed:", bestScore, bestMove)
      }
    }
  });
  console.log(scores);
  return bestMove;
}

export default findBestMove;
