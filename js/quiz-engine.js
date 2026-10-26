// ===================== Közös kvíz motor =====================
// Minden témaoldal ezt használja: QuizApp.init({ sections: [...] })
// Kérdéstípusok: choice (feleletválasztós), type (beírós), listen (diktálás), order (sorba rendezés)
// Egy játék: { id, title, emoji, intro, make: () => [kérdések] } vagy { custom: (area) => {...} }

const QUESTIONS_PER_GAME = 10;
const BTN_COLORS = ["primary", "success", "danger", "warning", "info"];
const BLANK = "<span class='blank-line'></span>";

// ===================== SEGÉD FUNKCIÓK =====================
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function sample(arr, n) { return shuffle(arr).slice(0, n); }
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Feleletválasztós kérdés: a helyes válasz + legfeljebb 3 rossz válasz összekeverve
function choiceQ(prompt, answer, wrong, explain) {
    const distractors = shuffle([...new Set(wrong)].filter(w => w !== answer)).slice(0, 3);
    return { type: "choice", prompt, answer, options: shuffle([answer, ...distractors]), explain };
}
// Beírós kérdés: answer lehet tömb is (több elfogadható válasz)
function typeQ(prompt, answer, explain, extra) {
    return Object.assign({ type: "type", prompt, answer, explain }, extra);
}
// Diktálás: a gép felolvassa a "say" szöveget, a gyerek beírja a szót
function listenQ(say, prompt, answer, explain) {
    return { type: "listen", say, prompt, answer, explain };
}
// Mondat sorba rendezése szavanként (a mondatvégi írásjelet levesszük, mint a régi játékban)
function orderQ(prompt, sentence, explain) {
    const end = /[.?!]$/.test(sentence) ? sentence.slice(-1) : "";
    const body = end ? sentence.slice(0, -1) : sentence;
    return { type: "order", prompt, items: body.split(" "), end, explain };
}
// Bekezdések (pl. egy történet részei) sorba rendezése
function blockOrderQ(prompt, items, explain) {
    return { type: "order", prompt, items, end: "", blocks: true, explain };
}

