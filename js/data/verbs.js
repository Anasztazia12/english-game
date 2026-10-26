// ===================== Rendhagyó és szabályos igék =====================
// Formátum: alapalak | past simple | past participle  ("/" = két elfogadott alak)

const IRREGULAR_VERBS = [
    "be|was/were|been", "become|became|become", "begin|began|begun", "bite|bit|bitten",
    "blow|blew|blown", "break|broke|broken", "bring|brought|brought", "build|built|built",
    "burn|burnt/burned|burnt/burned", "buy|bought|bought", "catch|caught|caught", "choose|chose|chosen",
    "come|came|come", "cost|cost|cost", "cut|cut|cut", "dig|dug|dug",
    "do|did|done", "draw|drew|drawn", "dream|dreamt/dreamed|dreamt/dreamed", "drink|drank|drunk",
    "drive|drove|driven", "eat|ate|eaten", "fall|fell|fallen", "feed|fed|fed",
    "feel|felt|felt", "fight|fought|fought", "find|found|found", "fly|flew|flown",
    "forget|forgot|forgotten", "forgive|forgave|forgiven", "freeze|froze|frozen", "get|got|got",
    "give|gave|given", "go|went|gone", "grow|grew|grown", "hang|hung|hung",
    "have|had|had", "hear|heard|heard", "hide|hid|hidden", "hit|hit|hit",
    "hold|held|held", "hurt|hurt|hurt", "keep|kept|kept", "know|knew|known",
    "lead|led|led", "learn|learnt/learned|learnt/learned", "leave|left|left", "lend|lent|lent",
    "let|let|let", "lose|lost|lost", "make|made|made", "mean|meant|meant",
    "meet|met|met", "pay|paid|paid", "put|put|put", "read|read|read",
    "ride|rode|ridden", "ring|rang|rung", "rise|rose|risen", "run|ran|run",
    "say|said|said", "see|saw|seen", "sell|sold|sold", "send|sent|sent",
    "shake|shook|shaken", "shine|shone|shone", "shoot|shot|shot", "show|showed|shown",
    "shut|shut|shut", "sing|sang|sung", "sink|sank|sunk", "sit|sat|sat",
    "sleep|slept|slept", "speak|spoke|spoken", "spend|spent|spent", "stand|stood|stood",
    "steal|stole|stolen", "stick|stuck|stuck", "sting|stung|stung", "swim|swam|swum",
    "take|took|taken", "teach|taught|taught", "tear|tore|torn", "tell|told|told",
    "think|thought|thought", "throw|threw|thrown", "understand|understood|understood", "wake|woke|woken",
    "wear|wore|worn", "win|won|won", "write|wrote|written"
].map(s => {
    const [base, past, pp] = s.split("|");
    return { base, past: past.split("/"), pp: pp.split("/") };
});

// Szabályos igék (alapalak | past simple) – a "Regular or irregular?" játékhoz
const REGULAR_VERBS = [
    "play|played", "walk|walked", "jump|jumped", "watch|watched", "help|helped", "clean|cleaned",
    "open|opened", "cook|cooked", "visit|visited", "start|started", "finish|finished", "carry|carried",
    "stop|stopped", "try|tried", "want|wanted", "dance|danced", "listen|listened", "look|looked",
    "talk|talked", "climb|climbed", "paint|painted", "laugh|laughed", "shout|shouted", "travel|travelled",
    "smile|smiled", "plan|planned", "cry|cried", "study|studied", "hope|hoped", "enjoy|enjoyed"
].map(s => {
    const [base, past] = s.split("|");
    return { base, past };
});
