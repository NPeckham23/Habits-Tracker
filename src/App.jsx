import { useState, useEffect, useMemo } from "react";

// ─── GROUPS ──────────────────────────────────────────────────────────────────
export const GROUPS = [
  { id:"selena",   label:"Selena",          color:"#E91E8C", bg:"#FDE8F4", txt:"#8B0057", emoji:"💕" },
  { id:"exercise", label:"Exercise",         color:"#27AE60", bg:"#E4F9EE", txt:"#1A7040", emoji:"🏃" },
  { id:"food",     label:"Food & Drink",     color:"#E67E22", bg:"#FEF3E7", txt:"#A04000", emoji:"🍽️" },
  { id:"home",     label:"Home",             color:"#2980B9", bg:"#EBF5FB", txt:"#1A5276", emoji:"🏠" },
  { id:"wellbeing",label:"Wellbeing",        color:"#8E44AD", bg:"#F5EEF8", txt:"#6C3483", emoji:"🧘" },
  { id:"social",   label:"Family & Social",  color:"#C0392B", bg:"#FDEDEC", txt:"#922B21", emoji:"👨‍👩‍👧" },
  { id:"hobbies",  label:"Hobbies",          color:"#D68910", bg:"#FEF9E7", txt:"#9A6900", emoji:"🎮" },
  { id:"work",     label:"Work & Life",      color:"#1ABC9C", bg:"#E8F8F5", txt:"#0E6655", emoji:"💼" },
];

// ─── DEFAULT TASKS ────────────────────────────────────────────────────────────
const DEFAULT_TASKS = [
  { id:"s1",  label:"Massage to Selena",     emoji:"💆", group:"selena"    },
  { id:"s2",  label:"Kissed Selena",          emoji:"💋", group:"selena"    },
  { id:"s3",  label:"Intimate with Selena",   emoji:"❤️", group:"selena"    },
  { id:"s4",  label:"Gift for Selena",        emoji:"🎁", group:"selena"    },
  { id:"s5",  label:"Date with Selena",       emoji:"🥂", group:"selena"    },
  { id:"e1",  label:"Jogged",                 emoji:"🏃", group:"exercise"  },
  { id:"e2",  label:"Climbed",                emoji:"🧗", group:"exercise"  },
  { id:"e3",  label:"Played football",        emoji:"⚽", group:"exercise"  },
  { id:"e4",  label:"Went for a walk",        emoji:"🚶", group:"exercise"  },
  { id:"e5",  label:"Went for a hike",        emoji:"🥾", group:"exercise"  },
  { id:"e6",  label:"Went for a cycle",       emoji:"🚴", group:"exercise"  },
  { id:"e7",  label:"Did some gardening",     emoji:"🌱", group:"exercise"  },
  { id:"f1",  label:"Cooked a meal",          emoji:"🍳", group:"food"      },
  { id:"f2",  label:"Drank alcohol",          emoji:"🍺", group:"food"      },
  { id:"f3",  label:"Ate chocolate",          emoji:"🍫", group:"food"      },
  { id:"f4",  label:"Bought a coffee out",    emoji:"☕", group:"food"      },
  { id:"f5",  label:"Big grocery shop",       emoji:"🛒", group:"food"      },
  { id:"f6",  label:"Little grocery shop",    emoji:"🛍️", group:"food"      },
  { id:"h1",  label:"Cleaned my office",      emoji:"🖥️", group:"home"      },
  { id:"h2",  label:"Cleaned the kitchen",    emoji:"🫙", group:"home"      },
  { id:"h3",  label:"Cleaned the lounge",     emoji:"🛋️", group:"home"      },
  { id:"h4",  label:"Cleaned the bedroom",    emoji:"🛏️", group:"home"      },
  { id:"h5",  label:"Cleaned elsewhere",      emoji:"🧹", group:"home"      },
  { id:"h6",  label:"Dishwasher",             emoji:"🫧", group:"home"      },
  { id:"h7",  label:"Washing machine",        emoji:"👕", group:"home"      },
  { id:"h8",  label:"Put washing out",        emoji:"🌬️", group:"home"      },
  { id:"h9",  label:"Put washing away",       emoji:"👔", group:"home"      },
  { id:"h10", label:"Put bins out",           emoji:"🗑️", group:"home"      },
  { id:"h11", label:"Made the bed",           emoji:"🛌", group:"home"      },
  { id:"h12", label:"Put Romulus on",         emoji:"🤖", group:"home"      },
  { id:"w1",  label:"Read",                   emoji:"📖", group:"wellbeing" },
  { id:"w2",  label:"Journaled",              emoji:"✍️", group:"wellbeing" },
  { id:"w3",  label:"BetterHelp session",     emoji:"🧠", group:"wellbeing" },
  { id:"w4",  label:"Had a bath",             emoji:"🛁", group:"wellbeing" },
  { id:"w5",  label:"Haircut",                emoji:"✂️", group:"wellbeing" },
  { id:"c1",  label:"Spoke to mum/dad",       emoji:"📞", group:"social"    },
  { id:"c2",  label:"Spoke to Nannie",        emoji:"📞", group:"social"    },
  { id:"c3",  label:"Spoke to bro",           emoji:"📞", group:"social"    },
  { id:"c4",  label:"Spoke to sis",           emoji:"📞", group:"social"    },
  { id:"c5",  label:"Sent card to family",    emoji:"💌", group:"social"    },
  { id:"c6",  label:"Sent present to family", emoji:"🎁", group:"social"    },
  { id:"c7",  label:"Met friends",            emoji:"🤝", group:"social"    },
  { id:"c8",  label:"Work social",            emoji:"🏢", group:"social"    },
  { id:"c9",  label:"Visited family",         emoji:"🏡", group:"social"    },
  { id:"c10", label:"Pub quiz",               emoji:"🍻", group:"social"    },
  { id:"p2",  label:"Played PlayStation",     emoji:"🎮", group:"hobbies"   },
  { id:"p3",  label:"Played piano",           emoji:"🎹", group:"hobbies"   },
  { id:"p4",  label:"Was creative",           emoji:"🎨", group:"hobbies"   },
  { id:"p5",  label:"Played chess",           emoji:"♟️", group:"hobbies"   },
  { id:"p6",  label:"Played computer game",   emoji:"🖱️", group:"hobbies"   },
  { id:"p7",  label:"Watched a film",         emoji:"🎥", group:"hobbies"   },
  { id:"p8",  label:"Went on Claude",         emoji:"🤖", group:"hobbies"   },
  { id:"k1",  label:"Went into the office",   emoji:"🏢", group:"work"      },
  { id:"k2",  label:"Stayed overnight",       emoji:"🌙", group:"work"      },
];

