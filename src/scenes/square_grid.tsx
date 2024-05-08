import { Circle, Node, Grid, makeScene2D, Rect } from '@motion-canvas/2d';
import { createRef, easeOutExpo, all } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
	const square = createRef<Rect>();
	const grid = createRef<Grid>();
	const gridMask = createRef<Circle>();

	view.fill("#FF477E")
	view.add(
		<>
			<Node cache>
				<Circle ref={gridMask} size={0} fill={"black"} />
				<Grid
					ref={grid}
					size={"200%"}
					spacing={() => square().size()}
					position={() => grid().spacing().div([2, 2])}
					stroke={"white"}
					opacity={0.5}
					lineWidth={7}
					compositeOperation={"source-in"}
				/>
			</Node>
			<Rect ref={square} fill={"white"} size={125} />
		</>
	);

	yield* all(
		square().size(200, 0.5, easeOutExpo),
		gridMask().size(2500, 0.7, easeOutExpo),
	);
});