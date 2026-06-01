import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const GYM_WEEKS = [
  {
    week: 1,
    days: [
      {
        day: 1, type: "Upper Body",
        exercises: [
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "Record amount each week — great progress tracker!" },
          { name: "Overhead DB Press", sets: 4, reps: "12-25", note: "Staple upper body exercise!" },
          { name: "Tricep Pushdown", sets: 3, reps: "12-15", note: "Rope or bar attachment. All movement at the elbow joint." },
          { name: "Cable Rope Curls", sets: 3, reps: "12-15", note: "Can use same rope as tricep pushdown." },
        ]
      },
      {
        day: 2, type: "Lower Body",
        exercises: [
          { name: "Air Squats", sets: 2, reps: "10-15", note: "Quick pace, just squatting with no weight to warm up." },
          { name: "Leg Extension", sets: 2, reps: "15", note: "Controlled reps, all the way down, all the way up." },
          { name: "Goblet Squats", sets: 4, reps: "12-15", note: "Wide stance, toes pointed out, squeeze glutes at top!" },
          { name: "Hamstring Curl", sets: 3, reps: "12", note: "Slow and controlled, feel those hamstrings burn!" },
          { name: "Wall Sit or Squat Hold", sets: 1, reps: "Until Failure", note: "Finish strong!" },
        ]
      },
      {
        day: 3, type: "Upper Body",
        exercises: [
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "" },
          { name: "Lat Pulldown", sets: 3, reps: "12-15", note: "Squeeze shoulder blades together at peak of rep!" },
          { name: "Side Laterals", sets: 3, reps: "12-15", note: "Think of pouring tea — pinkies up!" },
          { name: "DB or BB Curl", sets: 3, reps: "12-15", note: "" },
          { name: "Tricep Pushdown", sets: 2, reps: "20-25", note: "High rep / lighter weight, feel the burn!" },
        ]
      },
    ]
  },
  {
    week: 2,
    days: [
      {
        day: 1, type: "Lower Body",
        exercises: [
          { name: "Walking Lunges", sets: 2, reps: "6-8/leg", note: "Bodyweight, BB on back, or holding DBs. Push with heel of front foot." },
          { name: "Frog Pumps", sets: 2, reps: "10-12", note: "Hard glute squeeze at top! Can do with or without weight." },
          { name: "Goblet Squats", sets: 3, reps: "12-15", note: "Weight on heels." },
          { name: "Leg Press", sets: 3, reps: "12-15", note: "Wide stance in middle of platform. Don't lock out knees." },
          { name: "Leg Extension", sets: 2, reps: "12-15", note: "Last exercise — finish strong!" },
        ]
      },
      {
        day: 2, type: "Upper Body",
        exercises: [
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "" },
          { name: "Overhead DB Press", sets: 3, reps: "12-15", note: "Use heaviest weight you safely can!" },
          { name: "Lat Pulldown", sets: 3, reps: "12-15", note: "Wide or narrow grip." },
          { name: "DB/BB Bicep Curl", sets: 3, reps: "12-15", note: "" },
          { name: "Behind the Head DB Extension", sets: 3, reps: "15", note: "Feel that tricep stretch at the bottom!" },
        ]
      },
      {
        day: 3, type: "Lower Body",
        exercises: [
          { name: "Air Squats", sets: 2, reps: "15", note: "" },
          { name: "Squat Walks", sets: 2, reps: "8/leg", note: "Use resistance band if possible!" },
          { name: "Hip Thrusts", sets: 3, reps: "12-15", note: "Slow on the way down, explode up, squeeze glutes! Staple glute builder!" },
          { name: "Hamstring Curl", sets: 3, reps: "15", note: "Controlled — practice feeling that hamstring." },
          { name: "Lower Back Extension", sets: 3, reps: "Until Failure", note: "Curl upper back, squeeze glutes. Focus on hamstrings/glutes, not lower back." },
          { name: "Calf Press on Leg Press or Platform", sets: 2, reps: "15", note: "" },
        ]
      },
    ]
  },
  {
    week: 3,
    days: [
      {
        day: 1, type: "Upper Body",
        exercises: [
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "" },
          { name: "Lat Pulldown", sets: 3, reps: "12-15", note: "" },
          { name: "Seated Cable Row", sets: 3, reps: "15", note: "Go heavy — safely!" },
          { name: "Rope Pulls", sets: 2, reps: "15-20", note: "Super hard shoulder blade squeeze at peak!" },
          { name: "Tricep Pushdown", sets: 3, reps: "15", note: "" },
          { name: "Abs #1", sets: 3, reps: "Circuit", note: "See Ab Circuits: Plank → Leg Lifts → Crunches" },
        ]
      },
      {
        day: 2, type: "Lower Body",
        exercises: [
          { name: "Abductor Machine", sets: 2, reps: "15-20", note: "Sit forward, focus movement on glutes!" },
          { name: "Hip Thrust", sets: 3, reps: "15-20", note: "" },
          { name: "Hamstring Curl", sets: 3, reps: "15-20", note: "" },
          { name: "Leg Press", sets: 3, reps: "15-20", note: "Up the weight if comfortable!" },
          { name: "Leg Extension", sets: 3, reps: "12", note: "Finish strong — controlled pace, no swinging!" },
        ]
      },
      {
        day: 3, type: "Upper Body",
        exercises: [
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "" },
          { name: "Overhead DB Press", sets: 3, reps: "12-15", note: "Standing hits more muscles!" },
          { name: "Side Lateral", sets: 3, reps: "12-15", note: "Strict form!" },
          { name: "Hammer Curl", sets: 3, reps: "10", note: "" },
          { name: "Tricep Pushdown", sets: 3, reps: "15", note: "Drop set on last set!" },
          { name: "Abs #2", sets: 3, reps: "Circuit", note: "Leg Lifts → Side Plank → Russian Twists" },
        ]
      },
    ]
  },
  {
    week: 4,
    days: [
      {
        day: 1, type: "Legs (Glute & Ham)",
        exercises: [
          { name: "Banded Cha Chas", sets: 2, reps: "8", note: "See @fitwithmarihelp for video demo." },
          { name: "Abductor Machine", sets: 3, reps: "15-20", note: "One of my favorite glute activators!" },
          { name: "Step Ups on Platform", sets: 2, reps: "10", note: "Weight on pressing foot's heel!" },
          { name: "Hip Thrusts", sets: 3, reps: "12-15", note: "Slow down, explode up, hard squeeze!" },
          { name: "Lower Back Extension", sets: 3, reps: "12-15", note: "Focus on hamstrings and glutes!" },
          { name: "Hamstring Curl", sets: 2, reps: "15", note: "Finish strong!" },
        ]
      },
      {
        day: 2, type: "Upper Body",
        exercises: [
          { name: "Overhead DB Press", sets: 3, reps: "12-15", note: "Try to set a personal strength record!" },
          { name: "Tricep Pushdown", sets: 3, reps: "15-20", note: "" },
          { name: "One Arm DB Row", sets: 3, reps: "10", note: "Back to back each side until 3 sets done!" },
          { name: "Lat Pulldown", sets: 3, reps: "12-15", note: "" },
          { name: "DB or BB Curl", sets: 2, reps: "12-15", note: "" },
          { name: "DB or BB Curl (Slow)", sets: 2, reps: "6-8", note: "Same weight but very slow reps." },
          { name: "Abs #2", sets: 3, reps: "Circuit", note: "Leg Lifts → Side Plank → Russian Twists" },
        ]
      },
      {
        day: 3, type: "Legs (Quad & Calves)",
        exercises: [
          { name: "Walking Lunges", sets: 3, reps: "8", note: "Bodyweight, BB on back, or holding DBs!" },
          { name: "Leg Extension", sets: 3, reps: "15-20", note: "Pre-exhaust quads before pressing!" },
          { name: "Leg Press", sets: 4, reps: "12-15", note: "4 sets — quality over rushing!" },
          { name: "Goblet Squats", sets: 2, reps: "12", note: "Light weight, fast paced reps!" },
          { name: "Calf Press on Leg Press or Platform", sets: 3, reps: "15", note: "" },
        ]
      },
    ]
  },
  {
    week: 5,
    days: [
      {
        day: 1, type: "Chest/Shoulder/Tricep",
        exercises: [
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "" },
          { name: "Side Lateral SS Front DB Raise", sets: 3, reps: "10", note: "Amazing shoulder superset! 10 side laterals + 10 front raises = 1 set!" },
          { name: "Side Lateral SS Front DB Raise (light)", sets: 1, reps: "20", note: "Lighter weight, higher reps." },
          { name: "Upright Row", sets: 3, reps: "12-15", note: "Elbows at ear level at top. Drag barbell up torso." },
          { name: "Tricep Pushdown", sets: 3, reps: "15-20", note: "" },
          { name: "Behind the Head DB Extension", sets: 2, reps: "10-12", note: "Keep elbows in." },
          { name: "Abs #1", sets: 3, reps: "Circuit", note: "Plank → Leg Lifts → Crunches" },
        ]
      },
      {
        day: 2, type: "Leg Day",
        exercises: [
          { name: "Squat Walks", sets: 3, reps: "10", note: "With resistance band if possible!" },
          { name: "Frog Pumps", sets: 2, reps: "12-15", note: "Pre-exhausting glutes before heavy presses!" },
          { name: "Abductor", sets: 3, reps: "15-20", note: "Glutes totally exhausted before heavy presses!" },
          { name: "Leg Press", sets: 3, reps: "12", note: "Shorter rest time — give that 3rd set everything!" },
          { name: "Goblet Squats", sets: 3, reps: "10-12", note: "Go heavy!" },
          { name: "BB RDL", sets: 3, reps: "12-15", note: "Hamstring stretch, straight back, hips back, weight on heels!" },
        ]
      },
      {
        day: 3, type: "Back/Bicep",
        exercises: [
          { name: "Lat Pulldown", sets: 3, reps: "10-12", note: "Try a different grip than normal." },
          { name: "BB Bent Over Row", sets: 3, reps: "10-12", note: "Strong and straight back." },
          { name: "Seated Cable Row", sets: 3, reps: "12-15", note: "1 second pause at peak for first 3 reps each set." },
          { name: "Rope Pulls", sets: 2, reps: "15", note: "Hard back squeeze at peak, open shoulder blades at bottom!" },
          { name: "DB or BB Curl", sets: 2, reps: "20", note: "Finish with higher reps." },
          { name: "Hammer Curl", sets: 2, reps: "15-20", note: "" },
          { name: "Abs #3", sets: 3, reps: "Circuit", note: "Leg Scissors → Plank → Heel Touches" },
        ]
      },
    ]
  },
  {
    week: 6,
    days: [
      {
        day: 1, type: "Legs (Quad & Calves)",
        exercises: [
          { name: "Walking Lunges", sets: 2, reps: "8-10", note: "Bodyweight, DB, or BB on back." },
          { name: "BB Squat", sets: 3, reps: "10", note: "First time? Take your time or ask a trainer for help." },
          { name: "Leg Press", sets: 3, reps: "12-15", note: "Drop set on last set!" },
          { name: "Leg Extension", sets: 3, reps: "12-15", note: "Finish strong!" },
          { name: "Calf Press on Leg Press or Platform", sets: 3, reps: "15", note: "" },
        ]
      },
      {
        day: 2, type: "Upper Body",
        exercises: [
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "" },
          { name: "Side Lateral SS Front DB Raise", sets: 3, reps: "12", note: "" },
          { name: "Upright Row", sets: 2, reps: "15", note: "Elbows at ear level, bar dragging across body." },
          { name: "Bent Over BB Row", sets: 3, reps: "12-15", note: "Heavy — big calorie burner. Push yourself!" },
          { name: "Tricep Overhead Extension SS Rope Curl", sets: 3, reps: "12-15", note: "Favorite arm superset!" },
          { name: "Abs #1", sets: 3, reps: "Circuit", note: "Plank → Leg Lifts → Crunches" },
        ]
      },
      {
        day: 3, type: "Legs (Glute & Ham)",
        exercises: [
          { name: "Abductor", sets: 3, reps: "15-20", note: "" },
          { name: "Goblet Squat", sets: 3, reps: "15", note: "Fast paced, pushing through heels, don't lock out knees." },
          { name: "Hip Thrust", sets: 3, reps: "10", note: "2 second pause and glute squeeze at top of each rep!" },
          { name: "Lower Back Extension", sets: 3, reps: "15", note: "Focus on hamstrings and glutes, not lower back!" },
          { name: "Hamstring Curl", sets: 3, reps: "12", note: "2 second pause/squeeze at peak of each rep!" },
        ]
      },
    ]
  },
  {
    week: 7,
    days: [
      {
        day: 1, type: "Back/Biceps",
        exercises: [
          { name: "Lat Pulldown", sets: 3, reps: "12-15", note: "" },
          { name: "Bent Over BB Row", sets: 3, reps: "12-15", note: "" },
          { name: "DB Row", sets: 2, reps: "10", note: "Back to back each side — no rest!" },
          { name: "Rope Pulls", sets: 3, reps: "15-20", note: "Hard shoulder blade squeeze at peak!" },
          { name: "BB or DB Curl", sets: 2, reps: "12", note: "" },
          { name: "BB or DB Curl (Light)", sets: 1, reps: "20", note: "Fast paced light weight finish!" },
          { name: "Hammer Curl", sets: 2, reps: "20-25", note: "" },
          { name: "Abs #2", sets: 3, reps: "Circuit", note: "Leg Lifts → Side Plank → Russian Twists" },
        ]
      },
      {
        day: 2, type: "Leg Day",
        exercises: [
          { name: "Squat Walks SS Kick Backs", sets: 2, reps: "10", note: "" },
          { name: "Walking Lunges", sets: 2, reps: "10", note: "" },
          { name: "BB Squat", sets: 4, reps: "10-15", note: "Staple exercise — burns tons of calories!" },
          { name: "BB RDL", sets: 3, reps: "15", note: "Hard glute squeeze at top!" },
          { name: "Hamstring Curl", sets: 3, reps: "15", note: "First 3 reps, hold at peak for 2 seconds." },
          { name: "Abductor", sets: 2, reps: "35", note: "Glute finisher!" },
        ]
      },
      {
        day: 3, type: "Chest/Shoulder/Tricep",
        exercises: [
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "" },
          { name: "Incline DB Press", sets: 3, reps: "12-15", note: "Heavy DBs to blast upper chest, front shoulder!" },
          { name: "Side Lateral", sets: 3, reps: "12-15", note: "" },
          { name: "Upright Row", sets: 3, reps: "15", note: "" },
          { name: "Tricep Pushdown", sets: 3, reps: "12-15", note: "Drop set on last set!" },
          { name: "Abs #3", sets: 3, reps: "Circuit", note: "Leg Scissors → Plank → Heel Touches" },
        ]
      },
    ]
  },
  {
    week: 8,
    days: [
      {
        day: 1, type: "Legs (Glute & Ham)",
        exercises: [
          { name: "Squat Walks SS Kick Backs", sets: 2, reps: "10", note: "With resistance band!" },
          { name: "Abductor Machine", sets: 3, reps: "20", note: "" },
          { name: "Leg Press", sets: 4, reps: "10-15", note: "High and wide foot placement, push with heels. Go heavier if comfortable!" },
          { name: "DB RDL", sets: 3, reps: "12-15", note: "" },
          { name: "Hamstring Curl", sets: 3, reps: "8", note: "Hold first 4 reps at peak for 3 seconds!" },
        ]
      },
      {
        day: 2, type: "Upper Body",
        exercises: [
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "" },
          { name: "Incline DB Press", sets: 3, reps: "12-15", note: "Stabilizing heavy DBs works so many muscles!" },
          { name: "Seated Cable Row", sets: 3, reps: "12-15", note: "Set a personal strength record!" },
          { name: "Upright Row", sets: 2, reps: "15-20", note: "" },
          { name: "Behind the Head DB Extension", sets: 4, reps: "10", note: "Triceps/Biceps superset — entire arm killer!" },
          { name: "Abs #1", sets: 3, reps: "Circuit", note: "Plank → Leg Lifts → Crunches" },
        ]
      },
      {
        day: 3, type: "Legs (Quad & Calf)",
        exercises: [
          { name: "Walking Lunges", sets: 2, reps: "8", note: "Warm up extra since we start with lunges!" },
          { name: "Leg Extension", sets: 3, reps: "15", note: "Lunges + leg extension = ready for heavy squats!" },
          { name: "BB Squat", sets: 4, reps: "10-15", note: "Heavy squat day — quality over rushing!" },
          { name: "Goblet Squats", sets: 3, reps: "15-20", note: "Quick reps, push through heels. High rep goblets are killer!" },
          { name: "Single Leg Calf Press", sets: 3, reps: "15", note: "" },
        ]
      },
    ]
  },
  {
    week: 9,
    days: [
      {
        day: 1, type: "Chest/Shoulder/Tricep",
        exercises: [
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "Progress from Week 1?? 💪" },
          { name: "Incline DB Flies", sets: 3, reps: "12-15", note: "Pretend you are hugging a tree!" },
          { name: "Overhead DB or BB Press", sets: 4, reps: "10-15", note: "Try the barbell if you haven't yet!" },
          { name: "Upright Row", sets: 3, reps: "15", note: "" },
          { name: "Assisted Dip Machine or Tricep Pushdown", sets: 3, reps: "10-12", note: "Drop set on last 2 sets!" },
          { name: "Abs #2", sets: 3, reps: "Circuit", note: "Leg Lifts → Side Plank → Russian Twists" },
        ]
      },
      {
        day: 2, type: "Lower Body",
        exercises: [
          { name: "Squat Walks SS Lower Back Extension", sets: 3, reps: "10", note: "Glute slayer!" },
          { name: "Abductor", sets: 3, reps: "15", note: "" },
          { name: "BB Squat", sets: 3, reps: "8-12", note: "Set a heavy weight personal record on last set of 8!" },
          { name: "DB or BB RDL", sets: 3, reps: "15", note: "Deep hamstring stretch!" },
          { name: "Hamstring Curl", sets: 3, reps: "12", note: "Drop set on last 2 sets!" },
        ]
      },
      {
        day: 3, type: "Back/Bicep",
        exercises: [
          { name: "Lat Pulldown", sets: 3, reps: "12-15", note: "Hard contraction at bottom. At top, feel the stretch!" },
          { name: "BB Bent Over Row", sets: 3, reps: "8", note: "Lower rep, heavier weight!" },
          { name: "DB Row", sets: 3, reps: "10-12", note: "" },
          { name: "BB or DB Curl", sets: 2, reps: "15", note: "" },
          { name: "BB or DB Curl (Slow)", sets: 2, reps: "6-8", note: "Same weight as higher rep sets but VERY slow." },
          { name: "Hammer Curl", sets: 2, reps: "20", note: "Light weight, fast reps!" },
          { name: "Abs #3", sets: 3, reps: "Circuit", note: "Leg Scissors → Plank → Heel Touches" },
        ]
      },
    ]
  },
];

