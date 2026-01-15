interface StatusBadgeProps {
  status: "draft" | "pending" | "validated" | "refused";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const configs = {
    draft: {
      label: "Brouillon",
      bg: "#6b7280",
      text: "white",
      icon: "📝",
    },
    pending: {
      label: "En attente",
      bg: "#FFBF00",
      text: "#1f1f1f",
      icon: "⏳",
    },
    validated: {
      label: "Validé",
      bg: "#22c55e",
      text: "white",
      icon: "✓",
    },
    refused: {
      label: "Refusé",
      bg: "#ef4444",
      text: "white",
      icon: "✗",
    },
  };

  const config = configs[status];

  return (
    <div
      className="inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px]"
      style={{ backgroundColor: config.bg }}
    >
      <span style={{ color: config.text }}>{config.icon}</span>
      <span
        className="font-['Space_Grotesk'] text-[12px]"
        style={{ color: config.text }}
      >
        {config.label}
      </span>
    </div>
  );
}
