import svgPaths from "../imports/svg-ax6fs9okif";

export function Logo({ size = "default" }: { size?: "default" | "small" }) {
  const scale = size === "small" ? 0.6 : 1;
  const width = 125.58 * scale;
  const height = 75.242 * scale;

  return (
    <div className="relative shrink-0" style={{ width: `${width}px`, height: `${height}px` }}>
      <div className="absolute bottom-0 left-0 right-[58.89%] top-[9.53%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 69">
          <g>
            <path d={svgPaths.p1ca92100} fill="#161618" />
            <path d={svgPaths.p12186180} fill="#161618" />
            <path d={svgPaths.p2f62c900} fill="#161618" />
            <path d={svgPaths.p21eeae00} fill="#161618" />
            <path d={svgPaths.p39bfaa00} fill="#161618" />
            <path d={svgPaths.p30b8ab00} fill="#161618" />
            <path d={svgPaths.p1e5c2e80} fill="#161618" />
          </g>
        </svg>
      </div>
      <div className="absolute bottom-[0.74%] left-[44.13%] right-0 top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71 75">
          <g>
            <path d={svgPaths.p36857980} fill="#161618" />
            <g>
              <path d={svgPaths.p128a8400} fill="#161618" />
              <path d={svgPaths.p3050d800} fill="#161618" />
              <g>
                <path d={svgPaths.p16775600} fill="#FFBF00" />
                <path d={svgPaths.p2311c800} fill="#161618" />
                <path d={svgPaths.p2d4ff180} fill="#161618" />
                <path d={svgPaths.p33606980} fill="#161618" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
