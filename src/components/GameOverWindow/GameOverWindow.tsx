import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { restart } from "../../features/game/gameSlice";
import "./styles.css";

function GameOverWindow() {
  const dispatch = useAppDispatch();
  const gameOver = useAppSelector((state) => state.game.gameOver);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  function closeHandler () {
    setIsClosing(true)
    setTimeout(() => {
        dispatch(restart())
        setIsClosing(false)
    }, 400)
  }

  const message = gameOver === "win" ? "you win!" : (gameOver === "loose" ? "you loose!" : "it's a tie!")

  return (
    <div className={isClosing ? "modal-window closing" : "modal-window"}>
      <p>game over</p>
      <h2>{message}</h2>
      <button onClick={closeHandler}>restart</button>
    </div>
  );
}

export default GameOverWindow;
