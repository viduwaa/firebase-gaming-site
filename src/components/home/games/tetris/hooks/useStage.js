import { useEffect, useState, useCallback } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  const updateStage = useCallback(
    (prevStage) => {
      // Clear the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // Ensure player and its properties are defined
      if (!player || !player.tetromino || !player.pos) {
        return newStage;
      }

      // Draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      return newStage;
    },
    [player]
  );

  useEffect(() => {
    if (!player || !player.pos) return;

    setStage((prev) => updateStage(prev));
  }, [player, updateStage]);

  return { stage, setStage };
};
