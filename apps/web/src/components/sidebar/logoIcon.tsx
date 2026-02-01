export default function LogoIcon({
  isDesktop = true,
}: {
  isDesktop?: boolean;
}) {
  return (
    <svg
      width={isDesktop ? 33 : 25}
      height={isDesktop ? 33 : 25}
      viewBox="0 0 100 100"
      fill="none"
      className="logo-icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="49.5" stroke="currentColor" />
      <circle cx="50" cy="50" r="41.5" stroke="currentColor" strokeWidth="7" />

      <g transform="translate(26 22) scale(2.2)">
        <circle
          cx="8"
          cy="18"
          r="4"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
        />
        <path
          d="M12 18V2l7 4"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
