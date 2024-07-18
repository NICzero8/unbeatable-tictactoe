import { useAppDispatch } from "../../app/hooks";
import { changeDifficulty } from "../../features/game/gameSlice";
import "./styles.css";

function DifficultyToggle() {

  const dispatch = useAppDispatch();
  return (
    <div className="switch">
      <input id="switch-rounded" type="checkbox" onChange={() => dispatch(changeDifficulty())} />
      <label htmlFor="switch-rounded"></label>
    </div>
  );
}

export default DifficultyToggle;
