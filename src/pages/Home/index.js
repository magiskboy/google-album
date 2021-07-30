import React, { useState, useEffect } from "react";
import { useGesture } from "react-use-gesture";
import { useSprings, animated, interpolate } from "react-spring";
import { useListAlbums } from "../../hooks";
import { usePage } from "../../contexts";
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

export default function Home() {
  const { albums } = useListAlbums(49);
  const { setPage } = usePage();
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [currentAlbum, setCurrentAlbum] = useState(0);
  const [props, set] = useSprings(albums.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity

  useEffect(() => {
    albums && albums.length > 0 && setCurrentAlbum(albums.length - 1);
  }, [albums]);

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
        setCurrentAlbum(currentAlbum - 1);
        gone.add(index);
      } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      else if (!down && !trigger) {
        setPage({ name: "album", params: { albumId: albums[index].id } });
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
      if (!down && gone.size === albums.length) {
        setCurrentAlbum(albums.length - 1);
        gone.clear() || set((i) => to(i));
      }
    }
  );

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  const images = props.map(({ x, y, rot, scale }, i) => {
    const availWidth = Math.min(window.screen.availWidth, 660);
    const style = {
      transform: interpolate([rot, scale], trans),
      backgroundImage: `url(${albums[i].coverPhotoBaseUrl}=w${availWidth})`,
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
      >
        {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
        <animated.div {...bind(i)} style={style} />
      </animated.div>
    );
  });
  return (
    <div className="Home BackApp">
      <div className="bg"></div>
      <div className="AppHeader">
        {albums && albums[currentAlbum] && albums[currentAlbum].title}
      </div>
      <div className="ListAlbum">{images}</div>
    </div>
  );
}
