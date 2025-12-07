import { Component, JSX, splitProps, createMemo } from "solid-js";
import styles from "./burst-badge.module.css";

interface BurstBadgeProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "style"> {
  fill: string;
  size: string;
  pointCount: number;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  style?: JSX.CSSProperties;
}

const BurstBadge: Component<BurstBadgeProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "fill",
    "size",
    "pointCount",
    "stroke",
    "strokeWidth",
    "opacity",
    "children",
    "class",
    "style",
  ]);

  const pathD = createMemo(() => {
    const numPoints = Math.max(0, local.pointCount); // Number of points in the burst
    const waveAmplitude = 6; // How far each point extends from the base radius
    const baseRadius = 90; // The base radius of the burst shape without points

    const centerX = 100; // SVG center X coordinate
    const centerY = 100; // SVG center Y coordinate

    const totalSteps = 360; // Number of points to calculate around the circle for smoothness
    let pathData = "";

    for (let step = 0; step <= totalSteps; step++) {
      const angle = (step / totalSteps) * Math.PI * 2; // Angle in radians around the circle
      const lobeEffect = Math.sin(angle * numPoints) * waveAmplitude; // Sinusoidal modulation for points

      const radiusAtAngle = baseRadius + lobeEffect; // Radius at this point including point bump
      const x = centerX + Math.cos(angle - Math.PI / 2) * radiusAtAngle; // X coordinate of the point
      const y = centerY + Math.sin(angle - Math.PI / 2) * radiusAtAngle; // Y coordinate of the point

      if (step === 0) {
        pathData = `M ${x} ${y}`; // Move to the starting point
      } else {
        pathData += ` L ${x} ${y}`; // Draw line to next point
      }
    }

    return pathData + " Z"; // Close the path
  });

  return (
    <div
      class={`${styles.container} ${local.class}`}
      style={{
        width: local.size,
        height: local.size,
        ...local.style,
      }}
      {...rest}
    >
      <svg
        viewBox="0 0 200 200"
        class={styles.svg}
        aria-hidden="true"
        opacity={local.opacity}
      >
        <path
          d={pathD()}
          fill={local.fill}
          stroke={local.stroke}
          stroke-width={local.strokeWidth}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class={styles.content}>{local.children}</div>
    </div>
  );
};

export default BurstBadge;
