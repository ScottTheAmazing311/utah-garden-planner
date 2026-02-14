import PlantCalendar from './PlantCalendar';

export default function GardenPlantRow({ plant, onRemove }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      background: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(0, 0, 0, 0.06)", borderRadius: 10,
      padding: "12px 16px", marginBottom: 8,
      backdropFilter: "blur(10px)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      transition: "all 0.2s"
    }}>
      <div style={{ width: 8, height: 36, borderRadius: 4, background: plant.color, flexShrink: 0 }} />
      <div style={{ flex: "0 0 140px" }}>
        <div style={{ fontFamily: "DM Serif Display", fontSize: 14, color: "#2C2C2C" }}>{plant.name}</div>
        <div style={{ fontFamily: "DM Sans", fontSize: 10, color: "#666" }}>{plant.sun} · {plant.water} Water</div>
      </div>
      <div className="calendar-container" style={{ flex: 1 }}>
        <div className="calendar-grid">
          <PlantCalendar plant={plant} compact />
        </div>
      </div>
      <button onClick={() => onRemove(plant.id)} style={{
        background: "none", border: "2px solid #E74C3C", borderRadius: 6,
        color: "#E74C3C", padding: "8px 14px", cursor: "pointer", fontSize: 12, fontFamily: "DM Sans",
        flexShrink: 0, fontWeight: 500, transition: "all 0.2s", minHeight: 44
      }}>Remove</button>
    </div>
  );
}