const HOME_WEEKS = [
  {
    week: 1,
    days: [
      {
        day: 1, type: "Full Body",
        exercises: [
          { name: "Jumping Jacks", sets: 3, reps: "30", note: "Warm up the whole body!" },
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "Track progress each week!" },
          { name: "Air Squats", sets: 3, reps: "15", note: "Weight on heels, torso upright." },
          { name: "Glute Bridges", sets: 3, reps: "20", note: "Squeeze glutes hard at the top!" },
          { name: "Plank", sets: 3, reps: "Until Failure", note: "Keep torso stiff, don't let hips sag." },
        ]
      },
      {
        day: 2, type: "Lower Body",
        exercises: [
          { name: "Squat Walks", sets: 3, reps: "10/leg", note: "Use resistance band if available!" },
          { name: "Reverse Lunges", sets: 3, reps: "10/leg", note: "Keep front knee over ankle." },
          { name: "Frog Pumps", sets: 3, reps: "20", note: "Soles together, bridge up, squeeze glutes!" },
          { name: "Wall Sit", sets: 2, reps: "Until Failure", note: "Knees at 90 degrees. Finish strong!" },
          { name: "Calf Raises", sets: 3, reps: "20", note: "Slow and controlled — feel the stretch." },
        ]
      },
      {
        day: 3, type: "Upper Body",
        exercises: [
          { name: "Knee Pushups", sets: 4, reps: "Until Failure", note: "" },
          { name: "DB Overhead Press", sets: 3, reps: "12-15", note: "Use any DBs you have at home." },
          { name: "DB Bent Over Row", sets: 3, reps: "12/side", note: "Flat back, pull elbow back." },
          { name: "DB Bicep Curl", sets: 3, reps: "12-15", note: "Keep elbows in." },
          { name: "Tricep Dips (chair)", sets: 3, reps: "Until Failure", note: "Use a sturdy chair or couch." },
        ]
      },
    ]
  },
  {
    week: 2,
    days: [
      {
        day: 1, type: "Lower Body",
        exercises: [
          { name: "Banded Squat Walks", sets: 3, reps: "10/leg", note: "Band above knees if available." },
          { name: "Sumo Squats", sets: 4, reps: "15", note: "Wide stance, toes out, push through heels." },
          { name: "Hip Thrusts (floor)", sets: 3, reps: "15", note: "Back on couch/bench. Hard glute squeeze!" },
          { name: "Kick Backs", sets: 3, reps: "15/leg", note: "Kick heel back as far as possible!" },
          { name: "Hamstring Curls (on floor)", sets: 3, reps: "12", note: "Lie on stomach, band around ankles if available." },
        ]
      },
      {
        day: 2, type: "Upper Body",
        exercises: [
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "" },
          { name: "DB Side Lateral Raise", sets: 3, reps: "12-15", note: "Lead with pinkies, arm parallel to floor at top." },
          { name: "DB Front Raise", sets: 3, reps: "12-15", note: "Slight bend in elbows, slow and controlled." },
          { name: "DB Hammer Curl", sets: 3, reps: "12", note: "" },
          { name: "DB Overhead Tricep Extension", sets: 3, reps: "12", note: "Keep elbows in." },
        ]
      },
      {
        day: 3, type: "Full Body",
        exercises: [
          { name: "Jumping Jacks", sets: 2, reps: "30", note: "Warm up!" },
          { name: "Air Squats", sets: 3, reps: "20", note: "" },
          { name: "Knee Pushups", sets: 3, reps: "Until Failure", note: "" },
          { name: "Glute Bridges", sets: 3, reps: "25", note: "" },
          { name: "Plank", sets: 3, reps: "Until Failure", note: "" },
          { name: "Leg Raises", sets: 3, reps: "15", note: "Hands under butt, keep legs straight." },
        ]
      },
    ]
  },
  // Weeks 3-9 follow progressive overload patterns
  {
    week: 3,
    days: [
      {
        day: 1, type: "Lower Body",
        exercises: [
          { name: "Squat Walks", sets: 3, reps: "12/leg", note: "Add resistance band!" },
          { name: "Bulgarian Split Squats", sets: 3, reps: "10/leg", note: "Rear foot on chair. Push through front heel." },
          { name: "Hip Thrusts (weighted)", sets: 3, reps: "15", note: "Hold DB on hips for extra resistance." },
          { name: "Single Leg Glute Bridge", sets: 3, reps: "12/leg", note: "One leg extended, squeeze hard at top." },
          { name: "Calf Raises (single leg)", sets: 3, reps: "15/leg", note: "Deep stretch at bottom." },
        ]
      },
      {
        day: 2, type: "Upper Body",
        exercises: [
          { name: "Full Pushups", sets: 3, reps: "Until Failure", note: "Progressing from knee pushups!" },
          { name: "DB Bent Over Row", sets: 4, reps: "12/side", note: "Heavier than last week!" },
          { name: "DB Overhead Press", sets: 4, reps: "12-15", note: "" },
          { name: "DB Bicep Curl", sets: 3, reps: "12", note: "" },
          { name: "Tricep Dips", sets: 3, reps: "Until Failure", note: "Go deeper this week!" },
          { name: "Abs #1", sets: 3, reps: "Circuit", note: "Plank → Leg Raises → Crunches" },
        ]
      },
      {
        day: 3, type: "Full Body Superset",
        exercises: [
          { name: "Squat to Press", sets: 3, reps: "12", note: "Squat down, press DBs overhead as you stand." },
          { name: "Pushup to Row", sets: 3, reps: "8/side", note: "Pushup, then row each arm." },
          { name: "Reverse Lunge to Curl", sets: 3, reps: "10/leg", note: "Lunge back, curl DBs as you step forward." },
          { name: "Plank", sets: 3, reps: "Until Failure", note: "" },
        ]
      },
    ]
  },
  {
    week: 4,
    days: [
      {
        day: 1, type: "Glute & Hamstring",
        exercises: [
          { name: "Banded Cha Chas", sets: 2, reps: "8", note: "Band above knees, step side to side in squat position." },
          { name: "Hip Thrusts (heavy)", sets: 4, reps: "12", note: "Use heaviest DB available." },
          { name: "Kick Backs", sets: 3, reps: "15/leg", note: "Focus on full glute contraction." },
          { name: "Single Leg RDL", sets: 3, reps: "10/leg", note: "Hold DB, hinge at hip, feel hamstring stretch." },
          { name: "Frog Pumps", sets: 2, reps: "25", note: "Burnout set to finish!" },
        ]
      },
      {
        day: 2, type: "Upper Body",
        exercises: [
          { name: "Pushups (full)", sets: 4, reps: "Until Failure", note: "" },
          { name: "DB Overhead Press", sets: 4, reps: "10-12", note: "Heavier weight this week!" },
          { name: "DB Row (heavy)", sets: 3, reps: "10/side", note: "" },
          { name: "DB Lateral Raise", sets: 3, reps: "15", note: "" },
          { name: "Slow Bicep Curls", sets: 3, reps: "8", note: "Very slow — 3 seconds up, 3 seconds down." },
          { name: "Abs #2", sets: 3, reps: "Circuit", note: "Leg Lifts → Side Plank → Russian Twists" },
        ]
      },
      {
        day: 3, type: "Quad & Calf",
        exercises: [
          { name: "Air Squats", sets: 2, reps: "20", note: "Warm up!" },
          { name: "DB Goblet Squat", sets: 4, reps: "15", note: "Heaviest DB you have." },
          { name: "Reverse Lunges", sets: 3, reps: "12/leg", note: "" },
          { name: "Wall Sit", sets: 2, reps: "Until Failure", note: "Hold as long as you can!" },
          { name: "Calf Raises", sets: 4, reps: "20", note: "" },
        ]
      },
    ]
  },
  {
    week: 5,
    days: [
      {
        day: 1, type: "Full Body Circuit",
        exercises: [
          { name: "Jumping Jacks", sets: 1, reps: "30", note: "Warm up!" },
          { name: "DB Squat Press", sets: 4, reps: "12", note: "Squat + overhead press combo." },
          { name: "Pushup", sets: 4, reps: "Until Failure", note: "" },
          { name: "Hip Thrust", sets: 3, reps: "20", note: "Weighted if possible." },
          { name: "DB Row", sets: 3, reps: "12/side", note: "" },
          { name: "Plank", sets: 3, reps: "Until Failure", note: "" },
          { name: "Abs #3", sets: 3, reps: "Circuit", note: "Leg Scissors → Plank → Heel Touches" },
        ]
      },
      {
        day: 2, type: "Lower Body",
        exercises: [
          { name: "Squat Walks", sets: 3, reps: "10/leg", note: "Band above knees!" },
          { name: "Bulgarian Split Squat", sets: 4, reps: "10/leg", note: "Add DB if comfortable." },
          { name: "Hip Thrust (heavy)", sets: 4, reps: "12", note: "2 second hold at top!" },
          { name: "Single Leg RDL", sets: 3, reps: "10/leg", note: "" },
          { name: "Banded Kick Backs", sets: 3, reps: "20/leg", note: "Finish strong!" },
        ]
      },
      {
        day: 3, type: "Upper Body + Core",
        exercises: [
          { name: "Pushup", sets: 4, reps: "Until Failure", note: "" },
          { name: "DB Overhead Press", sets: 4, reps: "10-12", note: "" },
          { name: "DB Bent Over Row", sets: 4, reps: "10/side", note: "" },
          { name: "DB Hammer Curl", sets: 3, reps: "12", note: "" },
          { name: "Tricep Dips", sets: 3, reps: "Until Failure", note: "" },
          { name: "Abs #1", sets: 3, reps: "Circuit", note: "Plank → Leg Raises → Crunches" },
        ]
      },
    ]
  },
  {
    week: 6,
    days: [
      {
        day: 1, type: "Lower Body (Quad Focus)",
        exercises: [
          { name: "Air Squats", sets: 2, reps: "20", note: "" },
          { name: "DB Goblet Squat (heavy)", sets: 4, reps: "12", note: "Heavier than week 4!" },
          { name: "Reverse Lunge", sets: 3, reps: "12/leg", note: "" },
          { name: "Step Ups (chair/stairs)", sets: 3, reps: "12/leg", note: "Push through heel. Squeeze glutes at top." },
          { name: "Calf Raises", sets: 4, reps: "20", note: "" },
        ]
      },
      {
        day: 2, type: "Upper Body",
        exercises: [
          { name: "Pushup", sets: 4, reps: "Until Failure", note: "" },
          { name: "DB Side Lateral SS Front Raise", sets: 3, reps: "12", note: "Superset!" },
          { name: "DB Row", sets: 4, reps: "10/side", note: "" },
          { name: "DB Bicep Curl", sets: 3, reps: "12", note: "" },
          { name: "DB Overhead Tricep Extension", sets: 3, reps: "12", note: "" },
          { name: "Abs #1", sets: 3, reps: "Circuit", note: "Plank → Leg Raises → Crunches" },
        ]
      },
      {
        day: 3, type: "Glute & Ham",
        exercises: [
          { name: "Banded Squat Walks", sets: 3, reps: "12/leg", note: "" },
          { name: "Hip Thrust", sets: 4, reps: "10", note: "2 second pause at top each rep!" },
          { name: "Single Leg Glute Bridge", sets: 3, reps: "15/leg", note: "" },
          { name: "Single Leg RDL", sets: 3, reps: "10/leg", note: "" },
          { name: "Kick Backs", sets: 3, reps: "20/leg", note: "" },
        ]
      },
    ]
  },
  {
    week: 7,
    days: [
      {
        day: 1, type: "Upper Body",
        exercises: [
          { name: "Pushup", sets: 4, reps: "Until Failure", note: "" },
          { name: "DB Overhead Press", sets: 4, reps: "10", note: "" },
          { name: "DB Row", sets: 4, reps: "10/side", note: "" },
          { name: "DB Lateral Raise", sets: 3, reps: "15", note: "" },
          { name: "Slow Curls", sets: 3, reps: "8", note: "4 count up, 4 count down." },
          { name: "Tricep Dips", sets: 3, reps: "Until Failure", note: "" },
          { name: "Abs #2", sets: 3, reps: "Circuit", note: "Leg Lifts → Side Plank → Russian Twists" },
        ]
      },
      {
        day: 2, type: "Leg Day",
        exercises: [
          { name: "Squat Walks SS Kick Backs", sets: 2, reps: "10", note: "" },
          { name: "DB Goblet Squat", sets: 4, reps: "12", note: "Heaviest DB — go for it!" },
          { name: "Hip Thrust", sets: 4, reps: "12", note: "" },
          { name: "Reverse Lunge", sets: 3, reps: "12/leg", note: "" },
          { name: "Single Leg RDL", sets: 3, reps: "10/leg", note: "" },
          { name: "Banded Squat Walks", sets: 2, reps: "15/leg", note: "Glute finisher!" },
        ]
      },
      {
        day: 3, type: "Full Body Superset",
        exercises: [
          { name: "Pushup", sets: 4, reps: "Until Failure", note: "" },
          { name: "DB Squat to Press", sets: 4, reps: "12", note: "" },
          { name: "DB Row + Lunge", sets: 3, reps: "10/side", note: "" },
          { name: "Hip Thrust + Curl", sets: 3, reps: "15", note: "Superset glutes and biceps!" },
          { name: "Abs #3", sets: 3, reps: "Circuit", note: "Leg Scissors → Plank → Heel Touches" },
        ]
      },
    ]
  },
  {
    week: 8,
    days: [
      {
        day: 1, type: "Glute & Ham",
        exercises: [
          { name: "Banded Cha Chas", sets: 2, reps: "10", note: "" },
          { name: "Hip Thrust (heaviest)", sets: 4, reps: "10", note: "Hold 3 seconds at top for first 4 reps!" },
          { name: "Single Leg RDL", sets: 3, reps: "10/leg", note: "" },
          { name: "Kick Backs", sets: 3, reps: "20/leg", note: "" },
          { name: "Frog Pumps", sets: 2, reps: "30", note: "Burnout!" },
        ]
      },
      {
        day: 2, type: "Upper Body",
        exercises: [
          { name: "Pushup", sets: 4, reps: "Until Failure", note: "" },
          { name: "DB Overhead Press", sets: 4, reps: "10", note: "Personal record attempt!" },
          { name: "DB Row (heavy)", sets: 4, reps: "8/side", note: "" },
          { name: "DB Lateral Raise", sets: 3, reps: "15", note: "" },
          { name: "Slow DB Extension", sets: 4, reps: "10", note: "Slow and controlled — arm killer!" },
          { name: "Abs #1", sets: 3, reps: "Circuit", note: "Plank → Leg Raises → Crunches" },
        ]
      },
      {
        day: 3, type: "Quad & Calf",
        exercises: [
          { name: "Air Squats", sets: 2, reps: "20", note: "Warm up!" },
          { name: "Bulgarian Split Squat", sets: 4, reps: "10/leg", note: "Heavy!" },
          { name: "DB Goblet Squat", sets: 3, reps: "15", note: "Quick reps, push through heels!" },
          { name: "Reverse Lunge", sets: 3, reps: "12/leg", note: "" },
          { name: "Single Leg Calf Raise", sets: 3, reps: "15/leg", note: "" },
        ]
      },
    ]
  },
  {
    week: 9,
    days: [
      {
        day: 1, type: "Full Body PR Week",
        exercises: [
          { name: "Pushup", sets: 4, reps: "Until Failure", note: "Progress from Week 1?? 💪" },
          { name: "DB Overhead Press", sets: 4, reps: "10", note: "Try heaviest weight you've used!" },
          { name: "DB Goblet Squat", sets: 4, reps: "12", note: "Heaviest goblet squat yet!" },
          { name: "Hip Thrust", sets: 4, reps: "12", note: "You've earned it — go heavy!" },
          { name: "DB Row", sets: 4, reps: "10/side", note: "" },
          { name: "Abs #2", sets: 3, reps: "Circuit", note: "Leg Lifts → Side Plank → Russian Twists" },
        ]
      },
      {
        day: 2, type: "Lower Body",
        exercises: [
          { name: "Squat Walks SS Kick Backs", sets: 3, reps: "10", note: "Glute slayer!" },
          { name: "DB Goblet Squat", sets: 4, reps: "10-12", note: "Set a personal record on last set!" },
          { name: "Single Leg RDL", sets: 3, reps: "10/leg", note: "Deep hamstring stretch." },
          { name: "Hip Thrust", sets: 3, reps: "12", note: "Drop set on last 2 sets!" },
          { name: "Banded Squat Walks", sets: 2, reps: "15/leg", note: "Finisher!" },
        ]
      },
      {
        day: 3, type: "Upper Body + Core",
        exercises: [
          { name: "Pushup", sets: 4, reps: "Until Failure", note: "Final week — everything you've got!" },
          { name: "DB Row", sets: 4, reps: "8/side", note: "Heaviest weight!" },
          { name: "DB Overhead Press", sets: 4, reps: "10", note: "" },
          { name: "Slow Curls", sets: 3, reps: "8", note: "Same weight but very slow." },
          { name: "Tricep Dips", sets: 3, reps: "Until Failure", note: "" },
          { name: "Abs #3", sets: 3, reps: "Circuit", note: "Leg Scissors → Plank → Heel Touches" },
        ]
      },
    ]
  },
];

