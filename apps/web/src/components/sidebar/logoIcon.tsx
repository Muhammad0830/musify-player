export default function LogoIcon({ theme }: { theme: "light" | "dark" }) {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="49.5" stroke={theme === "dark" ? "white" : "black"} />
      <circle cx="50" cy="50" r="41.5" stroke={theme === "dark" ? "white" : "black"} strokeWidth="7" />

      {/* Center icon */}
      <g transform="translate(26 22) scale(2.2)">
        <circle
          cx="8"
          cy="18"
          r="4"
          stroke={theme === "dark" ? "white" : "black"}
          fill="none"
          strokeWidth="2"
        />
        <path
          d="M12 18V2l7 4"
          stroke={theme === "dark" ? "white" : "black"}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
