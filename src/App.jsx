import { useState, useMemo } from 'react';
import { PLANTS, MONTHS, SUN_ICONS, CATEGORIES, SUN_OPTIONS, WATER_OPTIONS, CATEGORY_ICONS } from './data/plants';
import PlantCard from './components/PlantCard';
import PlantDetail from './components/PlantDetail';
import GardenCalendar from './components/GardenCalendar';
import GardenPlantRow from './components/GardenPlantRow';

const filterGroup = { display: "flex", flexWrap: "wrap", gap: 4 };
const filterBtn = {
  fontFamily: "DM Sans", fontSize: 11, fontWeight: 500,
  padding: "5px 10px", borderRadius: 6, border: "1px solid #222",
  cursor: "pointer", transition: "all 0.15s ease", background: "transparent"
};

export default function App() {
  const [view, setView] = useState("directory");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sunFilter, setSunFilter] = useState("All");
  const [waterFilter, setWaterFilter] = useState("All");
  const [maintenanceFilter, setMaintenanceFilter] = useState("All");
  const [bloomMonthFilter, setBloomMonthFilter] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [garden, setGarden] = useState([]);

  const addToGarden = (plant) => {
    if (!garden.find(p => p.id === plant.id)) {
      setGarden([...garden, plant]);
    }
  };

  const removeFromGarden = (id) => {
    setGarden(garden.filter(p => p.id !== id));
  };

  const isInGarden = (id) => garden.some(p => p.id === id);

  const filtered = useMemo(() => {
    return PLANTS.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.botanical.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
      if (sunFilter !== "All" && p.sun !== sunFilter) return false;
      if (waterFilter !== "All" && p.water !== waterFilter) return false;
      if (maintenanceFilter !== "All" && p.maintenance !== maintenanceFilter) return false;
      if (bloomMonthFilter && !p.bloomMonths.includes(bloomMonthFilter)) return false;
      return true;
    });
  }, [search, categoryFilter, sunFilter, waterFilter, maintenanceFilter, bloomMonthFilter]);

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5F0", color: "#2C2C2C", fontFamily: "DM Sans" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; scrollbar-width: thin; scrollbar-color: #999 #E5E5E5; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #E5E5E5; } ::-webkit-scrollbar-thumb { background: #999; border-radius: 3px; }
        input::placeholder { color: #999; }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .header-container { flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
          .header-tabs { width: 100% !important; }
          .header-tabs button { flex: 1 !important; }
          .plant-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .filter-button { font-size: 13px !important; padding: 8px 14px !important; min-height: 44px !important; }
          .month-button { font-size: 12px !important; padding: 6px 10px !important; min-height: 44px !important; }
          .search-input { font-size: 16px !important; } /* Prevents zoom on iOS */
          .plant-card { padding: 16px !important; }
          .plant-card-emoji { font-size: 40px !important; }
          .detail-emoji { font-size: 52px !important; }
          .detail-image-header { height: 220px !important; }
          .garden-calendar-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .main-content { padding: 16px 16px 60px !important; }
          .detail-modal { padding: 24px !important; max-height: 90vh !important; }
          .calendar-container { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }
          .calendar-grid { min-width: 600px !important; }
        }

        @media (max-width: 480px) {
          .garden-calendar-grid { grid-template-columns: 1fr !important; }
          .header-title { font-size: 18px !important; }
          .header-subtitle { font-size: 10px !important; }
        }
      `}</style>

      {/* Header */}
      <header className="header-container" style={{
        background: "linear-gradient(135deg, #89B4D8 0%, #F7F5F0 100%)",
        padding: "20px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0,
        backdropFilter: "blur(12px)", zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 28 }}>🌿</div>
          <div>
            <h1 className="header-title" style={{ fontFamily: "DM Serif Display", fontSize: 22, margin: 0, color: "#2C2C2C", lineHeight: 1.1 }}>Utah Garden Planner</h1>
            <p className="header-subtitle" style={{ fontSize: 11, color: "#666", margin: 0, letterSpacing: 0.5 }}>
              {PLANTS.length} plants for zones 3–10 · Intermountain West
            </p>
          </div>
        </div>

        <div className="header-tabs" style={{ display: "flex", gap: 4, background: "rgba(255, 255, 255, 0.6)", borderRadius: 8, padding: 3, backdropFilter: "blur(10px)" }}>
          {[["directory", "Plant Directory"], ["garden", `My Garden (${garden.length})`]].map(([v, label]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                background: view === v ? "#6B9BD8" : "transparent",
                border: "none", borderRadius: 6, padding: "8px 16px",
                color: view === v ? "#fff" : "#666",
                fontFamily: "DM Sans", fontSize: 13, fontWeight: 500,
                cursor: "pointer", transition: "all 0.2s"
              }}
            >{label}</button>
          ))}
        </div>
      </header>

      <main className="main-content" style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 80px" }}>

        {/* DIRECTORY VIEW */}
        {view === "directory" && (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{ position: "relative", marginBottom: 20 }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search plants by name or botanical name..."
                  className="search-input"
                  style={{
                    width: "100%", padding: "12px 16px 12px 44px",
                    background: "rgba(255, 255, 255, 0.9)", border: "2px solid rgba(107, 155, 216, 0.2)", borderRadius: 12,
                    color: "#2C2C2C", fontFamily: "DM Sans", fontSize: 14,
                    outline: "none",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 2px 12px rgba(107, 155, 216, 0.1)",
                    transition: "all 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#6B9BD8"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(107, 155, 216, 0.2)"}
                />
              </div>

              <div style={{
                background: "linear-gradient(135deg, rgba(137, 180, 216, 0.1) 0%, rgba(247, 245, 240, 0.5) 100%)",
                padding: "20px",
                borderRadius: 16,
                border: "1px solid rgba(107, 155, 216, 0.15)",
                marginBottom: 16
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 20 }}>🎯</span>
                  <span style={{ fontSize: 13, color: "#2C2C2C", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>Filter by Category</span>
                </div>
                <div style={filterGroup}>
                  {CATEGORIES.map(c => {
                    const icon = c === "All" ? "🌿" : CATEGORY_ICONS[c] || "🌸";
                    return (
                      <button key={c} onClick={() => setCategoryFilter(c)} className="filter-button" style={{
                        ...filterBtn,
                        background: categoryFilter === c ? "linear-gradient(135deg, #6B9BD8 0%, #89B4D8 100%)" : "rgba(255, 255, 255, 0.8)",
                        color: categoryFilter === c ? "#fff" : "#666",
                        border: categoryFilter === c ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
                        backdropFilter: "blur(10px)",
                        boxShadow: categoryFilter === c ? "0 4px 12px rgba(107, 155, 216, 0.3)" : "0 2px 4px rgba(0,0,0,0.05)",
                        fontWeight: categoryFilter === c ? 600 : 500,
                        transform: categoryFilter === c ? "translateY(-2px)" : "none"
                      }}>
                        <span style={{ marginRight: 4 }}>{icon}</span> {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{
                background: "linear-gradient(135deg, rgba(123, 201, 166, 0.08) 0%, rgba(247, 245, 240, 0.5) 100%)",
                padding: "20px",
                borderRadius: 16,
                border: "1px solid rgba(92, 168, 130, 0.15)",
                marginTop: 12
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 20 }}>⚙️</span>
                  <span style={{ fontSize: 13, color: "#2C2C2C", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>Growing Conditions</span>
                </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                <div style={filterGroup}>
                  {SUN_OPTIONS.map(s => (
                    <button key={s} onClick={() => setSunFilter(s)} className="filter-button" style={{
                      ...filterBtn,
                      background: sunFilter === s ? "#F4D03F" : "rgba(255, 255, 255, 0.8)",
                      color: sunFilter === s ? "#fff" : "#666",
                      border: sunFilter === s ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
                      backdropFilter: "blur(10px)",
                      boxShadow: sunFilter === s ? "0 4px 12px rgba(244, 208, 63, 0.4)" : "0 2px 4px rgba(0,0,0,0.05)",
                      fontWeight: sunFilter === s ? 600 : 500,
                      transform: sunFilter === s ? "translateY(-2px)" : "none"
                    }}>{s === "All" ? "☀️ All Light" : `${SUN_ICONS[s]} ${s}`}</button>
                  ))}
                </div>

                <div style={{ width: 2, height: 30, background: "linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.1), transparent)", borderRadius: 2, margin: "0 4px" }} />

                <div style={filterGroup}>
                  {WATER_OPTIONS.map(w => (
                    <button key={w} onClick={() => setWaterFilter(w)} className="filter-button" style={{
                      ...filterBtn,
                      background: waterFilter === w ? "#5DADE2" : "rgba(255, 255, 255, 0.8)",
                      color: waterFilter === w ? "#fff" : "#666",
                      border: waterFilter === w ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
                      backdropFilter: "blur(10px)",
                      boxShadow: waterFilter === w ? "0 4px 12px rgba(93, 173, 226, 0.4)" : "0 2px 4px rgba(0,0,0,0.05)",
                      fontWeight: waterFilter === w ? 600 : 500,
                      transform: waterFilter === w ? "translateY(-2px)" : "none"
                    }}>{w === "All" ? "💧 All Water" : `💧 ${w} Water`}</button>
                  ))}
                </div>

                <div style={{ width: 2, height: 30, background: "linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.1), transparent)", borderRadius: 2, margin: "0 4px" }} />

                <div style={filterGroup}>
                  {["All", "Low", "Medium"].map(m => (
                    <button key={m} onClick={() => setMaintenanceFilter(m)} className="filter-button" style={{
                      ...filterBtn,
                      background: maintenanceFilter === m ? "#5CA882" : "rgba(255, 255, 255, 0.8)",
                      color: maintenanceFilter === m ? "#fff" : "#666",
                      border: maintenanceFilter === m ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
                      backdropFilter: "blur(10px)",
                      boxShadow: maintenanceFilter === m ? "0 4px 12px rgba(92, 168, 130, 0.4)" : "0 2px 4px rgba(0,0,0,0.05)",
                      fontWeight: maintenanceFilter === m ? 600 : 500,
                      transform: maintenanceFilter === m ? "translateY(-2px)" : "none"
                    }}>{m === "All" ? "🛠️ All Maint." : `🛠️ ${m} Maint.`}</button>
                  ))}
                </div>
              </div>
              </div>

              <div style={{
                background: "linear-gradient(135deg, rgba(155, 126, 216, 0.08) 0%, rgba(247, 245, 240, 0.5) 100%)",
                padding: "20px",
                borderRadius: 16,
                border: "1px solid rgba(155, 126, 216, 0.15)",
                marginTop: 12
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 20 }}>🌸</span>
                  <span style={{ fontSize: 13, color: "#2C2C2C", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>Bloom Season</span>
                </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <button onClick={() => setBloomMonthFilter(null)} className="month-button" style={{
                  ...filterBtn, fontSize: 11, padding: "6px 12px",
                  background: !bloomMonthFilter ? "#9B7ED8" : "rgba(255, 255, 255, 0.8)",
                  color: !bloomMonthFilter ? "#fff" : "#666",
                  border: !bloomMonthFilter ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
                  backdropFilter: "blur(10px)",
                  boxShadow: !bloomMonthFilter ? "0 4px 12px rgba(155, 126, 216, 0.4)" : "0 2px 4px rgba(0,0,0,0.05)",
                  fontWeight: !bloomMonthFilter ? 600 : 500,
                  transform: !bloomMonthFilter ? "translateY(-2px)" : "none"
                }}>Any Month</button>
                {MONTHS.map((m, i) => (
                  <button key={m} onClick={() => setBloomMonthFilter(i + 1)} className="month-button" style={{
                    ...filterBtn, fontSize: 11, padding: "6px 12px",
                    background: bloomMonthFilter === i + 1 ? "#9B7ED8" : "rgba(255, 255, 255, 0.8)",
                    color: bloomMonthFilter === i + 1 ? "#fff" : "#666",
                    border: bloomMonthFilter === i + 1 ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
                    backdropFilter: "blur(10px)",
                    boxShadow: bloomMonthFilter === i + 1 ? "0 4px 12px rgba(155, 126, 216, 0.4)" : "0 2px 4px rgba(0,0,0,0.05)",
                    fontWeight: bloomMonthFilter === i + 1 ? 600 : 500,
                    transform: bloomMonthFilter === i + 1 ? "translateY(-2px)" : "none"
                  }}>{m}</button>
                ))}
              </div>
              </div>
            </div>

            <div style={{ fontFamily: "DM Sans", fontSize: 12, color: "#666", marginBottom: 16 }}>
              Showing {filtered.length} of {PLANTS.length} plants
              {garden.length > 0 && <span style={{ color: "#5CA882", marginLeft: 12 }}>· {garden.length} in your garden</span>}
            </div>

            <div className="plant-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {filtered.map(p => (
                <PlantCard
                  key={p.id}
                  plant={p}
                  onAdd={addToGarden}
                  onRemove={removeFromGarden}
                  isInGarden={isInGarden(p.id)}
                  onSelect={setSelectedPlant}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🌵</div>
                <p style={{ fontFamily: "DM Serif Display", fontSize: 20, color: "#666" }}>No plants match your filters</p>
                <p style={{ fontFamily: "DM Sans", fontSize: 13, color: "#999" }}>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        )}

        {/* GARDEN VIEW */}
        {view === "garden" && (
          <>
            {garden.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🏡</div>
                <h2 style={{ fontFamily: "DM Serif Display", fontSize: 28, color: "#2C2C2C", margin: "0 0 8px" }}>Your Garden is Empty</h2>
                <p style={{ fontFamily: "DM Sans", fontSize: 14, color: "#666", marginBottom: 24 }}>
                  Browse the plant directory and add plants to build your garden plan.
                </p>
                <button onClick={() => setView("directory")} style={{
                  background: "linear-gradient(135deg, #6B9BD8 0%, #89B4D8 100%)", border: "none", borderRadius: 8,
                  padding: "12px 32px", color: "#fff", fontFamily: "DM Sans",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(107, 155, 216, 0.3)"
                }}>Browse Plants →</button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <div>
                    <h2 style={{ fontFamily: "DM Serif Display", fontSize: 26, color: "#2C2C2C", margin: 0 }}>My Garden</h2>
                    <p style={{ fontFamily: "DM Sans", fontSize: 12, color: "#666", margin: "4px 0 0" }}>{garden.length} plant{garden.length !== 1 ? "s" : ""} in your collection</p>
                  </div>
                  <div style={{ display: "flex", gap: 12, fontFamily: "DM Sans", fontSize: 11, color: "#666" }}>
                    <span><span style={{ color: "#7BC9A6" }}>▲</span> Plant</span>
                    <span><span style={{ color: "#6B9BD8" }}>●</span> Bloom</span>
                    <span><span style={{ color: "#E69850" }}>✂</span> Prune</span>
                  </div>
                </div>

                <h3 style={{ fontFamily: "DM Serif Display", fontSize: 18, color: "#2C2C2C", marginBottom: 12 }}>Year at a Glance</h3>
                <div className="calendar-container">
                  <GardenCalendar gardenPlants={garden} />
                </div>

                <h3 style={{ fontFamily: "DM Serif Display", fontSize: 18, color: "#2C2C2C", margin: "32px 0 12px" }}>Your Plants</h3>
                {garden.map(p => (
                  <GardenPlantRow key={p.id} plant={p} onRemove={removeFromGarden} />
                ))}
              </>
            )}
          </>
        )}
      </main>

      {selectedPlant && (
        <PlantDetail
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
          onAdd={addToGarden}
          onRemove={removeFromGarden}
          isInGarden={isInGarden(selectedPlant.id)}
        />
      )}
    </div>
  );
}
