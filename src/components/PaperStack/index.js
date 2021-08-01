import React, { useState } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import "./style.scss";

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

export default function StackPaper({
  papers,
  onNext,
  onClickItem,
  onPushoutItem,
  onClick,
}) {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, set] = useSprings(papers.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) {
        gone.add(index);
        onPushoutItem && onPushoutItem(papers[index]);
      } else if (!down && !trigger) {
        onClickItem && onClickItem(papers[index]);
      }
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === papers.length)
        onNext
          ? onNext().then(() => {
              gone.clear() || set((i) => to(i));
            })
          : gone.clear() || set((i) => to(i));
    }
  );

  const availWidth = Math.min(window.screen.availWidth, 600);

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  const images = props.map(({ x, y, rot, scale }, i) => {
    let { width, height } = papers[i];
    const isHor = width > height;
    const isMobile = window.screen.availWidth < 660;
    const style = {
      transform: interpolate([rot, scale], trans),
      backgroundImage: `url(${papers[i].url}=w${availWidth})`,
      backgroundSize: "100%",
    };

    return (
      <animated.div
        key={i}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          ),
        }}
        onClick={onClick}
      >
        <animated.div
          {...bind(i)}
          style={
            isMobile
              ? style
              : {
                  ...style,
                  width: isHor ? "85vh" : "45vh",
                  height: isHor ? "45vh" : "85vh",
                  maxWidth: isHor ? "570px" : "500px",
                  maxHeight: isHor ? "500px" : "570px",
                  backgroundSize: isHor ? "85% auto" : "auto 85%",
                }
          }
        />
      </animated.div>
    );
  });

  return (
    <div className="StackPaper" onClick={onClick}>
      {images}
    </div>
  );
}
