// ===================== Random Challenge oldal =====================
// Az összes témaoldal játékait összegyűjti (QUIZ_COLLECT), és véletlen keverékeket készít belőlük

const COLLECTED = window.QUIZ_COLLECT;
window.QUIZ_COLLECT = null;

const gamesOf = (...names) => COLLECTED
    .filter(c => names.includes(c.name))
    .flatMap(c => c.sections.flatMap(s => s.games))
    .filter(g => !g.custom && !g.isMix);
const ALL_NAMES = ["vocabulary", "spelling", "grammar", "writing", "tense-workshop"];

const irregularGames = gamesOf("vocabulary").filter(g => g.id.startsWith("irr-"));
const wordGamesAll = gamesOf("vocabulary").filter(g => !g.id.startsWith("irr-"));

QuizApp.init({
    sections: [
        {
            title: "Random Challenge", emoji: "🎲",
            desc: "Every game is different! Questions come at random from all the topics.",
            games: [
                mixGame("ch-quick", "Quick 5", gamesOf(...ALL_NAMES), 5),
                mixGame("ch-all", "Everything mix", gamesOf(...ALL_NAMES), 15),
                mixGame("ch-tenses", "Tenses & verbs", [...gamesOf("tense-workshop"), ...irregularGames], 15),
                mixGame("ch-words", "Words & spelling", [...wordGamesAll, ...gamesOf("spelling")], 15),
                mixGame("ch-grammar", "Grammar mix", gamesOf("grammar"), 15),
                mixGame("ch-writing", "Writing & punctuation", gamesOf("writing"), 10),
                mixGame("ch-test", "Big test (25 questions)", gamesOf(...ALL_NAMES), 25)
            ]
        }
    ]
});
