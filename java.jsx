import React, { useState, useEffect } from "react";
import {
  Home, Clock, MessageCircle, User, Camera, Flame, Droplets,
  Moon, Footprints, ChevronLeft, Check, Pencil, Send, Sparkles,
  Salad, TrendingUp
} from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap');`;

function Ring({ value, size = 132, stroke = 12, label, sub }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E3F0E2" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="#1F7A3D" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ fontFamily: "Fraunces, serif", fontSize: 34, fontWeight: 700, color: "#14361D", lineHeight: 1 }}>{value}</span>
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, color: "#7C8B7E", marginTop: 2 }}>/100</span>
      </div>
    </div>
  );
}

function StatRow({ icon: Icon, label, value, max, unit, color }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0" }}>
      <div style={{
        width: 30, height: 30, borderRadius: 9, background: color + "1A",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
      }}>
        <Icon size={15} color={color} strokeWidth={2.4} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Manrope", fontSize: 12.5, color: "#14361D", marginBottom: 4 }}>
          <span style={{ fontWeight: 600 }}>{label}</span>
          <span style={{ color: "#7C8B7E" }}>{value}{unit} / {max}{unit}</span>
        </div>
        <div style={{ height: 5, borderRadius: 3, background: "#EDF4EC" }}>
          <div style={{ width: `${pct}%`, height: "100%", borderRadius: 3, background: color, transition: "width .6s ease" }} />
        </div>
      </div>
    </div>
  );
}

function TopBar({ title, onBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "18px 20px 6px" }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: "#FFFFFF", border: "1px solid #E3F0E2", borderRadius: 10,
          width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
        }}>
          <ChevronLeft size={17} color="#14361D" />
        </button>
      )}
      <span style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 18, color: "#14361D" }}>{title}</span>
    </div>
  );
}

function HomeScreen({ goScan }) {
  return (
    <div style={{ padding: "22px 20px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "Manrope", fontSize: 12.5, color: "#7C8B7E" }}>Selamat siang,</div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 21, fontWeight: 600, color: "#14361D" }}>Ferliy 👋</div>
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: 12, background: "#14361D",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Manrope", fontWeight: 700
        }}>L</div>
      </div>

      <div style={{
        marginTop: 20, background: "linear-gradient(150deg,#1F7A3D,#14361D)",
        borderRadius: 22, padding: "20px 18px", color: "#fff",
        display: "flex", alignItems: "center", gap: 16
      }}>
        <div style={{ background: "#F6FBF3", borderRadius: "50%" }}>
          <Ring value={85} size={92} stroke={9} />
        </div>
        <div>
          <div style={{ fontFamily: "Manrope", fontSize: 11, letterSpacing: 0.4, opacity: 0.75, textTransform: "uppercase" }}>Healthy Plate Score</div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 16, fontWeight: 600, marginTop: 3 }}>Kamu sudah makan seimbang</div>
          <div style={{ fontFamily: "Manrope", fontSize: 11.5, opacity: 0.75, marginTop: 4 }}>Estimasi berdasarkan foto yang kamu unggah hari ini</div>
        </div>
      </div>

      <div style={{ marginTop: 22, fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: "#14361D" }}>Ringkasan hari ini</div>
      <div style={{ marginTop: 6, background: "#fff", borderRadius: 16, padding: "6px 14px", border: "1px solid #EDF4EC" }}>
        <StatRow icon={Flame} label="Kalori" value={1650} max={2000} unit=" kcal" color="#E8734A" />
        <StatRow icon={Salad} label="Protein" value={90} max={120} unit="g" color="#1F7A3D" />
        <StatRow icon={Footprints} label="Aktivitas" value={7250} max={10000} unit=" langkah" color="#3FA85C" />
        <StatRow icon={Droplets} label="Air" value={1.6} max={2} unit="L" color="#3C8FC9" />
        <StatRow icon={Moon} label="Tidur" value={7.5} max={8} unit=" jam" color="#7C5CBF" />
      </div>

      <button onClick={goScan} style={{
        marginTop: 20, width: "100%", background: "#1F7A3D", border: "none", borderRadius: 16,
        padding: "15px 0", color: "#fff", fontFamily: "Manrope", fontWeight: 700, fontSize: 14.5,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer"
      }}>
        <Camera size={17} /> Scan Makanan
      </button>
    </div>
  );
}

