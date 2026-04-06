import { useState, useEffect, useRef } from "react";

const workouts = [
  {
    id: 1,
    title: "Morning Energizer",
    level: "Beginner",
    duration: "15 min",
    calories: 80,
    emoji: "☀️",
    color: "#FF6B35",
    tag: "Full Body",
    exercises: [
      { name: "Jumping Jacks", sets: 3, reps: 20, rest: 30, desc: "Arms up, legs wide. Land softly!" },
      { name: "Wall Push-Ups", sets: 3, reps: 10, rest: 30, desc: "Hands shoulder-width on wall, lean and push." },
      { name: "Knee Raises", sets: 3, reps: 15, rest: 30, desc: "Stand tall, bring each knee to hip height." },
      { name: "Calf Raises", sets: 3, reps: 20, rest: 20, desc: "Rise on your toes, lower slowly." },
    ],
  },
  {
    id: 2,
    title: "Core Kickstart",
    level: "Beginner",
    duration: "12 min",
    calories: 60,
    emoji: "🔥",
    color: "#E63946",
    tag: "Core",
    exercises: [
      { name: "Dead Bug", sets: 3, reps: 8, rest: 40, desc: "Lie on back, extend opposite arm/leg slowly." },
      { name: "Modified Plank", sets: 3, reps: "20s", rest: 30, desc: "On knees and forearms, keep back flat." },
      { name: "Bird Dog", sets: 3, reps: 10, rest: 30, desc: "On all fours, extend opposite arm and leg." },
      { name: "Glute Bridge", sets: 3, reps: 15, rest: 30, desc: "Feet flat, push hips to ceiling." },
    ],
  },
  {
    id: 3,
    title: "Lower Body Builder",
    level: "Beginner",
    duration: "18 min",
    calories: 100,
    emoji: "🦵",
    color: "#2A9D8F",
    tag: "Legs",
    exercises: [
      { name: "Bodyweight Squat", sets: 3, reps: 15, rest: 40, desc: "Feet hip-width, sit back, chest proud." },
      { name: "Reverse Lunge", sets: 3, reps: 10, rest: 40, desc: "Step back, lower knee near floor." },
      { name: "Side Step Squat", sets: 3, reps: 12, rest: 30, desc: "Step wide into a squat, come back." },
      { name: "Standing Hip Hinge", sets: 3, reps: 15, rest: 30, desc: "Hinge at hips, soft knees, flat back." },
    ],
  },
  {
    id: 4,
    title: "Stretch & Recover",
    level: "All Levels",
    duration: "10 min",
    calories: 30,
    emoji: "🧘",
    color: "#6A4C93",
    tag: "Flexibility",
    exercises: [
      { name: "Cat-Cow", sets: 1, reps: "10 cycles", rest: 0, desc: "Arch and round your spine gently." },
      { name: "Hip Flexor Stretch", sets: 2, reps: "30s/side", rest: 10, desc: "Lunge forward, sink hips down." },
      { name: "Child's Pose", sets: 1, reps: "45s", rest: 0, desc: "Reach arms forward, breathe deeply." },
      { name: "Seated Twist", sets: 2, reps: "20s/side", rest: 10, desc: "Sit tall, rotate gently each way." },
    ],
  },
];

const tips = [
  "Rest is part of the plan — muscles grow during recovery 💤",
  "Start with 3 workouts a week, then build from there 📅",
  "Hydrate! Aim for 8 glasses of water on workout days 💧",
  "Form beats speed. Slow and controlled > fast and sloppy 🎯",
  "Track your workouts — even small progress is real progress 📈",
];

function WorkoutTimer({ seconds, onComplete }) {
  const [remaining, setRemaining] = useState(seconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete && onComplete();
      return;
    }
    intervalRef.current = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, [remaining]);

  const pct = ((seconds - remaining) / seconds) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="40" cy="40" r="34" fill="none" stroke="#1a1a2e" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="34" fill="none" stroke="#FF6B35" strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "'Bebas Neue', sans-serif",
        }}>
          {remaining}s
        </div>
      </div>
      <button
        onClick={() => setRemaining(seconds)}
        style={{ fontSize: 11, color: "#999", background: "none", border: "none", cursor: "pointer" }}
      >
        ↺ reset
      </button>
    </div>
  );
}

