// ============================
// SECTION 1: INITIAL SETUP
// ============================

const startAssessmentBtn = document.getElementById("startAssessment");
const pathSelection = document.getElementById("pathSelection");
const superheroBtn = document.getElementById("superheroBtn");
const animeBtn = document.getElementById("animeBtn");

const arcScreen = document.getElementById("arcScreen");
const backHomeBtn = document.getElementById("backHome");
const pathTitle = document.getElementById("pathTitle");
const pathSubtitle = document.getElementById("pathSubtitle");
const arcContainer = document.getElementById("arcContainer");


// ============================
// SECTION 2: ASSESSMENT SYSTEM
// ============================

const ASSESSMENT_KEY = "callisthenics_assessment_v1";

const pushOptions = [
    "Wall Push-up",
    "Knee Push-up",
    "Incline Push-up",
    "Wide Push-up",
    "Diamond Push-up",
    "Decline Push-up",
    "Archer Push-up",
    "Deficit Push-up",
    "Explosive Push-up",
    "One-arm Push-up"
];

const pullOptions = [
    "Table Row",
    "Higher Table Row",
    "Australian Row",
    "Hammer Pull-up",
    "Close-grip Pull-up",
    "Wide Pull-up",
    "Chest-to-bar Pull-up",
    "Archer Pull-up",
    "Weighted Pull-up"
];

const legOptions = [
    "Bodyweight Squat",
    "Split Squat",
    "Lunges",
    "Sumo Squat",
    "Bulgarian Split Squat",
    "Deep Squat",
    "Explosive Squat",
    "Shrimp Squat",
    "Weighted Squat"
];

function buildOptionsHTML(optionsArray) {
    let html = "";
    for (let i = 0; i < optionsArray.length; i++) {
        html += `<option value="${optionsArray[i]}">${optionsArray[i]}</option>`;
    }
    return html;
}