const SCAN_STEPS = ["camera", "loading", "result"];

function ScanScreen({ onDone }) {
  const [step, setStep] = useState("camera");
  const [editing, setEditing] = useState(false);
  const [portion, setPortion] = useState(320);

  useEffect(() => {
    if (step === "loading") {
      const t = setTimeout(() => setStep("result"), 1400);
      return () => clearTimeout(t);
    }
  }, [step]);

  if (step === "camera") {
    return (
      <div style={{ padding: "0 0 100px" }}>
        <TopBar title="AI Food Scanner" onBack={onDone} />
        <div style={{ margin: "10px 20px", borderRadius: 20, overflow: "hidden", background: "#14361D", aspectRatio: "1/1.05", position: "relative" }}>
          <img src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=60"
               alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
          <div style={{
            position: "absolute", inset: 22, border: "2px dashed rgba(255,255,255,.6)", borderRadius: 16
          }} />
          <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, textAlign: "center", color: "#fff", fontFamily: "Manrope", fontSize: 12 }}>
            Posisikan seluruh makanan dalam bingkai
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
          <button onClick={() => setStep("loading")} style={{
            width: 66, height: 66, borderRadius: "50%", background: "#1F7A3D", border: "5px solid #EDF4EC",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
          }}>
            <Camera size={24} color="#fff" />
          </button>
        </div>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div style={{ padding: "80px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ animation: "spin 1.4s linear infinite" }}>
          <Sparkles size={34} color="#1F7A3D" />
        </div>
        <div style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: 13.5, color: "#14361D" }}>Mengenali makanan...</div>
        <div style={{ fontFamily: "Manrope", fontSize: 11.5, color: "#7C8B7E", textAlign: "center" }}>
          Menghitung estimasi kandungan gizi dari foto kamu
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 0 110px" }}>
      <TopBar title="Hasil Scan" onBack={onDone} />
      <div style={{ margin: "6px 20px 0", borderRadius: 18, overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=60"
             alt="food" style={{ width: "100%", height: 150, objectFit: "cover" }} />
      </div>
      <div style={{ padding: "14px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "Manrope", fontSize: 10.5, color: "#1F7A3D", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>
          <Check size={12} /> Estimasi kandungan gizi
        </div>
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 19, fontWeight: 600, color: "#14361D", marginTop: 4 }}>
          Nasi Padang, Rendang, Sayur Nangka
        </div>

        <div style={{
          marginTop: 10, background: "#FBF6EF", border: "1px solid #F0E4CE", borderRadius: 12,
          padding: "10px 12px", fontFamily: "Manrope", fontSize: 11, color: "#8A6A2E"
        }}>
          Angka di bawah ini adalah <b>estimasi</b>, bukan pengukuran pasti. Sesuaikan bila perlu.
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
          <span style={{ fontFamily: "Manrope", fontSize: 12.5, fontWeight: 600, color: "#14361D" }}>
            Estimasi porsi: {portion} g
          </span>
          <button onClick={() => setEditing((e) => !e)} style={{
            background: "none", border: "none", display: "flex", alignItems: "center", gap: 4,
            color: "#1F7A3D", fontFamily: "Manrope", fontSize: 12, fontWeight: 700, cursor: "pointer"
          }}>
            <Pencil size={12} /> {editing ? "Selesai" : "Koreksi porsi"}
          </button>
        </div>
        {editing && (
          <input type="range" min="150" max="600" value={portion}
                 onChange={(e) => setPortion(Number(e.target.value))}
                 style={{ width: "100%", marginTop: 8, accentColor: "#1F7A3D" }} />
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
          {[
            ["Kalori", Math.round(496 * (portion / 320)), "kcal", "#E8734A"],
            ["Protein", Math.round(38 * (portion / 320)), "g", "#1F7A3D"],
            ["Karbohidrat", Math.round(58 * (portion / 320)), "g", "#3C8FC9"],
            ["Lemak", Math.round(14 * (portion / 320)), "g", "#C9922F"],
          ].map(([label, val, unit, color]) => (
            <div key={label} style={{ background: "#fff", border: "1px solid #EDF4EC", borderRadius: 14, padding: "12px 14px" }}>
              <div style={{ fontFamily: "Manrope", fontSize: 10.5, color: "#7C8B7E" }}>{label}</div>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 19, fontWeight: 700, color }}>{val}<span style={{ fontSize: 11, fontFamily: "Manrope", color: "#7C8B7E" }}> {unit}</span></div>
            </div>
          ))}
        </div>

        <button onClick={onDone} style={{
          marginTop: 20, width: "100%", background: "#14361D", border: "none", borderRadius: 14,
          padding: "13px 0", color: "#fff", fontFamily: "Manrope", fontWeight: 700, fontSize: 13.5, cursor: "pointer"
        }}>
          Simpan ke Riwayat
        </button>
      </div>
    </div>
  );
}

function CoachScreen() {
  const [messages, setMessages] = useState([
    { from: "coach", text: "Halo Ferliy! Aku AI Nutrition Coach kamu. Ada yang mau ditanyain soal pola makan hari ini?" },
    { from: "user", text: "Aku mau mulai turunin berat badan, mulai dari mana ya?" },
    { from: "coach", text: "Sip! Untuk weight loss, coba mulai dari sarapan tinggi protein & rendah lemak misalnya oatmeal + telur rebus. Aku bisa bantu susun meal plan mingguan kalau mau." },
  ]);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { from: "user", text: draft }]);
    setDraft("");
  };

  return (
    <div style={{ padding: "0 0 90px", display: "flex", flexDirection: "column", height: "100%" }}>
      <TopBar title="AI Nutrition Coach" />
      <div style={{ flex: 1, padding: "6px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.from === "coach" ? "flex-start" : "flex-end",
            maxWidth: "80%", background: m.from === "coach" ? "#fff" : "#1F7A3D",
            color: m.from === "coach" ? "#14361D" : "#fff",
            border: m.from === "coach" ? "1px solid #EDF4EC" : "none",
            borderRadius: 14, padding: "10px 13px", fontFamily: "Manrope", fontSize: 12.5, lineHeight: 1.45
          }}>
            {m.text}
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 16px 0", display: "flex", gap: 8 }}>
        <input value={draft} onChange={(e) => setDraft(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && send()}
               placeholder="Tanyakan apa saja..."
               style={{
                 flex: 1, border: "1px solid #E3F0E2", borderRadius: 12, padding: "10px 14px",
                 fontFamily: "Manrope", fontSize: 12.5, outline: "none"
               }} />
        <button onClick={send} style={{
          width: 40, height: 40, borderRadius: 12, background: "#1F7A3D", border: "none",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0
        }}>
          <Send size={15} color="#fff" />
        </button>
      </div>
    </div>
  );
}

