import { useState, useEffect, useMemo } from "react";

// ─── GROUPS ──────────────────────────────────────────────────────────────────
export const GROUPS = [
  { id:"selena",   label:"Selena",          color:"#E91E8C", bg:"#FDE8F4", txt:"#8B0057", emoji:"💕" },
  { id:"exercise", label:"Exercise",         color:"#27AE60", bg:"#E4F9EE", txt:"#1A7040", emoji:"🏃" },
  { id:"food",     label:"Food & Drink",    color:"#E67E22", bg:"#FEF3E7", txt:"#A04000", emoji:"🍽️" },
  { id:"home",     label:"Home",             color:"#2980B9", bg:"#EBF5FB", txt:"#1A5276", emoji:"🏠" },
  { id:"wellbeing",label:"Wellbeing",        color:"#8E44AD", bg:"#F5EEF8", txt:"#6C3483", emoji:"🧘" },
  { id:"social",   label:"Family & Social", color:"#C0392B", bg:"#FDEDEC", txt:"#922B21", emoji:"👨‍👩‍👧" },
  { id:"hobbies",  label:"Hobbies",          color:"#D68910", bg:"#FEF9E7", txt:"#9A6900", emoji:"🎮" },
  { id:"work",     label:"Work & Life",     color:"#1ABC9C", bg:"#E8F8F5", txt:"#0E6655", emoji:"💼" },
];

// ─── TASKS ────────────────────────────────────────────────────────────────────
const DEFAULT_TASKS = [
  // 💕 Selena
  { id:"s1",  label:"Massage to Selena",    emoji:"💆", group:"selena"    },
  { id:"s2",  label:"Kissed Selena",         emoji:"💋", group:"selena"    },
  { id:"s3",  label:"Intimate with Selena",  emoji:"❤️", group:"selena"    },
  { id:"s4",  label:"Gift for Selena",       emoji:"🎁", group:"selena"    },
  { id:"s5",  label:"Date with Selena",      emoji:"🥂", group:"selena"    },
  // 🏃 Exercise
  { id:"e1",  label:"Jogged",                emoji:"🏃", group:"exercise"  },
  { id:"e2",  label:"Climbed",               emoji:"🧗", group:"exercise"  },
  { id:"e3",  label:"Played football",       emoji:"⚽", group:"exercise"  },
  { id:"e4",  label:"Went for a walk",       emoji:"🚶", group:"exercise"  },
  { id:"e5",  label:"Went for a hike",       emoji:"🥾", group:"exercise"  },
  { id:"e6",  label:"Went for a cycle",      emoji:"🚴", group:"exercise"  },
  { id:"e7",  label:"Did some gardening",    emoji:"🌱", group:"exercise"  },
  // 🍽️ Food & Drink
  { id:"f1",  label:"Cooked a meal",         emoji:"🍳", group:"food"      },
  { id:"f2",  label:"Drank alcohol",         emoji:"🍺", group:"food"      },
  { id:"f3",  label:"Ate chocolate",         emoji:"🍫", group:"food"      },
  { id:"f4",  label:"Bought a coffee out",   emoji:"☕", group:"food"      },
  { id:"f5",  label:"Big grocery shop",      emoji:"🛒", group:"food"      },
  { id:"f6",  label:"Little grocery shop",   emoji:"🛍️", group:"food"      },
  // 🏠 Home
  { id:"h1",  label:"Cleaned my office",     emoji:"🖥️", group:"home"      },
  { id:"h2",  label:"Cleaned the kitchen",   emoji:"🫙", group:"home"      },
  { id:"h3",  label:"Cleaned the lounge",    emoji:"🛋️", group:"home"      },
  { id:"h4",  label:"Cleaned the bedroom",   emoji:"🛏️", group:"home"      },
  { id:"h5",  label:"Cleaned elsewhere",     emoji:"🧹", group:"home"      },
  { id:"h6",  label:"Dishwasher",            emoji:"🫧", group:"home"      },
  { id:"h7",  label:"Washing machine",       emoji:"👕", group:"home"      },
  { id:"h8",  label:"Put washing out",       emoji:"🌬️", group:"home"      },
  { id:"h9",  label:"Put washing away",      emoji:"👔", group:"home"      },
  { id:"h10", label:"Put bins out",          emoji:"🗑️", group:"home"      },
  { id:"h11", label:"Made the bed",          emoji:"🛌", group:"home"      },
  // 🧘 Wellbeing
  { id:"w1",  label:"Read",                  emoji:"📖", group:"wellbeing" },
  { id:"w2",  label:"Journaled",             emoji:"✍️", group:"wellbeing" },
  { id:"w3",  label:"BetterHelp session",    emoji:"🧠", group:"wellbeing" },
  { id:"w4",  label:"Had a bath",            emoji:"🛁", group:"wellbeing" },
  { id:"w5",  label:"Haircut",               emoji:"✂️", group:"wellbeing" },
  // 👨‍👩‍👧 Family & Social
  { id:"c1",  label:"Spoke to mum/dad",      emoji:"📞", group:"social"    },
  { id:"c2",  label:"Spoke to Nannie",       emoji:"📞", group:"social"    },
  { id:"c3",  label:"Spoke to bro",          emoji:"📞", group:"social"    },
  { id:"c4",  label:"Spoke to sis",          emoji:"📞", group:"social"    },
  { id:"c5",  label:"Sent card to family",   emoji:"💌", group:"social"    },
  { id:"c6",  label:"Sent present to family",emoji:"🎁", group:"social"    },
  { id:"c7",  label:"Met friends",           emoji:"🤝", group:"social"    },
  { id:"c8",  label:"Work social",           emoji:"🏢", group:"social"    },
  { id:"c9",  label:"Visited family",        emoji:"🏡", group:"social"    },
  { id:"c10", label:"Pub quiz",              emoji:"🍻", group:"social"    },
  // 🎮 Hobbies
  { id:"p1",  label:"Put Romulus on",        emoji:"🎬", group:"hobbies"   },
  { id:"p2",  label:"Played PlayStation",    emoji:"🎮", group:"hobbies"   },
  { id:"p3",  label:"Played piano",          emoji:"🎹", group:"hobbies"   },
  { id:"p4",  label:"Was creative",          emoji:"🎨", group:"hobbies"   },
  { id:"p5",  label:"Played chess",          emoji:"♟️", group:"hobbies"   },
  { id:"p6",  label:"Played computer game",  emoji:"🖱️", group:"hobbies"   },
  { id:"p7",  label:"Watched a film",        emoji:"🎥", group:"hobbies"   },
  { id:"p8",  label:"Went on Claude",        emoji:"🤖", group:"hobbies"   },
  // 💼 Work & Life
  { id:"k1",  label:"Went into the office",  emoji:"🏢", group:"work"      },
  { id:"k2",  label:"Stayed overnight",      emoji:"🌙", group:"work"      },
];

