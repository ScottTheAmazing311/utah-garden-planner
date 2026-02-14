import { MONTHS, SUN_ICONS, WATER_ICONS, CATEGORY_ICONS } from '../data/plants';
import PlantCalendar from './PlantCalendar';

const detailTag = { fontFamily: "DM Sans", fontSize: 12, fontWeight: 500, padding: "5px 12px", borderRadius: 20 };
const statBox = { background: "#F5F5F5", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 8, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 2 };
const statLabel = { fontFamily: "DM Sans", fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 600 };
const statValue = { fontFamily: "DM Sans", fontSize: 15, color: "#2C2C2C", fontWeight: 500 };

export default function PlantDetail({ plant, onClose, onAdd, onRemove, isInGarden }) {
  if (!plant) return null;

  // Generate image URL from Unsplash based on plant name
  const imageUrl = `https://source.unsplash.com/600x400/?${encodeURIComponent(plant.botanical + ' plant')}`;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(247, 245, 240, 0.7)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20
    }}>
      <div onClick={e => e.stopPropagation()} className="detail-modal" style={{
        background: "rgba(255, 255, 255, 0.95)", border: "1px solid rgba(0, 0, 0, 0.06)", borderRadius: 16,
        maxWidth: 700, width: "100%", maxHeight: "85vh", overflow: "auto", padding: 0,
        position: "relative",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
      }}>

        {/* Plant Image Header */}
        <div className="detail-image-header" style={{ position: "relative", width: "100%", height: 280, overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
          <img
            src={imageUrl}
            alt={plant.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }}
            onError={(e) => {
              // Fallback gradient if image fails to load
              e.target.style.display = "none";
              e.target.parentElement.style.background = `linear-gradient(135deg, ${plant.color}44 0%, ${plant.color}88 100%)`;
            }}
          />
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            padding: "40px 24px 20px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 48, lineHeight: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
                {CATEGORY_ICONS[plant.category] || "🌸"}
              </div>
              <div>
                <h2 style={{ fontFamily: "DM Serif Display", fontSize: 28, color: "#fff", margin: 0, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{plant.name}</h2>
                <p style={{ fontFamily: "DM Sans", fontSize: 13, color: "#f0f0f0", margin: "4px 0 0", fontStyle: "italic", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{plant.botanical}</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(255, 255, 255, 0.9)", border: "none",
            color: "#666", fontSize: 24, cursor: "pointer", lineHeight: 1, fontWeight: 300,
            width: 36, height: 36, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}>×</button>
        </div>

        <div style={{ padding: 32 }}>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "16px 0" }}>
          <span style={{ ...detailTag, background: "#F0F0F0", color: "#666" }}>{SUN_ICONS[plant.sun]} {plant.sun}</span>
          <span style={{ ...detailTag, background: "#F0F0F0", color: "#666" }}>{WATER_ICONS[plant.water]} {plant.water} Water</span>
          <span style={{ ...detailTag, background: "#F0F0F0", color: "#666" }}>{plant.maintenance} Maintenance</span>
          <span style={{ ...detailTag, background: "#F0F0F0", color: "#666" }}>Zone {plant.zone}</span>
          {plant.bloomColor !== "N/A" && <span style={{ ...detailTag, background: plant.color + "18", color: plant.color, border: `1px solid ${plant.color}33` }}>Bloom: {plant.bloomColor}</span>}
        </div>

        <p style={{ fontFamily: "DM Sans", fontSize: 14, color: "#666", lineHeight: 1.7, margin: "16px 0" }}>{plant.description}</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "20px 0" }}>
          <div style={statBox}><span style={statLabel}>Height</span><span style={statValue}>{plant.height}</span></div>
          <div style={statBox}><span style={statLabel}>Spread</span><span style={statValue}>{plant.spread}</span></div>
          <div style={statBox}><span style={statLabel}>Category</span><span style={statValue}>{plant.category}</span></div>
          <div style={statBox}><span style={statLabel}>Hardiness</span><span style={statValue}>Zone {plant.zone}</span></div>
        </div>

        <div style={{ margin: "20px 0" }}>
          <h4 style={{ fontFamily: "DM Serif Display", color: "#2C2C2C", fontSize: 16, marginBottom: 12 }}>Growing Calendar</h4>
          <div className="calendar-container">
            <div className="calendar-grid">
              <PlantCalendar plant={plant} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 8, fontFamily: "DM Sans", fontSize: 10, color: "#666", flexWrap: "wrap" }}>
            <span><span style={{ color: "#7BC9A6" }}>■</span> Plant</span>
            <span><span style={{ color: plant.color }}>■</span> Bloom</span>
            <span><span style={{ color: "#E69850" }}>■</span> Prune/Maintain</span>
          </div>
        </div>

        <div style={{ background: "#F0F7F4", border: "1px solid rgba(92, 168, 130, 0.2)", borderRadius: 10, padding: 16, margin: "16px 0" }}>
          <h4 style={{ fontFamily: "DM Sans", fontSize: 12, color: "#5CA882", margin: "0 0 6px", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>Pro Tips</h4>
          <p style={{ fontFamily: "DM Sans", fontSize: 13, color: "#666", margin: 0, lineHeight: 1.6 }}>{plant.tips}</p>
        </div>

        <button
          onClick={() => isInGarden ? onRemove(plant.id) : onAdd(plant)}
          style={{
            width: "100%", padding: "16px 0", border: isInGarden ? "2px solid #E74C3C" : "none", borderRadius: 8,
            background: isInGarden ? "#fff" : "linear-gradient(135deg, #6B9BD8 0%, #89B4D8 100%)",
            color: isInGarden ? "#E74C3C" : "#fff",
            fontFamily: "DM Sans", fontSize: 15, fontWeight: 600,
            cursor: "pointer", marginTop: 8, transition: "all 0.2s",
            boxShadow: isInGarden ? "none" : "0 4px 12px rgba(107, 155, 216, 0.3)",
            minHeight: 48
          }}
        >
          {isInGarden ? "✓ In Your Garden — Remove" : "+ Add to My Garden"}
        </button>
        </div>
      </div>
    </div>
  );
}