function createAssessmentPopup() {
    if (document.getElementById("assessmentPopup")) {
        return;
    }

    const popup = document.createElement("div");
    popup.className = "assessment-popup";
    popup.id = "assessmentPopup";

    popup.innerHTML = `
        <div class="assessment-box">
            <button class="close-btn" id="closeAssessmentBtn">&times;</button>
            <h2>Fitness Assessment</h2>
            <p class="subtitle">Pick your hardest comfortable variation and enter your reps.</p>

            <div class="exercise-section">
                <h3>Push</h3>
                <label for="pushSelect">Movement</label>
                <select id="pushSelect">${buildOptionsHTML(pushOptions)}</select>
                <label for="pushReps">Reps</label>
                <input type="number" id="pushReps" min="0" value="0">
            </div>

            <div class="exercise-section">
                <h3>Pull</h3>
                <label for="pullSelect">Movement</label>
                <select id="pullSelect">${buildOptionsHTML(pullOptions)}</select>
                <label for="pullReps">Reps</label>
                <input type="number" id="pullReps" min="0" value="0">
            </div>

            <div class="exercise-section">
                <h3>Legs</h3>
                <label for="legSelect">Movement</label>
                <select id="legSelect">${buildOptionsHTML(legOptions)}</select>
                <label for="legReps">Reps</label>
                <input type="number" id="legReps" min="0" value="0">
            </div>

            <button class="submit-btn" id="saveAssessmentBtn">Save/Complete Assessment</button>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("closeAssessmentBtn").addEventListener("click", function () {
        popup.remove();
    });

    document.getElementById("saveAssessmentBtn").addEventListener("click", function () {
        const assessmentData = {
            push: {
                exercise: document.getElementById("pushSelect").value,
                reps: Number(document.getElementById("pushReps").value)
            },
            pull: {
                exercise: document.getElementById("pullSelect").value,
                reps: Number(document.getElementById("pullReps").value)
            },
            legs: {
                exercise: document.getElementById("legSelect").value,
                reps: Number(document.getElementById("legReps").value)
            },
            completedAt: Date.now()
        };

        localStorage.setItem(ASSESSMENT_KEY, JSON.stringify(assessmentData));

        popup.remove();
    });
}

function getAssessment() {
    const raw = localStorage.getItem(ASSESSMENT_KEY);
    if (!raw) {
        return null;
    }
    return JSON.parse(raw);
}

startAssessmentBtn.addEventListener("click", function () {
    const existing = getAssessment();

    if (existing) {
        return;
    }

    createAssessmentPopup();
});


// ============================
// SECTION 3: PATH SELECTION
// ============================

let currentPath = null;

function showArcScreen(pathName) {
    currentPath = pathName;
    localStorage.setItem("selectedPath", pathName);

    pathSelection.style.display = "none";
    arcScreen.style.display = "block";

    if (pathName === "superhero") {
        pathTitle.textContent = "Superhero Path";
        pathSubtitle.textContent = "Awaken your power. Become the hero your body was built to be.";
    } else if (pathName === "anime") {
        pathTitle.textContent = "Anime Protagonist Path";
        pathSubtitle.textContent = "Master your body. Push past every limit standing in your way.";
    }

    renderArcCards();
}

superheroBtn.addEventListener("click", function () {
    showArcScreen("superhero");
});

animeBtn.addEventListener("click", function () {
    showArcScreen("anime");
});


// ============================
// SECTION 4: SUPERHERO ARCS
// ============================

const superheroArcs = [
    {
        number: 1,
        title: "Awakening: The Surge",
        dayRange: "Days 0-30",
        description: "Something in you has been dormant for too long. This is where it wakes up. Every rep is a spark - the first sign that the power you've always carried is finally being called on."
    },
    {
        number: 2,
        title: "Calibration: The Crucible",
        dayRange: "Days 31-60",
        description: "Raw power means nothing without control. This is where you're tested, refined, and rebuilt - pushed hard enough to find out exactly what you're made of, and stronger for it."
    },
    {
        number: 3,
        title: "Integration: The Mastery",
        dayRange: "Days 61-90",
        description: "The surge and the struggle come together here. This is where strength stops being something you're chasing and becomes something you simply are."
    }
];


// ============================
// SECTION 5: ANIME PROTAGONIST ARCS
// ============================

const animeArcs = [
    {
        number: 1,
        title: "The Iron Will",
        dayRange: "Days 0-30",
        description: "Every protagonist's story starts the same way - weak, untested, unsure. But will is the one thing you already have in full. This arc is about proving it, one rep at a time."
    },
    {
        number: 2,
        title: "The Weight of Gravity",
        dayRange: "Days 31-60",
        description: "The training gets heavier. The path gets harder. This is the arc where the story usually breaks people - and where you learn that gravity is just another rule waiting to be bent."
    },
    {
        number: 3,
        title: "Beyond the Flesh",
        dayRange: "Days 61-90",
        description: "This is the final transformation - the moment the training stops being something you do and becomes something you are. What was once your limit is now just your starting point."
    }
];


// ============================
// SECTION 6: ARC PROGRESSION
// ============================

function getCurrentArcNumber() {
    const assessment = getAssessment();

    if (!assessment || !assessment.completedAt) {
        return 1;
    }

    const msPerDay = 1000 * 60 * 60 * 24;
    const elapsedDays = Math.floor((Date.now() - assessment.completedAt) / msPerDay);

    if (elapsedDays <= 30) {
        return 1;
    } else if (elapsedDays <= 60) {
        return 2;
    } else if (elapsedDays <= 90) {
        return 3;
    } else {
        return 4;
    }
}

function showInlineMessage(message) {
    const existing = document.getElementById("inlineMessage");
    if (existing) {
        existing.remove();
    }

    const msgBox = document.createElement("p");
    msgBox.id = "inlineMessage";
    msgBox.className = "lockedText";
    msgBox.textContent = message;

    arcContainer.prepend(msgBox);

    setTimeout(function () {
        const el = document.getElementById("inlineMessage");
        if (el) {
            el.remove();
        }
    }, 4000);
}

function renderArcCards() {
    arcContainer.innerHTML = "";

    const arcsToShow = currentPath === "superhero" ? superheroArcs : animeArcs;
    const unlockedArcNumber = getCurrentArcNumber();

    for (let i = 0; i < arcsToShow.length; i++) {
        const arc = arcsToShow[i];
        const isUnlocked = arc.number <= unlockedArcNumber;
        const isCurrent = arc.number === unlockedArcNumber;

        const card = document.createElement("div");
        card.className = "arcCard " + (isUnlocked ? "unlocked" : "locked");

        card.innerHTML = `
            <div class="arcNumber">ARC ${arc.number}</div>
            <h2>${arc.title}</h2>
            <div class="arcDays">${arc.dayRange}</div>
            <p class="arcDescription">${arc.description}</p>
            ${isCurrent ? '<div class="current-badge">CURRENT</div>' : ""}
            ${!isUnlocked ? '<div class="locked-badge">LOCKED</div>' : ""}
            <button class="enterArcBtn" data-arc="${arc.number}">ENTER ARC</button>
        `;

        arcContainer.appendChild(card);
    }

    if (unlockedArcNumber === 4) {
        showInlineMessage("Program Complete! You've finished all 3 arcs.");
    }
}


// ============================
// SECTION 7: ENTER ARC BUTTON
// ============================

arcContainer.addEventListener("click", function (event) {
    const clickedBtn = event.target.closest(".enterArcBtn");

    if (!clickedBtn) {
        return;
    }

    const requestedArc = Number(clickedBtn.getAttribute("data-arc"));
    const unlockedArcNumber = getCurrentArcNumber();

    if (requestedArc > unlockedArcNumber) {
        showInlineMessage("This ARC is still locked. Keep training to unlock it.");
        return;
    }

    localStorage.setItem("selectedArc", requestedArc);
    showSplitSelection(requestedArc);
});


// ============================
// SECTION 8: SPLIT SELECTION
// ============================

const splitSchedules = {
    "3-day": {
        label: "3-Day Full Body",
        days: ["Full Body", "Rest", "Full Body", "Rest", "Full Body", "Rest", "Rest"]
    },
    "5-day": {
        label: "5-Day PPL",
        days: ["Push", "Pull", "Legs", "Rest", "Push", "Pull", "Rest"]
    },
    "6-day": {
        label: "6-Day PPL",
        days: ["Push", "Pull", "Legs", "Push", "Pull", "Legs", "Rest"]
    },
    "7-day": {
        label: "7-Day Creator's Special",
        days: ["Full Body", "Mobility", "Full Body", "Active Recovery", "Full Body", "Mobility", "Active Recovery"]
    }
};

function showSplitSelection(arcNumber) {
    arcContainer.innerHTML = `
        <h2>Choose Your Training Split</h2>
        <div id="splitButtons"></div>
    `;

    const splitButtonsDiv = document.getElementById("splitButtons");

    for (const splitKey in splitSchedules) {
        const btn = document.createElement("button");
        btn.className = "splitBtn";
        btn.setAttribute("data-split", splitKey);
        btn.textContent = splitSchedules[splitKey].label;
        splitButtonsDiv.appendChild(btn);
    }
}

arcContainer.addEventListener("click", function (event) {
    const clickedBtn = event.target.closest(".splitBtn");

    if (!clickedBtn) {
        return;
    }

    const chosenSplit = clickedBtn.getAttribute("data-split");
    localStorage.setItem("selectedSplit", chosenSplit);

    showTimeSelection(chosenSplit);
});


// ============================
// SECTION 9: TIME SELECTION
// ============================

const timeOptions = [15, 20, 30, 45, 60];

function showTimeSelection(chosenSplit) {
    arcContainer.innerHTML = `
        <h2>How Much Time Can You Give?</h2>
        <div id="timeButtons"></div>
    `;

    const timeButtonsDiv = document.getElementById("timeButtons");

    for (let i = 0; i < timeOptions.length; i++) {
        const minutes = timeOptions[i];

        const btn = document.createElement("button");
        btn.className = "timeBtn";
        btn.setAttribute("data-time", minutes);
        btn.textContent = minutes + " Minutes";

        timeButtonsDiv.appendChild(btn);
    }
}

// NOTE: chosenSplit is read from localStorage here rather than relying on
// the showTimeSelection() parameter, since this listener is registered once
// at the top level and has no access to that function's local variable.
arcContainer.addEventListener("click", function (event) {
    const clickedBtn = event.target.closest(".timeBtn");

    if (!clickedBtn) {
        return;
    }

    const chosenTime = Number(clickedBtn.getAttribute("data-time"));
    const chosenSplit = localStorage.getItem("selectedSplit");

    localStorage.setItem("availableTrainingTime", chosenTime);

    generateAndShowWorkout(chosenSplit, chosenTime);
});


// ============================
// SECTION 10: TIME-BASED WORKOUT RULES
// ============================

const timeRules = {
    15: {
        exerciseCount: 3,
        restSeconds: 30,
        useSupersets: true,
        useDropsets: true,
        techniquesRequired: true
    },
    20: {
        exerciseCount: 4,
        restSeconds: 45,
        useSupersets: true,
        useDropsets: false,
        techniquesRequired: true
    },
    30: {
        exerciseCount: 4,
        restSeconds: 60,
        useSupersets: false,
        useDropsets: false,
        techniquesRequired: false
    },
    45: {
        exerciseCount: 5,
        restSeconds: 120,
        useSupersets: false,
        useDropsets: false,
        techniquesRequired: false
    },
    60: {
        exerciseCount: 5,
        restSeconds: 150,
        useSupersets: false,
        useDropsets: false,
        techniquesRequired: false
    }
};


// ============================
// SECTION 11: WORKOUT GENERATION
// ============================

const exercisePools = {
    push: {
        1: ["Wall Push-up", "Knee Push-up", "Incline Push-up"],
        2: ["Wide Push-up", "Diamond Push-up", "Decline Push-up"],
        3: ["Archer Push-up", "Deficit Push-up", "Explosive Push-up", "One-arm Push-up"]
    },
    pull: {
        1: ["Table Row", "Higher Table Row", "Australian Row"],
        2: ["Hammer Pull-up", "Close-grip Pull-up", "Wide Pull-up"],
        3: ["Chest-to-bar Pull-up", "Archer Pull-up", "Weighted Pull-up"]
    },
    legs: {
        1: ["Bodyweight Squat", "Split Squat", "Lunges"],
        2: ["Sumo Squat", "Bulgarian Split Squat", "Deep Squat"],
        3: ["Explosive Squat", "Shrimp Squat", "Weighted Squat"]
    },
    mobility: [
        "Hip Flexor Stretch", "Shoulder Dislocates (band or towel)", "Cat-Cow Stretch",
        "World's Greatest Stretch", "Ankle Mobility Drill", "Thoracic Spine Rotation"
    ],
    activeRecovery: [
        "Easy Walk (15-20 min)", "Light Full-Body Stretch", "Slow Bodyweight Flow",
        "Breathing & Mobility Reset"
    ]
};

function getTierForCategory(category, exerciseName, reps) {
    const orderedList = category === "push" ? pushOptions
        : category === "pull" ? pullOptions
        : legOptions;

    const index = orderedList.indexOf(exerciseName);
    const position = index === -1 ? 0 : index / (orderedList.length - 1);

    let tier;
    if (position < 0.34) {
        tier = 1;
    } else if (position < 0.67) {
        tier = 2;
    } else {
        tier = 3;
    }

    if (reps < 5 && tier > 1) {
        tier -= 1;
    } else if (reps >= 15 && tier < 3) {
        tier += 1;
    }

    return tier;
}

function getUserTiers() {
    const assessment = getAssessment();

    if (!assessment) {
        return { push: 1, pull: 1, legs: 1 };
    }

    return {
        push: getTierForCategory("push", assessment.push.exercise, assessment.push.reps),
        pull: getTierForCategory("pull", assessment.pull.exercise, assessment.pull.reps),
        legs: getTierForCategory("legs", assessment.legs.exercise, assessment.legs.reps)
    };
}

function getTodayWorkoutType(splitKey) {
    let startDate = localStorage.getItem("splitStartDate");

    if (!startDate) {
        startDate = Date.now();
        localStorage.setItem("splitStartDate", startDate);
    }

    const msPerDay = 1000 * 60 * 60 * 24;
    const elapsedDays = Math.floor((Date.now() - Number(startDate)) / msPerDay);

    const schedule = splitSchedules[splitKey].days;
    const dayIndex = elapsedDays % schedule.length;

    return schedule[dayIndex];
}

function generateAndShowWorkout(chosenSplit, chosenTime) {
    const tiers = getUserTiers();
    const rules = timeRules[chosenTime];
    const workoutType = getTodayWorkoutType(chosenSplit);

    const workoutPlan = buildWorkoutForType(workoutType, rules, tiers);

    displayWorkout(workoutType, workoutPlan, rules);
}


// ============================
// SECTION 12: REP PROMISE
// ============================

function getRepTarget(category) {
    const assessment = getAssessment();

    if (!assessment) {
        return { min: 6, max: 10 };
    }

    const baselineReps = assessment[category].reps;
    const msPerDay = 1000 * 60 * 60 * 24;
    const elapsedDays = Math.floor((Date.now() - assessment.completedAt) / msPerDay);

    const progressionSteps = Math.floor(elapsedDays / 10);
    const maxProgressionSteps = baselineReps;

    const cappedSteps = Math.min(progressionSteps, maxProgressionSteps);

    const targetMin = Math.max(3, baselineReps - 2 + cappedSteps);
    const targetMax = targetMin + 3;

    return { min: targetMin, max: targetMax };
}


// ============================
// SECTION 13: SECRET TECHNIQUES
// ============================

const secretTechniques = [
    "Controlled Pause (2 sec hold at hardest point)",
    "Tempo Variation (3 sec down, 1 sec up)",
    "Mechanical Progression (drop to an easier variation, same movement, same set)",
    "Superset (paired directly with the next exercise, no rest between)"
];

function maybeAssignTechnique(rules, exerciseIndexInWorkout) {
    if (!rules.techniquesRequired) {
        const shouldAddOptionalTechnique = Math.random() < 0.33;
        if (!shouldAddOptionalTechnique) {
            return null;
        }
    }

    const isEligibleSlot = exerciseIndexInWorkout % 2 === 1;
    if (!isEligibleSlot) {
        return null;
    }

    let pool = secretTechniques.slice();

    if (!rules.useSupersets) {
        pool = pool.filter(function (t) { return t.indexOf("Superset") === -1; });
    }

    if (pool.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}


// ============================
// SECTION 14: WORKOUT SPLITS
// ============================

function pickExerciseFromPool(category, tier) {
    const pool = exercisePools[category][tier] || exercisePools[category][1];
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}

function buildExerciseEntry(category, tiers, rules, indexInWorkout) {
    const tier = tiers[category];
    const exerciseName = pickExerciseFromPool(category, tier);
    const repRange = getRepTarget(category);
    const technique = maybeAssignTechnique(rules, indexInWorkout);

    return {
        name: exerciseName,
        sets: 3,
        repsMin: repRange.min,
        repsMax: repRange.max,
        restSeconds: rules.restSeconds,
        technique: technique,
        cue: getCoachingCue(category)
    };
}

function getCoachingCue(category) {
    const cues = {
        push: "Keep your core tight and elbows at a slight angle, not flared out.",
        pull: "Pull with your back, not just your arms - lead with your elbows.",
        legs: "Keep your knees tracking over your toes and go as deep as feels controlled.",
        mobility: "Move slow and controlled - this isn't about speed, it's about range.",
        activeRecovery: "Keep the effort light. This day is for recovery, not performance."
    };
    return cues[category] || "Focus on clean, controlled form.";
}

function buildRestStyleDay(poolKey, exerciseCount) {
    const pool = exercisePools[poolKey];
    const shuffled = pool.slice().sort(function () { return Math.random() - 0.5; });
    const chosen = shuffled.slice(0, exerciseCount);

    return chosen.map(function (name) {
        return {
            name: name,
            sets: 1,
            repsMin: null,
            repsMax: null,
            restSeconds: 0,
            technique: null,
            cue: getCoachingCue(poolKey)
        };
    });
}

function buildWorkoutForType(workoutType, rules, tiers) {
    if (workoutType === "Rest") {
        return [];
    }

    if (workoutType === "Mobility") {
        return buildRestStyleDay("mobility", 4);
    }

    if (workoutType === "Active Recovery") {
        return buildRestStyleDay("activeRecovery", 3);
    }

    const exercises = [];
    const count = rules.exerciseCount;

    if (workoutType === "Push") {
        for (let i = 0; i < count; i++) {
            exercises.push(buildExerciseEntry("push", tiers, rules, i));
        }
    } else if (workoutType === "Pull") {
        for (let i = 0; i < count; i++) {
            exercises.push(buildExerciseEntry("pull", tiers, rules, i));
        }
    } else if (workoutType === "Legs") {
        for (let i = 0; i < count; i++) {
            exercises.push(buildExerciseEntry("legs", tiers, rules, i));
        }
    } else if (workoutType === "Full Body") {
        const categories = ["push", "pull", "legs"];
        for (let i = 0; i < count; i++) {
            const category = categories[i % categories.length];
            exercises.push(buildExerciseEntry(category, tiers, rules, i));
        }
    }

    return exercises;
}


// ============================
// SECTION 15: WORKOUT DISPLAY
// ============================

function formatRestTime(seconds) {
    if (seconds === 0) {
        return null;
    }
    if (seconds < 60) {
        return seconds + " sec";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (remainingSeconds === 0) {
        return minutes + " min";
    }
    return minutes + " min " + remainingSeconds + " sec";
}

function displayWorkout(workoutType, workoutPlan, rules) {
    let html = `<h2>Today's Workout: ${workoutType}</h2>`;

    if (workoutType === "Rest") {
        html += `<p>Today is a rest day. Recovery is part of the training - let your body rebuild.</p>`;
        arcContainer.innerHTML = html;
        return;
    }

    if (workoutPlan.length === 0) {
        html += `<p>No exercises available for this workout type.</p>`;
        arcContainer.innerHTML = html;
        return;
    }

    for (let i = 0; i < workoutPlan.length; i++) {
        const ex = workoutPlan[i];

        const repsText = ex.repsMin !== null
            ? `${ex.sets} sets × ${ex.repsMin}-${ex.repsMax} reps`
            : `${ex.sets} set (as prescribed)`;

        const restText = formatRestTime(ex.restSeconds);

        html += `
            <div class="exercise-section">
                <h3>${ex.name.toUpperCase()}</h3>
                <p>${repsText}</p>
                ${restText ? `<p>Rest: ${restText}</p>` : ""}
                ${ex.technique ? `<p>Technique: ${ex.technique}</p>` : ""}
                <p class="subtitle">${ex.cue}</p>
            </div>
        `;
    }

    if (rules.useDropsets) {
        html += `<p class="lockedText">Optional: on your last exercise, drop to an easier variation for one extra set after reaching failure-safe fatigue (dropset).</p>`;
    }

    arcContainer.innerHTML = html;
}