const AB_CIRCUITS = [
  { id: 1, name: "Ab Circuit #1", exercises: ["Plank (until failure)", "Leg Lifts (slow & controlled)", "Crunches (feet under couch)"], note: "3 rounds. Always go to failure." },
  { id: 2, name: "Ab Circuit #2", exercises: ["Leg Lifts", "Side Plank (2 rotations, alternating)", "Russian Twists"], note: "3 rounds. No breaks between sides." },
  { id: 3, name: "Ab Circuit #3", exercises: ["Leg Scissors", "Plank (until failure)", "Heel Touches (alternating)"], note: "3 rounds. Keep constant tension." },
];

const TYPE_COLORS = {
  "Upper Body": "#E91E8C",
  "Lower Body": "#FF6FB4",
  "Full Body": "#C2185B",
  "Chest/Shoulder/Tricep": "#AD1457",
  "Back/Bicep": "#E91E8C",
  "Back/Biceps": "#E91E8C",
  "Legs (Glute & Ham)": "#FF80AB",
  "Legs (Quad & Calves)": "#FF4081",
  "Legs (Quad & Calf)": "#FF4081",
  "Leg Day": "#F06292",
  "Glute & Ham": "#FF80AB",
  "Quad & Calf": "#FF4081",
  "Full Body Circuit": "#C2185B",
  "Full Body Superset": "#AD1457",
  "Full Body PR Week": "#880E4F",
  "Upper Body + Core": "#E91E8C",
};

