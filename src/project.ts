import { makeProject } from "@motion-canvas/core";

import letter_intro from "./scenes/letter_intro?scene";
import circle_fall from "./scenes/circle_fall?scene";
import audio from "../audio/bgm.mp3";

export default makeProject({
  audio: audio,
  scenes: [
    letter_intro,
    circle_fall,
  ],
});
