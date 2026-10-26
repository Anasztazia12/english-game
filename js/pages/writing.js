// ===================== Writing oldal =====================
// Elbeszélés szerkezete, párbeszéd és írásjelek, saját történet és párbeszéd írása

const PARTS = ["Introduction", "Development", "Climax", "Ending"];
const PART_INFO = {
    Introduction: "introduces the characters and the setting (where and when).",
    Development: "the problem starts and grows – things get more and more difficult.",
    Climax: "the most exciting moment – the biggest problem or danger.",
    Ending: "the problem is solved and we find out how the characters feel."
};

// Négy rövid történet, mindegyik négy részből (Introduction, Development, Climax, Ending)
const STORIES = [
    {
        title: "The Lost Key",
        parts: [
            "Mia lived in a tall blue house at the end of Maple Street. She was ten years old and loved solving puzzles. One sunny Saturday, her grandma came to visit.",
            "Grandma wanted to open her old wooden box, but she couldn't find the tiny golden key. Mia searched under the sofa, behind the curtains and inside every drawer. The key was nowhere!",
            "Suddenly, Mia heard a clink in the garden. She ran outside and saw a magpie on the fence with something shiny in its beak. It was the key! Mia waved her arms, and the bird dropped it into the flower bed.",
            "Grandma hugged Mia and opened the box. Inside were old photos of Grandma as a little girl. They spent the rest of the afternoon looking at them together, and Mia felt very proud."
        ]
    },
    {
        title: "The Storm",
        parts: [
            "Once upon a time, a young fisherman called Leo lived in a small village by the sea. Every morning, he sailed out in his little red boat.",
            "One day, dark clouds filled the sky and the wind began to howl. Leo tried to row back to the shore, but the waves were getting bigger and bigger.",
            "Then a huge wave crashed over the boat and broke the oar! Leo held on tightly as the boat spun round and round. He thought he would never see home again.",
            "Just then, he saw the lighthouse shining through the rain. He paddled with his hands towards the light and finally reached the beach. From that day on, Leo always checked the weather before he went out."
        ]
    },
    {
        title: "The School Play",
        parts: [
            "Sam was the shyest boy in Class 6. He liked drawing, reading and quiet games, but he never spoke in front of the class.",
            "When the teacher announced the school play, Sam's friends persuaded him to try for a part. To his surprise, he got the role of the king! For weeks he practised his lines every evening, but he was still very nervous.",
            "On the night of the play, Sam walked onto the stage and froze. Hundreds of faces were staring at him. His mind went blank. Then he saw his mum smiling in the front row, and the first line came back to him.",
            "Sam spoke loudly and clearly, and the audience cheered at the end. After the play, he realised that being brave doesn't mean you aren't scared. It means you try anyway."
        ]
    },
    {
        title: "The Space Trip",
        parts: [
            "In the year 3000, Captain Zara and her robot dog, Bolt, were exploring the galaxy in their silver spaceship.",
            "While they were flying past a purple planet, a red light started flashing. \"We're running out of fuel!\" shouted Zara. They had to land on the strange planet to find more.",
            "As soon as they landed, a group of giant green creatures surrounded the ship. Bolt barked loudly. Zara slowly opened the door, holding her breath…",
            "The creatures smiled and gave them a bottle of glowing fuel. Zara thanked them and gave them a photo of Earth as a present. Then she and Bolt flew home, ready for their next adventure."
        ]
    }
];

// Szövegértés a fenti történetekhez: [történet sorszáma, kérdés, helyes, rossz válaszok]
const READING = [
    [0, "Who came to visit Mia?", "her grandma", ["her teacher", "her best friend", "a magpie"]],
    [0, "What was Grandma looking for?", "a tiny golden key", ["her glasses", "an old photo", "a wooden box"]],
    [0, "Which bird had the key?", "a magpie", ["a crow", "a parrot", "a robin"]],
    [0, "What was inside the box?", "old photos", ["gold coins", "a letter", "jewellery"]],
    [0, "How did Mia feel at the end?", "proud", ["angry", "bored", "scared"]],
    [0, "What does Mia love doing?", "solving puzzles", ["playing football", "baking cakes", "drawing birds"]],
    [1, "What was Leo's job?", "He was a fisherman.", ["He was a teacher.", "He was a farmer.", "He was a lighthouse keeper."]],
    [1, "What colour was Leo's boat?", "red", ["blue", "green", "white"]],
    [1, "What broke when the huge wave hit the boat?", "the oar", ["the sail", "the window", "the lighthouse"]],
    [1, "What helped Leo find his way home?", "the lighthouse", ["the moon", "a map", "another boat"]],
    [1, "What lesson did Leo learn?", "to check the weather before going out", ["to never go fishing again", "to buy a bigger boat", "to sail at night"]],
    [1, "Which words show that the weather was getting worse?", "the wind began to howl", ["one sunny morning", "a small village", "his little red boat"]],
    [2, "What kind of boy was Sam at the beginning?", "shy", ["noisy", "rude", "lazy"]],
    [2, "Which role did Sam get in the play?", "the king", ["the dragon", "the knight", "the narrator"]],
    [2, "Who persuaded Sam to try for a part?", "his friends", ["his mum", "his teacher", "the king"]],
    [2, "What helped Sam remember his first line?", "seeing his mum smiling", ["reading his script", "the audience cheering", "his teacher's help"]],
    [2, "What does the story say about being brave?", "It means you try even when you are scared.", ["It means you are never scared.", "It means you are the best actor.", "It means you speak very loudly."]],
    [2, "What does 'his mind went blank' mean?", "He couldn't remember anything.", ["He fell asleep.", "He felt very happy.", "He saw something white."]],
    [3, "Who is Bolt?", "a robot dog", ["a green creature", "a pilot", "a cat"]],
    [3, "Why did they land on the purple planet?", "They were running out of fuel.", ["They wanted a holiday.", "The robot dog was ill.", "They were lost."]],
    [3, "What did the creatures give Zara?", "a bottle of glowing fuel", ["a map of the galaxy", "a new spaceship", "a photo of Earth"]],
    [3, "What did Zara give the creatures?", "a photo of Earth", ["some fuel", "her robot dog", "a bottle of water"]],
    [3, "How do you think Zara felt when she opened the door?", "nervous", ["bored", "sleepy", "angry"]],
    [3, "In which year does the story happen?", "3000", ["2000", "1999", "2030"]]
];

