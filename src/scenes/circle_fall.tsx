import { Circle, makeScene2D, Rect, ShapeProps } from '@motion-canvas/2d';
import { all, createRef, delay, easeInExpo, easeOutExpo, easeOutQuart } from '@motion-canvas/core';

export const glow: ShapeProps = {
	shadowColor: "white",
	shadowBlur: 50,
};

export default makeScene2D(function* (view) {
	const backdrop = createRef<Rect>();
	const circle = createRef<Circle>();
	const ring = createRef<Circle>();
	const speed_scale = 0.8;

	view.add(
		<>
			<Rect ref={backdrop} width={"100%"} height={"100%"} fill={"black"} />
			<Circle ref={circle} size={200} fill={'white'} scale={1.1} {...glow} />
			<Circle ref={ring} width={500} height={500} lineWidth={100} lineJoin={"round"} stroke={"white"} {...glow} />
		</>
	);

	yield* all(
		circle().scale(1.5, 0.25 * speed_scale, easeOutExpo).to(0.7, 0.25 * speed_scale, easeInExpo),
		ring().scale(2.0, 0.5 * speed_scale, easeOutQuart),
		ring().lineWidth(0.0, 0.5 * speed_scale, easeOutQuart),
		circle().position.y(backdrop().bottom().y, 0.5 * speed_scale, easeInExpo),
	);
});