function getColor(type) {
  return TYPE_COLORS[type] || "#E91E8C";
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function TabBar({ mode, setMode }) {
  return (
    <div style={{ display: "flex", background: "#fff0f6", borderRadius: 50, padding: 4, gap: 4 }}>
      {["gym", "home"].map(m => (
        <button
          key={m}
          onClick={() => setMode(m)}
          style={{
            flex: 1, padding: "10px 24px", borderRadius: 50, border: "none",
            background: mode === m ? "#E91E8C" : "transparent",
            color: mode === m ? "#fff" : "#E91E8C",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: 15, cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {m === "gym" ? "🏋️ Gym" : "🏠 Home"}
        </button>
      ))}
    </div>
  );
}

function WeekCard({ week, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 56, height: 56, borderRadius: 16, border: "none",
        background: isActive ? "#E91E8C" : "#fff0f6",
        color: isActive ? "#fff" : "#E91E8C",
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700, fontSize: 13, cursor: "pointer",
        flexShrink: 0,
        boxShadow: isActive ? "0 4px 16px rgba(233,30,140,0.4)" : "none",
        transition: "all 0.2s",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 1,
      }}
    >
      <span style={{ fontSize: 10, opacity: 0.7 }}>WK</span>
      <span style={{ fontSize: 18 }}>{week}</span>
    </button>
  );
}

function DayCard({ day, isActive, onClick }) {
  const color = getColor(day.type);
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, padding: "14px 10px", borderRadius: 16,
        border: `2px solid ${isActive ? color : "#ffd6ea"}`,
        background: isActive ? color : "#fff",
        color: isActive ? "#fff" : "#333",
        cursor: "pointer", transition: "all 0.2s",
        textAlign: "center",
      }}
    >
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 13 }}>Day {day.day}</div>
      <div style={{ fontSize: 10, marginTop: 2, opacity: 0.8, lineHeight: 1.3 }}>{day.type}</div>
    </button>
  );
}

