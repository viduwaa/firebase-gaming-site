import { STAGE_WIDTH } from "../setup";
import { randomTetromino } from "../gameHelpers";
import { useCallback } from "react";

export const usePlayer = () => {
  const [player, setPlayer] = useState({});

  const updatePlayerPositon = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPositon, resetPlayer];
};
