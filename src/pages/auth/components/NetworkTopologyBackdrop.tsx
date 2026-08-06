/**
 * Low-opacity network-topology / camera-grid illustration for the login
 * brand panel. Pure inline SVG so it stays crisp at any panel size and
 * carries no external asset dependency.
 */
export function NetworkTopologyBackdrop() {
  const nodes = [
    { x: 80, y: 90 },
    { x: 260, y: 60 },
    { x: 430, y: 130 },
    { x: 160, y: 220 },
    { x: 380, y: 260 },
    { x: 520, y: 200 },
    { x: 90, y: 340 },
    { x: 300, y: 380 },
    { x: 470, y: 400 },
    { x: 560, y: 340 },
  ];

  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
    [2, 5],
    [3, 6],
    [3, 4],
    [4, 5],
    [4, 7],
    [5, 8],
    [6, 7],
    [7, 8],
    [8, 9],
    [5, 9],
  ];

  return (
    <svg
      viewBox="0 0 620 460"
      className="absolute inset-0 h-full w-full opacity-[0.16]"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4a92e7" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="620" height="460" fill="url(#grid)" />
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#4a92e7"
          strokeWidth="1"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="10" fill="none" stroke="#4a92e7" strokeWidth="1" />
          <circle cx={n.x} cy={n.y} r="3" fill="#7fe3ee" />
        </g>
      ))}
    </svg>
  );
}
