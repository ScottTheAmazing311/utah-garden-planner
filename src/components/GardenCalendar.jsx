import { useState, useMemo } from 'react';
import { MONTHS, MONTH_FULL } from '../data/plants';

export default function GardenCalendar({ gardenPlants }) {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const monthTasks = useMemo(() => {
    return MONTHS.map((m, i) => {
      const monthNum = i + 1;
      const tasks = { plant: [], bloom: [], prune: [] };
      gardenPlants.forEach(p => {
        if (p.plantMonths.includes(monthNum)) tasks.plant.push(p);
        if (p.bloomMonths.includes(monthNum)) tasks.bloom.push(p);
        if (p.pruneMonths.includes(monthNum)) tasks.prune.push(p);
      });
      return tasks;
    });
  }, [gardenPlants]);

  return (
    <div>
      <div className="garden-calendar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
        {MONTHS.map((m, i) => {
          const tasks = monthTasks[i];
          const total = tasks.plant.length + tasks.bloom.length + tasks.prune.length;
          const isSelected = selectedMonth === i;

          return (
            <div
              key={m}
              onClick={() => setSelectedMonth(isSelected ? null : i)}
              style={{
                background: isSelected ? "rgba(92, 168, 130, 0.1)" : "rgba(255, 255, 255, 0.9)",
                border: isSelected ? "2px solid #5CA882" : "1px solid rgba(0, 0, 0, 0.06)",
                borderRadius: 12, padding: 16, cursor: "pointer",
                transition: "all 0.2s ease",
                backdropFilter: "blur(10px)",
                boxShadow: isSelected ? "0 4px 12px rgba(92, 168, 130, 0.2)" : "0 2px 8px rgba(0,0,0,0.04)"
              }}
            >
              <div style={{ fontFamily: "DM Serif Display", fontSize: 15, color: isSelected ? "#5CA882" : "#2C2C2C", fontWeight: isSelected ? 600 : 400 }}>{MONTH_FULL[i]}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8, fontFamily: "DM Sans", fontSize: 11 }}>
                {tasks.plant.length > 0 && <span style={{ color: "#7BC9A6", fontWeight: 500 }}>▲ {tasks.plant.length}</span>}
                {tasks.bloom.length > 0 && <span style={{ color: "#6B9BD8", fontWeight: 500 }}>● {tasks.bloom.length}</span>}
                {tasks.prune.length > 0 && <span style={{ color: "#E69850", fontWeight: 500 }}>✂ {tasks.prune.length}</span>}
                {total === 0 && <span style={{ color: "#999" }}>Nothing scheduled</span>}
              </div>
            </div>
          );
        })}
      </div>

      {selectedMonth !== null && (
        <div style={{
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
          animation: "fadeIn 0.2s ease",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
        }}>
          <h3 style={{ fontFamily: "DM Serif Display", fontSize: 22, color: "#2C2C2C", margin: "0 0 16px" }}>
            {MONTH_FULL[selectedMonth]} Tasks
          </h3>

          {monthTasks[selectedMonth].plant.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontFamily: "DM Sans", fontSize: 12, color: "#7BC9A6", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 8px" }}>▲ Plant</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {monthTasks[selectedMonth].plant.map(p => (
                  <span key={p.id} style={{ fontFamily: "DM Sans", fontSize: 12, background: "#7BC9A622", color: "#5CA882", padding: "6px 12px", borderRadius: 6, border: "1px solid #7BC9A644", fontWeight: 500 }}>{p.name}</span>
                ))}
              </div>
            </div>
          )}

          {monthTasks[selectedMonth].bloom.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontFamily: "DM Sans", fontSize: 12, color: "#6B9BD8", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 8px" }}>● In Bloom</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {monthTasks[selectedMonth].bloom.map(p => (
                  <span key={p.id} style={{ fontFamily: "DM Sans", fontSize: 12, background: p.color + "18", color: p.color, padding: "6px 12px", borderRadius: 6, border: `1px solid ${p.color}44`, fontWeight: 500 }}>{p.name}</span>
                ))}
              </div>
            </div>
          )}

          {monthTasks[selectedMonth].prune.length > 0 && (
            <div>
              <h4 style={{ fontFamily: "DM Sans", fontSize: 12, color: "#E69850", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 8px" }}>✂ Prune / Maintain</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {monthTasks[selectedMonth].prune.map(p => (
                  <span key={p.id} style={{ fontFamily: "DM Sans", fontSize: 12, background: "#E6985022", color: "#E69850", padding: "6px 12px", borderRadius: 6, border: "1px solid #E6985044", fontWeight: 500 }}>{p.name}</span>
                ))}
              </div>
            </div>
          )}

          {monthTasks[selectedMonth].plant.length === 0 && monthTasks[selectedMonth].bloom.length === 0 && monthTasks[selectedMonth].prune.length === 0 && (
            <p style={{ fontFamily: "DM Sans", fontSize: 14, color: "#999" }}>No tasks this month. Your garden rests.</p>
          )}
        </div>
      )}
    </div>
  );
}