function normalizeAnswer(s, exact) {
    let t = String(s)
        .replace(/[‘’´`]/g, "'")
        .replace(/[“”„]/g, '"')
        .replace(/\s+/g, " ")
        .trim();
    if (!exact) t = t.toLowerCase().replace(/[.!?]+$/, "").trim();
    return t;
}

function answerText(q) {
    if (q.type === "order") {
        return q.blocks ? q.items.map((t, i) => `${i + 1}. ${t}`).join("\n") : q.items.join(" ") + q.end;
    }
    return Array.isArray(q.answer) ? q.answer.join("  /  ") : q.answer;
}

// Felolvasás brit angol hanggal (ha a böngésző támogatja)
function speak(text) {
    try {
        if (!window.speechSynthesis) return false;
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        const voices = speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang && v.lang.startsWith("en-GB")) || voices.find(v => v.lang && v.lang.startsWith("en"));
        if (voice) u.voice = voice;
        u.lang = "en-GB";
        u.rate = 0.85;
        speechSynthesis.speak(u);
        return true;
    } catch (e) {
        return false;
    }
}

// localStorage bármikor hiányozhat (privát ablak stb.), ezért mindig try/catch
function loadBest(id) {
    try {
        const v = localStorage.getItem("eg-best-" + id);
        return v ? JSON.parse(v) : null;
    } catch (e) { return null; }
}
function saveBest(id, score, total) {
    try {
        const old = loadBest(id);
        if (!old || score / total > old.score / old.total) {
            localStorage.setItem("eg-best-" + id, JSON.stringify({ score, total }));
        }
    } catch (e) { /* nem baj, ha nem menthető */ }
}
function loadText(key) {
    try { return localStorage.getItem(key) || ""; } catch (e) { return ""; }
}
function saveText(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* nem baj */ }
}
function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// Ne mindig ugyanazok legyenek a kérdések: megjegyezzük, mi volt már, és előbb az újakat adjuk.
// Ha elfogytak az újak, a kör elölről indul.
function questionKey(q) { return (q.reviewPrompt || q.prompt).slice(-140) + "|" + answerText(q).slice(0, 60); }
function pickFresh(gameId, pool, count) {
    const key = "eg-seen-" + gameId;
    let seen = [];
    try { seen = JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) { seen = []; }
    const seenSet = new Set(seen);
    const mixed = shuffle(pool);
    const fresh = mixed.filter(q => !seenSet.has(questionKey(q)));
    const chosen = [...fresh, ...mixed.filter(q => seenSet.has(questionKey(q)))].slice(0, count);
    const newSeen = fresh.length <= count ? chosen.map(questionKey) : [...seen, ...chosen.map(questionKey)];
    try { localStorage.setItem(key, JSON.stringify(newSeen.slice(-400))); } catch (e) { /* nem baj */ }
    return chosen;
}

// Kevert játék több játék kérdéseiből (mindegyikből néhányat, hogy kiegyensúlyozott legyen)
function mixGame(id, title, games, count) {
    return {
        id, title, emoji: "🎲", count: count || QUESTIONS_PER_GAME, isMix: true,
        intro: "Random questions from: <b>" + games.map(g => g.title).join("</b>, <b>") + "</b>.",
        make: () => games.flatMap(g => sample(g.make(), 5))
    };
}

// ===================== KVÍZ ALKALMAZÁS =====================
const QuizApp = {
    sections: [],
    root: null,
    game: null,
    questions: [],
    current: 0,
    score: 0,
    mistakes: [],
    locked: false,
    autoTimer: null,

    init(config) {
        // A Random Challenge oldal minden témaoldalt betölt: ott csak összegyűjtjük a játékokat
        if (window.QUIZ_COLLECT) { window.QUIZ_COLLECT.push(config); return; }
        this.sections = config.sections;
        // minden (legalább 2 játékos) témakörhöz automatikusan jár egy kevert játék
        this.sections.forEach(sec => {
            const playable = sec.games.filter(g => !g.custom);
            if (playable.length >= 2) sec.games.push(mixGame(`mix-${playable[0].id}`, `Mixed: ${sec.title}`, playable));
        });
        const all = this.sections.flatMap(sec => sec.games.filter(g => !g.custom && !g.isMix));
        this.pageMix = this.sections.length > 1 ? mixGame(`mix-page-${all[0].id}`, "Mixed challenge", all, 15) : null;
        this.root = document.getElementById("app");
        this.showMenu();
    },

    stopAll() {
        clearTimeout(this.autoTimer);
        this.game = null;
        try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) { /* nincs hang */ }
    },

    // 1. szint: témakörök kártyái (ha csak egy témakör van, rögtön a játékai jönnek)
    showMenu() {
        this.stopAll();
        this.section = null;
        if (this.sections.length === 1) { this.showSection(0); return; }
        const colors = ["sunny", "sky", "berry", "grass", "grape", "orange"];
        this.root.innerHTML = `<div class="hub-grid">` + this.sections.map((sec, si) => `
            <button class="hub-card card-${colors[si % colors.length]} section-card" data-s="${si}">
                <span class="hub-emoji">${sec.emoji}</span>
                <span class="hub-title">${sec.title}</span>
                <span class="hub-desc">${sec.games.length} games</span>
            </button>`).join("") + `</div>`;
        if (this.pageMix) {
            this.root.innerHTML += `<button class="btn btn-danger btn-lg mt-4" id="page-mix-btn">🎲 Mixed challenge – a bit of everything</button>`;
            document.getElementById("page-mix-btn").onclick = () => this.showIntro(this.pageMix);
        }
        this.root.querySelectorAll(".section-card").forEach(btn => {
            btn.onclick = () => this.showSection(Number(btn.dataset.s));
        });
        window.scrollTo(0, 0);
    },

    // 2. szint: egy témakör játékai
    showSection(si) {
        this.stopAll();
        this.section = si;
        const sec = this.sections[si];
        let html = `<h2>${sec.emoji} ${sec.title}</h2>`;
        if (sec.desc) html += `<p class="section-desc">${sec.desc}</p>`;
        html += `<div class="game-grid">`;
        sec.games.forEach((g, gi) => {
            const best = g.custom ? null : loadBest(g.id);
            const badge = best ? `<span class="best">⭐ Best: ${best.score} / ${best.total}</span>` : "";
            const color = BTN_COLORS[gi % BTN_COLORS.length];
            html += `<button class="btn btn-${color} game-card" data-g="${gi}">${g.emoji || ""} ${g.title}${badge}</button>`;
        });
        html += `</div>`;
        if (this.sections.length > 1) {
            html += `<div class="mt-4"><button class="btn btn-back btn-outline-warning" id="back-topics-btn">⬅️ All topics</button></div>`;
        }
        this.root.innerHTML = html;
        this.root.querySelectorAll(".game-card").forEach(btn => {
            btn.onclick = () => this.showIntro(sec.games[btn.dataset.g]);
        });
        const back = document.getElementById("back-topics-btn");
        if (back) back.onclick = () => this.showMenu();
        window.scrollTo(0, 0);
    },

    backButtonHtml() {
        return `<div class="mt-3"><button class="btn btn-back btn-outline-warning" id="back-menu-btn">⬅️ Back to games</button></div>`;
    },
    bindBack() {
        document.getElementById("back-menu-btn").onclick = () => this.section === null ? this.showMenu() : this.showSection(this.section);
    },

    showIntro(game) {
        this.game = game;
        if (game.custom) {
            this.root.innerHTML = `<h2>${game.emoji || ""} ${game.title}</h2><div id="custom-area"></div>${this.backButtonHtml()}`;
            this.bindBack();
            game.custom(document.getElementById("custom-area"));
            window.scrollTo(0, 0);
            return;
        }
        this.root.innerHTML = `
            <h2>${game.emoji || ""} ${game.title}</h2>
            ${game.intro ? `<div class="rule-box">${game.intro}</div>` : ""}
            <button class="btn btn-success btn-lg m-2" id="start-game-btn">▶️ Start</button>
            ${this.backButtonHtml()}`;
        document.getElementById("start-game-btn").onclick = () => this.start();
        this.bindBack();
        window.scrollTo(0, 0);
    },

    start() {
        const count = this.game.count || QUESTIONS_PER_GAME;
        this.questions = pickFresh(this.game.id, this.game.make(), count);
        this.current = 0;
        this.score = 0;
        this.mistakes = [];
        this.showQuestion();
    },

    showQuestion() {
        this.locked = false;
        const q = this.questions[this.current];
        const total = this.questions.length;
        const pct = Math.round(this.current / total * 100);
        this.root.innerHTML = `
            <div class="q-header">${this.game.emoji || ""} ${this.game.title}</div>
            <div class="q-counter">Question ${this.current + 1} / ${total} &nbsp;·&nbsp; ⭐ ${this.score}</div>
            <div class="progress q-progress"><div class="progress-bar bg-success" style="width:${pct}%"></div></div>
            <div class="q-prompt">${q.prompt.replace(/___/g, BLANK)}</div>
            <div id="q-body"></div>
            <div id="q-feedback"></div>
            ${this.backButtonHtml()}`;
        this.bindBack();
        const body = document.getElementById("q-body");
        if (q.type === "choice") this.renderChoice(q, body);
        else if (q.type === "type" || q.type === "listen") this.renderType(q, body);
        else if (q.type === "order") this.renderOrder(q, body);
    },

    renderChoice(q, body) {
        // hosszú válaszoknál (mondatok) egymás alá kerülnek a gombok
        const long = q.options.some(o => o.length > 22);
        if (long) body.className = "options-stack";
        const colors = shuffle(BTN_COLORS);
        q.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.textContent = opt;
            btn.className = `btn btn-${long ? "light" : colors[i % colors.length]} m-2`;
            btn.onclick = () => {
                if (this.locked) return;
                const ok = opt === q.answer;
                btn.classList.add(ok ? "opt-correct" : "opt-wrong");
                if (!ok) {
                    body.querySelectorAll("button").forEach(b => { if (b.textContent === q.answer) b.classList.add("opt-correct"); });
                }
                this.answer(ok, opt);
            };
            body.appendChild(btn);
        });
    },

    renderType(q, body) {
        let html = "";
        if (q.type === "listen") html += `<button class="btn btn-info m-2" id="listen-btn">🔊 Listen again</button><br>`;
        if (q.hint) html += `<div class="q-hint">${q.hint}</div>`;
        html += `<input type="text" id="answer-input" class="answer-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${q.placeholder || "Type your answer…"}">
                 <br><button class="btn btn-success m-2" id="check-btn">✔️ Check</button>`;
        body.innerHTML = html;
        const input = document.getElementById("answer-input");
        const check = () => {
            if (this.locked || !input.value.trim()) return;
            const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
            const given = normalizeAnswer(input.value, q.exact);
            const ok = answers.some(a => normalizeAnswer(a, q.exact) === given);
            input.classList.add(ok ? "input-correct" : "input-wrong");
            input.disabled = true;
            this.answer(ok, input.value.trim());
        };
        document.getElementById("check-btn").onclick = check;
        input.onkeydown = e => { if (e.key === "Enter") { e.preventDefault(); check(); } };
        if (q.type === "listen") {
            const say = () => speak(q.say);
            document.getElementById("listen-btn").onclick = say;
            say();
        }
        input.focus();
    },

    renderOrder(q, body) {
        body.innerHTML = `
            <div class="order-hint">Tap the ${q.blocks ? "paragraphs" : "words"} in the right order:</div>
            <div class="order-area" id="order-answer"></div>
            <div id="order-bank"></div>
            <button class="btn btn-outline-secondary btn-sm m-2" id="order-reset">↩️ Reset</button>`;
        const bank = document.getElementById("order-bank");
        const area = document.getElementById("order-answer");
        let shuffled = shuffle(q.items);
        // ne legyen eleve jó sorrendben
        if (shuffled.length > 1 && shuffled.join("\u0001") === q.items.join("\u0001")) shuffled = [...shuffled].reverse();
        const colors = shuffle(BTN_COLORS);
        shuffled.forEach((text, k) => {
            const btn = document.createElement("button");
            btn.textContent = text;
            btn.className = q.blocks ? "btn btn-light order-block" : `btn btn-${colors[k % colors.length]} m-1`;
            btn.onclick = () => {
                if (this.locked) return;
                (btn.parentElement === bank ? area : bank).appendChild(btn);
                if (bank.children.length === 0) {
                    const given = Array.from(area.children).map(b => b.textContent);
                    const ok = given.join("\u0001") === q.items.join("\u0001");
                    this.answer(ok, q.blocks ? "(wrong order)" : given.join(" ") + q.end);
                }
            };
            bank.appendChild(btn);
        });
        document.getElementById("order-reset").onclick = () => {
            if (!this.locked) Array.from(area.children).forEach(b => bank.appendChild(b));
        };
    },

    answer(ok, given) {
        this.locked = true;
        const q = this.questions[this.current];
        const fb = document.getElementById("q-feedback");
        const explain = q.explain ? `<div class="explain">💡 ${q.explain}</div>` : "";
        if (ok) {
            this.score++;
            fb.innerHTML = `<div class="feedback-box ok"><span class="correct">🎉 Correct! ⭐</span>${explain}</div>`;
        } else {
            this.mistakes.push({ q, given });
            fb.innerHTML = `<div class="feedback-box bad"><span class="wrong">❌ Not quite!</span>
                <div class="right-answer">The answer is: <b>${escapeHtml(answerText(q)).replace(/\n/g, "<br>")}</b></div>${explain}</div>`;
        }
        const last = this.current >= this.questions.length - 1;
        fb.innerHTML += `<button class="btn btn-primary m-2" id="next-q-btn">${last ? "🏁 See my score" : "Next ➡️"}</button>`;
        const next = document.getElementById("next-q-btn");
        next.onclick = () => this.next();
        next.focus();
        // jó válasznál automatikusan továbblépünk, rossznál a gyerek elolvassa a magyarázatot
        if (ok) this.autoTimer = setTimeout(() => this.next(), q.explain ? 2600 : 1300);
    },

    next() {
        clearTimeout(this.autoTimer);
        if (!this.game) return;
        if (this.current < this.questions.length - 1) {
            this.current++;
            this.showQuestion();
        } else {
            this.finish();
        }
    },

    finish() {
        const total = this.questions.length;
        const score = this.score;
        saveBest(this.game.id, score, total);
        const ratio = score / total;
        const starCount = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.4 ? 1 : 0;
        const tail = ["Try again – you can do it! 💪", "Keep practising!", "Great work!", "Amazing! You are a star! 🏆"][starCount];
        const stars = "⭐".repeat(starCount) + "☆".repeat(3 - starCount);
        let review;
        if (this.mistakes.length) {
            review = `<div class="answers-list"><b>Let's learn from these:</b>` +
                this.mistakes.map((m, i) => `
                    <div class="review-item">${i + 1}. ${m.q.reviewPrompt || m.q.prompt}
                    <br>❌ <span class="wrong-ans">${escapeHtml(m.given)}</span>
                    <br>✅ <b>${escapeHtml(answerText(m.q)).replace(/\n/g, "<br>")}</b></div>`).join("") +
                `</div>`;
        } else {
            review = `<div class="answers-list">🌟 No mistakes at all. Perfect!</div>`;
        }
        this.root.innerHTML = `
            <h2>${this.game.emoji || ""} ${this.game.title}</h2>
            <div id="feedback"><span class="stars">${stars}</span><span class="score">Your score: ${score} / ${total}</span><br>${tail}</div>
            ${review}
            <button class="btn btn-success m-2" id="again-btn">🔁 Play again</button>
            ${this.backButtonHtml()}`;
        document.getElementById("again-btn").onclick = () => this.start();
        this.bindBack();
        window.scrollTo(0, 0);
    }
};
