import { useState } from 'react';
import { SUN_ICONS, CATEGORY_ICONS } from '../data/plants';

const tagStyle = {
  fontFamily: "DM Sans", fontSize: 10, fontWeight: 500,
  padding: "3px 8px", borderRadius: 20, letterSpacing: 0.3
};

export default function PlantCard({ plant, onAdd, onRemove, isInGarden, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="plant-card"
      onClick={() => onSelect(plant)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        borderRadius: 12,
        padding: 20,
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "0 4px 16px rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(10px)"
      }}
    >

      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <div className="plant-card-emoji" style={{ fontSize: 48, lineHeight: 1, flexShrink: 0 }}>
          {CATEGORY_ICONS[plant.category] || '🌸'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h3 style={{ fontFamily: "DM Serif Display", fontSize: 18, color: "#2C2C2C", margin: 0, lineHeight: 1.2 }}>{plant.name}</h3>
              <p style={{ fontFamily: "DM Sans", fontSize: 11, color: "#666", margin: "2px 0 0", fontStyle: "italic" }}>{plant.botanical}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); isInGarden ? onRemove(plant.id) : onAdd(plant); }}
              style={{
                background: isInGarden ? "#5CA882" : "linear-gradient(135deg, #6B9BD8 0%, #89B4D8 100%)",
                border: "none",
                color: "#fff",
                borderRadius: 6, padding: "8px 14px", cursor: "pointer",
                fontSize: 12, fontFamily: "DM Sans", fontWeight: 600,
                transition: "all 0.2s ease",
                display: "flex", alignItems: "center", gap: 4,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                minHeight: 36
              }}
              title={isInGarden ? "Remove from garden" : "Add to garden"}
            >
              {isInGarden ? "✓ Added" : "+ Add"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        <span style={{ ...tagStyle, background: "#F0F0F0", color: "#666" }}>{SUN_ICONS[plant.sun]} {plant.sun}</span>
        <span style={{ ...tagStyle, background: "#F0F0F0", color: "#666" }}>{plant.water} Water</span>
        <span style={{ ...tagStyle, background: "#F0F0F0", color: "#666" }}>{plant.category}</span>
        {plant.bloomColor !== "N/A" && (
          <span style={{ ...tagStyle, background: plant.color + "18", color: plant.color, border: `1px solid ${plant.color}33` }}>{plant.bloomColor}</span>
        )}
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        marginTop: "auto",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        fontFamily: "DM Sans",
        fontSize: 11,
        color: "#666",
        fontWeight: 500
      }}>
        <span>H: {plant.height}</span>
        <span>W: {plant.spread}</span>
        <span>{plant.maintenance} Maint.</span>
      </div>
    </div>
  );
}