// ─── MOOD ─────────────────────────────────────────────────────────────────────
const MOOD = [
  { v:1, emoji:"😢", label:"Rough", color:"#E74C3C", bg:"#FDEDEC" },
  { v:2, emoji:"😕", label:"Low",   color:"#E67E22", bg:"#FEF3E7" },
  { v:3, emoji:"😐", label:"Okay",  color:"#F0B429", bg:"#FFFAEB" },
  { v:4, emoji:"🙂", label:"Good",  color:"#2ECC71", bg:"#E9F7EF" },
  { v:5, emoji:"😄", label:"Great", color:"#27AE60", bg:"#E4F9EE" },
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];
const DAYS   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const todayDate = new Date();
const TODAY     = toKey(todayDate);

// ─── UTILS ────────────────────────────────────────────────────────────────────
function toKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function fromKey(k) {
  const [y,m,d] = k.split("-").map(Number);
  return new Date(y, m-1, d);
}
function weekMon(d) {
  const r = new Date(d);
  r.setDate(d.getDate() - ((d.getDay()+6) % 7));
  return r;
}
function useLS(key, init) {
  const [v, set] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, set];
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [logs, setLogs]       = useLS("hbt-logs",   {});
  const [customs, setCT]      = useLS("hbt-custom",  []);
  const [view, setView]       = useState("month");
  const [cursor, setCursor]   = useState(new Date());
  const [selectedKey, setSel] = useState(null);
  const [filterGroup, setFG]  = useState(null);
  const [filterTask,  setFT]  = useState(null);
  const [addOpen, setAdd]     = useState(false);

  const allTasks = useMemo(() => [...DEFAULT_TASKS, ...customs], [customs]);

  function toggleTask(dk, tid) {
    setLogs(p => {
      const day   = p[dk] ?? { tasks:[], mood:null };
      const tasks = day.tasks.includes(tid)
        ? day.tasks.filter(t => t !== tid)
        : [...day.tasks, tid];
      return { ...p, [dk]: { ...day, tasks } };
    });
  }
  function setMood(dk, mv) {
    setLogs(p => {
      const day = p[dk] ?? { tasks:[], mood:null };
      return { ...p, [dk]: { ...day, mood: day.mood === mv ? null : mv } };
    });
  }
  function addTask(t) {
    setCT(p => [...p, { ...t, id:`u${Date.now()}` }]);
    setAdd(false);
  }

  const highlighted = useMemo(() => {
    if (!filterGroup && !filterTask) return null;
    const s = new Set();
    Object.entries(logs).forEach(([k, v]) => {
      const tasks = v?.tasks ?? [];
      if (filterTask) {
        if (tasks.includes(filterTask)) s.add(k);
      } else if (filterGroup) {
        if (tasks.some(tid => allTasks.find(t => t.id===tid)?.group === filterGroup)) s.add(k);
      }
    });
    return s;
  }, [logs, filterGroup, filterTask, allTasks]);

  const hlGroup = filterTask
    ? GROUPS.find(g => g.id === allTasks.find(t => t.id===filterTask)?.group)
    : filterGroup ? GROUPS.find(g => g.id===filterGroup) : null;

  function navigate(dir) {
    setCursor(p => {
      const d = new Date(p);
      if (view==="month")     d.setMonth(d.getMonth() + dir);
      else if (view==="week") d.setDate(d.getDate() + dir*7);
      else                    d.setDate(d.getDate() + dir);
      return d;
    });
  }

  function headerLabel() {
    if (view==="month") return `${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`;
    if (view==="week") {
      const mon = weekMon(cursor);
      const sun = new Date(mon); sun.setDate(mon.getDate()+6);
      if (mon.getMonth()===sun.getMonth())
        return `${MONTHS[mon.getMonth()].slice(0,3)} ${mon.getDate()}–${sun.getDate()}, ${cursor.getFullYear()}`;
      return `${MONTHS[mon.getMonth()].slice(0,3)} ${mon.getDate()} – ${MONTHS[sun.getMonth()].slice(0,3)} ${sun.getDate()}`;
    }
    return cursor.toLocaleDateString("en-GB", {weekday:"long", day:"numeric", month:"long"});
  }

  function selectDay(k) { setSel(p => p===k ? null : k); }

  useEffect(() => {
    document.body.style.overflow = (selectedKey || addOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedKey, addOpen]);

  return (
    <div style={{maxWidth:"480px", margin:"0 auto", minHeight:"100dvh", background:"#f8f8f8", fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'}}>

      {/* ── STICKY HEADER ── */}
      <div style={{position:"sticky", top:0, zIndex:40, background:"#fff", borderBottom:"1px solid #eee", paddingTop:"env(safe-area-inset-top)"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px 8px"}}>
          <button onClick={()=>navigate(-1)} style={ICON_BTN}>‹</button>
          <span style={{fontSize:"17px", fontWeight:800, color:"#111"}}>{headerLabel()}</span>
          <button onClick={()=>navigate(1)} style={ICON_BTN}>›</button>
        </div>

        {/* View toggle */}
        <div style={{display:"flex", margin:"0 16px 10px", background:"#f2f2f2", borderRadius:"10px", padding:"2px", gap:"2px"}}>
          {["month","week","day"].map(v => (
            <button key={v} onClick={()=>setView(v)} style={{
              flex:1, padding:"7px 0", border:"none", borderRadius:"8px", cursor:"pointer", fontSize:"13px",
              background:   view===v?"#fff":"transparent",
              color:        view===v?"#111":"#888",
              fontWeight:   view===v?800:400,
              boxShadow:    view===v?"0 1px 4px rgba(0,0,0,0.1)":"none",
            }}>{v.charAt(0).toUpperCase()+v.slice(1)}</button>
          ))}
        </div>

        {/* Group filter pills */}
        <div style={{display:"flex", overflowX:"auto", gap:"6px", padding:"0 16px 10px", scrollbarWidth:"none"}}>
          {GROUPS.map(g => {
            const on = filterGroup===g.id;
            return (
              <button key={g.id} onClick={()=>{setFG(on?null:g.id); setFT(null);}} style={{
                flexShrink:0, padding:"5px 12px", borderRadius:"20px", border:"none", cursor:"pointer", fontSize:"12px",
                background:on?g.color:"#f2f2f2", color:on?"#fff":"#555", fontWeight:on?700:400,
              }}>{g.emoji} {g.label}</button>
            );
          })}
        </div>

        {/* Sub-task filter */}
        {filterGroup && (
          <div style={{display:"flex", overflowX:"auto", gap:"6px", padding:"0 16px 10px", scrollbarWidth:"none"}}>
            {allTasks.filter(t=>t.group===filterGroup).map(t => {
              const on = filterTask===t.id;
              const g  = GROUPS.find(x=>x.id===t.group);
              return (
                <button key={t.id} onClick={()=>setFT(on?null:t.id)} style={{
                  flexShrink:0, padding:"4px 10px", borderRadius:"16px", cursor:"pointer", fontSize:"11px",
                  border:     on?`1.5px solid ${g.color}`:"1px solid #ddd",
                  background: on?g.bg:"#fff", color:on?g.txt:"#777", fontWeight:on?700:400,
                }}>{t.emoji} {t.label}</button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── CALENDAR BODY ── */}
      <div style={{padding:"12px 8px"}}>
        {view==="month" && <MonthView cursor={cursor} logs={logs} allTasks={allTasks} highlighted={highlighted} hlGroup={hlGroup} selected={selectedKey} onSelect={selectDay} />}
        {view==="week"  && <WeekView  cursor={cursor} logs={logs} allTasks={allTasks} highlighted={highlighted} hlGroup={hlGroup} selected={selectedKey} onSelect={selectDay} />}
        {view==="day"   && <DayColumn cursor={cursor} logs={logs} allTasks={allTasks} selected={selectedKey} onSelect={selectDay} />}
      </div>

      {/* ── DAY SHEET ── */}
      {selectedKey && <>
        <div onClick={()=>setSel(null)} style={BACKDROP} />
        <DaySheet
          dateKey={selectedKey} logs={logs} allTasks={allTasks}
          onToggle={toggleTask} onMood={setMood}
          onClose={()=>setSel(null)} onAddTask={()=>setAdd(true)}
        />
      </>}

      {/* ── ADD TASK SHEET ── */}
      {addOpen && <>
        <div onClick={()=>setAdd(false)} style={{...BACKDROP, zIndex:199}} />
        <AddSheet onAdd={addTask} onClose={()=>setAdd(false)} />
      </>}
    </div>
  );
}

// ─── MONTH VIEW ───────────────────────────────────────────────────────────────
function MonthView({ cursor, logs, allTasks, highlighted, hlGroup, selected, onSelect }) {
  const y = cursor.getFullYear(), m = cursor.getMonth();
  const offset = (new Date(y,m,1).getDay()+6)%7;
  const dim    = new Date(y,m+1,0).getDate();
  const dimP   = new Date(y,m,0).getDate();
  const cells  = [];

  for (let i=0; i<offset; i++) {
    const d=dimP-offset+1+i, pm=m===0?11:m-1, py=m===0?y-1:y;
    cells.push({d, key:`${py}-${String(pm+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`, cur:false});
  }
  for (let d=1; d<=dim; d++)
    cells.push({d, key:`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`, cur:true});
  for (let d=1; cells.length<42; d++) {
    const nm=m===11?0:m+1, ny=m===11?y+1:y;
    cells.push({d, key:`${ny}-${String(nm+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`, cur:false});
  }

  return (
    <div style={{borderRadius:"14px", overflow:"hidden", border:"1px solid #eee", background:"#eee"}}>
      <div style={{display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1px"}}>
        {DAYS.map(l => (
          <div key={l} style={{background:"#f5f5f5", textAlign:"center", padding:"7px 0", fontSize:"10px", fontWeight:700, color:"#bbb", textTransform:"uppercase", letterSpacing:"0.04em"}}>{l}</div>
        ))}
        {cells.map((c,i) => {
          const dl    = c.cur ? (logs[c.key] ?? {}) : {};
          const tids  = dl.tasks ?? [];
          const mood  = dl.mood;
          const mc    = mood ? MOOD.find(x=>x.v===mood)?.color : null;
          const hl    = c.cur && highlighted?.has(c.key);
          const isSel = c.key===selected, isToday = c.key===TODAY;
          const grps  = [...new Set(tids.map(tid=>allTasks.find(t=>t.id===tid)?.group).filter(Boolean))];
          return (
            <div key={i} onClick={()=>c.cur&&onSelect(c.key)} style={{
              background:    hl?hlGroup?.bg:isSel?"#EBF3FF":"#fff",
              padding:       "5px 3px", minHeight:"60px",
              cursor:        c.cur?"pointer":"default", opacity:c.cur?1:0.3,
              borderLeft:    hl?`3px solid ${hlGroup?.color}`:"3px solid transparent",
              outline:       isSel?"2px solid #5B8DEF":"none", outlineOffset:"-2px",
              position:      "relative",
            }}>
              <div style={{
                width:"22px", height:"22px", borderRadius:"50%", fontSize:"12px", fontWeight:isToday?800:400,
                background:isToday?"#111":"transparent", color:isToday?"#fff":"#222",
                display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 3px",
              }}>{c.d}</div>
              <div style={{display:"flex", flexWrap:"wrap", gap:"2px", justifyContent:"center"}}>
                {grps.slice(0,5).map(gid => {
                  const g = GROUPS.find(x=>x.id===gid);
                  return g ? <span key={gid} style={{width:"6px", height:"6px", borderRadius:"50%", background:g.color, display:"block"}} /> : null;
                })}
              </div>
              {mc && <div style={{position:"absolute", bottom:"2px", left:"4px", right:"4px", height:"3px", borderRadius:"2px", background:mc}} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── WEEK VIEW ────────────────────────────────────────────────────────────────
function WeekView({ cursor, logs, allTasks, highlighted, hlGroup, selected, onSelect }) {
  const mon  = weekMon(cursor);
  const days = Array.from({length:7}, (_,i) => { const d=new Date(mon); d.setDate(mon.getDate()+i); return d; });

  return (
    <div style={{borderRadius:"14px", overflow:"hidden", border:"1px solid #eee", background:"#eee"}}>
      <div style={{display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1px"}}>
        {days.map((d,i) => {
          const dk    = toKey(d);
          const dl    = logs[dk] ?? {};
          const tids  = dl.tasks ?? [];
          const mood  = dl.mood;
          const mc    = mood ? MOOD.find(x=>x.v===mood)?.color : null;
          const hl    = highlighted?.has(dk);
          const isSel = dk===selected, isToday = dk===TODAY;
          const grps  = [...new Set(tids.map(tid=>allTasks.find(t=>t.id===tid)?.group).filter(Boolean))];
          return (
            <div key={i} onClick={()=>onSelect(dk)} style={{
              background:  hl?hlGroup?.bg:isSel?"#EBF3FF":"#fff",
              cursor:      "pointer", position:"relative",
              borderLeft:  hl?`3px solid ${hlGroup?.color}`:"3px solid transparent",
              outline:     isSel?"2px solid #5B8DEF":"none", outlineOffset:"-2px",
            }}>
              <div style={{padding:"5px 2px", background:"#f5f5f5", borderBottom:"1px solid #eee", textAlign:"center"}}>
                <div style={{fontSize:"9px", fontWeight:700, color:"#bbb", textTransform:"uppercase"}}>{DAYS[i]}</div>
                <div style={{
                  width:"24px", height:"24px", borderRadius:"50%", fontSize:"13px", fontWeight:isToday?800:400,
                  background:isToday?"#111":"transparent", color:isToday?"#fff":"#222",
                  display:"flex", alignItems:"center", justifyContent:"center", margin:"2px auto 0",
                }}>{d.getDate()}</div>
              </div>
              <div style={{padding:"4px", minHeight:"90px", display:"flex", flexDirection:"column", gap:"2px"}}>
                {grps.map(gid => {
                  const g  = GROUPS.find(x=>x.id===gid);
                  const ct = tids.filter(tid=>allTasks.find(t=>t.id===tid)?.group===gid).length;
                  return g ? (
                    <div key={gid} style={{fontSize:"10px", padding:"2px 4px", borderRadius:"4px", background:g.bg, color:g.txt, fontWeight:700}}>
                      {g.emoji}×{ct}
                    </div>
                  ) : null;
                })}
              </div>
              {mc && <div style={{position:"absolute", bottom:"2px", left:"4px", right:"4px", height:"3px", borderRadius:"2px", background:mc}} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DAY COLUMN ───────────────────────────────────────────────────────────────
function DayColumn({ cursor, logs, allTasks, selected, onSelect }) {
  const dk   = toKey(cursor);
  const dl   = logs[dk] ?? {};
  const tids = dl.tasks ?? [];
  const mood = dl.mood;
  const mi   = mood ? MOOD.find(x=>x.v===mood) : null;

  return (
    <div style={{background:"#fff", borderRadius:"14px", border:"1px solid #eee", overflow:"hidden"}}>
      <div style={{padding:"14px 16px", background:"#f5f5f5", borderBottom:"1px solid #eee", display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:"18px", fontWeight:800, color:"#111"}}>
            {cursor.toLocaleDateString("en-GB", {weekday:"long", day:"numeric", month:"long"})}
          </div>
          {mi && <div style={{fontSize:"13px", color:mi.color, fontWeight:600, marginTop:"2px"}}>{mi.emoji} Feeling {mi.label}</div>}
          <div style={{fontSize:"12px", color:"#aaa", marginTop:"2px"}}>{tids.length} task{tids.length!==1?"s":""} logged</div>
        </div>
        <button onClick={()=>onSelect(selected===dk?null:dk)} style={{
          padding:"8px 16px", borderRadius:"10px", border:"none", cursor:"pointer", fontSize:"13px", fontWeight:800,
          background:selected===dk?"#111":"#eee", color:selected===dk?"#fff":"#333",
        }}>{selected===dk?"Close":"Log"}</button>
      </div>
      <div style={{padding:"12px 16px", minHeight:"200px"}}>
        {tids.length===0
          ? <p style={{color:"#ccc", fontSize:"14px", margin:"12px 0"}}>Nothing logged yet — tap Log to add.</p>
          : GROUPS.map(g => {
              const gTasks = tids.filter(tid=>allTasks.find(t=>t.id===tid)?.group===g.id);
              if (!gTasks.length) return null;
              return (
                <div key={g.id} style={{marginBottom:"14px"}}>
                  <div style={{fontSize:"11px", fontWeight:800, color:g.color, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:"6px"}}>{g.emoji} {g.label}</div>
                  {gTasks.map(tid => {
                    const t = allTasks.find(x=>x.id===tid);
                    return t ? (
                      <div key={tid} style={{display:"flex", alignItems:"center", gap:"10px", padding:"9px 12px", borderRadius:"10px", background:g.bg, borderLeft:`3px solid ${g.color}`, marginBottom:"4px"}}>
                        <span style={{fontSize:"20px"}}>{t.emoji}</span>
                        <span style={{fontSize:"14px", fontWeight:600, color:g.txt}}>{t.label}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              );
            })
        }
      </div>
    </div>
  );
}

// ─── DAY SHEET ────────────────────────────────────────────────────────────────
function DaySheet({ dateKey, logs, allTasks, onToggle, onMood, onClose, onAddTask }) {
  const d       = fromKey(dateKey);
  const label   = d.toLocaleDateString("en-GB", {weekday:"long", day:"numeric", month:"long"});
  const dl      = logs[dateKey] ?? {};
  const tids    = dl.tasks ?? [];
  const mood    = dl.mood;
  const isToday = dateKey===TODAY;
  const [open, setOpen] = useState(new Set());

  function toggleGroup(gid) {
    setOpen(p => { const s=new Set(p); s.has(gid)?s.delete(gid):s.add(gid); return s; });
  }

  return (
    <div style={{
      position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
      width:"100%", maxWidth:"480px", zIndex:100,
      background:"#fff", borderRadius:"22px 22px 0 0",
      boxShadow:"0 -6px 40px rgba(0,0,0,0.18)",
      maxHeight:"88vh", display:"flex", flexDirection:"column",
      paddingBottom:"max(env(safe-area-inset-bottom),16px)",
    }}>
      {/* Drag handle */}
      <div style={{display:"flex", justifyContent:"center", padding:"10px 0 6px"}}>
        <div style={{width:"36px", height:"4px", borderRadius:"2px", background:"#e0e0e0"}} />
      </div>

      {/* Header */}
      <div style={{padding:"0 20px 12px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", borderBottom:"1px solid #f0f0f0"}}>
        <div>
          <div style={{fontSize:"18px", fontWeight:800, color:"#111"}}>{label}</div>
          {isToday && <div style={{fontSize:"12px", color:"#5B8DEF", fontWeight:700}}>Today</div>}
          <div style={{fontSize:"12px", color:"#aaa"}}>{tids.length} task{tids.length!==1?"s":""} logged</div>
        </div>
        <button onClick={onClose} style={{background:"#f2f2f2", border:"none", borderRadius:"50%", width:"34px", height:"34px", cursor:"pointer", fontSize:"20px", color:"#888", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>×</button>
      </div>

      {/* Mood tracker */}
      <div style={{padding:"12px 20px", borderBottom:"1px solid #f0f0f0"}}>
        <div style={{fontSize:"11px", fontWeight:700, color:"#bbb", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"8px"}}>How are you feeling?</div>
        <div style={{display:"flex", gap:"6px"}}>
          {MOOD.map(m => {
            const on = mood===m.v;
            return (
              <button key={m.v} onClick={()=>onMood(dateKey, m.v)} style={{
                flex:1, padding:"8px 0", borderRadius:"12px", border:"none", cursor:"pointer",
                background:on?m.bg:"#f8f8f8", outline:on?`2px solid ${m.color}`:"none",
                display:"flex", flexDirection:"column", alignItems:"center", gap:"2px",
              }}>
                <span style={{fontSize:"24px"}}>{m.emoji}</span>
                <span style={{fontSize:"10px", fontWeight:700, color:on?m.color:"#ccc"}}>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task groups — accordion */}
      <div style={{overflowY:"auto", flex:1, WebkitOverflowScrolling:"touch"}}>
        {GROUPS.map(g => {
          const gTasks = allTasks.filter(t=>t.group===g.id);
          const doneN  = gTasks.filter(t=>tids.includes(t.id)).length;
          const isOpen = open.has(g.id);
          return (
            <div key={g.id}>
              <button onClick={()=>toggleGroup(g.id)} style={{
                width:"100%", display:"flex", alignItems:"center", gap:"10px",
                padding:"13px 20px", background:"#fafafa",
                border:"none", borderTop:"1px solid #f0f0f0", cursor:"pointer",
              }}>
                <span style={{fontSize:"20px"}}>{g.emoji}</span>
                <span style={{flex:1, fontSize:"15px", fontWeight:700, color:"#111", textAlign:"left"}}>{g.label}</span>
                {doneN>0 && (
                  <span style={{fontSize:"11px", fontWeight:700, color:g.txt, background:g.bg, padding:"2px 9px", borderRadius:"20px", border:`1px solid ${g.color}44`}}>
                    {doneN} ✓
                  </span>
                )}
                <span style={{fontSize:"11px", color:"#ddd"}}>{isOpen?"▲":"▼"}</span>
              </button>
              {isOpen && gTasks.map(t => {
                const done = tids.includes(t.id);
                return (
                  <button key={t.id} onClick={()=>onToggle(dateKey, t.id)} style={{
                    width:"100%", display:"flex", alignItems:"center", gap:"12px",
                    padding:"12px 20px 12px 36px",
                    background:done?g.bg:"#fff",
                    border:"none", borderTop:"1px solid #f5f5f5", cursor:"pointer",
                  }}>
                    <span style={{fontSize:"22px", flexShrink:0}}>{t.emoji}</span>
                    <span style={{flex:1, fontSize:"14px", fontWeight:done?700:400, color:done?g.txt:"#444", textAlign:"left"}}>{t.label}</span>
                    <div style={{
                      width:"24px", height:"24px", borderRadius:"50%", flexShrink:0,
                      background:done?g.color:"transparent",
                      border:`2px solid ${done?g.color:"#ddd"}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      {done && <span style={{color:"#fff", fontSize:"13px", fontWeight:900, lineHeight:1}}>✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
        <button onClick={onAddTask} style={{
          width:"100%", display:"flex", alignItems:"center", gap:"12px",
          padding:"16px 20px", background:"#f8f8f8",
          border:"none", borderTop:"1px solid #f0f0f0", cursor:"pointer", color:"#5B8DEF",
        }}>
          <span style={{fontSize:"22px", fontWeight:700}}>＋</span>
          <span style={{fontSize:"14px", fontWeight:700}}>Add a custom task</span>
        </button>
      </div>
    </div>
  );
}

// ─── ADD TASK SHEET ───────────────────────────────────────────────────────────
function AddSheet({ onAdd, onClose }) {
  const [label, setLabel] = useState("");
  const [emoji, setEmoji] = useState("⭐");
  const [group, setGroup] = useState("hobbies");
  const ok = label.trim().length > 0;

  return (
    <div style={{
      position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
      width:"100%", maxWidth:"480px", zIndex:200,
      background:"#fff", borderRadius:"22px 22px 0 0",
      boxShadow:"0 -6px 40px rgba(0,0,0,0.18)",
      padding:"20px 20px max(env(safe-area-inset-bottom),24px)",
    }}>
      <div style={{display:"flex", justifyContent:"center", marginBottom:"14px"}}>
        <div style={{width:"36px", height:"4px", borderRadius:"2px", background:"#e0e0e0"}} />
      </div>
      <div style={{fontSize:"18px", fontWeight:800, marginBottom:"18px", color:"#111"}}>Add custom task</div>

      <FieldLabel>Task name</FieldLabel>
      <input value={label} onChange={e=>setLabel(e.target.value)} placeholder="e.g. Took vitamins"
        style={INPUT} autoFocus />

      <FieldLabel>Emoji</FieldLabel>
      <input value={emoji} onChange={e=>setEmoji(e.target.value)}
        style={{...INPUT, width:"72px", textAlign:"center", fontSize:"22px"}} />

      <FieldLabel>Group</FieldLabel>
      <select value={group} onChange={e=>setGroup(e.target.value)} style={{...INPUT}}>
        {GROUPS.map(g => <option key={g.id} value={g.id}>{g.emoji} {g.label}</option>)}
      </select>

      <div style={{display:"flex", gap:"10px", marginTop:"6px"}}>
        <button onClick={onClose} style={{flex:1, padding:"14px", borderRadius:"14px", border:"1.5px solid #eee", background:"#fff", fontSize:"15px", fontWeight:700, cursor:"pointer", color:"#555"}}>Cancel</button>
        <button onClick={()=>ok&&onAdd({label:label.trim(), emoji, group})} style={{
          flex:2, padding:"14px", borderRadius:"14px", border:"none",
          background:ok?"#111":"#eee", color:ok?"#fff":"#aaa",
          fontSize:"15px", fontWeight:800, cursor:ok?"pointer":"default",
        }}>Add task</button>
      </div>
    </div>
  );
}

function FieldLabel({ children }) {
  return <div style={{fontSize:"11px", fontWeight:700, color:"#bbb", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"6px"}}>{children}</div>;
}

// ─── STYLE CONSTANTS ──────────────────────────────────────────────────────────
const ICON_BTN = {
  width:"38px", height:"38px", borderRadius:"50%", border:"none", background:"#f2f2f2",
  cursor:"pointer", fontSize:"22px", color:"#333", display:"flex", alignItems:"center", justifyContent:"center",
};
const BACKDROP = {
  position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:99,
};
const INPUT = {
  width:"100%", padding:"12px 14px", borderRadius:"12px", border:"1.5px solid #eee",
  fontSize:"15px", outline:"none", display:"block", marginBottom:"14px",
  boxSizing:"border-box", color:"#111", fontFamily:"inherit", background:"#fff",
};