// ============================
// SECTION 16: SAVING USER PROGRESS
// ============================

function restoreSavedProgress() {
    const savedPath = localStorage.getItem("selectedPath");
    const savedSplit = localStorage.getItem("selectedSplit");
    const savedTime = localStorage.getItem("availableTrainingTime");

    if (!savedPath) {
        return;
    }

    currentPath = savedPath;
    pathSelection.style.display = "none";
    arcScreen.style.display = "block";

    if (savedPath === "superhero") {
        pathTitle.textContent = "Superhero Path";
        pathSubtitle.textContent = "Awaken your power. Become the hero your body was built to be.";
    } else {
        pathTitle.textContent = "Anime Protagonist Path";
        pathSubtitle.textContent = "Master your body. Push past every limit standing in your way.";
    }

    if (savedSplit && savedTime) {
        generateAndShowWorkout(savedSplit, Number(savedTime));
        return;
    }

    if (savedSplit) {
        showTimeSelection(savedSplit);
        return;
    }

    renderArcCards();
}


// ============================
// SECTION 17: BACK BUTTON
// ============================

backHomeBtn.addEventListener("click", function () {
    arcScreen.style.display = "none";
    pathSelection.style.display = "block";

    currentPath = null;

    localStorage.removeItem("selectedPath");
    localStorage.removeItem("selectedArc");
    localStorage.removeItem("selectedSplit");
    localStorage.removeItem("availableTrainingTime");
    localStorage.removeItem("splitStartDate");
});

// Run once, on initial page load, to restore progress if any exists
restoreSavedProgress();