const STORY_QUIZ = [
    ["Which part introduces the main characters and the setting?", "Introduction", PARTS],
    ["In which part does the problem start and grow?", "Development", PARTS],
    ["Which part is the most exciting or tense moment?", "Climax", PARTS],
    ["In which part is the problem solved?", "Ending", PARTS],
    ["Which part often starts with 'Once upon a time…' or 'One sunny morning…'?", "Introduction", PARTS],
    ["Which part might tell us what the character has learned?", "Ending", PARTS],
    ["In which part does the main character face the biggest challenge?", "Climax", PARTS],
    ["Which word or phrase often starts the climax?", "Suddenly,", ["Once upon a time,", "In the end,", "First of all,"]],
    ["Which is a good opening sentence for an introduction?", "On a frosty winter morning, Ella woke up to a strange sound.", ["In the end, everyone was happy.", "Suddenly, the dragon attacked!", "And that is how the story ended."]],
    ["Which is a good sentence for an ending?", "At last, the children were safe at home, and they never forgot their adventure.", ["Once upon a time, there was a girl called Rose.", "Suddenly, the floor began to shake!", "The problem was getting worse and worse."]],
    ["What is the 'setting' of a story?", "Where and when the story happens", ["The name of the main character", "The most exciting moment", "The last sentence"]],
    ["What makes a climax exciting?", "Short sentences, strong verbs and tension", ["A long list of names", "Lots of facts about the weather", "Starting with 'Once upon a time'"]],
    ["Which tense are most stories written in?", "Past Simple", ["Future Simple", "Present Perfect Continuous", "Future Perfect"]],
    ["What should every story have?", "A beginning, a middle and an end", ["Only dialogue", "A list of facts", "No characters"]]
];

