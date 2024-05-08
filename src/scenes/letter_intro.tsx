import {
  Node,
  Rect,
  ShapeProps,
  Txt,
  TxtProps,
  makeScene2D,
} from "@motion-canvas/2d";
import {
  createRef,
  delay,
  easeOutBack,
  easeInExpo,
  all,
  easeOutExpo,
  waitUntil,
  createRefArray,
} from "@motion-canvas/core";

export const Letter: TxtProps = {
  fontWeight: 800,
  fontFamily: "Helvetica Neue",
  strokeFirst: true,
  lineWidth: 1,
  lineJoin: "round",
  shadowColor: "white",
  shadowBlur: 20,
};

export default makeScene2D(function* (view) {
  const camera = createRef<Node>();
  const backdrop = createRef<Rect>();
  const letters = createRefArray<Txt>();
  const letterH = createRef<Txt>();
  const letterO = createRef<Txt>();
  const letterW = createRef<Txt>();
  const timing = 0.85;
  const letter_fade_duration = 0.1;
  const color_shift_duration = 0.1;
  const background_color = "white";
  const foreground_color = "black";
  const transparent = "#00000000";

  view.add(
    <>
      <Rect
        width={"100%"}
        height={"100%"}
        fill={foreground_color}
        ref={backdrop}
      />
      <Node ref={camera} scale={7}>
        <Txt
          text={"H"}
          ref={letters}
          position={[-35, 30]}
          fill={transparent}
          stroke={background_color}
          opacity={0}
          {...Letter}
        />
        <Txt
          text={"O"}
          ref={letters}
          position={[0, -10]}
          fill={transparent}
          stroke={background_color}
          opacity={0}
          {...Letter}
        />
        <Txt
          text={"W"}
          ref={letters}
          position={[40, 10]}
          fill={transparent}
          stroke={background_color}
          opacity={0}
          {...Letter}
        />
      </Node>
    </>
  );

  yield camera().scale(3.0, timing, easeOutExpo);
  yield delay(
    timing,
    all(
      camera().scale(17.0, timing, easeInExpo),
      letters.at(0).scale.y(3, timing, easeInExpo),
      letters.at(2).scale.y(3, timing, easeInExpo)
    )
  );

  yield* waitUntil("h_appear");
  yield all(
    letters.at(0).y(3, timing, easeOutBack),
    letters.at(0).opacity(1, letter_fade_duration),
    letters.at(0).shadowBlur(0, 0.5)
  );

  yield* waitUntil("o_appear");
  yield all(
    letters.at(1).y(3, timing, easeOutBack),
    letters.at(1).opacity(1, letter_fade_duration),
    letters.at(1).shadowBlur(0, 0.5)
  );

  yield* waitUntil("w_appear");
  yield all(
    letters.at(2).y(3, timing, easeOutBack),
    letters.at(2).opacity(1, letter_fade_duration),
    letters.at(2).shadowBlur(0, 0.5),
    backdrop().fill(background_color, color_shift_duration),
    ...letters.map((letter) =>
      all(
        letter.stroke(foreground_color, color_shift_duration),
        letter.shadowColor(foreground_color, color_shift_duration)
      )
    )
  );

  yield* waitUntil("h_fill");
  yield letters.at(0).fill(foreground_color, color_shift_duration);

  yield* waitUntil("o_fill");
  yield letters.at(1).fill(foreground_color, color_shift_duration);

  yield* waitUntil("w_fill");
  yield letters.at(2).fill(foreground_color, color_shift_duration);

  yield* waitUntil("letter_intro_finish");
});
