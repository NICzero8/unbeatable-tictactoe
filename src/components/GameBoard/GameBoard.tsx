import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GameState, makeMove } from "../../features/game/gameSlice";
import "./styles.css";

function GameBoard() {
  const dispatch = useAppDispatch();
  const gameArray = useAppSelector((state) => state.game.gameArray);

  const drawGameboard = useCallback((gameArray: GameState["gameArray"]) => {
    const gameBoardHTML = gameArray.map((tile, i) => {
      if (!tile) {
        return (
          <div className="tile" key={i}>
            <input
              className="custom_checkbox"
              type="checkbox"
              id={i.toString()}
              name={i.toString()}
              onChange={() => dispatch(makeMove(i))}
            />
            <label className="custom_label" htmlFor={i.toString()}></label>
          </div>
        );
      } else {
        return (
          <div className="tile" key={i}>
            <input
              className={ tile === "X" ? "custom_checkbox cross" : "custom_checkbox circle"}
              type="checkbox"
              id={i.toString()}
              name={i.toString()}
              checked
            />
            <label className="custom_label" htmlFor={i.toString()}></label>
          </div>
        );
      }
    });
    return gameBoardHTML;
  }, [dispatch]);

  return <div className="game-board">{drawGameboard(gameArray)}</div>;
}

export default GameBoard;