// Párbeszéd írásjelezése: [beszélő, igék, mondat, mondatvégi jel]
const SPEECH = [
    ["Tom", "said", "The film starts at six", "."],
    ["Mia", "asked", "Where are my shoes", "?"],
    ["Dad", "shouted", "Watch out", "!"],
    ["Grandma", "said", "Dinner is ready", "."],
    ["Ben", "asked", "Can I have a biscuit", "?"],
    ["Lily", "cried", "What a beautiful day", "!"],
    ["The teacher", "said", "Please sit down", "."],
    ["Sam", "asked", "Do you want to play", "?"],
    ["Zoe", "screamed", "There's a spider on my bed", "!"],
    ["Mum", "said", "We're going to the beach tomorrow", "."],
    ["Leo", "asked", "What time is it", "?"],
    ["The coach", "shouted", "Run faster", "!"]
];
function lowerFirst(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
function speechMarksQ() {
    const [speaker, verb, sp, m] = pick(SPEECH);
    if (Math.random() < 0.5) {
        // "…," said Tom.  (a beszélő a végén)
        const who = speaker.startsWith("The ") ? lowerFirst(speaker) : speaker;
        const pm = m === "." ? "," : m;
        const right = `"${sp}${pm}" ${verb} ${who}.`;
        const wrong = [
            `"${sp}"${pm} ${verb} ${who}.`,
            `"${sp}" ${verb} ${who}.`,
            `${sp}${pm} ${verb} ${who}.`,
            `"${lowerFirst(sp)}${pm}" ${verb} ${who}.`
        ];
        if (m === ".") wrong.push(`"${sp}." ${verb} ${who}.`);
        return choiceQ("Which sentence is punctuated correctly?", right, wrong,
            "Put the speech inside <b>\" \"</b>, start with a capital letter, and put the <b>, ? or !</b> <b>inside</b> the speech marks before <i>said / asked</i>.");
    }
    // Tom said, "…."  (a beszélő az elején)
    const right = `${speaker} ${verb}, "${sp}${m}"`;
    const wrong = [
        `${speaker} ${verb}, "${sp}"${m}`,
        `${speaker} ${verb} "${sp}${m}"`,
        `${speaker} ${verb}, ${sp}${m}`,
        `${speaker} ${verb}, "${lowerFirst(sp)}${m}"`
    ];
    return choiceQ("Which sentence is punctuated correctly?", right, wrong,
        "When <i>Tom said</i> comes first: put a <b>comma</b> after it, then open the speech marks with a <b>capital letter</b>, and put the end mark <b>inside</b>.");
}

const SAID_WORDS = [
    ["\"Help! There's a shark!\" ___ Ben.", "screamed", ["whispered", "mumbled", "yawned"], "Danger → <b>screamed</b>."],
    ["\"Shh, the baby is sleeping,\" ___ Mum.", "whispered", ["shouted", "screamed", "roared"], "Quiet → <b>whispered</b>."],
    ["\"Where is my homework?\" ___ Tom.", "asked", ["replied", "announced", "agreed"], "A question → <b>asked</b>."],
    ["\"I'm so tired,\" ___ Grandpa, rubbing his eyes.", "yawned", ["cheered", "screamed", "giggled"], "Tired → <b>yawned</b>."],
    ["\"We won the match!\" ___ the team.", "cheered", ["sobbed", "whispered", "grumbled"], "Happy and loud → <b>cheered</b>."],
    ["\"I've lost my puppy,\" ___ the little girl, with tears running down her face.", "sobbed", ["laughed", "cheered", "giggled"], "Crying → <b>sobbed</b>."],
    ["\"That's so funny!\" ___ Lily.", "giggled", ["sobbed", "growled", "groaned"], "Laughing → <b>giggled</b>."],
    ["\"Get out of my cave!\" ___ the bear.", "growled", ["giggled", "whispered", "sighed"], "Angry animal → <b>growled</b>."],
    ["\"Yes, I'll come with you,\" ___ Sam.", "agreed", ["asked", "screamed", "sobbed"], "Saying yes → <b>agreed</b>."],
    ["\"Oh no, not more homework!\" ___ the class.", "groaned", ["cheered", "whispered", "giggled"], "Unhappy → <b>groaned</b>."],
    ["\"The answer is forty-two,\" ___ Ella.", "replied", ["asked", "sobbed", "growled"], "Answering → <b>replied</b>."],
    ["\"Hurry up, we're late!\" ___ Dad.", "shouted", ["whispered", "yawned", "sobbed"], "Loud and in a hurry → <b>shouted</b>."]
];

const PUNCTUATION = [
    ["What time is it___", "?", ["!", ".", ","], "A question ends with a <b>question mark</b>."],
    ["Watch out___ A car is coming!", "!", ["?", ",", ";"], "A warning or strong feeling → <b>exclamation mark</b>."],
    ["My sister is nine years old___", ".", ["?", ",", ";"], "A statement ends with a <b>full stop</b>."],
    ["I bought apples___ bananas, pears and grapes.", ",", [".", "?", "!"], "Use <b>commas</b> between items in a list."],
    ["After lunch___ we went to the park.", ",", [".", "?", ";"], "Put a <b>comma</b> after a fronted adverbial (After lunch,)."],
    ["The ___ bone was buried in the garden. (one dog)", "dog's", ["dogs", "dogs'", "dog"], "One owner: <b>'s</b> → the dog's bone."],
    ["The ___ toys are in the box. (three cats)", "cats'", ["cat's", "cats", "cats's"], "Plural owner ending in s: <b>s'</b> → the cats' toys."],
    ["The ___ coats are on the hooks. (many children)", "children's", ["childrens'", "childrens", "children"], "Plural not ending in s: add <b>'s</b> → children's."],
    ["___ going to be late! (I am)", "I'm", ["Im", "I'am", "Im'"], "The apostrophe shows the missing letter: I am → <b>I'm</b>."],
    ["My brother ___ like spiders. (does not)", "doesn't", ["does'nt", "doesnt", "dosen't"], "does not → <b>doesn't</b> (the apostrophe replaces o)."],
    ["I have three pets___ a dog, a cat and a hamster.", ":", [";", "?", "!"], "A <b>colon</b> introduces a list."],
    ["It was raining___ we stayed inside.", ";", ["?", "!", ":"], "A <b>semi-colon</b> joins two linked sentences."],
    ["My aunt___ who lives in Wales, is a doctor.", ",", [".", "?", ";"], "Extra information goes between <b>commas</b>."],
    ["Tom (my best friend___ is coming to stay.", ")", ["(", ",", "?"], "<b>Brackets</b> come in pairs: ( … )."],
    ["She is a ___ author. (well known)", "well-known", ["well known", "wellknown", "well,known"], "A <b>hyphen</b> joins two words into one adjective."],
    ["On Monday___ Tuesday and Wednesday it rained.", ",", [".", ";", "?"], "Use <b>commas</b> between items in a list."],
    ["Can you help me, please___", "?", [".", "!", ","], "A question ends with a <b>question mark</b>."],
    ["What a wonderful surprise___", "!", ["?", ",", ";"], "A sentence starting with <i>What a…</i> or <i>How…</i> showing surprise ends with <b>!</b>"]
];

const CONTRACTIONS = [
    ["do not", "don't"], ["I am", "I'm"], ["they are", "they're"], ["cannot", "can't"],
    ["will not", "won't"], ["it is", "it's"], ["we have", "we've"], ["she would", "she'd"],
    ["should not", "shouldn't"], ["let us", "let's"], ["could have", "could've"], ["are not", "aren't"],
    ["I will", "I'll"], ["you are", "you're"], ["he is", "he's"], ["would not", "wouldn't"],
    ["there is", "there's"], ["they have", "they've"], ["who is", "who's"], ["did not", "didn't"],
    ["I have", "I've"], ["was not", "wasn't"], ["is not", "isn't"], ["we will", "we'll"]
];

const FIX_DIALOGUE = [
    ["where is my bag asked Tom", "\"Where is my bag?\" asked Tom."],
    ["i am hungry said Lucy", "\"I am hungry,\" said Lucy."],
    ["Mum shouted come inside now", "Mum shouted, \"Come inside now!\""],
    ["can we go to the park asked Ben", "\"Can we go to the park?\" asked Ben."],
    ["the teacher said open your books", "The teacher said, \"Open your books.\""],
    ["look at that rainbow cried Ella", "\"Look at that rainbow!\" cried Ella."],
    ["it is my birthday today said Sam", "\"It is my birthday today,\" said Sam."],
    ["Dad asked what would you like for dinner", "Dad asked, \"What would you like for dinner?\""]
];

// ===================== Saját történet írása =====================
const CONJUNCTION_WORDS = ["because", "but", "so", "when", "although", "while", "until", "if", "after", "before", "since", "unless", "and"];
const OPENER_WORDS = ["once upon a time", "one day", "first", "then", "next", "after that", "suddenly", "meanwhile", "later", "finally", "in the end", "at last", "luckily", "unfortunately", "however", "without warning", "all of a sudden"];
const SAID_LIST = ["asked", "replied", "shouted", "whispered", "screamed", "cried", "laughed", "giggled", "sighed", "groaned", "explained", "answered", "yelled", "muttered", "called", "added", "agreed", "sobbed", "growled", "cheered"];
const FEELING_WORDS = ["excited", "nervous", "terrified", "delighted", "furious", "curious", "lonely", "proud", "relieved", "amazed", "worried", "brave"];
const COMMON_MISSPELLINGS = {
    alot: "a lot", becuase: "because", becaus: "because", freind: "friend", beautifull: "beautiful", wierd: "weird",
    untill: "until", suddenley: "suddenly", suddenlly: "suddenly", realy: "really", tommorow: "tomorrow", tomorow: "tomorrow",
    begining: "beginning", thier: "their", whent: "went", finaly: "finally", wich: "which", allways: "always", dissapear: "disappear",
    dissapeared: "disappeared", excitment: "excitement", surprize: "surprise", suprise: "surprise", wellcome: "welcome", writting: "writing"
};
// a Year 5/6 elírásokat is figyeljük
[...YEAR56_WORDS, ...YEAR34_WORDS].forEach(w => w.wrong.forEach(x => { COMMON_MISSPELLINGS[x.toLowerCase()] = w.word; }));

const STORY_IDEAS = {
    who: ["a brave young explorer", "a shy dragon", "a clever robot", "twin detectives", "a talking cat", "a new pupil at school", "a lonely giant", "a young inventor"],
    where: ["in a dark forest", "on a pirate ship", "in a busy city", "on a frozen island", "in an old castle", "at a summer camp", "under the sea", "on a space station"],
    problem: ["finds a mysterious map", "loses something very important", "gets trapped by a storm", "discovers a secret door", "must win a competition", "meets a strange creature", "has to rescue a friend", "breaks a magic object"]
};

const WRITER_PARTS = [
    { key: "Introduction", tip: "Introduce your main character and the setting (where and when). Hook the reader!", starters: ["Once upon a time,", "On a cold, dark night,", "Long ago, in a land far away,", "It was the first day of the summer holidays."] },
    { key: "Development", tip: "Something starts to happen. Show the problem and make it grow.", starters: ["One day,", "Soon,", "After a while,", "But then,", "As the days went by,"] },
    { key: "Climax", tip: "The most exciting moment! Use short sentences, strong verbs and maybe some dialogue.", starters: ["Suddenly,", "Without warning,", "All of a sudden,", "At that very moment,"] },
    { key: "Ending", tip: "Solve the problem. How do the characters feel? What did they learn?", starters: ["In the end,", "Finally,", "At last,", "From that day on,"] }
];

function countWords(text) { return (text.trim().match(/\S+/g) || []).length; }
function wordsOf(text) { return text.toLowerCase().match(/[a-z']+/g) || []; }
function normQuotes(text) { return text.replace(/[“”„]/g, '"').replace(/[‘’]/g, "'"); }

// Mondatkezdő nagybetű és mondatvégi írásjel ellenőrzése
function sentenceProblems(text) {
    const problems = [];
    const clean = normQuotes(text).trim();
    if (!clean) return problems;
    const sentences = clean.split(/(?<=[.!?]["']?)\s+/);
    sentences.forEach(s => {
        const first = s.replace(/^["'(]+/, "").charAt(0);
        if (first && first !== first.toUpperCase()) problems.push(`Start with a capital letter: "<i>${escapeHtml(s.slice(0, 30))}…</i>"`);
    });
    if (!/[.!?]["']?$/.test(clean)) problems.push("End your last sentence with <b>. ! or ?</b>");
    if (/\bi\b/.test(clean)) problems.push("Write <b>I</b> (me) with a capital letter.");
    return problems;
}

function spellingProblems(text) {
    const found = new Set();
    wordsOf(text).forEach(w => { if (COMMON_MISSPELLINGS[w]) found.add(`<b>${w}</b> → ${COMMON_MISSPELLINGS[w]}`); });
    return [...found];
}

function checklistHtml(items) {
    return `<ul class="check-list">${items.map(([ok, text]) => `<li class="${ok ? "ok" : "todo"}">${ok ? "✅" : "⬜"} ${text}</li>`).join("")}</ul>`;
}

function chipsHtml(title, words, cls) {
    return `<div class="chip-row"><span class="chip-title">${title}</span>${words.map(w => `<button type="button" class="chip ${cls}" data-word="${escapeHtml(w)}">${w}</button>`).join("")}</div>`;
}

function renderStoryWriter(area) {
    let saved = {};
    try { saved = JSON.parse(loadText("eg-story") || "{}"); } catch (e) { saved = {}; }
    area.innerHTML = `
        <div class="rule-box">
            <b>Plan your story in 4 parts:</b> Introduction → Development → Climax → Ending.<br>
            Click the words in the word bank to add them. Your story is saved automatically on this device.
        </div>
        <div class="idea-box">
            <button type="button" class="btn btn-warning m-1" id="idea-btn">💡 Give me an idea</button>
            <div id="idea-text">${saved.idea || ""}</div>
        </div>
        <input type="text" class="answer-input story-title" id="story-title" placeholder="Title of your story" value="${escapeHtml(saved.title || "")}">
        ${WRITER_PARTS.map(p => `
            <div class="writer-part">
                <h3>${p.key}</h3>
                <div class="q-hint">${p.tip}</div>
                <div class="chip-row">${p.starters.map(s => `<button type="button" class="chip chip-starter" data-part="${p.key}" data-word="${escapeHtml(s)}">${s}</button>`).join("")}</div>
                <textarea id="part-${p.key}" data-part="${p.key}" placeholder="Write your ${p.key.toLowerCase()} here…">${escapeHtml(saved[p.key] || "")}</textarea>
                <div class="word-count" id="count-${p.key}"></div>
            </div>`).join("")}
        <div class="word-bank">
            ${chipsHtml("Openers:", OPENER_WORDS.slice(0, 12), "chip-bank")}
            ${chipsHtml("Conjunctions:", CONJUNCTION_WORDS, "chip-bank")}
            ${chipsHtml("Instead of 'said':", SAID_LIST.slice(0, 12), "chip-bank")}
            ${chipsHtml("Feelings:", FEELING_WORDS, "chip-bank")}
        </div>
        <div class="mt-2">
            <button type="button" class="btn btn-success m-1" id="check-story">✅ Check my story</button>
            <button type="button" class="btn btn-primary m-1" id="download-story">💾 Download</button>
            <button type="button" class="btn btn-info m-1" id="print-story">🖨️ Print</button>
            <button type="button" class="btn btn-danger m-1" id="clear-story">🗑️ Start again</button>
        </div>
        <div id="story-report"></div>`;

    let lastFocused = document.getElementById("part-Introduction");
    const collect = () => {
        const data = { title: document.getElementById("story-title").value, idea: document.getElementById("idea-text").innerHTML };
        WRITER_PARTS.forEach(p => { data[p.key] = document.getElementById("part-" + p.key).value; });
        return data;
    };
    const save = () => saveText("eg-story", JSON.stringify(collect()));
    const updateCounts = () => WRITER_PARTS.forEach(p => {
        const n = countWords(document.getElementById("part-" + p.key).value);
        document.getElementById("count-" + p.key).textContent = `${n} word${n === 1 ? "" : "s"}`;
    });
    const insert = (textarea, word) => {
        const v = textarea.value;
        const start = textarea.selectionStart ?? v.length;
        const before = v.slice(0, start), after = v.slice(textarea.selectionEnd ?? start);
        const add = (before && !/\s$/.test(before) ? " " : "") + word + " ";
        textarea.value = before + add + after;
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = (before + add).length;
        updateCounts();
        save();
    };

    area.querySelectorAll("textarea").forEach(t => {
        t.addEventListener("focus", () => { lastFocused = t; });
        t.addEventListener("input", () => { updateCounts(); save(); });
    });
    document.getElementById("story-title").addEventListener("input", save);
    area.querySelectorAll(".chip-starter").forEach(c => c.onclick = () => insert(document.getElementById("part-" + c.dataset.part), c.dataset.word));
    area.querySelectorAll(".chip-bank").forEach(c => c.onclick = () => insert(lastFocused, c.dataset.word));
    document.getElementById("idea-btn").onclick = () => {
        document.getElementById("idea-text").innerHTML = `Write about <b>${pick(STORY_IDEAS.who)}</b> <b>${pick(STORY_IDEAS.where)}</b> who <b>${pick(STORY_IDEAS.problem)}</b>.`;
        save();
    };

    const storyText = () => {
        const d = collect();
        return (d.title ? d.title.toUpperCase() + "\n\n" : "") + WRITER_PARTS.map(p => d[p.key].trim()).filter(Boolean).join("\n\n");
    };

    document.getElementById("check-story").onclick = () => {
        const d = collect();
        const all = WRITER_PARTS.map(p => d[p.key]).join(" ");
        const words = wordsOf(all);
        const lower = " " + all.toLowerCase() + " ";
        const conj = CONJUNCTION_WORDS.filter(c => c !== "and" && words.includes(c));
        const openers = OPENER_WORDS.filter(o => lower.includes(o));
        const pastForms = new Set(IRREGULAR_VERBS.flatMap(v => v.past));
        const pastCount = words.filter(w => pastForms.has(w) || (w.length > 4 && w.endsWith("ed"))).length;
        const hasDialogue = /"[^"]+"/.test(normQuotes(all));
        const feelings = FEELING_WORDS.filter(f => words.includes(f));
        const parts = WRITER_PARTS.map(p => [countWords(d[p.key]) >= 15, `<b>${p.key}</b> has at least 15 words (${countWords(d[p.key])})`]);
        const items = [
            [!!d.title.trim(), "Your story has a <b>title</b>"],
            ...parts,
            [conj.length >= 3, `You used at least 3 different conjunctions (${conj.join(", ") || "none yet"})`],
            [openers.length >= 3, `You used at least 3 sentence openers (${openers.join(", ") || "none yet"})`],
            [pastCount >= 5, `You wrote in the past tense (${pastCount} past verbs found)`],
            [hasDialogue, "Your characters speak – there is dialogue in <b>\" \"</b>"],
            [feelings.length >= 1 || /\b(more|most)\s+\w+|\w+est\b/.test(all.toLowerCase()), "You used describing words (feelings, more / most, -est)"]
        ];
        const problems = WRITER_PARTS.flatMap(p => sentenceProblems(d[p.key]));
        const spelling = spellingProblems(all);
        const done = items.filter(i => i[0]).length;
        document.getElementById("story-report").innerHTML = `
            <div class="answers-list">
                <b>Your story checklist: ${done} / ${items.length} ⭐</b>
                ${checklistHtml(items)}
                ${spelling.length ? `<b>✏️ Check your spelling:</b><ul>${spelling.map(s => `<li>${s}</li>`).join("")}</ul>` : ""}
                ${problems.length ? `<b>🔍 Check your punctuation:</b><ul>${[...new Set(problems)].slice(0, 8).map(s => `<li>${s}</li>`).join("")}</ul>` : ""}
                ${done === items.length && !spelling.length && !problems.length ? "<b>🏆 Fantastic story! Read it aloud to someone.</b>" : ""}
            </div>`;
    };
    document.getElementById("download-story").onclick = () => downloadText("my-story.txt", storyText());
    document.getElementById("print-story").onclick = () => printText(collect().title || "My Story", storyText());
    document.getElementById("clear-story").onclick = () => {
        if (!confirm("Delete your story and start again?")) return;
        saveText("eg-story", "");
        renderStoryWriter(area);
    };
    updateCounts();
}

// Nyomtatás: új ablakba írjuk a szöveget
function printText(title, text) {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title>
        <style>body{font-family:Georgia,serif;font-size:16pt;line-height:1.6;max-width:700px;margin:40px auto;padding:0 20px;white-space:pre-wrap;}</style>
        </head><body>${escapeHtml(text)}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
}

// ===================== Saját párbeszéd írása =====================
const DIALOGUE_SCENES = [
    "Two friends are planning a surprise party for their teacher.",
    "A detective is asking a witness what they saw.",
    "A child is trying to persuade a parent to get a pet.",
    "Two explorers find a hidden cave.",
    "A customer is complaining in a restaurant.",
    "A dragon and a knight meet for the first time.",
    "Two classmates have lost their homework on the way to school.",
    "An alien asks a child about life on Earth."
];

// Egy sor párbeszéd ellenőrzése. Visszaad: [problémák listája]
function checkDialogueLine(line) {
    const l = normQuotes(line.trim());
    const problems = [];
    const quotes = (l.match(/"/g) || []).length;
    if (quotes === 0) return null; // nem párbeszéd sor (elbeszélés)
    if (quotes % 2 !== 0) { problems.push("Close your speech marks <b>\" \"</b>."); return problems; }
    const open = l.indexOf('"');
    const close = l.indexOf('"', open + 1);
    const speech = l.slice(open + 1, close);
    const before = l.slice(0, open).trim();
    const after = l.slice(close + 1).trim();
    if (speech && speech.charAt(0) !== speech.charAt(0).toUpperCase()) problems.push("Start the spoken words with a <b>capital letter</b>.");
    if (!/[.,!?]$/.test(speech)) problems.push("Put <b>, . ! or ?</b> <b>inside</b> the speech marks, before the closing \".");
    if (after && /^[a-z]/.test(after) && speech.endsWith(".")) problems.push("Use a <b>comma</b>, not a full stop, before <i>said / asked…</i>: \"I'm hungry<b>,</b>\" said Tom.");
    if (after && /^[,.!?]/.test(after)) problems.push("The punctuation should be <b>inside</b> the speech marks.");
    if (before && !/,$/.test(before) && !/[.!?]$/.test(before)) problems.push("Put a <b>comma</b> before the speech marks: Tom said<b>,</b> \"Hello.\"");
    if (!/[.!?]["']?$/.test(l)) problems.push("End the line with <b>. ! or ?</b>");
    return problems;
}

function renderDialogueWriter(area) {
    area.innerHTML = `
        <div class="rule-box">
            <b>Rules for writing dialogue:</b><br>
            1. Put the spoken words inside speech marks: <b>"Hello!"</b><br>
            2. Start the spoken words with a <b>capital letter</b>.<br>
            3. Put the punctuation <b>inside</b> the speech marks: <i>"I'm hungry<b>,</b>" said Tom.</i> &nbsp; <i>"Where are you<b>?</b>" asked Mia.</i><br>
            4. If the speaker comes first, use a comma: <i>Tom said<b>,</b> "Let's go."</i><br>
            5. <b>New speaker → new line.</b><br>
            6. Use interesting verbs instead of <i>said</i>: whispered, shouted, replied…
        </div>
        <button type="button" class="btn btn-warning m-1" id="scene-btn">🎬 Give me a scene</button>
        <div id="scene-text" class="idea-box"></div>
        ${chipsHtml("Instead of 'said':", SAID_LIST, "chip-bank")}
        <textarea id="dialogue-text" class="dialogue-text" placeholder='"Have you seen my map?" asked Leo.&#10;"No, I haven&#39;t," replied Ana.'>${escapeHtml(loadText("eg-dialogue"))}</textarea>
        <div class="mt-2">
            <button type="button" class="btn btn-success m-1" id="check-dialogue">✅ Check my dialogue</button>
            <button type="button" class="btn btn-primary m-1" id="download-dialogue">💾 Download</button>
            <button type="button" class="btn btn-danger m-1" id="clear-dialogue">🗑️ Start again</button>
        </div>
        <div id="dialogue-report"></div>`;
    const ta = document.getElementById("dialogue-text");
    ta.addEventListener("input", () => saveText("eg-dialogue", ta.value));
    document.getElementById("scene-btn").onclick = () => { document.getElementById("scene-text").textContent = "🎬 " + pick(DIALOGUE_SCENES); };
    area.querySelectorAll(".chip-bank").forEach(c => c.onclick = () => {
        const pos = ta.selectionStart ?? ta.value.length;
        ta.value = ta.value.slice(0, pos) + c.dataset.word + " " + ta.value.slice(pos);
        ta.focus();
        ta.selectionStart = ta.selectionEnd = pos + c.dataset.word.length + 1;
        saveText("eg-dialogue", ta.value);
    });
    document.getElementById("check-dialogue").onclick = () => {
        const lines = ta.value.split("\n").filter(l => l.trim());
        let speechLines = 0, goodLines = 0;
        const rows = lines.map(line => {
            const problems = checkDialogueLine(line);
            if (problems === null) return `<li class="narr">📖 ${escapeHtml(line)}</li>`;
            speechLines++;
            if (!problems.length) { goodLines++; return `<li class="ok">✅ ${escapeHtml(line)}</li>`; }
            return `<li class="todo">⚠️ ${escapeHtml(line)}<ul>${problems.map(p => `<li>${p}</li>`).join("")}</ul></li>`;
        });
        const words = wordsOf(ta.value);
        const saidCount = words.filter(w => w === "said").length;
        const verbsUsed = SAID_LIST.filter(v => words.includes(v));
        const twoOnOneLine = lines.some(l => (normQuotes(l).match(/"/g) || []).length >= 4);
        const items = [
            [speechLines >= 4, `At least 4 lines of speech (${speechLines})`],
            [speechLines > 0 && goodLines === speechLines, `All speech lines are punctuated correctly (${goodLines} / ${speechLines})`],
            [verbsUsed.length >= 2, `You used at least 2 different verbs instead of 'said' (${verbsUsed.join(", ") || "none yet"})`],
            [saidCount <= 2, `You didn't use 'said' too often (${saidCount} times)`],
            [!twoOnOneLine, "New speaker → new line"]
        ];
        document.getElementById("dialogue-report").innerHTML = `
            <div class="answers-list">
                <b>Dialogue checklist: ${items.filter(i => i[0]).length} / ${items.length} ⭐</b>
                ${checklistHtml(items)}
                <b>Line by line:</b>
                <ul class="line-check">${rows.join("")}</ul>
            </div>`;
    };
    document.getElementById("download-dialogue").onclick = () => downloadText("my-dialogue.txt", ta.value);
    document.getElementById("clear-dialogue").onclick = () => {
        if (!confirm("Delete your dialogue and start again?")) return;
        saveText("eg-dialogue", "");
        renderDialogueWriter(area);
    };
}

QuizApp.init({
    name: "writing",
    sections: [
        {
            title: "Story Structure", emoji: "🏔️",
            desc: "Every good story has four parts: <b>Introduction → Development → Climax → Ending</b>.",
            games: [
                {
                    id: "wr-part", title: "Name the part", emoji: "🏷️",
                    intro: PARTS.map(p => `<b>${p}</b> – ${PART_INFO[p]}`).join("<br>"),
                    make: () => STORIES.flatMap(st => st.parts.map((text, i) => Object.assign(choiceQ(
                        `Which part of the story is this?<div class="story-para">${text}</div>`, PARTS[i], PARTS,
                        `The <b>${PARTS[i]}</b> ${PART_INFO[PARTS[i]]}`), { reviewPrompt: `<i>${text.slice(0, 70)}…</i>` })))
                },
                {
                    id: "wr-order", title: "Story in order", emoji: "🧩",
                    intro: "The paragraphs are mixed up. Put them in the right order:<br><b>Introduction → Development → Climax → Ending</b>",
                    count: 4,
                    make: () => STORIES.map(st => blockOrderQ(`Put the story <b>"${st.title}"</b> in order.`, st.parts,
                        "Look for clues: the introduction tells us who and where, the climax is the most exciting part, the ending solves the problem."))
                },
                {
                    id: "wr-quiz", title: "Story quiz", emoji: "🎓",
                    intro: PARTS.map(p => `<b>${p}</b> – ${PART_INFO[p]}`).join("<br>"),
                    make: () => STORY_QUIZ.map(([q, a, opts]) => choiceQ(q, a, opts))
                }
            ]
        },
        {
            title: "Dialogue & Punctuation", emoji: "💬",
            desc: "How to write speech and use punctuation marks correctly.",
            games: [
                {
                    id: "wr-speech", title: "Speech marks", emoji: "💬",
                    intro: `<i>"I'm hungry<b>,</b>" said Tom.</i> &nbsp; <i>"Where is it<b>?</b>" asked Mia.</i> &nbsp; <i>Dad said<b>,</b> "Come here<b>.</b>"</i><br>
                            The punctuation goes <b>inside</b> the speech marks. Spoken words start with a <b>capital letter</b>.`,
                    make: () => Array.from({ length: 12 }, speechMarksQ)
                },
                {
                    id: "wr-said", title: "Instead of 'said'", emoji: "🗣️",
                    intro: "Strong verbs make dialogue exciting: <b>whispered, shouted, screamed, sobbed, giggled, growled, replied, agreed, groaned</b>…",
                    make: () => SAID_WORDS.map(([s, a, wrong, e]) => choiceQ(s, a, wrong, e))
                },
                {
                    id: "wr-punct", title: "Punctuation marks", emoji: "❗",
                    intro: "<b>. ? !</b> end sentences &nbsp;·&nbsp; <b>,</b> lists and fronted adverbials &nbsp;·&nbsp; <b>'</b> apostrophes &nbsp;·&nbsp; <b>:</b> before a list &nbsp;·&nbsp; <b>;</b> joins sentences &nbsp;·&nbsp; <b>( )</b> brackets &nbsp;·&nbsp; <b>-</b> hyphens",
                    make: () => PUNCTUATION.map(([s, a, wrong, e]) => choiceQ(s, a, wrong, e))
                },
                {
                    id: "wr-contract", title: "Contractions", emoji: "✂️",
                    intro: "Join the words and use an <b>apostrophe</b> for the missing letters: do not → don<b>'</b>t",
                    make: () => CONTRACTIONS.map(([full, short]) => typeQ(`<b>${full}</b> → ?`, short, `${full} → <b>${short}</b>`, { exact: true }))
                },
                {
                    id: "wr-fix", title: "Fix the dialogue", emoji: "🔧",
                    intro: `Rewrite the sentence with <b>speech marks, capital letters and punctuation</b>.<br>Example: <i>i am cold said Ann</i> → <b>"I am cold," said Ann.</b>`,
                    make: () => FIX_DIALOGUE.map(([plain, right]) => typeQ(
                        `Punctuate: <i>${plain}</i>`, right, "Speech marks around the spoken words, a capital letter at the start, punctuation inside the speech marks.", { exact: true }))
                }
            ]
        },
        {
            title: "Reading", emoji: "📚",
            desc: "Read a short story carefully and answer the questions.",
            games: [
                {
                    id: "wr-reading", title: "Read and answer", emoji: "📚",
                    intro: "Read the story, then answer the question. You can read the story again any time!",
                    make: () => READING.map(([si, q, a, wrong]) => Object.assign(choiceQ(
                        `<div class="story-para"><b>${STORIES[si].title}</b><br>${STORIES[si].parts.join(" ")}</div><br>${q}`, a, wrong),
                        { reviewPrompt: `<i>${STORIES[si].title}:</i> ${q}` }))
                },
                {
                    id: "wr-true-false", title: "True or false?", emoji: "⚖️",
                    intro: "Read the story and decide: is the sentence true or false?",
                    make: () => READING.map(([si, q, a, wrong]) => {
                        const truth = Math.random() < 0.5;
                        const claim = `${q} – <b>${truth ? a : pick(wrong)}</b>`;
                        return Object.assign(choiceQ(
                            `<div class="story-para"><b>${STORIES[si].title}</b><br>${STORIES[si].parts.join(" ")}</div><br>${claim}`,
                            truth ? "True" : "False", [truth ? "False" : "True"], `The answer is: <b>${a}</b>`),
                            { reviewPrompt: `<i>${STORIES[si].title}:</i> ${claim}` });
                    })
                }
            ]
        },
        {
            title: "Write Your Own", emoji: "✍️",
            desc: "Now you are the author! Your writing is saved on this device.",
            games: [
                { id: "wr-story", title: "Story writer", emoji: "📖", custom: renderStoryWriter },
                { id: "wr-dialogue", title: "Dialogue writer", emoji: "🎭", custom: renderDialogueWriter }
            ]
        }
    ]
});