// ─── MOOD ─────────────────────────────────────────────────────────────────────
const MOOD = [
  { v:1, emoji:"😢", label:"Rough", color:"#E74C3C", bg:"#FDEDEC" },
  { v:2, emoji:"😕", label:"Low",   color:"#E67E22", bg:"#FEF3E7" },
  { v:3, emoji:"😐", label:"Okay",  color:"#F0B429", bg:"#FFFAEB" },
  { v:4, emoji:"🙂", label:"Good",  color:"#2ECC71", bg:"#E9F7EF" },
  { v:5, emoji:"😄", label:"Great", color:"#27AE60", bg:"#E4F9EE" },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const todayDate = new Date();
const TODAY = toKey(todayDate);

function toKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function fromKey(k) {
  const [y,m,d] = k.split("-").map(Number);
  return new Date(y, m-1, d);
}
function weekMon(d) {
  const r = new Date(d);
  r.setDate(d.getDate() - ((d.getDay()+6)%7));
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

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [logs, setLogs]         = useLS("hbt-logs",    {});
  const [customs, setCT]        = useLS("hbt-custom",   []);
  const [metrics, setMetrics]   = useLS("hbt-metrics",  {});
  const [tab, setTab]           = useState("calendar");
  const [view, setView]         = useState("month");
  const [cursor, setCursor]     = useState(new Date());
  const [selectedKey, setSel]   = useState(null);
  const [filterGroup, setFG]    = useState(null);
  const [filterTask,  setFT]    = useState(null);
  const [addOpen, setAdd]       = useState(false);
  const [addGroup, setAddGroup] = useState(null);

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
    setAddGroup(null);
  }
  function openAddFor(gid) {
    setAddGroup(gid);
    setAdd(true);
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
      if (view==="month")     d.setMonth(d.getMonth()+dir);
      else if (view==="week") d.setDate(d.getDate()+dir*7);
      else                    d.setDate(d.getDate()+dir);
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
    return cursor.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});
  }

  function selectDay(k) { setSel(p => p===k ? null : k); }

  useEffect(() => {
    document.body.style.overflow = (selectedKey || addOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedKey, addOpen]);

  return (
    <div style={{maxWidth:"480px",margin:"0 auto",minHeight:"100dvh",background:"#f8f8f8",fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',paddingBottom:"80px"}}>

      {/* ── CALENDAR HEADER ── */}
      {tab==="calendar" && (
        <div style={{position:"sticky",top:0,zIndex:40,background:"#fff",borderBottom:"1px solid #eee",paddingTop:"env(safe-area-inset-top)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px 8px"}}>
            <button onClick={()=>navigate(-1)} style={ICON_BTN}>‹</button>
            <span style={{fontSize:"17px",fontWeight:800,color:"#111"}}>{headerLabel()}</span>
            <button onClick={()=>navigate(1)} style={ICON_BTN}>›</button>
          </div>
          <div style={{display:"flex",margin:"0 16px 10px",background:"#f2f2f2",borderRadius:"10px",padding:"2px",gap:"2px"}}>
            {["month","week","day"].map(v => (
              <button key={v} onClick={()=>setView(v)} style={{
                flex:1,padding:"7px 0",border:"none",borderRadius:"8px",cursor:"pointer",fontSize:"13px",
                background:view===v?"#fff":"transparent",color:view===v?"#111":"#888",
                fontWeight:view===v?800:400,boxShadow:view===v?"0 1px 4px rgba(0,0,0,0.1)":"none",
              }}>{v.charAt(0).toUpperCase()+v.slice(1)}</button>
            ))}
          </div>
          <div style={{display:"flex",overflowX:"auto",gap:"6px",padding:"0 16px 10px",scrollbarWidth:"none"}}>
            {GROUPS.map(g => {
              const on = filterGroup===g.id;
              return (
                <button key={g.id} onClick={()=>{setFG(on?null:g.id);setFT(null);}} style={{
                  flexShrink:0,padding:"5px 12px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"12px",
                  background:on?g.color:"#f2f2f2",color:on?"#fff":"#555",fontWeight:on?700:400,
                }}>{g.emoji} {g.label}</button>
              );
            })}
          </div>
          {filterGroup && (
            <div style={{display:"flex",overflowX:"auto",gap:"6px",padding:"0 16px 10px",scrollbarWidth:"none"}}>
              {allTasks.filter(t=>t.group===filterGroup).map(t => {
                const on = filterTask===t.id;
                const g  = GROUPS.find(x=>x.id===t.group);
                return (
                  <button key={t.id} onClick={()=>setFT(on?null:t.id)} style={{
                    flexShrink:0,padding:"4px 10px",borderRadius:"16px",cursor:"pointer",fontSize:"11px",
                    border:on?`1.5px solid ${g.color}`:"1px solid #ddd",
                    background:on?g.bg:"#fff",color:on?g.txt:"#777",fontWeight:on?700:400,
                  }}>{t.emoji} {t.label}</button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── STATS HEADER ── */}
      {tab==="stats" && (
        <div style={{position:"sticky",top:0,zIndex:40,background:"#fff",borderBottom:"1px solid #eee",paddingTop:"env(safe-area-inset-top)"}}>
          <div style={{padding:"16px 16px 14px"}}>
            <div style={{fontSize:"22px",fontWeight:800,color:"#111"}}>Your Stats</div>
          </div>
        </div>
      )}

      {/* ── METRICS HEADER ── */}
      {tab==="metrics" && (
        <div style={{position:"sticky",top:0,zIndex:40,background:"#fff",borderBottom:"1px solid #eee",paddingTop:"env(safe-area-inset-top)"}}>
          <div style={{padding:"16px 16px 14px"}}>
            <div style={{fontSize:"22px",fontWeight:800,color:"#111"}}>Metrics</div>
            <div style={{fontSize:"13px",color:"#aaa",marginTop:"2px"}}>Steps · Weight · Savings</div>
          </div>
        </div>
      )}

      {/* ── BODY ── */}
      <div style={{padding:"12px 8px"}}>
        {tab==="calendar" && <>
          {view==="month" && <MonthView cursor={cursor} logs={logs} allTasks={allTasks} highlighted={highlighted} hlGroup={hlGroup} selected={selectedKey} onSelect={selectDay}/>}
          {view==="week"  && <WeekView  cursor={cursor} logs={logs} allTasks={allTasks} highlighted={highlighted} hlGroup={hlGroup} selected={selectedKey} onSelect={selectDay}/>}
          {view==="day"   && <DayColumn cursor={cursor} logs={logs} allTasks={allTasks} selected={selectedKey} onSelect={selectDay}/>}
        </>}
        {tab==="stats"    && <StatsView logs={logs} allTasks={allTasks}/>}
        {tab==="metrics"  && <MetricsView metrics={metrics} setMetrics={setMetrics}/>}
      </div>

      {/* ── DAY SHEET ── */}
      {selectedKey && <>
        <div onClick={()=>setSel(null)} style={BACKDROP}/>
        <DaySheet
          dateKey={selectedKey} logs={logs} allTasks={allTasks}
          onToggle={toggleTask} onMood={setMood}
          onClose={()=>setSel(null)} onAddFor={openAddFor}
        />
      </>}

      {/* ── ADD TASK SHEET ── */}
      {addOpen && <>
        <div onClick={()=>{setAdd(false);setAddGroup(null);}} style={{...BACKDROP,zIndex:199}}/>
        <AddSheet defaultGroup={addGroup} onAdd={addTask} onClose={()=>{setAdd(false);setAddGroup(null);}}/>
      </>}

      {/* ── BOTTOM NAV ── */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"480px",zIndex:50,background:"#fff",borderTop:"1px solid #eee",display:"flex",paddingBottom:"env(safe-area-inset-bottom)"}}>
        {[
          {id:"calendar",emoji:"📅",label:"Calendar"},
          {id:"metrics", emoji:"📈",label:"Metrics"},
          {id:"stats",   emoji:"📊",label:"Stats"},
        ].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:1,padding:"12px 0 8px",border:"none",background:"transparent",cursor:"pointer",
            display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",
            color:tab===t.id?"#111":"#bbb",
          }}>
            <span style={{fontSize:"22px"}}>{t.emoji}</span>
            <span style={{fontSize:"10px",fontWeight:tab===t.id?800:400}}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MONTH VIEW ───────────────────────────────────────────────────────────────
function MonthView({ cursor, logs, allTasks, highlighted, hlGroup, selected, onSelect }) {
  const y=cursor.getFullYear(), m=cursor.getMonth();
  const offset=(new Date(y,m,1).getDay()+6)%7;
  const dim=new Date(y,m+1,0).getDate();
  const dimP=new Date(y,m,0).getDate();
  const cells=[];
  for(let i=0;i<offset;i++){const d=dimP-offset+1+i,pm=m===0?11:m-1,py=m===0?y-1:y;cells.push({d,key:`${py}-${String(pm+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,cur:false});}
  for(let d=1;d<=dim;d++)cells.push({d,key:`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,cur:true});
  for(let d=1;cells.length<42;d++){const nm=m===11?0:m+1,ny=m===11?y+1:y;cells.push({d,key:`${ny}-${String(nm+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,cur:false});}

  return (
    <div style={{borderRadius:"14px",overflow:"hidden",border:"1px solid #eee",background:"#eee"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"1px"}}>
        {DAYS.map(l=><div key={l} style={{background:"#f5f5f5",textAlign:"center",padding:"7px 0",fontSize:"10px",fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.04em"}}>{l}</div>)}
        {cells.map((c,i)=>{
          const dl=c.cur?(logs[c.key]??{}):{};
          const tids=dl.tasks??[];
          const mood=dl.mood;
          const mc=mood?MOOD.find(x=>x.v===mood)?.color:null;
          const hl=c.cur&&highlighted?.has(c.key);
          const isSel=c.key===selected, isToday=c.key===TODAY;
          const grps=[...new Set(tids.map(tid=>allTasks.find(t=>t.id===tid)?.group).filter(Boolean))];
          return(
            <div key={i} onClick={()=>c.cur&&onSelect(c.key)} style={{background:hl?hlGroup?.bg:isSel?"#EBF3FF":"#fff",padding:"5px 3px",minHeight:"60px",cursor:c.cur?"pointer":"default",opacity:c.cur?1:0.3,borderLeft:hl?`3px solid ${hlGroup?.color}`:"3px solid transparent",outline:isSel?"2px solid #5B8DEF":"none",outlineOffset:"-2px",position:"relative"}}>
              <div style={{width:"22px",height:"22px",borderRadius:"50%",fontSize:"12px",fontWeight:isToday?800:400,background:isToday?"#111":"transparent",color:isToday?"#fff":"#222",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 3px"}}>{c.d}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"2px",justifyContent:"center"}}>
                {grps.slice(0,5).map(gid=>{const g=GROUPS.find(x=>x.id===gid);return g?<span key={gid} style={{width:"6px",height:"6px",borderRadius:"50%",background:g.color,display:"block"}}/>:null;})}
              </div>
              {mc&&<div style={{position:"absolute",bottom:"2px",left:"4px",right:"4px",height:"3px",borderRadius:"2px",background:mc}}/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── WEEK VIEW ────────────────────────────────────────────────────────────────
function WeekView({ cursor, logs, allTasks, highlighted, hlGroup, selected, onSelect }) {
  const mon=weekMon(cursor);
  const days=Array.from({length:7},(_,i)=>{const d=new Date(mon);d.setDate(mon.getDate()+i);return d;});
  return(
    <div style={{borderRadius:"14px",overflow:"hidden",border:"1px solid #eee",background:"#eee"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"1px"}}>
        {days.map((d,i)=>{
          const dk=toKey(d),dl=logs[dk]??{},tids=dl.tasks??[],mood=dl.mood;
          const mc=mood?MOOD.find(x=>x.v===mood)?.color:null;
          const hl=highlighted?.has(dk),isSel=dk===selected,isToday=dk===TODAY;
          const grps=[...new Set(tids.map(tid=>allTasks.find(t=>t.id===tid)?.group).filter(Boolean))];
          return(
            <div key={i} onClick={()=>onSelect(dk)} style={{background:hl?hlGroup?.bg:isSel?"#EBF3FF":"#fff",cursor:"pointer",position:"relative",borderLeft:hl?`3px solid ${hlGroup?.color}`:"3px solid transparent",outline:isSel?"2px solid #5B8DEF":"none",outlineOffset:"-2px"}}>
              <div style={{padding:"5px 2px",background:"#f5f5f5",borderBottom:"1px solid #eee",textAlign:"center"}}>
                <div style={{fontSize:"9px",fontWeight:700,color:"#bbb",textTransform:"uppercase"}}>{DAYS[i]}</div>
                <div style={{width:"24px",height:"24px",borderRadius:"50%",fontSize:"13px",fontWeight:isToday?800:400,background:isToday?"#111":"transparent",color:isToday?"#fff":"#222",display:"flex",alignItems:"center",justifyContent:"center",margin:"2px auto 0"}}>{d.getDate()}</div>
              </div>
              <div style={{padding:"4px",minHeight:"90px",display:"flex",flexDirection:"column",gap:"2px"}}>
                {grps.map(gid=>{const g=GROUPS.find(x=>x.id===gid);const ct=tids.filter(tid=>allTasks.find(t=>t.id===tid)?.group===gid).length;return g?<div key={gid} style={{fontSize:"10px",padding:"2px 4px",borderRadius:"4px",background:g.bg,color:g.txt,fontWeight:700}}>{g.emoji}×{ct}</div>:null;})}
              </div>
              {mc&&<div style={{position:"absolute",bottom:"2px",left:"4px",right:"4px",height:"3px",borderRadius:"2px",background:mc}}/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DAY COLUMN ───────────────────────────────────────────────────────────────
function DayColumn({ cursor, logs, allTasks, selected, onSelect }) {
  const dk=toKey(cursor),dl=logs[dk]??{},tids=dl.tasks??[],mood=dl.mood;
  const mi=mood?MOOD.find(x=>x.v===mood):null;
  return(
    <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #eee",overflow:"hidden"}}>
      <div style={{padding:"14px 16px",background:"#f5f5f5",borderBottom:"1px solid #eee",display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:"18px",fontWeight:800,color:"#111"}}>{cursor.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}</div>
          {mi&&<div style={{fontSize:"13px",color:mi.color,fontWeight:600,marginTop:"2px"}}>{mi.emoji} Feeling {mi.label}</div>}
          <div style={{fontSize:"12px",color:"#aaa",marginTop:"2px"}}>{tids.length} task{tids.length!==1?"s":""} logged</div>
        </div>
        <button onClick={()=>onSelect(selected===dk?null:dk)} style={{padding:"8px 16px",borderRadius:"10px",border:"none",cursor:"pointer",fontSize:"13px",fontWeight:800,background:selected===dk?"#111":"#eee",color:selected===dk?"#fff":"#333"}}>{selected===dk?"Close":"Log"}</button>
      </div>
      <div style={{padding:"12px 16px",minHeight:"200px"}}>
        {tids.length===0
          ?<p style={{color:"#ccc",fontSize:"14px",margin:"12px 0"}}>Nothing logged yet — tap Log to add.</p>
          :GROUPS.map(g=>{
            const gT=tids.filter(tid=>allTasks.find(t=>t.id===tid)?.group===g.id);
            if(!gT.length)return null;
            return(
              <div key={g.id} style={{marginBottom:"14px"}}>
                <div style={{fontSize:"11px",fontWeight:800,color:g.color,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:"6px"}}>{g.emoji} {g.label}</div>
                {gT.map(tid=>{const t=allTasks.find(x=>x.id===tid);return t?<div key={tid} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 12px",borderRadius:"10px",background:g.bg,borderLeft:`3px solid ${g.color}`,marginBottom:"4px"}}><span style={{fontSize:"20px"}}>{t.emoji}</span><span style={{fontSize:"14px",fontWeight:600,color:g.txt}}>{t.label}</span></div>:null;})}
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

// ─── DAY SHEET ────────────────────────────────────────────────────────────────
function DaySheet({ dateKey, logs, allTasks, onToggle, onMood, onClose, onAddFor }) {
  const d=fromKey(dateKey);
  const label=d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});
  const dl=logs[dateKey]??{},tids=dl.tasks??[],mood=dl.mood;
  const isToday=dateKey===TODAY;
  const [open,setOpen]=useState(new Set(GROUPS.map(g=>g.id)));
  function toggleGroup(gid){setOpen(p=>{const s=new Set(p);s.has(gid)?s.delete(gid):s.add(gid);return s;});}

  return(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"480px",zIndex:100,background:"#fff",borderRadius:"22px 22px 0 0",boxShadow:"0 -6px 40px rgba(0,0,0,0.18)",maxHeight:"88vh",display:"flex",flexDirection:"column",paddingBottom:"max(env(safe-area-inset-bottom),16px)"}}>
      <div style={{display:"flex",justifyContent:"center",padding:"10px 0 6px"}}>
        <div style={{width:"36px",height:"4px",borderRadius:"2px",background:"#e0e0e0"}}/>
      </div>
      <div style={{padding:"0 20px 12px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",borderBottom:"1px solid #f0f0f0"}}>
        <div>
          <div style={{fontSize:"18px",fontWeight:800,color:"#111"}}>{label}</div>
          {isToday&&<div style={{fontSize:"12px",color:"#5B8DEF",fontWeight:700}}>Today</div>}
          <div style={{fontSize:"12px",color:"#aaa"}}>{tids.length} task{tids.length!==1?"s":""} logged</div>
        </div>
        <button onClick={onClose} style={{background:"#f2f2f2",border:"none",borderRadius:"50%",width:"34px",height:"34px",cursor:"pointer",fontSize:"20px",color:"#888",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>×</button>
      </div>

      {/* Mood */}
      <div style={{padding:"12px 20px",borderBottom:"1px solid #f0f0f0"}}>
        <div style={{fontSize:"11px",fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:"8px"}}>How are you feeling?</div>
        <div style={{display:"flex",gap:"6px"}}>
          {MOOD.map(m=>{
            const on=mood===m.v;
            return <button key={m.v} onClick={()=>onMood(dateKey,m.v)} style={{flex:1,padding:"8px 0",borderRadius:"12px",border:"none",cursor:"pointer",background:on?m.bg:"#f8f8f8",outline:on?`2px solid ${m.color}`:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
              <span style={{fontSize:"22px"}}>{m.emoji}</span>
              <span style={{fontSize:"10px",fontWeight:700,color:on?m.color:"#ccc"}}>{m.label}</span>
            </button>;
          })}
        </div>
      </div>

      {/* Groups */}
      <div style={{overflowY:"auto",flex:1,WebkitOverflowScrolling:"touch"}}>
        {GROUPS.map(g=>{
          const gTasks=allTasks.filter(t=>t.group===g.id);
          const doneN=gTasks.filter(t=>tids.includes(t.id)).length;
          const isOpen=open.has(g.id);
          return(
            <div key={g.id}>
              <button onClick={()=>toggleGroup(g.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:"10px",padding:"13px 20px",background:"#fafafa",border:"none",borderTop:"1px solid #f0f0f0",cursor:"pointer"}}>
                <span style={{fontSize:"20px"}}>{g.emoji}</span>
                <span style={{flex:1,fontSize:"15px",fontWeight:700,color:"#111",textAlign:"left"}}>{g.label}</span>
                {doneN>0&&<span style={{fontSize:"11px",fontWeight:700,color:g.txt,background:g.bg,padding:"2px 9px",borderRadius:"20px",border:`1px solid ${g.color}44`}}>{doneN} ✓</span>}
                <span style={{fontSize:"11px",color:"#ddd"}}>{isOpen?"▲":"▼"}</span>
              </button>
              {isOpen&&<>
                {gTasks.map(t=>{
                  const done=tids.includes(t.id);
                  return(
                    <button key={t.id} onClick={()=>onToggle(dateKey,t.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:"12px",padding:"12px 20px 12px 36px",background:done?g.bg:"#fff",border:"none",borderTop:"1px solid #f5f5f5",cursor:"pointer"}}>
                      <span style={{fontSize:"22px",flexShrink:0}}>{t.emoji}</span>
                      <span style={{flex:1,fontSize:"14px",fontWeight:done?700:400,color:done?g.txt:"#444",textAlign:"left"}}>{t.label}</span>
                      <div style={{width:"24px",height:"24px",borderRadius:"50%",flexShrink:0,background:done?g.color:"transparent",border:`2px solid ${done?g.color:"#ddd"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {done&&<span style={{color:"#fff",fontSize:"13px",fontWeight:900,lineHeight:1}}>✓</span>}
                      </div>
                    </button>
                  );
                })}
                <button onClick={()=>onAddFor(g.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:"10px",padding:"10px 20px 10px 36px",background:"#fff",border:"none",borderTop:"1px solid #f5f5f5",cursor:"pointer",color:g.color}}>
                  <span style={{fontSize:"18px",fontWeight:700}}>＋</span>
                  <span style={{fontSize:"13px",fontWeight:600}}>Add to {g.label}</span>
                </button>
              </>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ADD SHEET ────────────────────────────────────────────────────────────────
function AddSheet({ defaultGroup, onAdd, onClose }) {
  const [label,setLabel]=useState("");
  const [emoji,setEmoji]=useState("⭐");
  const [group,setGroup]=useState(defaultGroup||"hobbies");
  const ok=label.trim().length>0;
  const g=GROUPS.find(x=>x.id===group);
  return(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"480px",zIndex:200,background:"#fff",borderRadius:"22px 22px 0 0",boxShadow:"0 -6px 40px rgba(0,0,0,0.18)",padding:"20px 20px max(env(safe-area-inset-bottom),24px)"}}>
      <div style={{display:"flex",justifyContent:"center",marginBottom:"14px"}}>
        <div style={{width:"36px",height:"4px",borderRadius:"2px",background:"#e0e0e0"}}/>
      </div>
      <div style={{fontSize:"18px",fontWeight:800,marginBottom:"4px",color:"#111"}}>Add custom task</div>
      {g&&<div style={{fontSize:"13px",color:g.color,fontWeight:600,marginBottom:"18px"}}>{g.emoji} Adding to {g.label}</div>}
      <div style={{fontSize:"11px",fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:"6px"}}>Task name</div>
      <input value={label} onChange={e=>setLabel(e.target.value)} placeholder="e.g. Took vitamins" style={INPUT} autoFocus/>
      <div style={{fontSize:"11px",fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:"6px"}}>Emoji</div>
      <input value={emoji} onChange={e=>setEmoji(e.target.value)} style={{...INPUT,width:"72px",textAlign:"center",fontSize:"22px"}}/>
      <div style={{fontSize:"11px",fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:"6px"}}>Category</div>
      <select value={group} onChange={e=>setGroup(e.target.value)} style={INPUT}>
        {GROUPS.map(g=><option key={g.id} value={g.id}>{g.emoji} {g.label}</option>)}
      </select>
      <div style={{display:"flex",gap:"10px",marginTop:"6px"}}>
        <button onClick={onClose} style={{flex:1,padding:"14px",borderRadius:"14px",border:"1.5px solid #eee",background:"#fff",fontSize:"15px",fontWeight:700,cursor:"pointer",color:"#555"}}>Cancel</button>
        <button onClick={()=>ok&&onAdd({label:label.trim(),emoji,group})} style={{flex:2,padding:"14px",borderRadius:"14px",border:"none",background:ok?(g?.color||"#111"):"#eee",color:ok?"#fff":"#aaa",fontSize:"15px",fontWeight:800,cursor:ok?"pointer":"default"}}>{ok?`Add to ${g?.label||"Habits"}`:"Add task"}</button>
      </div>
    </div>
  );
}

// ─── STATS VIEW ───────────────────────────────────────────────────────────────
function StatsView({ logs, allTasks }) {
  const [range, setRange] = useState(30);

  const stats = useMemo(() => {
    const now = new Date();
    const days = [];
    for (let i = range-1; i >= 0; i--) {
      const d = new Date(now); d.setDate(now.getDate()-i);
      days.push(toKey(d));
    }
    const taskCounts={}, groupCounts={};
    let moodSum=0, moodDays=0, activeDays=0, totalLogged=0;
    days.forEach(dk=>{
      const dl=logs[dk]; if(!dl) return;
      const tids=dl.tasks??[];
      if(tids.length>0) activeDays++;
      totalLogged+=tids.length;
      tids.forEach(tid=>{
        taskCounts[tid]=(taskCounts[tid]||0)+1;
        const g=allTasks.find(t=>t.id===tid)?.group;
        if(g) groupCounts[g]=(groupCounts[g]||0)+1;
      });
      if(dl.mood){moodSum+=dl.mood;moodDays++;}
    });
    const moodAvg=moodDays>0?(moodSum/moodDays).toFixed(1):null;
    const topTasks=Object.entries(taskCounts).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([tid,count])=>({task:allTasks.find(t=>t.id===tid),count})).filter(x=>x.task);
    let streak=0;
    for(let i=0;i<365;i++){const d=new Date(now);d.setDate(now.getDate()-i);if((logs[toKey(d)]?.tasks??[]).length>0)streak++;else break;}
    let longestStreak=0,cur=0;
    days.forEach(dk=>{if((logs[dk]?.tasks??[]).length>0){cur++;longestStreak=Math.max(longestStreak,cur);}else cur=0;});
    return {days,taskCounts,groupCounts,moodAvg,moodDays,activeDays,totalLogged,topTasks,streak,longestStreak};
  }, [logs, allTasks, range]);

  const {days,groupCounts,moodAvg,moodDays,activeDays,totalLogged,topTasks,streak,longestStreak}=stats;
  const moodInfo=moodAvg?MOOD.find(m=>m.v===Math.round(parseFloat(moodAvg))):null;
  const maxGroup=Math.max(...GROUPS.map(g=>groupCounts[g.id]||0),1);

  return(
    <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
      {/* Range picker */}
      <div style={{display:"flex",background:"#fff",borderRadius:"12px",border:"1px solid #eee",padding:"4px",gap:"4px"}}>
        {[7,30,90].map(r=>(
          <button key={r} onClick={()=>setRange(r)} style={{flex:1,padding:"8px",border:"none",borderRadius:"9px",cursor:"pointer",fontSize:"13px",background:range===r?"#111":"transparent",color:range===r?"#fff":"#888",fontWeight:range===r?800:400}}>Last {r} days</button>
        ))}
      </div>

      {/* Headline cards */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        <StatCard label="Active days" value={activeDays} sub={`of ${range} days`} color="#111"/>
        <StatCard label="Tasks logged" value={totalLogged} sub={`avg ${(totalLogged/range).toFixed(1)}/day`} color="#111"/>
        <StatCard label="Current streak" value={`${streak}d`} sub="days in a row" color="#F0B429"/>
        <StatCard label="Longest streak" value={`${longestStreak}d`} sub={`in last ${range} days`} color="#27AE60"/>
      </div>

      {/* Mood */}
      {moodAvg&&(
        <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #eee",padding:"16px"}}>
          <div style={{fontSize:"12px",fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:"12px"}}>Average mood</div>
          <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"14px"}}>
            <span style={{fontSize:"44px"}}>{moodInfo?.emoji}</span>
            <div>
              <div style={{fontSize:"28px",fontWeight:800,color:moodInfo?.color}}>{moodAvg} / 5</div>
              <div style={{fontSize:"14px",color:"#aaa"}}>{moodInfo?.label} · {moodDays} day{moodDays!==1?"s":""} tracked</div>
            </div>
          </div>
          <div style={{display:"flex",gap:"2px"}}>
            {days.map(dk=>{const m=logs[dk]?.mood;const mc=m?MOOD.find(x=>x.v===m)?.color:"#f0f0f0";return<div key={dk} style={{flex:1,height:"8px",borderRadius:"3px",background:mc}}/>;})}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:"4px"}}>
            <span style={{fontSize:"10px",color:"#ccc"}}>{range}d ago</span>
            <span style={{fontSize:"10px",color:"#ccc"}}>Today</span>
          </div>
        </div>
      )}

      {/* Activity heatmap */}
      <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #eee",padding:"16px"}}>
        <div style={{fontSize:"12px",fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:"12px"}}>Activity heatmap</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"3px"}}>
          {days.map(dk=>{const ct=(logs[dk]?.tasks??[]).length;const alpha=ct===0?0:Math.min(0.2+ct*0.15,1);return<div key={dk} style={{width:"10px",height:"10px",borderRadius:"2px",background:ct===0?"#f0f0f0":`rgba(91,141,239,${alpha})`}}/>;  })}
        </div>
        <div style={{display:"flex",gap:"6px",alignItems:"center",marginTop:"8px"}}>
          <span style={{fontSize:"10px",color:"#ccc"}}>Less</span>
          {[0.2,0.45,0.65,0.85,1].map(a=><div key={a} style={{width:"10px",height:"10px",borderRadius:"2px",background:`rgba(91,141,239,${a})`}}/>)}
          <span style={{fontSize:"10px",color:"#ccc"}}>More</span>
        </div>
      </div>

      {/* By category */}
      <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #eee",padding:"16px"}}>
        <div style={{fontSize:"12px",fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:"12px"}}>By category</div>
        {GROUPS.filter(g=>groupCounts[g.id]>0).sort((a,b)=>(groupCounts[b.id]||0)-(groupCounts[a.id]||0)).map(g=>{
          const ct=groupCounts[g.id]||0;
          const pct=Math.round((ct/maxGroup)*100);
          return(
            <div key={g.id} style={{marginBottom:"12px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"5px"}}>
                <span style={{fontSize:"13px",fontWeight:600,color:"#333"}}>{g.emoji} {g.label}</span>
                <span style={{fontSize:"13px",fontWeight:700,color:g.color}}>{ct} tasks</span>
              </div>
              <div style={{height:"7px",borderRadius:"4px",background:"#f0f0f0"}}>
                <div style={{height:"100%",borderRadius:"4px",background:g.color,width:`${pct}%`}}/>
              </div>
            </div>
          );
        })}
        {Object.keys(groupCounts).length===0&&<p style={{color:"#ccc",fontSize:"14px",margin:0}}>No data yet for this period.</p>}
      </div>

      {/* Top tasks */}
      {topTasks.length>0&&(
        <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #eee",padding:"16px"}}>
          <div style={{fontSize:"12px",fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:"12px"}}>Most done tasks</div>
          {topTasks.map(({task,count},i)=>{
            const g=GROUPS.find(x=>x.id===task.group);
            return(
              <div key={task.id} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 0",borderBottom:i<topTasks.length-1?"1px solid #f5f5f5":"none"}}>
                <span style={{fontSize:"11px",fontWeight:700,color:"#ddd",width:"18px",textAlign:"right"}}>{i+1}</span>
                <span style={{fontSize:"20px"}}>{task.emoji}</span>
                <span style={{flex:1,fontSize:"14px",color:"#333"}}>{task.label}</span>
                <span style={{fontSize:"13px",fontWeight:800,color:g?.color||"#333",background:g?.bg,padding:"3px 10px",borderRadius:"12px"}}>{count}×</span>
              </div>
            );
          })}
        </div>
      )}

      <div style={{height:"8px"}}/>
    </div>
  );
}

function StatCard({ label, value, sub, color }) {
  return(
    <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #eee",padding:"14px 16px"}}>
      <div style={{fontSize:"11px",fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:"4px"}}>{label}</div>
      <div style={{fontSize:"28px",fontWeight:800,color,marginBottom:"2px"}}>{value}</div>
      <div style={{fontSize:"12px",color:"#bbb"}}>{sub}</div>
    </div>
  );
}

// ─── METRICS VIEW ─────────────────────────────────────────────────────────────
function MetricsView({ metrics, setMetrics }) {
  const [activeDay, setActiveDay] = useState(TODAY);
  const [range, setRange]         = useState(30);

  const entry = metrics[activeDay] ?? {};

  function update(field, val) {
    setMetrics(p => ({
      ...p,
      [activeDay]: { ...(p[activeDay] ?? {}), [field]: val === "" ? null : Number(val) },
    }));
  }

  // Build last N days for charts
  const chartDays = useMemo(() => {
    const now = new Date();
    return Array.from({ length: range }, (_, i) => {
      const d = new Date(now); d.setDate(now.getDate() - (range - 1 - i));
      const k = toKey(d);
      return { k, d, label: d.getDate() };
    });
  }, [range]);

  const stepData   = chartDays.map(d => metrics[d.k]?.steps   ?? null);
  const weightData = chartDays.map(d => metrics[d.k]?.weight  ?? null);
  const savingsData= chartDays.map(d => metrics[d.k]?.savings ?? null);

  // Summaries
  const validSteps   = stepData.filter(v=>v!=null);
  const validWeight  = weightData.filter(v=>v!=null);
  const validSavings = savingsData.filter(v=>v!=null);
  const avgSteps   = validSteps.length   ? Math.round(validSteps.reduce((a,b)=>a+b,0)/validSteps.length)     : null;
  const latWeight  = weightData.slice().reverse().find(v=>v!=null) ?? null;
  const latSavings = savingsData.slice().reverse().find(v=>v!=null) ?? null;

  const isToday = activeDay === TODAY;
  const dayLabel = isToday ? "Today" : fromKey(activeDay).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});

  function shiftDay(dir) {
    const d = fromKey(activeDay); d.setDate(d.getDate() + dir);
    if (toKey(d) <= TODAY) setActiveDay(toKey(d));
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>

      {/* Summary cards */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
        <MiniCard emoji="👟" label="Avg steps" value={avgSteps!=null?avgSteps.toLocaleString():"—"} color="#378ADD"/>
        <MiniCard emoji="⚖️" label="Weight" value={latWeight!=null?`${latWeight}kg`:"—"} color="#8E44AD"/>
        <MiniCard emoji="💰" label="Savings" value={latSavings!=null?`£${latSavings.toLocaleString()}`:"—"} color="#27AE60"/>
      </div>

      {/* Date picker */}
      <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #eee",overflow:"hidden"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid #f0f0f0"}}>
          <button onClick={()=>shiftDay(-1)} style={ICON_BTN}>‹</button>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"16px",fontWeight:800,color:"#111"}}>{dayLabel}</div>
            {!isToday && <button onClick={()=>setActiveDay(TODAY)} style={{fontSize:"11px",color:"#5B8DEF",background:"none",border:"none",cursor:"pointer",fontWeight:700,padding:0}}>Go to today</button>}
          </div>
          <button onClick={()=>shiftDay(1)} style={{...ICON_BTN, opacity: activeDay===TODAY?0.3:1, cursor:activeDay===TODAY?"default":"pointer"}}>›</button>
        </div>

        {/* Entry fields */}
        <div style={{padding:"16px"}}>
          <MetricField
            emoji="👟" label="Steps" unit="steps"
            value={entry.steps ?? ""}
            onChange={v=>update("steps",v)}
            color="#378ADD" placeholder="e.g. 8000"
            inputMode="numeric"
          />
          <MetricField
            emoji="⚖️" label="Weight" unit="kg"
            value={entry.weight ?? ""}
            onChange={v=>update("weight",v)}
            color="#8E44AD" placeholder="e.g. 75.5"
            inputMode="decimal"
          />
          <MetricField
            emoji="💰" label="Savings" unit="£"
            value={entry.savings ?? ""}
            onChange={v=>update("savings",v)}
            color="#27AE60" placeholder="e.g. 5000"
            inputMode="decimal" prefix="£"
          />
        </div>
      </div>

      {/* Range picker */}
      <div style={{display:"flex",background:"#fff",borderRadius:"12px",border:"1px solid #eee",padding:"4px",gap:"4px"}}>
        {[7,30,90].map(r=>(
          <button key={r} onClick={()=>setRange(r)} style={{flex:1,padding:"8px",border:"none",borderRadius:"9px",cursor:"pointer",fontSize:"13px",background:range===r?"#111":"transparent",color:range===r?"#fff":"#888",fontWeight:range===r?800:400}}>
            {r}d
          </button>
        ))}
      </div>

      {/* Steps chart */}
      {validSteps.length > 0 && (
        <ChartCard
          title="Steps" emoji="👟" color="#378ADD" bg="#E6F1FB"
          days={chartDays} data={stepData}
          format={v=>v!=null?v.toLocaleString():null}
          unit="steps"
        />
      )}

      {/* Weight chart */}
      {validWeight.length > 0 && (
        <ChartCard
          title="Weight" emoji="⚖️" color="#8E44AD" bg="#F5EEF8"
          days={chartDays} data={weightData}
          format={v=>v!=null?`${v}kg`:null}
          unit="kg" scaleToRange
        />
      )}

      {/* Savings chart */}
      {validSavings.length > 0 && (
        <ChartCard
          title="Savings" emoji="💰" color="#27AE60" bg="#E4F9EE"
          days={chartDays} data={savingsData}
          format={v=>v!=null?`£${v.toLocaleString()}`:null}
          unit="£" scaleToRange
        />
      )}

      {validSteps.length===0 && validWeight.length===0 && validSavings.length===0 && (
        <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #eee",padding:"32px 16px",textAlign:"center"}}>
          <div style={{fontSize:"36px",marginBottom:"10px"}}>📈</div>
          <div style={{fontSize:"15px",fontWeight:700,color:"#333",marginBottom:"6px"}}>No data yet</div>
          <div style={{fontSize:"13px",color:"#aaa"}}>Log your steps, weight or savings above and your trends will appear here.</div>
        </div>
      )}

      <div style={{height:"8px"}}/>
    </div>
  );
}

function MetricField({ emoji, label, unit, value, onChange, color, placeholder, inputMode, prefix }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:"1px solid #f5f5f5"}}>
      <span style={{fontSize:"24px",flexShrink:0}}>{emoji}</span>
      <div style={{flex:1}}>
        <div style={{fontSize:"12px",fontWeight:700,color:"#aaa",marginBottom:"4px"}}>{label}</div>
        <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
          {prefix && <span style={{fontSize:"15px",fontWeight:700,color:color}}>{prefix}</span>}
          <input
            type="number"
            inputMode={inputMode}
            value={value}
            onChange={e=>onChange(e.target.value)}
            placeholder={placeholder}
            style={{
              flex:1, border:"none", borderBottom:`2px solid ${value!==""?color:"#eee"}`,
              fontSize:"18px", fontWeight:700, color:color,
              outline:"none", background:"transparent", padding:"2px 0",
              width:"100%",
            }}
          />
          <span style={{fontSize:"12px",color:"#ccc",flexShrink:0}}>{unit}</span>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, emoji, color, bg, days, data, format, scaleToRange }) {
  const valid = data.filter(v=>v!=null);
  if (!valid.length) return null;
  const min = scaleToRange ? Math.min(...valid) * 0.98 : 0;
  const max = Math.max(...valid) || 1;
  const range = max - min || 1;
  const latest = data.slice().reverse().find(v=>v!=null);
  const H = 72;

  return (
    <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #eee",padding:"16px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
        <div style={{fontSize:"13px",fontWeight:700,color:"#333"}}>{emoji} {title}</div>
        <div style={{fontSize:"16px",fontWeight:800,color,background:bg,padding:"3px 12px",borderRadius:"20px"}}>
          {format(latest)}
        </div>
      </div>
      {/* SVG bar/line chart */}
      <svg width="100%" height={H+24} style={{overflow:"visible"}}>
        {days.map((d,i)=>{
          const v=data[i];
          if(v==null) return null;
          const x=(i/(days.length-1||1))*100;
          const barH=Math.max(2,((v-min)/range)*H);
          const y=H-barH;
          const isActive=d.k===toKey(new Date());
          return(
            <g key={d.k}>
              <rect
                x={`${x-1}%`} y={y} width="2%" height={barH}
                rx="2" fill={isActive?color:`${color}66`}
              />
            </g>
          );
        })}
        {/* line connecting dots */}
        {(() => {
          const pts=days.map((d,i)=>{
            const v=data[i]; if(v==null)return null;
            const x=(i/(days.length-1||1))*100;
            const y=H-Math.max(2,((v-min)/range)*H);
            return`${x}%,${y}`;
          }).filter(Boolean);
          if(pts.length<2)return null;
          return<polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" strokeLinejoin="round"/>;
        })()}
      </svg>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:"-8px"}}>
        <span style={{fontSize:"10px",color:"#ccc"}}>{days[0]?.d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</span>
        <span style={{fontSize:"10px",color:"#ccc"}}>Today</span>
      </div>
    </div>
  );
}

function MiniCard({ emoji, label, value, color }) {
  return (
    <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #eee",padding:"12px 10px",textAlign:"center"}}>
      <div style={{fontSize:"20px",marginBottom:"4px"}}>{emoji}</div>
      <div style={{fontSize:"16px",fontWeight:800,color,marginBottom:"2px",lineHeight:1.1}}>{value}</div>
      <div style={{fontSize:"10px",color:"#bbb",fontWeight:600}}>{label}</div>
    </div>
  );
}

const ICON_BTN={width:"38px",height:"38px",borderRadius:"50%",border:"none",background:"#f2f2f2",cursor:"pointer",fontSize:"22px",color:"#333",display:"flex",alignItems:"center",justifyContent:"center"};
const BACKDROP={position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:99};
const INPUT={width:"100%",padding:"12px 14px",borderRadius:"12px",border:"1.5px solid #eee",fontSize:"15px",outline:"none",display:"block",marginBottom:"14px",boxSizing:"border-box",color:"#111",fontFamily:"inherit",background:"#fff"};