function ExerciseCard({ ex, index }) {
  const [done, setDone] = useState(false);
  return (
    <div
      onClick={() => setDone(d => !d)}
      style={{
        background: done ? "#fff0f6" : "#fff",
        border: `1px solid ${done ? "#E91E8C" : "#ffe0ef"}`,
        borderRadius: 16, padding: "14px 16px", cursor: "pointer",
        transition: "all 0.2s", opacity: done ? 0.65 : 1,
        display: "flex", gap: 14, alignItems: "flex-start",
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 10, flexShrink: 0,
        background: done ? "#E91E8C" : "#fff0f6",
        color: done ? "#fff" : "#E91E8C",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15,
      }}>
        {done ? "✓" : index + 1}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontWeight: 700, fontSize: 15, color: "#1a1a1a",
          textDecoration: done ? "line-through" : "none",
          fontFamily: "'Playfair Display', serif",
        }}>{ex.name}</div>
        <div style={{ fontSize: 12, color: "#E91E8C", fontWeight: 600, marginTop: 2 }}>
          {ex.sets} sets · {ex.reps} reps
        </div>
        {ex.note && (
          <div style={{
            marginTop: 6, fontSize: 12, color: "#666",
            background: "#fff0f6", padding: "6px 10px", borderRadius: 8,
            lineHeight: 1.5, fontStyle: "italic",
          }}>
            💬 {ex.note}
          </div>
        )}
      </div>
    </div>
  );
}

