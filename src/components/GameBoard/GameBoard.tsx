import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GameState, makeMove } from "../../features/game/gameSlice";
import "./styles.css";

function GameBoard() {
  const dispatch = useAppDispatch();
  const gameArray = useAppSelector((state) => state.game.gameArray);

  const handleCheckboxChange = (index: number) => {
    if (!gameArray[index]) {
      dispatch(makeMove(index));
    }
  };

  return (
    <div className="game-board">
      {gameArray.map((tile, i) => (
        <div className="tile" key={i}>
          <input
            className={
              !tile
                ? "custom_checkbox"
                : tile === "X"
                ? "custom_checkbox cross"
                : "custom_checkbox circle"
            }
            type="checkbox"
            id={i.toString()}
            name={i.toString()}
            checked={!!tile}
            onChange={() => handleCheckboxChange(i)}
          />
          <label className="custom_label" htmlFor={i.toString()}></label>
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