export default function FitnessApp() {
  const [screen, setScreen] = useState("home");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState("work");
  const [completed, setCompleted] = useState([]);
  const [tipIdx] = useState(() => Math.floor(Math.random() * tips.length));
  const [streak, setStreak] = useState(3);

  function startWorkout(workout) {
    setSelectedWorkout(workout);
    setCurrentExercise(0);
    setCurrentSet(1);
    setPhase("work");
    setScreen("active");
  }

  function nextStep() {
    const ex = selectedWorkout.exercises[currentExercise];
    if (phase === "work") {
      if (ex.rest > 0) { setPhase("rest"); return; }
      advanceExercise(ex);
    } else {
      advanceExercise(ex);
    }
  }

  function advanceExercise(ex) {
    if (currentSet < ex.sets) {
      setCurrentSet((s) => s + 1);
      setPhase("work");
    } else if (currentExercise < selectedWorkout.exercises.length - 1) {
      setCurrentExercise((i) => i + 1);
      setCurrentSet(1);
      setPhase("work");
    } else {
      setCompleted((c) => [...c, selectedWorkout.id]);
      setScreen("done");
    }
  }

  const ex = selectedWorkout?.exercises[currentExercise];
  const progress = selectedWorkout
    ? ((currentExercise + (currentSet - 1) / ex?.sets) / selectedWorkout.exercises.length) * 100
    : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d1a",
      fontFamily: "'DM Sans', sans-serif",
      color: "#f0f0f0",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .card-hover { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
        .btn-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,107,53,0.4); } 50% { box-shadow: 0 0 0 12px rgba(255,107,53,0); } }
        .fade-in { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
      `}</style>

      {/* HOME */}
      {screen === "home" && (
        <div className="fade-in" style={{ maxWidth: 420, margin: "0 auto", paddingBottom: 40 }}>
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            padding: "40px 24px 32px",
            borderBottom: "1px solid #1e1e3a",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 13, color: "#FF6B35", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                  BetterMe Fitness
                </div>
                <div style={{ fontSize: 28, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1, lineHeight: 1.1 }}>
                  Hello,<br />Let's Move! 💪
                </div>
              </div>
              <div style={{
                background: "#FF6B35", borderRadius: "50%", width: 48, height: 48,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
              }}>🏃</div>
            </div>
            <div style={{
              marginTop: 20, background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.2)",
              borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ fontSize: 28 }}>🔥</div>
              <div>
                <div style={{ fontSize: 18, fontFamily: "'Bebas Neue'", color: "#FF6B35" }}>{streak} Day Streak!</div>
                <div style={{ fontSize: 12, color: "#888" }}>Keep it going — workout today!</div>
              </div>
            </div>
          </div>

          <div style={{ padding: "16px 24px" }}>
            <div style={{
              background: "#13132a", border: "1px solid #2a2a4a",
              borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#aaa", lineHeight: 1.5,
            }}>
              <span style={{ color: "#FF6B35", fontWeight: 600 }}>💡 Tip: </span>{tips[tipIdx]}
            </div>
          </div>

          <div style={{ padding: "8px 24px 0" }}>
            <div style={{ fontSize: 13, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>
              Today's Workouts
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {workouts.map((w) => (
                <div
                  key={w.id}
                  className="card-hover"
                  onClick={() => { setSelectedWorkout(w); setScreen("workout"); }}
                  style={{
                    background: "#13132a", border: "1px solid #2a2a4a",
                    borderRadius: 16, overflow: "hidden", borderLeft: `4px solid ${w.color}`,
                  }}
                >
                  <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 12, background: `${w.color}22`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 26, flexShrink: 0,
                    }}>{w.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{w.title}</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, color: "#888" }}>⏱ {w.duration}</span>
                        <span style={{ fontSize: 11, color: "#888" }}>🔥 {w.calories} kcal</span>
                        <span style={{
                          fontSize: 11, background: `${w.color}22`, color: w.color,
                          padding: "2px 8px", borderRadius: 20,
                        }}>{w.tag}</span>
                      </div>
                    </div>
                    {completed.includes(w.id) && <div style={{ fontSize: 20 }}>✅</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "24px 24px 0", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { label: "Workouts", value: completed.length, icon: "🏋️" },
              { label: "This Week", value: `${streak}/5`, icon: "📅" },
              { label: "Minutes", value: completed.length * 15, icon: "⏱" },
            ].map((s) => (
              <div key={s.label} style={{
                background: "#13132a", border: "1px solid #2a2a4a",
                borderRadius: 12, padding: "14px 12px", textAlign: "center",
              }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 20, fontFamily: "'Bebas Neue'", color: "#FF6B35" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#666" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WORKOUT DETAIL */}
      {screen === "workout" && selectedWorkout && (
        <div className="fade-in" style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{
            background: `linear-gradient(160deg, ${selectedWorkout.color}33 0%, #0d0d1a 60%)`,
            padding: "40px 24px 28px", borderBottom: "1px solid #1e1e3a",
          }}>
            <button onClick={() => setScreen("home")} style={{
              background: "none", border: "1px solid #333", color: "#aaa",
              padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 13, marginBottom: 20,
            }}>← Back</button>
            <div style={{ fontSize: 52, marginBottom: 8 }}>{selectedWorkout.emoji}</div>
            <div style={{ fontSize: 32, fontFamily: "'Bebas Neue'", letterSpacing: 1 }}>{selectedWorkout.title}</div>
            <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
              <span style={{ fontSize: 13, color: "#aaa" }}>⏱ {selectedWorkout.duration}</span>
              <span style={{ fontSize: 13, color: "#aaa" }}>🔥 {selectedWorkout.calories} kcal</span>
              <span style={{ fontSize: 13, color: selectedWorkout.color }}>{selectedWorkout.level}</span>
            </div>
          </div>

          <div style={{ padding: "20px 24px" }}>
            <div style={{ fontSize: 12, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>
              {selectedWorkout.exercises.length} Exercises
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {selectedWorkout.exercises.map((e, i) => (
                <div key={i} style={{
                  background: "#13132a", border: "1px solid #2a2a4a", borderRadius: 12,
                  padding: "14px 16px", display: "flex", alignItems: "center", gap: 14,
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: `${selectedWorkout.color}22`, color: selectedWorkout.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Bebas Neue'", fontSize: 18, flexShrink: 0,
                  }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{e.name}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                      {e.sets} sets × {e.reps} {typeof e.reps === "number" ? "reps" : ""}{e.rest > 0 ? ` · ${e.rest}s rest` : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "0 24px 40px" }}>
            <button
              className="btn-pulse"
              onClick={() => startWorkout(selectedWorkout)}
              style={{
                width: "100%", background: selectedWorkout.color, border: "none",
                color: "#fff", padding: "18px", borderRadius: 16, fontSize: 18,
                fontFamily: "'Bebas Neue'", letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
              }}
            >
              Start Workout →
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE WORKOUT */}
      {screen === "active" && selectedWorkout && ex && (
        <div className="fade-in" style={{ maxWidth: 420, margin: "0 auto", paddingBottom: 40 }}>
          <div style={{ height: 4, background: "#1a1a2e" }}>
            <div style={{
              height: "100%", background: selectedWorkout.color,
              width: `${progress}%`, transition: "width 0.4s ease",
            }} />
          </div>

          <div style={{ padding: "24px 24px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <button onClick={() => setScreen("workout")} style={{
                background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 22,
              }}>×</button>
              <div style={{ fontSize: 13, color: "#888" }}>
                Exercise {currentExercise + 1}/{selectedWorkout.exercises.length}
              </div>
              <div style={{ fontSize: 13, color: selectedWorkout.color }}>
                Set {currentSet}/{ex.sets}
              </div>
            </div>

            <div style={{
              background: "#13132a",
              border: `1px solid ${phase === "rest" ? "#2a4a3a" : "#2a2a4a"}`,
              borderRadius: 20, padding: "32px 24px", textAlign: "center", marginBottom: 24,
            }}>
              {phase === "rest" ? (
                <>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>😮‍💨</div>
                  <div style={{ fontSize: 28, fontFamily: "'Bebas Neue'", color: "#2A9D8F", marginBottom: 8, letterSpacing: 1 }}>
                    Rest Time
                  </div>
                  <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>
                    Great set! Breathe and recover.
                  </div>
                  <WorkoutTimer seconds={ex.rest} onComplete={nextStep} />
                </>
              ) : (
                <>
                  <div style={{ fontSize: 56, marginBottom: 8 }}>
                    {["🏋️", "💪", "🦵", "🧘", "🔥"][currentExercise % 5]}
                  </div>
                  <div style={{ fontSize: 30, fontFamily: "'Bebas Neue'", letterSpacing: 1, marginBottom: 8 }}>
                    {ex.name}
                  </div>
                  <div style={{
                    display: "inline-block", background: `${selectedWorkout.color}22`,
                    color: selectedWorkout.color, padding: "4px 14px", borderRadius: 20,
                    fontSize: 14, fontWeight: 600, marginBottom: 16,
                  }}>
                    {ex.reps} {typeof ex.reps === "number" ? "reps" : ""}
                  </div>
                  <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 8 }}>
                    {ex.desc}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={nextStep}
              style={{
                width: "100%", background: phase === "rest" ? "#2A9D8F" : selectedWorkout.color,
                border: "none", color: "#fff", padding: "18px", borderRadius: 16,
                fontSize: 18, fontFamily: "'Bebas Neue'", letterSpacing: 2, cursor: "pointer",
                transition: "background 0.3s",
              }}
            >
              {phase === "rest"
                ? "Skip Rest →"
                : currentExercise === selectedWorkout.exercises.length - 1 && currentSet === ex.sets
                ? "Finish! 🎉"
                : "Done! Next →"}
            </button>

            <div style={{ marginTop: 24 }}>
              {selectedWorkout.exercises.map((e, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
                  borderBottom: i < selectedWorkout.exercises.length - 1 ? "1px solid #1a1a2e" : "none",
                  opacity: i < currentExercise ? 0.4 : i === currentExercise ? 1 : 0.6,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: i < currentExercise ? "#2A9D8F" : i === currentExercise ? selectedWorkout.color : "#333",
                  }} />
                  <div style={{ fontSize: 13, color: i === currentExercise ? "#fff" : "#666" }}>{e.name}</div>
                  {i < currentExercise && <div style={{ marginLeft: "auto", fontSize: 12 }}>✓</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DONE */}
      {screen === "done" && selectedWorkout && (
        <div className="fade-in" style={{
          maxWidth: 420, margin: "0 auto", padding: "60px 24px 40px", textAlign: "center",
        }}>
          <div style={{ fontSize: 80, marginBottom: 16 }}>🎉</div>
          <div style={{ fontSize: 42, fontFamily: "'Bebas Neue'", letterSpacing: 2, marginBottom: 8 }}>
            Workout Done!
          </div>
          <div style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>
            You crushed "{selectedWorkout.title}"!
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
            {[
              { label: "Duration", value: selectedWorkout.duration, icon: "⏱" },
              { label: "Calories", value: `~${selectedWorkout.calories}`, icon: "🔥" },
              { label: "Exercises", value: selectedWorkout.exercises.length, icon: "💪" },
              { label: "Streak", value: `${streak + 1} days`, icon: "🔥" },
            ].map((s) => (
              <div key={s.label} style={{
                background: "#13132a", border: "1px solid #2a2a4a",
                borderRadius: 14, padding: "18px",
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontFamily: "'Bebas Neue'", color: selectedWorkout.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setStreak((s) => s + 1); setScreen("home"); }}
            style={{
              width: "100%", background: selectedWorkout.color, border: "none",
              color: "#fff", padding: "18px", borderRadius: 16, fontSize: 18,
              fontFamily: "'Bebas Neue'", letterSpacing: 2, cursor: "pointer", marginBottom: 12,
            }}
          >
            Back to Home 🏠
          </button>
          <button
            onClick={() => startWorkout(selectedWorkout)}
            style={{
              width: "100%", background: "none", border: `1px solid ${selectedWorkout.color}`,
              color: selectedWorkout.color, padding: "16px", borderRadius: 16, fontSize: 16,
              fontFamily: "'Bebas Neue'", letterSpacing: 2, cursor: "pointer",
            }}
          >
            Do it again →
          </button>
        </div>
      )}
    </div>
  );
}