function AbCircuits() {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 700,
        fontSize: 18, color: "#E91E8C", marginBottom: 12,
      }}>Ab Circuits 🔥</div>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 16, fontStyle: "italic" }}>
        Do these after your workout. Always go to failure. Circuit 3 rounds each.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {AB_CIRCUITS.map(c => (
          <div key={c.id} style={{
            background: "#fff0f6", border: "1px solid #ffd6ea",
            borderRadius: 16, padding: "14px 16px",
          }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#C2185B", marginBottom: 8 }}>{c.name} × 3</div>
            {c.exercises.map((e, i) => (
              <div key={i} style={{ fontSize: 13, color: "#444", paddingLeft: 8, marginBottom: 4 }}>
                {i + 1}. {e}
              </div>
            ))}
            <div style={{ fontSize: 11, color: "#E91E8C", marginTop: 6, fontStyle: "italic" }}>{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function MariFitnessApp() {
  const [mode, setMode] = useState("gym");
  const [weekIdx, setWeekIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const [showAbs, setShowAbs] = useState(false);

  const weeks = mode === "gym" ? GYM_WEEKS : HOME_WEEKS;
  const currentWeek = weeks[weekIdx];
  const currentDay = currentWeek.days[dayIdx];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fff5f9 0%, #ffe8f3 100%)",
      fontFamily: "'DM Sans', sans-serif",
      color: "#1a1a1a",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #ffc0d9; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #E91E8C 0%, #C2185B 100%)",
        padding: "36px 20px 24px",
        borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
        boxShadow: "0 8px 32px rgba(233,30,140,0.3)",
      }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>
            FIT WITH MARI
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: 32, color: "#fff", lineHeight: 1.1, marginBottom: 16,
          }}>
            My Guide<br />to the Gym 💪
          </div>
          <TabBar mode={mode} setMode={setMode} />
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px 60px" }}>

        {/* Week selector */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#E91E8C", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
            Select Week
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {weeks.map((w, i) => (
              <WeekCard key={i} week={w.week} isActive={i === weekIdx} onClick={() => { setWeekIdx(i); setDayIdx(0); }} />
            ))}
          </div>
        </div>

        {/* Day selector */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#E91E8C", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
            Select Day
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {currentWeek.days.map((d, i) => (
              <DayCard key={i} day={d} isActive={i === dayIdx} onClick={() => setDayIdx(i)} />
            ))}
          </div>
        </div>

        {/* Workout header */}
        <div style={{
          background: `linear-gradient(135deg, ${getColor(currentDay.type)}, ${getColor(currentDay.type)}cc)`,
          borderRadius: 20, padding: "18px 20px", marginBottom: 16,
          boxShadow: `0 4px 24px ${getColor(currentDay.type)}44`,
        }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", letterSpacing: 1 }}>WEEK {currentWeek.week} · DAY {currentDay.day}</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 24, color: "#fff", marginTop: 2 }}>
            {currentDay.type}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>
            {currentDay.exercises.length} exercises · Tap to mark complete
          </div>
        </div>

        {/* Exercises */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {currentDay.exercises.map((ex, i) => (
            <ExerciseCard key={i} ex={ex} index={i} />
          ))}
        </div>

        {/* Mari's tip */}
        <div style={{
          background: "#fff", border: "1px solid #ffd6ea",
          borderRadius: 16, padding: "14px 16px", marginBottom: 20,
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <div style={{ fontSize: 28 }}>👱‍♀️</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#E91E8C" }}>Mari says:</div>
            <div style={{ fontSize: 13, color: "#555", marginTop: 2, lineHeight: 1.5, fontStyle: "italic" }}>
              "Remember to push yourself! Those last couple of reps are the ones that really count! &lt;3"
            </div>
          </div>
        </div>

        {/* Ab Circuits toggle */}
        <button
          onClick={() => setShowAbs(s => !s)}
          style={{
            width: "100%", padding: "14px", borderRadius: 16,
            border: "2px solid #E91E8C", background: showAbs ? "#E91E8C" : "transparent",
            color: showAbs ? "#fff" : "#E91E8C",
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            fontSize: 15, cursor: "pointer", transition: "all 0.2s",
          }}
        >
          {showAbs ? "Hide Ab Circuits ▲" : "View Ab Circuits ▼"}
        </button>

        {showAbs && <AbCircuits />}

        {/* Key */}
        <div style={{
          marginTop: 24, background: "#fff", border: "1px solid #ffd6ea",
          borderRadius: 16, padding: "14px 16px",
        }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#C2185B", marginBottom: 10 }}>📖 Key</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[["BB", "Barbell"], ["DB", "Dumbbell"], ["SS", "Superset"], ["RDL", "Romanian Deadlift"]].map(([k, v]) => (
              <div key={k} style={{ fontSize: 12, color: "#555" }}>
                <span style={{ fontWeight: 700, color: "#E91E8C" }}>{k}</span> = {v}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: "#999", fontStyle: "italic" }}>
            Rest: 30s for fat loss · 60s for muscle · 45s for both goals
          </div>
        </div>
      </div>
    </div>
  );
}
