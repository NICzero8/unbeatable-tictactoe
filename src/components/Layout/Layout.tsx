import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import AnimatedBackground from "../AnimatedBackground/AnimatedBackground";
import DifficultyToggle from "../DifficultyToggle/DifficultyToggle";
import GameBoard from "../GameBoard/GameBoard";
import GameOverWindow from "../GameOverWindow/GameOverWindow";
import "./styles.css";

function Layout() {
  const unbeatable = useAppSelector((state) => state.game.unbeatable);
  const gameOver = useAppSelector((state) => state.game.gameOver);
  const wins = useAppSelector((state) => state.game.wins);
  const unbeatableWins = useAppSelector((state) => state.game.unbeatableWins);

  useEffect(() => {
    localStorage.setItem("wins", JSON.stringify(wins));
    localStorage.setItem("unbeatableWins", JSON.stringify(unbeatableWins));
  }, [wins, unbeatableWins]);

  return (
    <>
      <AnimatedBackground />
      <div className="container">
        <h1 className="title">
          {unbeatable ? "unbeatable" : "beatable"}
          <br />
          tic-tac-toe
        </h1>
        <div className="info_wrapper">
          <div className="toggle_wrapper">
            <DifficultyToggle />
            <p>change difficulty</p>
          </div>
          <p>wins: {unbeatable ? unbeatableWins : wins}</p>
        </div>
        <GameBoard />
        {gameOver && <GameOverWindow />}
      </div>
    </>
  );
}

export default Layout;
