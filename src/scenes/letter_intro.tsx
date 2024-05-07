import { Node, Rect, ShapeProps, Txt, TxtProps, makeScene2D } from "@motion-canvas/2d";
import { createRef, delay, easeOutBack, easeInExpo, all, easeOutExpo, waitUntil } from "@motion-canvas/core";

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
	const letterH = createRef<Txt>();
	const letterO = createRef<Txt>();
	const letterW = createRef<Txt>();
	const timing = 0.85;
	const letter_fade_duration = 0.1;
	const color_shift_duration = 0.1;
	const background_color = "white";
	const foreground_color = "black";
	const transparent = "#00000000"
	view.add(
		<>
			<Rect width={"100%"} height={"100%"} fill={foreground_color} ref={backdrop} />
			<Node ref={camera} scale={7}>
				<Txt
					text={"H"}
					ref={letterH}
					position={[-35, 30]}
					fill={transparent}
					stroke={background_color}
					opacity={0}
					{...Letter}
				/>
				<Txt
					text={"O"}
					ref={letterO}
					position={[0, -10]}
					fill={transparent}
					stroke={background_color}
					opacity={0}
					{...Letter}
				/>
				<Txt
					text={"W"}
					ref={letterW}
					position={[40, 10]}
					fill={transparent}
					stroke={background_color}
					opacity={0}
					{...Letter}
				/>
			</Node>
		</>,
	);

	yield camera().scale(3.0, timing, easeOutExpo);
	yield delay(
		timing,
		all(
			camera().scale(17.0, timing, easeInExpo),
			letterH().scale.y(3, timing, easeInExpo),
			letterW().scale.y(3, timing, easeInExpo),
		),
	);
	yield* waitUntil('h_appear');
	yield all(
		letterH().position.y(3, timing, easeOutBack),
		letterH().opacity(1, letter_fade_duration),
		letterH().shadowBlur(0, 0.5),
	);
	yield* waitUntil('o_appear');
	yield all(
		letterO().position.y(3, timing, easeOutBack),
		letterO().opacity(1, letter_fade_duration),
		letterO().shadowBlur(0, 0.5),
	);
	yield* waitUntil('w_appear');
	yield all(
		letterW().position.y(3, timing, easeOutBack),
		letterW().opacity(1, letter_fade_duration),
		letterW().shadowBlur(0, 0.5),
		backdrop().fill(background_color, color_shift_duration),
		letterH().stroke(foreground_color, color_shift_duration),
		letterO().stroke(foreground_color, color_shift_duration),
		letterW().stroke(foreground_color, color_shift_duration),
		letterH().shadowColor(foreground_color, color_shift_duration),
		letterO().shadowColor(foreground_color, color_shift_duration),
		letterW().shadowColor(foreground_color, color_shift_duration),
	);
	yield* waitUntil('h_fill');
	yield letterH().fill(foreground_color, color_shift_duration);
	yield* waitUntil('o_fill');
	yield letterO().fill(foreground_color, color_shift_duration);
	yield* waitUntil('w_fill');
	yield letterW().fill(foreground_color, color_shift_duration);
	yield* waitUntil("letter_intro_finish")
});