function HistoryScreen() {
  const items = [
    ["Nasi Padang, Rendang, Sayur Nangka", "12:30", 496],
    ["Ayam Geprek, Nasi, Lalapan", "08:15", 610],
    ["Gado-Gado", "Kemarin, 19:40", 380],
  ];
  return (
    <div style={{ padding: "0 0 100px" }}>
      <TopBar title="Riwayat" />
      <div style={{ padding: "6px 20px 0" }}>
        <div style={{
          background: "#fff", border: "1px solid #EDF4EC", borderRadius: 16, padding: "16px",
          display: "flex", alignItems: "center", gap: 12, marginBottom: 14
        }}>
          <TrendingUp size={20} color="#1F7A3D" />
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12.5, color: "#14361D" }}>Rata-rata skor minggu ini: 82</div>
            <div style={{ fontFamily: "Manrope", fontSize: 11, color: "#7C8B7E" }}>Naik 6 poin dari minggu lalu</div>
          </div>
        </div>
        {items.map(([name, time, kcal], i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "#fff", border: "1px solid #EDF4EC", borderRadius: 14, padding: "12px 14px", marginBottom: 9
          }}>
            <div>
              <div style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: 12.5, color: "#14361D" }}>{name}</div>
              <div style={{ fontFamily: "Manrope", fontSize: 10.5, color: "#7C8B7E", marginTop: 2 }}>{time}</div>
            </div>
            <div style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: 15, color: "#E8734A" }}>{kcal} kcal</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  const [goal, setGoal] = useState("Weight Loss");
  const goals = ["Weight Loss", "Weight Gain", "Bulking", "Healthy Lifestyle"];
  return (
    <div style={{ padding: "0 0 100px" }}>
      <TopBar title="Profil" />
      <div style={{ padding: "6px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: "#14361D", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Fraunces, serif", fontSize: 20, fontWeight: 700 }}>L</div>
          <div>
            <div style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 16, color: "#14361D" }}>Ferliy</div>
            <div style={{ fontFamily: "Manrope", fontSize: 11, color: "#7C8B7E" }}>160 cm · 65 kg</div>
          </div>
        </div>

        <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12.5, color: "#14361D", marginBottom: 8 }}>Tujuan kesehatan</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {goals.map((g) => (
            <button key={g} onClick={() => setGoal(g)} style={{
              padding: "8px 13px", borderRadius: 999, fontFamily: "Manrope", fontSize: 11.5, fontWeight: 600,
              border: goal === g ? "1px solid #1F7A3D" : "1px solid #E3F0E2",
              background: goal === g ? "#1F7A3D" : "#fff",
              color: goal === g ? "#fff" : "#14361D", cursor: "pointer"
            }}>{g}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { key: "home", label: "Beranda", icon: Home },
  { key: "history", label: "Riwayat", icon: Clock },
  { key: "coach", label: "Coach", icon: MessageCircle },
  { key: "profile", label: "Profil", icon: User },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [scanning, setScanning] = useState(false);

  const renderTab = () => {
    if (scanning) return <ScanScreen onDone={() => setScanning(false)} />;
    switch (tab) {
      case "home": return <HomeScreen goScan={() => setScanning(true)} />;
      case "history": return <HistoryScreen />;
      case "coach": return <CoachScreen />;
      case "profile": return <ProfileScreen />;
      default: return null;
    }
  };

  return (
    <div style={{
      width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#EAF2E8", fontFamily: "Manrope, sans-serif", padding: "24px 0"
    }}>
      <style>{FONT_IMPORT}</style>
      <div style={{
        width: 390, height: 780, background: "#F6FBF3", borderRadius: 40, overflow: "hidden",
        position: "relative", boxShadow: "0 30px 60px -20px rgba(20,54,29,0.35)", border: "8px solid #14361D"
      }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 24, background: "#14361D", borderRadius: "0 0 16px 16px", zIndex: 10 }} />
        <div style={{ height: "100%", overflowY: "auto" }}>
          {renderTab()}
        </div>

        {!scanning && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 78,
            background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)",
            borderTop: "1px solid #EDF4EC", display: "flex", alignItems: "center", justifyContent: "space-around",
            padding: "0 8px"
          }}>
            {TABS.map(({ key, label, icon: Icon }) => {
              const active = tab === key;
              return (
                <button key={key} onClick={() => setTab(key)} style={{
                  background: "none", border: "none", display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 3, cursor: "pointer", padding: "6px 10px"
                }}>
                  <Icon size={19} color={active ? "#1F7A3D" : "#A9B8AA"} strokeWidth={active ? 2.6 : 2} />
                  <span style={{
                    fontFamily: "Manrope", fontSize: 9.5, fontWeight: active ? 700 : 500,
                    color: active ? "#1F7A3D" : "#A9B8AA"
                  }}>{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
