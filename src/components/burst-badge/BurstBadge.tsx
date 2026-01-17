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
  spin?: boolean;
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
    "spin",
    "children",
    "class",
    "style",
  ]);

  const pathD = createMemo(() => {
    const numPoints = Math.max(0, local.pointCount);
    const waveAmplitude = 6;
    const baseRadius = 90;

    const centerX = 100;
    const centerY = 100;

    const totalSteps = 360;
    let pathData = "";

    for (let step = 0; step <= totalSteps; step++) {
      const angle = (step / totalSteps) * Math.PI * 2;
      const lobeEffect = Math.sin(angle * numPoints) * waveAmplitude;

      const radiusAtAngle = baseRadius + lobeEffect;
      const x = centerX + Math.cos(angle - Math.PI / 2) * radiusAtAngle;
      const y = centerY + Math.sin(angle - Math.PI / 2) * radiusAtAngle;

      if (step === 0) {
        pathData = `M ${x} ${y}`;
      } else {
        pathData += ` L ${x} ${y}`;
      }
    }

    return pathData + " Z";
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
        class={`${styles.svg} ${local.spin ? styles.spinClass : ""}`}
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
