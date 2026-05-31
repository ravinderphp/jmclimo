export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const scale = size === "sm" ? 0.72 : size === "lg" ? 1.25 : 1;
  const w = Math.round(230 * scale);
  const h = Math.round(90 * scale);

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 230 90"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="JMC Limo — Los Angeles Chauffeur Service"
    >
      {/* Diamond outer glow */}
      <polygon
        points="34,2 64,45 34,88 4,45"
        fill="rgba(196,30,58,0.08)"
        stroke="rgba(196,30,58,0.3)"
        strokeWidth="0.8"
      />
      {/* Diamond main */}
      <polygon
        points="34,8 60,45 34,82 8,45"
        fill="rgba(196,30,58,0.14)"
        stroke="#c41e3a"
        strokeWidth="1.6"
      />
      {/* Diamond inner */}
      <polygon
        points="34,20 50,45 34,70 18,45"
        fill="rgba(196,30,58,0.1)"
        stroke="rgba(212,168,92,0.45)"
        strokeWidth="0.8"
      />
      {/* Crown dots at top of diamond */}
      <circle cx="34" cy="12" r="1.5" fill="rgba(212,168,92,0.7)" />
      <circle cx="28" cy="16" r="1" fill="rgba(212,168,92,0.5)" />
      <circle cx="40" cy="16" r="1" fill="rgba(212,168,92,0.5)" />
      {/* JMC monogram */}
      <text
        x="34"
        y="51"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="13"
        fontWeight="700"
        fill="#d4a85c"
        letterSpacing="1"
      >
        JMC
      </text>

      {/* Connector line */}
      <line x1="64" y1="45" x2="78" y2="45" stroke="rgba(212,168,92,0.35)" strokeWidth="0.8" />

      {/* JMC main wordmark */}
      <text
        x="82"
        y="31"
        textAnchor="start"
        fontFamily="Georgia, 'Playfair Display', serif"
        fontSize="26"
        fontWeight="700"
        fill="#ffffff"
        letterSpacing="3"
      >
        JMC
      </text>

      {/* Gold separator line */}
      <line x1="82" y1="37" x2="226" y2="37" stroke="rgba(212,168,92,0.28)" strokeWidth="0.7" />

      {/* LIMO */}
      <text
        x="84"
        y="57"
        textAnchor="start"
        fontFamily="Georgia, serif"
        fontSize="14"
        fontWeight="300"
        fill="#d4a85c"
        letterSpacing="7"
      >
        LIMO
      </text>

      {/* Chauffeur Service */}
      <text
        x="84"
        y="71"
        textAnchor="start"
        fontFamily="Arial, sans-serif"
        fontSize="6.5"
        fontWeight="400"
        fill="rgba(212,168,92,0.55)"
        letterSpacing="2.8"
      >
        CHAUFFEUR  SERVICE
      </text>

      {/* Bottom crimson accent */}
      <line x1="82" y1="77" x2="226" y2="77" stroke="rgba(196,30,58,0.38)" strokeWidth="0.7" />
    </svg>
  );
}
