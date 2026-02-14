import { MONTHS } from '../data/plants';

export default function PlantCalendar({ plant, compact = false }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: compact ? 2 : 4, marginTop: compact ? 4 : 8 }}>
      {MONTHS.map((m, i) => {
        const monthNum = i + 1;
        const isPlant = plant.plantMonths.includes(monthNum);
        const isBloom = plant.bloomMonths.includes(monthNum);
        const isPrune = plant.pruneMonths.includes(monthNum);

        let bg = "#F5F5F5";
        let border = "1px solid #E0E0E0";
        let textColor = "#999";
        let label = "";

        if (isBloom) { bg = plant.color + "20"; border = `2px solid ${plant.color}`; textColor = plant.color; label = "Bloom"; }
        else if (isPlant) { bg = "#7BC9A622"; border = "2px solid #7BC9A6"; textColor = "#7BC9A6"; label = "Plant"; }
        else if (isPrune) { bg = "#E6985022"; border = "2px solid #E69850"; textColor = "#E69850"; label = "Prune"; }

        return (
          <div key={m} style={{
            background: bg, border, borderRadius: 6,
            padding: compact ? "3px 0" : "6px 2px",
            textAlign: "center", fontSize: compact ? 8 : 9,
            fontFamily: "DM Sans", color: textColor,
            position: "relative",
            transition: "all 0.2s"
          }} title={label ? `${m}: ${label}` : m}>
            <div style={{ fontWeight: 600, fontSize: compact ? 7 : 9, letterSpacing: 0.5, color: isBloom || isPlant || isPrune ? textColor : "#666" }}>{m}</div>
            {!compact && (isBloom || isPlant || isPrune) && (
              <div style={{ fontSize: 8, marginTop: 2, opacity: 0.9 }}>{isBloom ? "●" : isPlant ? "▲" : "✂"}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
