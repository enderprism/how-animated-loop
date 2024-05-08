import { Node, Circle, Line, makeScene2D, Rect, ShapeProps } from '@motion-canvas/2d';
import { all, createRef, createRefArray, easeOutExpo, easeOutQuart, useDuration, easeOutSine, waitFor, delay, easeInOutSine, easeInOutQuart, any, easeInExpo, easeInSine } from '@motion-canvas/core';

export const glow: ShapeProps = {
	shadowColor: "white",
	shadowBlur: 50,
};

export default makeScene2D(function* (view) {
	const backdrop = createRef<Rect>();
	const circle = createRef<Rect>();
	const circle_parent = createRef<Node>();
	const ring = createRef<Circle>();
	const rays = createRefArray<Line>();
	const ringDuration = useDuration("ringGrowEnd");
	const ray1start = useDuration("ray1start");
	const ray2start = useDuration("ray2start");
	const ray3start = useDuration("ray3start");
	const raysEnd = useDuration("raysEnd");
	const rayFadeDuration = 0.1;

	view.add(
		<>
			<Rect ref={backdrop} width={"100%"} height={"100%"} fill={"#8ECAE6"} />
			<Node ref={circle_parent} y={backdrop().bottom().y} >
				<Circle ref={ring} size={300} lineWidth={10} stroke={"white"} />
				<Line ref={rays} {...glow} opacity={0} lineWidth={20} stroke={"white"} points={[[0, 0], [0, -backdrop().height() * 2]]} rotation={-45} />
				<Line ref={rays} {...glow} opacity={0} lineWidth={20} stroke={"white"} points={[[0, 0], [0, -backdrop().height() * 2]]} rotation={90} />
				<Line ref={rays} {...glow} opacity={0} lineWidth={20} stroke={"white"} points={[[0, 0], [0, -backdrop().height() * 2]]} rotation={-80} />
				<Line ref={rays} {...glow} opacity={0} lineWidth={20} stroke={"white"} points={[[0, 0], [0, -backdrop().height() * 2]]} rotation={-45} />
				<Rect ref={circle} radius={250} size={250} rotation={45} fill={"white"} {...glow} />
			</Node>
		</>
	);


	yield all(
		circle().scale(0.7, 0.5, easeOutExpo),
		ring().scale(7, ringDuration, easeOutExpo),
		ring().lineWidth(1, ringDuration, easeOutQuart),
		ring().opacity(0.5, 0.5),
		rays.at(0).rotation(60, raysEnd, easeOutSine),
		rays.at(0).opacity(1.0, rayFadeDuration),
		delay(ringDuration, ring().scale(6.7, 0.5, easeInOutSine)),
	);
	yield* waitFor(ray1start);
	yield rays.at(1).rotation(-70, raysEnd - ray1start, easeOutSine);
	yield rays.at(1).opacity(1.0, rayFadeDuration);
	yield* waitFor(ray2start - ray1start);
	yield rays.at(2).rotation(-40, raysEnd - ray2start, easeOutSine);
	yield rays.at(2).opacity(1.0, rayFadeDuration);
	yield* waitFor(ray3start - ray2start);
	yield rays.at(3).rotation(0, raysEnd - ray3start, easeOutSine);
	yield rays.at(3).opacity(1.0, rayFadeDuration);
	yield* waitFor(raysEnd - ray3start);

	yield* any(
		circle_parent().position.y(0, 0.1, easeOutSine),
		ring().scale(0.0, 0.3, easeInOutQuart),
		ring().opacity(0.0, 0.3, easeInOutQuart),
		rays.at(1).rotation(-180, 0.3, easeOutExpo),
	);
	yield all(
		circle_parent().position.y(backdrop().height() / 4, 0.2, easeInOutQuart),
		circle().fill("black", 0.1),
		circle().scale(0.25, 0.5, easeInOutQuart),
		backdrop().fill("white", 0.1),
		...rays.map(ray => ray.opacity(0.0, 0.1)),
	);
	yield* waitFor(0.2);
	yield circle_parent().position.y(-backdrop().height() / 4, 0.4, easeInOutQuart);
	yield* waitFor(0.2);
	yield* any(
		circle().fill("white", 0.1),
		backdrop().fill("black", 0.1),
		circle().rotation(180, 0.5, easeInSine),
		circle().radius(0, 0.2),
	);

	yield* all(
		circle_parent().position.y(0, 0.4, easeInExpo),
		circle().scale(0.5, 0.4, easeInExpo),
	);

	// yield* waitUntil("circle_rays_end");
});
