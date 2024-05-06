import { Node, Rect, Txt, blur, makeScene2D } from "@motion-canvas/2d";
import { createRef, delay, easeOutBack, easeInExpo, all, easeOutExpo, any, useDuration } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const camera = createRef<Node>();
  const backdrop = createRef<Rect>();
  const letterH = createRef<Txt>();
  const letterO = createRef<Txt>();
  const letterW = createRef<Txt>();
  const timing = 0.85;
  const color_shift_duration = 0.1;
  const background_color = "white";
  const foreground_color = "black";
  const transparent = "#00000000"
  view.add(
    <>
      <Rect width={"100%"} height={"100%"} fill={foreground_color} ref={backdrop}>

      </Rect>
      <Node ref={camera} scale={7}>
        <Txt
          text={"H"}
          fontWeight={800}
          fontFamily={"Helvetica Neue"}
          ref={letterH}
          position={[-35, 30]}
          fill={transparent}
          strokeFirst
          lineWidth={1}
          lineJoin={'round'}
          stroke={background_color}
          opacity={0}
          shadowColor={"#000000"}
        ></Txt>
        <Txt
          text={"O"}
          fontWeight={800}
          fontFamily={"Helvetica Neue"}
          ref={letterO}
          position={[0, -10]}
          fill={transparent}
          strokeFirst
          lineWidth={1}
          lineJoin={'round'}
          stroke={background_color}
          opacity={0}
        ></Txt>
        <Txt
          text={"W"}
          fontWeight={800}
          fontFamily={"Helvetica Neue"}
          ref={letterW}
          position={[40, 10]}
          fill={transparent}
          strokeFirst
          lineWidth={1}
          lineJoin={'round'}
          stroke={background_color}
          opacity={0}
        ></Txt>
      </Node>
    </>,
  );

  yield* any(
    camera().scale(3.0, timing, easeOutExpo),
    delay(
      useDuration('h_appear'),
      all(
        letterH().position.y(3, timing, easeOutBack),
        letterH().opacity(1, 0),
      )
    ),
    delay(
      useDuration('o_appear'),
      all(
        letterO().position.y(3, timing, easeOutBack),
        letterO().opacity(1, 0),
      )
    ),
    delay(
      useDuration('w_appear'),
      all(
        letterW().position.y(3, timing, easeOutBack),
        letterW().opacity(1, 0),
        backdrop().fill(background_color, color_shift_duration),
        letterH().stroke(foreground_color, color_shift_duration),
        letterO().stroke(foreground_color, color_shift_duration),
        letterW().stroke(foreground_color, color_shift_duration),
      )),
    delay(
      useDuration('h_fill'),
      letterH().fill(foreground_color, color_shift_duration)
    ),
    delay(
      useDuration('o_fill'),
      letterO().fill(foreground_color, color_shift_duration)
    ),
    delay(
      useDuration('w_fill'),
      letterW().fill(foreground_color, color_shift_duration)
    ),
  );
  yield* all(
    camera().scale(7.0, timing, easeInExpo),
    letterH().scale.y(3, timing, easeInExpo),
    letterW().scale.y(3, timing, easeInExpo),
  );
});
