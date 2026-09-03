import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOT_COLORS = ["#2F6F62", "#B5502A", "#7A6A9E", "#3B6EA5"];

function pad(n) {
  return String(n).padStart(2, "0");
}

function toKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function buildGrid(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  // Monday = 0 ... Sunday = 6
  const startOffset = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - startOffset);

  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    cells.push(d);
  }
  return cells;
}

export default function CalendarApp() {
  const today = useMemo(() => new Date(), []);
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(today);
  const [events, setEvents] = useState({
    [toKey(today)]: [{ id: "seed-1", title: "写一点东西" }],
  });
  const [draft, setDraft] = useState("");

  const cells = useMemo(() => buildGrid(viewMonth), [viewMonth]);
  const selectedKey = toKey(selected);
  const selectedEvents = events[selectedKey] || [];

  function goMonth(delta) {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
  }

  function goToday() {
    setViewMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelected(today);
  }

  function selectDay(d) {
    setSelected(d);
    if (d.getMonth() !== viewMonth.getMonth() || d.getFullYear() !== viewMonth.getFullYear()) {
      setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    }
  }

  function addEvent() {
    const text = draft.trim();
    if (!text) return;
    setEvents((prev) => {
      const list = prev[selectedKey] || [];
      return { ...prev, [selectedKey]: [...list, { id: `${Date.now()}`, title: text }] };
    });
    setDraft("");
  }

  function removeEvent(id) {
    setEvents((prev) => {
      const list = (prev[selectedKey] || []).filter((e) => e.id !== id);
      return { ...prev, [selectedKey]: list };
    });
  }

  const weekdayFmt = new Intl.DateTimeFormat("zh-CN", { weekday: "long" });
  const dateFmt = new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="cal-root">
      <style>{`
        .cal-root {
          --paper: #FBF7F0;
          --ink: #26313C;
          --ink-soft: #6B7280;
          --line: #E4DCC9;
          --accent: #2F6F62;
          --accent-soft: #E4EFEC;
          --weekend-bg: #F3ECDC;
          background: var(--paper);
          color: var(--ink);
          font-family: -apple-system, "Inter", system-ui, sans-serif;
          padding: 32px;
          border-radius: 6px;
          max-width: 880px;
          margin: 0 auto;
        }
        .cal-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 22px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .cal-title {
          font-family: Georgia, "Iowan Old Style", "Songti SC", serif;
          font-size: 30px;
          letter-spacing: 0.2px;
        }
        .cal-title small {
          font-size: 16px;
          color: var(--ink-soft);
          margin-left: 8px;
          font-family: -apple-system, "Inter", system-ui, sans-serif;
        }
        .cal-nav {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .cal-btn {
          border: 1px solid var(--line);
          background: transparent;
          color: var(--ink);
          border-radius: 5px;
          padding: 6px 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .cal-btn:hover { border-color: var(--accent); background: var(--accent-soft); }
        .cal-today-btn {
          border: 1px solid var(--line);
          background: transparent;
          color: var(--ink);
          border-radius: 5px;
          padding: 6px 12px;
          cursor: pointer;
          font-size: 13px;
        }
        .cal-today-btn:hover { border-color: var(--accent); color: var(--accent); }
        .cal-body {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 28px;
        }
        @media (max-width: 640px) {
          .cal-body { grid-template-columns: 1fr; }
        }
        .cal-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 4px;
        }
        .cal-weekdays span {
          font-size: 12px;
          color: var(--ink-soft);
          text-align: center;
          padding-bottom: 6px;
        }
        .cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-template-rows: repeat(6, 1fr);
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line);
        }
        .cal-cell {
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          min-height: 76px;
          padding: 6px 7px;
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: background 0.12s ease;
        }
        .cal-cell:hover { background: var(--accent-soft); }
        .cal-cell.weekend { background: var(--weekend-bg); }
        .cal-cell.weekend:hover { background: var(--accent-soft); }
        .cal-cell.outside .cal-num { color: #C7BFAE; }
        .cal-cell.outside.weekend { background: transparent; }
        .cal-cell.selected {
          box-shadow: inset 0 0 0 2px var(--accent);
          background: var(--accent-soft);
        }
        .cal-num {
          font-size: 13px;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .cal-cell.is-today .cal-num {
          background: var(--ink);
          color: var(--paper);
        }
        .cal-dots {
          display: flex;
          gap: 3px;
          flex-wrap: wrap;
          align-items: center;
        }
        .cal-dot { width: 6px; height: 6px; border-radius: 50%; }
        .cal-more { font-size: 10px; color: var(--ink-soft); }

        .cal-panel {
          border-left: 1px solid var(--line);
          padding-left: 24px;
        }
        .cal-panel-date {
          font-family: Georgia, "Iowan Old Style", "Songti SC", serif;
          font-size: 18px;
          margin-bottom: 2px;
        }
        .cal-panel-weekday {
          font-size: 12px;
          color: var(--ink-soft);
          margin-bottom: 16px;
        }
        .cal-event-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 14px;
          min-height: 24px;
        }
        .cal-event {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          background: white;
          border: 1px solid var(--line);
          border-radius: 5px;
          padding: 7px 10px;
          font-size: 13px;
        }
        .cal-event button {
          border: none;
          background: transparent;
          color: var(--ink-soft);
          cursor: pointer;
          display: flex;
          padding: 2px;
        }
        .cal-event button:hover { color: #B5502A; }
        .cal-empty {
          font-size: 13px;
          color: var(--ink-soft);
          font-style: italic;
        }
        .cal-add-row {
          display: flex;
          gap: 6px;
        }
        .cal-add-row input {
          flex: 1;
          border: 1px solid var(--line);
          border-radius: 5px;
          padding: 7px 9px;
          font-size: 13px;
          background: white;
          color: var(--ink);
        }
        .cal-add-row input:focus {
          outline: none;
          border-color: var(--accent);
        }
        .cal-add-row button {
          border: 1px solid var(--accent);
          background: var(--accent);
          color: white;
          border-radius: 5px;
          width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .cal-add-row button:hover { opacity: 0.9; }
      `}</style>

      <div className="cal-header">
        <div className="cal-title">
          {MONTH_NAMES[viewMonth.getMonth()]}
          <small>{viewMonth.getFullYear()}</small>
        </div>
        <div className="cal-nav">
          <button className="cal-today-btn" onClick={goToday}>回到今天</button>
          <button className="cal-btn" onClick={() => goMonth(-1)} aria-label="上个月">
            <ChevronLeft size={16} />
          </button>
          <button className="cal-btn" onClick={() => goMonth(1)} aria-label="下个月">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="cal-body">
        <div>
          <div className="cal-weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
          <div className="cal-grid">
            {cells.map((d, i) => {
              const outside = d.getMonth() !== viewMonth.getMonth();
              const weekend = d.getDay() === 0 || d.getDay() === 6;
              const key = toKey(d);
              const dayEvents = events[key] || [];
              const isToday = isSameDay(d, today);
              const isSelected = isSameDay(d, selected);
              return (
                <div
                  key={i}
                  className={[
                    "cal-cell",
                    outside ? "outside" : "",
                    weekend ? "weekend" : "",
                    isToday ? "is-today" : "",
                    isSelected ? "selected" : "",
                  ].join(" ").trim()}
                  onClick={() => selectDay(d)}
                >
                  <span className="cal-num">{d.getDate()}</span>
                  {dayEvents.length > 0 && (
                    <div className="cal-dots">
                      {dayEvents.slice(0, 3).map((ev, idx) => (
                        <span
                          key={ev.id}
                          className="cal-dot"
                          style={{ background: DOT_COLORS[idx % DOT_COLORS.length] }}
                        />
                      ))}
                      {dayEvents.length > 3 && <span className="cal-more">+{dayEvents.length - 3}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="cal-panel">
          <div className="cal-panel-date">{dateFmt.format(selected)}</div>
          <div className="cal-panel-weekday">{weekdayFmt.format(selected)}</div>

          <div className="cal-event-list">
            {selectedEvents.length === 0 && <div className="cal-empty">这天还没有安排</div>}
            {selectedEvents.map((ev) => (
              <div className="cal-event" key={ev.id}>
                <span>{ev.title}</span>
                <button onClick={() => removeEvent(ev.id)} aria-label="删除">
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>

          <div className="cal-add-row">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addEvent()}
              placeholder="添加一条安排"
            />
            <button onClick={addEvent} aria-label="添加">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
