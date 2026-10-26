// ===================== Grammar oldal =====================
// Előtagok/toldalékok, kötőszavak, utaló szavak, módbeli segédigék, segédigék, kérdőszavak, melléknévfokozás
// A legtöbb bank formátuma: [mondat (___ = hely), helyes válasz, rossz válaszok, magyarázat]

const bankToChoice = bank => bank.map(([s, a, wrong, e]) => choiceQ(s, a, wrong, e));

// ---------- Prefixes & suffixes ----------
const OPPOSITE_PREFIXES = ["un", "dis", "im", "in", "ir", "il", "mis"];
const PREFIX_OPPOSITES = [
    ["happy", "un"], ["kind", "un"], ["lock", "un"], ["tidy", "un"], ["fair", "un"], ["usual", "un"], ["able", "un"],
    ["agree", "dis"], ["appear", "dis"], ["like", "dis"], ["honest", "dis"], ["obey", "dis"], ["connect", "dis"],
    ["possible", "im"], ["polite", "im"], ["patient", "im"], ["perfect", "im"], ["mature", "im"],
    ["correct", "in"], ["visible", "in"], ["complete", "in"], ["credible", "in"], ["active", "in"],
    ["regular", "ir"], ["responsible", "ir"], ["relevant", "ir"],
    ["legal", "il"], ["logical", "il"], ["literate", "il"],
    ["understand", "mis"], ["behave", "mis"], ["spell", "mis"], ["lead", "mis"], ["place", "mis"]
];
const PREFIX_RULE = "<b>im-</b> before b, m, p &nbsp;·&nbsp; <b>il-</b> before l &nbsp;·&nbsp; <b>ir-</b> before r &nbsp;·&nbsp; <b>mis-</b> = wrongly";

const PREFIX_MEANINGS = [
    ["rewrite", "re", "again"], ["replay", "re", "again"],
    ["preview", "pre", "before"], ["prehistoric", "pre", "before"],
    ["submarine", "sub", "under"], ["subway", "sub", "under"],
    ["international", "inter", "between"], ["interact", "inter", "between"],
    ["superstar", "super", "above / more than"], ["superhero", "super", "above / more than"],
    ["anticlockwise", "anti", "against / opposite"], ["antifreeze", "anti", "against / opposite"],
    ["autograph", "auto", "self / own"], ["autobiography", "auto", "self / own"],
    ["overeat", "over", "too much"], ["oversleep", "over", "too much"],
    ["television", "tele", "far away"], ["telescope", "tele", "far away"],
    ["bicycle", "bi", "two"], ["triangle", "tri", "three"],
    ["misunderstand", "mis", "wrongly"], ["unhappy", "un", "not"], ["disagree", "dis", "not / the opposite"]
];
const ALL_MEANINGS = [...new Set(PREFIX_MEANINGS.map(m => m[2]))];

const PREFIX_BUILD = [
    ["un", "necessary", "unnecessary"], ["dis", "satisfied", "dissatisfied"], ["mis", "spell", "misspell"],
    ["il", "legal", "illegal"], ["im", "mature", "immature"], ["ir", "regular", "irregular"],
    ["re", "appear", "reappear"], ["dis", "appear", "disappear"], ["un", "natural", "unnatural"],
    ["im", "possible", "impossible"], ["in", "active", "inactive"], ["over", "react", "overreact"],
    ["pre", "heat", "preheat"], ["sub", "marine", "submarine"], ["inter", "national", "international"],
    ["super", "market", "supermarket"], ["auto", "pilot", "autopilot"], ["re", "fill", "refill"],
    ["un", "lock", "unlock"], ["mis", "behave", "misbehave"], ["dis", "obey", "disobey"],
    ["im", "patient", "impatient"], ["in", "correct", "incorrect"], ["il", "logical", "illogical"],
    ["ir", "responsible", "irresponsible"]
];

const SUFFIX_LIST = ["ful", "less", "ness", "ment", "ly", "able", "er", "ous", "hood", "ship", "ion", "ist"];
const SUFFIX_FINDER = [
    ["care", "less", "without care"], ["hope", "ful", "full of hope"], ["kind", "ness", "the quality of being kind"],
    ["enjoy", "ment", "the feeling of enjoying something"], ["quick", "ly", "in a quick way"], ["read", "able", "can be read"],
    ["teach", "er", "a person who teaches"], ["danger", "ous", "full of danger"], ["child", "hood", "the time when you are a child"],
    ["friend", "ship", "being friends"], ["act", "ion", "something you do"], ["art", "ist", "a person who makes art"],
    ["help", "ful", "full of help"], ["fear", "less", "without fear"], ["dark", "ness", "the state of being dark"],
    ["move", "ment", "the act of moving"], ["slow", "ly", "in a slow way"], ["wash", "able", "can be washed"],
    ["play", "er", "a person who plays"], ["neighbour", "hood", "the area where your neighbours live"]
];

// ---------- Conjunctions & openers ----------
const CONJUNCTIONS = [
    ["I wanted to play outside, ___ it was raining.", "but", ["because", "so", "if"], "<b>but</b> shows a contrast."],
    ["We stayed inside ___ it was raining.", "because", ["but", "so", "although"], "<b>because</b> gives a reason."],
    ["It was raining, ___ we stayed inside.", "so", ["because", "although", "unless"], "<b>so</b> shows a result."],
    ["___ it was cold, we went swimming.", "Although", ["Because", "So", "If"], "<b>although</b> shows a surprising contrast."],
    ["You can have pudding ___ you eat your vegetables.", "if", ["unless", "but", "although"], "<b>if</b> shows a condition."],
    ["You won't pass the test ___ you study.", "unless", ["if", "because", "and"], "<b>unless</b> = if not."],
    ["Wait here ___ I come back.", "until", ["unless", "because", "so"], "<b>until</b> = up to the time when."],
    ["Brush your teeth ___ you go to bed.", "before", ["after", "unless", "although"], "<b>before</b> = earlier than."],
    ["We had ice cream ___ we finished lunch.", "after", ["before", "unless", "although"], "<b>after</b> = later than."],
    ["I was reading ___ my brother was watching TV.", "while", ["unless", "so", "because"], "<b>while</b> = at the same time as."],
    ["Would you like juice ___ milk?", "or", ["and", "but", "so"], "<b>or</b> gives a choice."],
    ["I have a cat ___ a dog.", "and", ["or", "but", "so"], "<b>and</b> adds information."],
    ["Call me ___ you get home.", "when", ["unless", "although", "so"], "<b>when</b> = at the time that."],
    ["I have lived here ___ I was five.", "since", ["until", "while", "so"], "<b>since</b> = from that time until now."],
    ["She was tired, ___ she kept running.", "but", ["so", "because", "if"], "<b>but</b> shows a contrast."],
    ["He couldn't sleep ___ the music was too loud.", "because", ["although", "unless", "but"], "<b>because</b> gives a reason."],
    ["The shop was closed, ___ we went home.", "so", ["because", "although", "unless"], "<b>so</b> shows a result."],
    ["___ he is small, he is very strong.", "Although", ["Because", "So", "Unless"], "<b>although</b> shows a surprising contrast."],
    ["Don't cross the road ___ the light is green.", "until", ["because", "so", "although"], "<b>until</b> = up to the time when."],
    ["___ the bell rang, everyone ran outside.", "When", ["Unless", "Although", "So"], "<b>when</b> = at the time that."],
    ["Dad sang ___ he was cooking.", "while", ["unless", "so", "until"], "<b>while</b> = at the same time as."],
    ["I'm not going ___ you come with me.", "unless", ["because", "so", "and"], "<b>unless</b> = if not."],
    ["Tom likes football, ___ he doesn't like tennis.", "but", ["so", "because", "or"], "<b>but</b> shows a contrast."],
    ["I didn't go to school ___ I was ill.", "because", ["so", "although", "or"], "<b>because</b> gives a reason."],
    ["Hurry up, ___ we'll miss the bus!", "or", ["and", "because", "although"], "<b>or</b> here means 'if not'."]
];

const JOIN_SENTENCES = [
    ["It was cold. I wore a coat.", "It was cold, so I wore a coat.", ["It was cold, but I wore a coat.", "It was cold unless I wore a coat.", "It was cold although I wore a coat."]],
    ["I was hungry. I ate a sandwich.", "I ate a sandwich because I was hungry.", ["I ate a sandwich although I was hungry.", "I ate a sandwich unless I was hungry.", "I ate a sandwich but I was hungry."]],
    ["She is small. She is very strong.", "Although she is small, she is very strong.", ["Because she is small, she is very strong.", "So she is small, she is very strong.", "Unless she is small, she is very strong."]],
    ["The film ended. We went home.", "After the film ended, we went home.", ["Before the film ended, we went home after it.", "Unless the film ended, we went home.", "Although the film ended, we went home."]],
    ["I'll help you. You must ask me nicely.", "I'll help you if you ask me nicely.", ["I'll help you although you ask me nicely.", "I'll help you so you ask me nicely.", "I'll help you but you ask me nicely."]],
    ["I like apples. I don't like pears.", "I like apples, but I don't like pears.", ["I like apples, so I don't like pears.", "I like apples because I don't like pears.", "I like apples if I don't like pears."]],
    ["We waited. Then the bus came.", "We waited until the bus came.", ["We waited unless the bus came.", "We waited so the bus came.", "We waited although the bus came."]],
    ["Mum was cooking. At the same time, Dad was reading.", "Mum was cooking while Dad was reading.", ["Mum was cooking unless Dad was reading.", "Mum was cooking so Dad was reading.", "Mum was cooking because Dad was reading."]],
    ["You can't go out. First, you must finish your homework.", "You can't go out until you finish your homework.", ["You can't go out because you finish your homework.", "You can't go out so you finish your homework.", "You can't go out and you finish your homework."]]
];

const OPENERS = [
    ["___, I woke up and got dressed. Then I had breakfast.", "First", ["Finally", "However", "Meanwhile"], "<b>First</b> starts a sequence."],
    ["I opened the door. ___, a huge dog jumped out!", "Suddenly", ["Firstly", "In conclusion", "Once upon a time"], "<b>Suddenly</b> shows something unexpected."],
    ["We played all day. ___, we went home, tired but happy.", "Finally", ["First", "Meanwhile", "Once upon a time"], "<b>Finally</b> shows the last thing."],
    ["Tom was at the cinema. ___, his sister was at the zoo.", "Meanwhile", ["Firstly", "Therefore", "Once upon a time"], "<b>Meanwhile</b> = at the same time, somewhere else."],
    ["I wanted to go out. ___, it was raining.", "However", ["Therefore", "Firstly", "Luckily"], "<b>However</b> shows a contrast."],
    ["It was very late. ___, we decided to go to bed.", "Therefore", ["However", "Meanwhile", "Once"], "<b>Therefore</b> = so / because of this."],
    ["___ upon a time, there lived a kind king.", "Once", ["Then", "After", "Suddenly"], "<b>Once upon a time</b> is a classic story opening."],
    ["We ate lunch. ___ that, we played games.", "After", ["Before", "Once", "However"], "<b>After that</b> shows what happened next."],
    ["Mix the flour and the eggs. ___, put the cake in the oven.", "Next", ["Once upon a time", "However", "Suddenly"], "<b>Next</b> shows the next step."],
    ["It started to rain. ___, I had my umbrella.", "Luckily", ["Unfortunately", "Firstly", "Meanwhile"], "<b>Luckily</b> = something good happened."],
    ["We were ready for the picnic. ___, it started to rain.", "Unfortunately", ["Luckily", "Firstly", "Therefore"], "<b>Unfortunately</b> = something bad happened."],
    ["___, I think school uniforms are a good idea.", "In my opinion", ["Once upon a time", "Suddenly", "Meanwhile"], "<b>In my opinion</b> introduces what you think."]
];

// ---------- Reference words ----------
const REFERENCE = [
    ["Tom has a new puppy. <b>It</b> is black and white.", "the puppy", ["Tom", "Tom's house", "Tom's mum"]],
    ["Anna and Mia went to the shop. <b>They</b> bought some sweets.", "Anna and Mia", ["the sweets", "the shop", "only Mia"]],
    ["My grandad lives in a small village. He has lived <b>there</b> for fifty years.", "the small village", ["grandad", "fifty years", "the house"]],
    ["Sam lost his bag. He found <b>it</b> under the bed.", "his bag", ["the bed", "Sam", "the house"]],
    ["The children loved the story. The teacher read <b>it</b> twice.", "the story", ["the children", "the teacher", "the class"]],
    ["Lily called her friend Ben. <b>He</b> was happy to hear from her.", "Ben", ["Lily", "the phone", "the teacher"]],
    ["The scientists made an amazing discovery. <b>This</b> changed the world.", "the discovery", ["the scientists", "the world", "the lab"]],
    ["Mr Green is our teacher. Everyone likes <b>him</b> because he is funny.", "Mr Green", ["everyone", "our class", "the school"]],
    ["Grace has a brother. <b>His</b> name is Leo.", "Grace's brother", ["Grace", "Leo's dog", "the teacher"]],
    ["The dogs were barking. <b>Their</b> owner told them to stop.", "the dogs", ["the owner", "the neighbours", "the cats"]],
    ["People landed on the Moon in 1969. Millions watched it on TV at <b>that time</b>.", "in 1969", ["today", "tomorrow", "every year"]],
    ["Max and I played chess. <b>We</b> played for two hours.", "Max and the writer", ["only Max", "the chess pieces", "the whole class"]],
    ["The castle is very old. <b>Its</b> walls are made of stone.", "the castle", ["the walls", "the stone", "the king"]],
    ["My parents bought a tent. <b>They</b> want to go camping.", "my parents", ["the tent", "the shop", "my friends"]],
    ["Jack read the letter quickly. Then he put <b>it</b> in his pocket.", "the letter", ["Jack", "his pocket", "the pen"]]
];

const RELATIVES = ["who", "which", "whose", "where", "when"];
const RELATIVE_BANK = [
    ["The girl ___ won the race is my sister.", "who", "<b>who</b> is for people."],
    ["This is the house ___ I was born.", "where", "<b>where</b> is for places."],
    ["I have a dog ___ loves to swim.", "which", "<b>which</b> is for animals and things (you can also say <b>that</b>)."],
    ["That's the boy ___ bike was stolen.", "whose", "<b>whose</b> shows belonging."],
    ["Do you remember the day ___ we met?", "when", "<b>when</b> is for times."],
    ["The book ___ you gave me is great.", "which", "<b>which</b> is for things (you can also say <b>that</b>)."],
    ["My uncle, ___ lives in Spain, is a chef.", "who", "<b>who</b> is for people."],
    ["This is the park ___ we play football.", "where", "<b>where</b> is for places."],
    ["The woman ___ dog is barking is our neighbour.", "whose", "<b>whose</b> shows belonging."],
    ["Summer is the season ___ we go on holiday.", "when", "<b>when</b> is for times."],
    ["The cake ___ Mum made was delicious.", "which", "<b>which</b> is for things (you can also say <b>that</b>)."],
    ["A vet is a person ___ looks after animals.", "who", "<b>who</b> is for people."],
    ["Paris, ___ is the capital of France, is beautiful.", "which", "<b>which</b> is for things and places used as a subject."],
    ["The teacher ___ class I am in is very kind.", "whose", "<b>whose</b> shows belonging."],
    ["Is this the shop ___ you bought your shoes?", "where", "<b>where</b> is for places."],
    ["People ___ exercise are usually healthier.", "who", "<b>who</b> is for people."],
    ["Christmas is the time ___ families get together.", "when", "<b>when</b> is for times."],
    ["Our car, ___ is very old, broke down again.", "which", "<b>which</b> is for things."]
];

const PRONOUNS = [
    ["Anna and I went to the park. ___ played football.", "We", ["They", "Us", "Our"], "Anna and I = <b>we</b>."],
    ["This bag belongs to Tom. It is ___.", "his", ["him", "he", "her"], "Belonging to Tom = <b>his</b>."],
    ["Can you help ___? I can't open the door.", "me", ["I", "my", "mine"], "After a verb, use <b>me</b>."],
    ["The cat licked ___ paws.", "its", ["it's", "it", "their"], "<b>its</b> = belonging to it (no apostrophe)."],
    ["Sara and Kim are my friends. I like ___ a lot.", "them", ["they", "their", "theirs"], "After a verb, use <b>them</b>."],
    ["Is this pencil ___? – Yes, it's mine.", "yours", ["your", "you", "you're"], "<b>yours</b> = belonging to you (no noun after it)."],
    ["My parents gave ___ a present for my birthday.", "me", ["I", "my", "mine"], "After a verb, use <b>me</b>."],
    ["We love ___ new teacher.", "our", ["us", "we", "ours"], "Before a noun, use <b>our</b>."],
    ["Sam hurt ___ while he was playing.", "himself", ["him", "his", "he"], "The same person → <b>himself</b>."],
    ["The children made the cake ___.", "themselves", ["them", "theirs", "they"], "The same people → <b>themselves</b>."],
    ["That isn't my coat. ___ is blue.", "Mine", ["My", "Me", "I"], "<b>Mine</b> = my coat."],
    ["Lucy called ___ grandma.", "her", ["she", "hers", "herself"], "Before a noun, use <b>her</b>."],
    ["Tell ___ the story, please! We want to hear it.", "us", ["we", "our", "ours"], "After a verb, use <b>us</b>."],
    ["___ are going to the cinema tonight. Do you want to come with us?", "We", ["Us", "Our", "Ours"], "Subject = <b>we</b>."],
    ["The house is old, but ___ garden is beautiful.", "its", ["it's", "it", "their"], "<b>its</b> = belonging to it."]
];

const DEMONSTRATIVES = [
    ["___ apples in my basket are fresh.", "These", ["This", "That", "Those"], "Near + plural = <b>these</b>."],
    ["Look at ___ bird over there!", "that", ["this", "these", "those"], "Far + singular = <b>that</b>."],
    ["___ pen in my hand is new.", "This", ["These", "Those", "That"], "Near + singular = <b>this</b>."],
    ["Can you see ___ mountains far away?", "those", ["this", "these", "that"], "Far + plural = <b>those</b>."],
    ["I like ___ shoes I'm wearing.", "these", ["this", "that", "those"], "Near + plural = <b>these</b>."],
    ["___ house across the street is huge.", "That", ["This", "These", "Those"], "Far + singular = <b>that</b>."],
    ["Who are ___ people over there?", "those", ["this", "these", "that"], "Far + plural = <b>those</b>."],
    ["___ book I'm reading is great.", "This", ["These", "Those", "That"], "Near + singular = <b>this</b>."],
    ["Are ___ your keys here on the table?", "these", ["this", "that", "those"], "Near + plural = <b>these</b>."],
    ["___ stars in the sky are so bright tonight.", "Those", ["This", "These", "That"], "Far + plural = <b>those</b>."]
];

// ---------- Modal verbs ----------
const MODALS = [
    ["You ___ wear a seatbelt in the car. It's the law.", "must", ["might", "can", "could"], "<b>must</b> = it is necessary / a rule."],
    ["You ___ run near the swimming pool. It's dangerous!", "mustn't", ["don't have to", "should", "can"], "<b>mustn't</b> = it is not allowed."],
    ["You look tired. You ___ go to bed early.", "should", ["mustn't", "can't", "couldn't"], "<b>should</b> = good advice."],
    ["It's Saturday! We ___ go to school today.", "don't have to", ["mustn't", "have to", "must"], "<b>don't have to</b> = it isn't necessary."],
    ["I ___ swim when I was five.", "could", ["can", "must", "should"], "<b>could</b> = was able to (past)."],
    ["My little sister ___ read yet. She's only two.", "can't", ["mustn't", "shouldn't", "doesn't have to"], "<b>can't</b> = is not able to."],
    ["___ I open the window, please?", "May", ["Mustn't", "Has", "Didn't"], "<b>May I…?</b> = a polite way to ask for permission."],
    ["Take an umbrella. It ___ rain later.", "might", ["mustn't", "has to", "couldn't"], "<b>might</b> = it is possible, but not sure."],
    ["At my school, we ___ wear a uniform. It's a rule.", "have to", ["might", "could", "may"], "<b>have to</b> = it is necessary / a rule."],
    ["You ___ eat so many sweets. They are bad for your teeth.", "shouldn't", ["should", "can", "have to"], "<b>shouldn't</b> = it is not a good idea."],
    ["___ you help me with my homework, please?", "Could", ["Must", "Have", "Did"], "<b>Could you…?</b> = a polite request."],
    ["Birds ___ fly, but penguins can't.", "can", ["must", "should", "have to"], "<b>can</b> = is able to."],
    ["Ask Tom. He ___ know the answer – I'm not sure.", "might", ["must", "mustn't", "has to"], "<b>might</b> = maybe."],
    ["When my dad was young, he ___ run very fast.", "could", ["can", "must", "may"], "<b>could</b> = was able to (past)."],
    ["Students ___ use their phones during the test.", "mustn't", ["don't have to", "should", "could"], "<b>mustn't</b> = it is not allowed."],
    ["You ___ bring food. Lunch is free today.", "don't have to", ["mustn't", "have to", "must"], "<b>don't have to</b> = it isn't necessary."],
    ["I ___ finish my project tonight. It's due tomorrow!", "have to", ["might", "may", "could"], "<b>have to</b> = it is necessary."],
    ["We ___ go to the beach tomorrow. We haven't decided yet.", "might", ["must", "have to", "mustn't"], "<b>might</b> = maybe."],
    ["You ___ be quiet in the library.", "must", ["mustn't", "don't have to", "might"], "<b>must</b> = it is a rule."],
    ["She ___ play the piano really well. She practises every day.", "can", ["must", "mustn't", "should"], "<b>can</b> = is able to."],
    ["You ___ say thank you when someone helps you.", "should", ["shouldn't", "mustn't", "can't"], "<b>should</b> = good advice / the right thing to do."],
    ["Yesterday I ___ find my keys anywhere.", "couldn't", ["can't", "mustn't", "shouldn't"], "<b>couldn't</b> = wasn't able to (past)."],
    ["Passengers ___ buy a ticket before they get on the train.", "must", ["might", "may", "could"], "<b>must</b> = it is a rule."],
    ["Did you ___ walk to school yesterday?", "have to", ["must", "can", "should"], "<b>must</b> has no past form. Use <b>had to / did you have to</b>."],
    ["His lights are on. He ___ be at home.", "must", ["mustn't", "can't", "doesn't have to"], "<b>must</b> can also mean 'I'm sure it's true'."],
    ["You ___ touch the oven. It's very hot!", "mustn't", ["have to", "should", "may"], "<b>mustn't</b> = it is not allowed / dangerous."],
    ["I ___ come to your party. I'm not sure yet.", "may", ["must", "have to", "mustn't"], "<b>may</b> = maybe (like <b>might</b>)."],
    ["Can I use your pen? – Yes, you ___.", "can", ["must", "should", "have"], "Short answer: <b>Yes, you can.</b>"]
];

const MODAL_MEANINGS = {
    must: "It is necessary (a rule).",
    mustnt: "It is not allowed.",
    should: "It is good advice.",
    shouldnt: "It is a good idea not to do it.",
    dontHave: "It is not necessary.",
    can: "Somebody is able to do it.",
    could: "Somebody was able to do it in the past.",
    may: "Asking for permission.",
    might: "It is possible, but not sure.",
    hadTo: "It was necessary in the past."
};
const MODAL_MEANING_BANK = [
    ["You must wear a helmet.", "must"], ["You mustn't shout in class.", "mustnt"],
    ["You should drink more water.", "should"], ["You don't have to come early.", "dontHave"],
    ["I can speak two languages.", "can"], ["I could ride a bike when I was four.", "could"],
    ["May I go to the toilet, please?", "may"], ["It might snow tonight.", "might"],
    ["We have to be at school at 8:30.", "must"], ["You shouldn't stay up so late.", "shouldnt"],
    ["Can I use your phone, please?", "may"], ["He may be late today.", "might"],
    ["We had to wear a uniform at my old school.", "hadTo"], ["Fish can breathe under water.", "can"],
    ["You mustn't feed the animals at the zoo.", "mustnt"], ["She doesn't have to work on Sundays.", "dontHave"]
];

// ---------- Auxiliary verbs ----------
const AUXILIARIES = [
    ["___ you like chocolate?", "Do", ["Does", "Are", "Is"], "Present simple question: <b>Do</b> + I/you/we/they."],
    ["___ she live near here?", "Does", ["Do", "Is", "Has"], "Present simple question: <b>Does</b> + he/she/it."],
    ["___ they play football yesterday?", "Did", ["Do", "Were", "Have"], "Past simple question: <b>Did</b>."],
    ["I ___ like spiders.", "don't", ["doesn't", "isn't", "not"], "Present simple negative: I/you/we/they <b>don't</b>."],
    ["He ___ like broccoli.", "doesn't", ["don't", "isn't", "not"], "Present simple negative: he/she/it <b>doesn't</b>."],
    ["We ___ go to school last Sunday.", "didn't", ["doesn't", "weren't", "haven't"], "Past simple negative: <b>didn't</b>."],
    ["___ you watching TV right now?", "Are", ["Do", "Does", "Have"], "Present continuous: <b>am / is / are</b> + -ing."],
    ["She ___ reading a book at the moment.", "is", ["does", "has", "do"], "Present continuous: <b>is</b> + -ing."],
    ["___ you ever been to London?", "Have", ["Did", "Are", "Do"], "Present perfect: <b>have / has</b> + past participle."],
    ["He ___ finished his homework yet.", "hasn't", ["didn't", "isn't", "doesn't"], "Present perfect negative: <b>hasn't</b> + past participle."],
    ["___ it raining when you left?", "Was", ["Did", "Were", "Does"], "Past continuous: <b>was / were</b> + -ing."],
    ["They ___ sleeping when the phone rang.", "were", ["was", "did", "have"], "Past continuous: they <b>were</b> + -ing."],
    ["___ you help me tomorrow?", "Will", ["Did", "Have", "Were"], "Future: <b>will</b> + verb."],
    ["Where ___ you go on holiday last year?", "did", ["do", "were", "have"], "Past simple question: <b>did</b>."],
    ["What ___ your brother do in his free time?", "does", ["do", "is", "are"], "Present simple question: <b>does</b> + he/she/it."],
    ["How long ___ you been waiting?", "have", ["did", "are", "do"], "Present perfect continuous: <b>have been</b> + -ing."],
    ["I ___ never seen a whale.", "have", ["did", "am", "do"], "Present perfect: <b>have</b> + past participle."],
    ["___ your parents work in a hospital?", "Do", ["Does", "Are", "Is"], "Your parents = they → <b>Do</b>."],
    ["The film ___ start until 8 o'clock.", "doesn't", ["don't", "isn't", "aren't"], "The film = it → <b>doesn't</b>."],
    ["Why ___ you crying?", "are", ["do", "does", "have"], "Present continuous: <b>are</b> + -ing."],
    ["She ___ already left when we arrived.", "had", ["did", "was", "is"], "Past perfect: <b>had</b> + past participle."],
    ["___ Tom and Lucy coming to the party?", "Are", ["Is", "Do", "Does"], "Tom and Lucy = they → <b>Are</b>."],
    ["Do you like pizza? – Yes, I ___.", "do", ["am", "does", "like"], "Short answer: <b>Yes, I do.</b>"],
    ["Is she your sister? – No, she ___.", "isn't", ["doesn't", "don't", "aren't"], "Short answer: <b>No, she isn't.</b>"],
    ["Have you finished? – Yes, I ___.", "have", ["did", "am", "do"], "Short answer: <b>Yes, I have.</b>"],
    ["Did they win? – No, they ___.", "didn't", ["weren't", "don't", "haven't"], "Short answer: <b>No, they didn't.</b>"]
];

const TAGS = [
    ["It's cold today, ___?", "isn't it", ["is it", "doesn't it", "wasn't it"], "Positive sentence → negative tag: <b>isn't it?</b>"],
    ["You like pizza, ___?", "don't you", ["do you", "aren't you", "didn't you"], "Present simple → <b>don't you?</b>"],
    ["She can swim, ___?", "can't she", ["can she", "doesn't she", "isn't she"], "can → <b>can't she?</b>"],
    ["They went to the beach, ___?", "didn't they", ["did they", "don't they", "weren't they"], "Past simple → <b>didn't they?</b>"],
    ["He isn't at home, ___?", "is he", ["isn't he", "does he", "doesn't he"], "Negative sentence → positive tag: <b>is he?</b>"],
    ["We have finished, ___?", "haven't we", ["have we", "didn't we", "don't we"], "have → <b>haven't we?</b>"],
    ["You won't tell anyone, ___?", "will you", ["won't you", "do you", "don't you"], "won't → <b>will you?</b>"],
    ["Tom plays the guitar, ___?", "doesn't he", ["don't he", "isn't he", "does he"], "Present simple (he) → <b>doesn't he?</b>"],
    ["Your friends were late, ___?", "weren't they", ["wasn't they", "didn't they", "were they"], "were → <b>weren't they?</b>"],
    ["I'm right, ___?", "aren't I", ["amn't I", "isn't I", "don't I"], "Special one: I'm → <b>aren't I?</b>"],
    ["You should go, ___?", "shouldn't you", ["should you", "don't you", "aren't you"], "should → <b>shouldn't you?</b>"],
    ["She doesn't eat meat, ___?", "does she", ["doesn't she", "is she", "isn't she"], "doesn't → <b>does she?</b>"]
];

// ---------- Question words ----------
const QUESTION_WORDS = [
    ["___ do you live? – In London.", "Where", ["When", "Who", "What"], "<b>Where</b> asks about a place."],
    ["___ is your birthday? – In May.", "When", ["Where", "What", "Who"], "<b>When</b> asks about time."],
    ["___ is your teacher? – Mr Brown.", "Who", ["What", "Whose", "Where"], "<b>Who</b> asks about a person."],
    ["___ bag is this? – It's Mia's.", "Whose", ["Who", "Where", "What"], "<b>Whose</b> asks who something belongs to."],
    ["___ are you crying? – Because I fell over.", "Why", ["How", "What", "When"], "<b>Why</b> asks for a reason."],
    ["___ are you? – I'm fine, thanks.", "How", ["What", "Who", "Why"], "<b>How</b> asks about the way or feelings."],
    ["___ is your favourite colour? – Blue.", "What", ["Who", "Where", "When"], "<b>What</b> asks about things."],
    ["___ colour do you want, red or blue? – Red, please.", "Which", ["Who", "Whose", "Where"], "<b>Which</b> asks for a choice from a few things."],
    ["___ brothers have you got? – Two.", "How many", ["How much", "How old", "How long"], "<b>How many</b> + things you can count."],
    ["___ milk is in the fridge? – Not much.", "How much", ["How many", "How often", "How old"], "<b>How much</b> + things you can't count."],
    ["___ are you? – I'm eleven.", "How old", ["How many", "How long", "How much"], "<b>How old</b> asks about age."],
    ["___ do you go swimming? – Twice a week.", "How often", ["How long", "How many", "Which"], "<b>How often</b> asks how many times."],
    ["___ is the film? – Two hours.", "How long", ["How often", "How many", "How old"], "<b>How long</b> asks about time or length."],
    ["___ did you get to school? – By bus.", "How", ["What", "Where", "Which"], "<b>How</b> asks about the way."],
    ["___ did you have for lunch? – Pasta.", "What", ["Who", "Where", "How"], "<b>What</b> asks about things."],
    ["___ did you see at the party? – My cousins.", "Who", ["Where", "When", "Why"], "<b>Who</b> asks about people."],
    ["___ is the bus stop? – Next to the bank.", "Where", ["When", "How", "Who"], "<b>Where</b> asks about a place."],
    ["___ does the film start? – At 7 o'clock.", "What time", ["Which", "Where", "How many"], "<b>What time</b> asks about the time on the clock."],
    ["___ is this book? – It costs £5.", "How much", ["How many", "How old", "How long"], "<b>How much</b> asks about price."],
    ["___ did you go to bed late? – Because I was reading.", "Why", ["What", "Where", "Who"], "<b>Why</b> asks for a reason."],
    ["___ shoes are these? – They're Tom's.", "Whose", ["Who", "What", "Where"], "<b>Whose</b> asks who something belongs to."],
    ["___ far is the school? – About two kilometres.", "How", ["What", "Which", "Who"], "<b>How far</b> asks about distance."],
    ["___ does your mum do? – She's a nurse.", "What", ["Who", "How", "Where"], "<b>What does she do?</b> asks about a job."],
    ["___ wrote this poem? – I did!", "Who", ["Whose", "What", "Which"], "<b>Who</b> asks about a person."]
];

// ---------- Adjectives ----------
// [melléknév, középfok, felsőfok, szabály]
const ADJ_SHORT = "Short adjective: add <b>-er / -est</b>.";
const ADJ_DOUBLE = "One vowel + one consonant: <b>double the last letter</b>, then add -er / -est.";
const ADJ_E = "Ends in -e: just add <b>-r / -st</b>.";
const ADJ_Y = "Ends in consonant + y: change <b>y to i</b>, then add -er / -est.";
const ADJ_LONG = "Long adjective (2+ syllables): use <b>more / most</b>.";
const ADJ_IRR = "Irregular – learn it by heart!";
const ADJECTIVES = [
    ["tall", "taller", "tallest", ADJ_SHORT], ["small", "smaller", "smallest", ADJ_SHORT], ["fast", "faster", "fastest", ADJ_SHORT],
    ["old", "older", "oldest", ADJ_SHORT], ["young", "younger", "youngest", ADJ_SHORT], ["cold", "colder", "coldest", ADJ_SHORT],
    ["strong", "stronger", "strongest", ADJ_SHORT], ["kind", "kinder", "kindest", ADJ_SHORT], ["long", "longer", "longest", ADJ_SHORT],
    ["big", "bigger", "biggest", ADJ_DOUBLE], ["hot", "hotter", "hottest", ADJ_DOUBLE], ["thin", "thinner", "thinnest", ADJ_DOUBLE],
    ["sad", "sadder", "saddest", ADJ_DOUBLE], ["wet", "wetter", "wettest", ADJ_DOUBLE], ["fat", "fatter", "fattest", ADJ_DOUBLE],
    ["nice", "nicer", "nicest", ADJ_E], ["large", "larger", "largest", ADJ_E], ["wise", "wiser", "wisest", ADJ_E],
    ["safe", "safer", "safest", ADJ_E], ["brave", "braver", "bravest", ADJ_E],
    ["happy", "happier", "happiest", ADJ_Y], ["funny", "funnier", "funniest", ADJ_Y], ["easy", "easier", "easiest", ADJ_Y],
    ["busy", "busier", "busiest", ADJ_Y], ["heavy", "heavier", "heaviest", ADJ_Y], ["pretty", "prettier", "prettiest", ADJ_Y],
    ["early", "earlier", "earliest", ADJ_Y], ["angry", "angrier", "angriest", ADJ_Y],
    ["beautiful", "more beautiful", "most beautiful", ADJ_LONG], ["expensive", "more expensive", "most expensive", ADJ_LONG],
    ["interesting", "more interesting", "most interesting", ADJ_LONG], ["difficult", "more difficult", "most difficult", ADJ_LONG],
    ["important", "more important", "most important", ADJ_LONG], ["dangerous", "more dangerous", "most dangerous", ADJ_LONG],
    ["exciting", "more exciting", "most exciting", ADJ_LONG], ["famous", "more famous", "most famous", ADJ_LONG],
    ["careful", "more careful", "most careful", ADJ_LONG], ["comfortable", "more comfortable", "most comfortable", ADJ_LONG],
    ["good", "better", "best", ADJ_IRR], ["bad", "worse", "worst", ADJ_IRR], ["far", "further", "furthest", ADJ_IRR],
    ["little", "less", "least", ADJ_IRR]
];
// Rossz alakok gyártása a feleletválasztáshoz
function wrongComparatives(adj, comp, sup) {
    const stem = adj.replace(/y$/, "i");
    return [adj + "er", "more " + adj, sup, adj + adj.slice(-1) + "er", stem + "er", adj + "r"].filter(x => x !== comp);
}
function wrongSuperlatives(adj, comp, sup) {
    return [adj + "est", "most " + adj, comp, adj + adj.slice(-1) + "est", "the " + comp].filter(x => x !== sup);
}

const ADJ_SENTENCES = [
    ["An elephant is ___ than a mouse. (big)", "bigger", ["more big", "biggest", "biger"], ADJ_DOUBLE],
    ["This is ___ day of my life! (good)", "the best", ["the goodest", "the better", "the most good"], ADJ_IRR + " good → better → best"],
    ["Maths is ___ than art for me. (difficult)", "more difficult", ["difficulter", "most difficult", "the more difficult"], ADJ_LONG],
    ["Mount Everest is ___ mountain in the world. (high)", "the highest", ["the higher", "the most high", "highest"], "Superlative: <b>the</b> + -est."],
    ["My cold is ___ today than yesterday. (bad)", "worse", ["badder", "worst", "more bad"], ADJ_IRR + " bad → worse → worst"],
    ["Today is ___ than yesterday. (hot)", "hotter", ["hoter", "more hot", "hottest"], ADJ_DOUBLE],
    ["She is ___ girl in our class. (funny)", "the funniest", ["the funnyest", "the most funny", "funnier"], ADJ_Y],
    ["A cheetah is ___ than a lion. (fast)", "faster", ["more fast", "fastest", "the faster"], ADJ_SHORT],
    ["This book is ___ than that one. (interesting)", "more interesting", ["interestinger", "most interesting", "the most interesting"], ADJ_LONG],
    ["Who is ___ person in your family? (old)", "the oldest", ["the older", "the most old", "oldest"], "Superlative: <b>the</b> + -est."],
    ["My bag is ___ than yours. (heavy)", "heavier", ["heavyer", "more heavy", "heaviest"], ADJ_Y],
    ["This is ___ film I've ever seen! (exciting)", "the most exciting", ["the excitingest", "more exciting", "the more exciting"], ADJ_LONG],
    ["Is London ___ from here than Paris? (far)", "further", ["farer", "more far", "furthest"], ADJ_IRR + " far → further → furthest"],
    ["I have ___ money than my brother. (little)", "less", ["littler", "least", "more little"], ADJ_IRR + " little → less → least"],
    ["Tom is as ___ as his dad. (tall)", "tall", ["taller", "tallest", "more tall"], "<b>as … as</b> = the same. Use the normal adjective."],
    ["Ben is ___ than his sister. (happy)", "happier", ["more happy", "happyer", "happiest"], ADJ_Y],
    ["This is ___ dress in the shop. (beautiful)", "the most beautiful", ["the beautifullest", "more beautiful", "the beautifuler"], ADJ_LONG],
    ["The blue whale is ___ animal on Earth. (large)", "the largest", ["the larger", "the most large", "the largeest"], ADJ_E]
];

// ---------- Year 5 & 6 grammar ----------
const WORD_CLASS_LIST = ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "determiner"];
const WORD_CLASS_INFO = {
    noun: "a person, place, thing or idea", verb: "an action or being word", adjective: "describes a noun",
    adverb: "describes how, when or where (often -ly)", pronoun: "stands instead of a noun", preposition: "shows position or time",
    conjunction: "joins words or clauses", determiner: "comes before a noun (the, a, an, this, those, my…)"
};
const WORD_CLASSES = [
    ["The <b>dog</b> barked loudly.", "noun"], ["The dog <b>barked</b> loudly.", "verb"], ["The dog barked <b>loudly</b>.", "adverb"],
    ["We saw a <b>huge</b> elephant.", "adjective"], ["<b>She</b> plays the piano.", "pronoun"], ["The cat is <b>under</b> the table.", "preposition"],
    ["I was tired, <b>but</b> I kept going.", "conjunction"], ["<b>The</b> sun is shining.", "determiner"], ["My sister <b>sings</b> every day.", "verb"],
    ["My sister sings <b>beautifully</b>.", "adverb"], ["It was a <b>dark</b> and stormy night.", "adjective"], ["<b>London</b> is a big city.", "noun"],
    ["We walked <b>through</b> the forest.", "preposition"], ["I stayed at home <b>because</b> I was ill.", "conjunction"], ["<b>Those</b> shoes are mine.", "determiner"],
    ["Please give the book to <b>him</b>.", "pronoun"], ["The children <b>quickly</b> ran home.", "adverb"], ["<b>Happiness</b> is important.", "noun"],
    ["The <b>clever</b> fox escaped.", "adjective"], ["They <b>were</b> late again.", "verb"], ["We had lunch <b>after</b> the match.", "preposition"],
    ["<b>An</b> owl hooted in the dark.", "determiner"], ["<b>We</b> love our school.", "pronoun"], ["I'll come <b>if</b> I can.", "conjunction"],
    ["Tomorrow we will <b>visit</b> Grandma.", "verb"], ["The old man walked <b>slowly</b>.", "adverb"], ["The <b>bridge</b> was very long.", "noun"],
    ["Ben is <b>taller</b> than me.", "adjective"]
];

const MAKE_VERBS = [
    ["dark", "darken"], ["wide", "widen"], ["short", "shorten"], ["sharp", "sharpen"], ["length", "lengthen"], ["soft", "soften"],
    ["simple", "simplify"], ["class", "classify"], ["pure", "purify"], ["solid", "solidify"], ["just", "justify"],
    ["apology", "apologise"], ["real", "realise"], ["standard", "standardise"], ["critic", "criticise"], ["special", "specialise"], ["final", "finalise"],
    ["active", "activate"], ["hyphen", "hyphenate"], ["motive", "motivate"], ["origin", "originate"], ["captive", "captivate"]
];
const VERB_SUFFIX_RULE = "Suffixes that make verbs: <b>-en</b> (darken), <b>-ify</b> (simplify), <b>-ise</b> (realise), <b>-ate</b> (activate).";

const VERB_PREFIXES = [
    ["frost", "de", "to remove the frost"], ["code", "de", "to work out a secret code"], ["flate", "de", "to let the air out"],
    ["hydrate", "de", "to lose water"], ["cycle", "re", "to use again"], ["build", "re", "to build again"], ["heat", "re", "to heat again"],
    ["flow", "over", "to flow over the top"], ["take", "over", "to go past another car"], ["cook", "over", "to cook too long"],
    ["place", "mis", "to put in the wrong place"], ["judge", "mis", "to judge wrongly"], ["hear", "mis", "to hear wrongly"],
    ["connect", "dis", "to break the connection"], ["obey", "dis", "not to do what you are told"], ["appear", "dis", "to go out of sight"]
];

const POSSIBILITY = [
    ["Perhaps we will see a rainbow.", "Perhaps"], ["It will probably rain tomorrow.", "probably"],
    ["She is definitely the best singer.", "definitely"], ["They might come later.", "might"],
    ["Maybe the shop is closed.", "Maybe"], ["He will certainly win the race.", "certainly"],
    ["The cat is possibly hiding upstairs.", "possibly"], ["Surely you know the answer!", "Surely"],
    ["It could be a trick.", "could"], ["We will obviously need umbrellas.", "obviously"],
    ["The parcel may arrive today.", "may"], ["Clearly, the dog is hungry.", "Clearly"]
];

const PARENTHESIS = [
    ["My dog (a spotty Dalmatian) loves the beach.", ["My dog (a spotty Dalmatian loves the beach.", "My (dog a spotty Dalmatian) loves the beach.", "My dog a spotty Dalmatian) loves the beach."]],
    ["Mr Jones – our head teacher – is very kind.", ["Mr Jones – our head teacher is very kind.", "Mr – Jones our head teacher – is very kind.", "Mr Jones our – head teacher – is very kind."]],
    ["Paris, the capital of France, is beautiful.", ["Paris the capital of France, is beautiful.", "Paris, the capital, of France is beautiful.", "Paris, the capital of France is beautiful."]],
    ["Our teacher, who loves cats, has three pets.", ["Our teacher who loves cats, has three pets.", "Our teacher, who loves, cats has three pets.", "Our, teacher who loves cats, has three pets."]],
    ["The Moon (which is very far away) goes round the Earth.", ["The Moon (which is very far away goes round the Earth.", "The Moon which (is very far away) goes round the Earth.", "The (Moon which is very far away) goes round the Earth."]],
    ["My grandma – who is ninety – still swims every day.", ["My grandma – who is ninety still swims every day.", "My grandma who – is ninety – still swims every day.", "My – grandma who is ninety – still swims every day."]],
    ["Lions, the kings of the jungle, sleep a lot.", ["Lions the kings of the jungle, sleep a lot.", "Lions, the kings, of the jungle sleep a lot.", "Lions, the kings of the jungle sleep a lot."]]
];

const COMMAS_CLARITY = [
    ["Which sentence invites Grandma to come and eat?", "Let's eat, Grandma!", ["Let's eat Grandma!"]],
    ["Which sentence shows the person loves three different things?", "I love cooking, my family and my dog.", ["I love cooking my family and my dog."]],
    ["Which sentence means that the dog ate something?", "After eating, the dog went to sleep.", ["After eating the dog, went to sleep.", "After eating the dog went to sleep."]],
    ["Which sentence tells Tom to shoot the ball?", "Shoot, Tom!", ["Shoot Tom!"]],
    ["Which sentence lists four people?", "I met Anna, Ben, Carl and Dan.", ["I met Anna Ben, Carl and Dan.", "I met Anna, Ben Carl and Dan."]],
    ["Which sentence is talking to Sam?", "Are you ready to cook, Sam?", ["Are you ready to cook Sam?"]]
];

const RELATIVE_CLAUSES = [
    ["The boy who lives next door is my friend.", "who lives next door", ["The boy", "is my friend", "next door is"]],
    ["My bike, which is red, was stolen.", "which is red", ["My bike", "was stolen", "red, was"]],
    ["This is the park where we play.", "where we play", ["This is", "the park", "is the park"]],
    ["The girl whose cat is lost is crying.", "whose cat is lost", ["The girl", "is crying", "lost is crying"]],
    ["I remember the day when we met.", "when we met", ["I remember", "the day", "remember the day"]],
    ["The cake that Mum baked was delicious.", "that Mum baked", ["The cake", "was delicious", "baked was"]],
    ["Our teacher, who is from Wales, sings well.", "who is from Wales", ["Our teacher", "sings well", "Wales, sings"]],
    ["The film which we watched was scary.", "which we watched", ["The film", "was scary", "watched was"]]
];

const ACTIVE_PASSIVE = [
    ["The dog chased the cat.", "The cat was chased by the dog.", ["The cat chased the dog.", "The dog was chased by the cat.", "The cat is chase by the dog."]],
    ["Tom broke the window.", "The window was broken by Tom.", ["The window broke Tom.", "Tom was broken by the window.", "The window was broke by Tom."]],
    ["Shakespeare wrote Hamlet.", "Hamlet was written by Shakespeare.", ["Hamlet was wrote by Shakespeare.", "Shakespeare was written by Hamlet.", "Hamlet written by Shakespeare."]],
    ["The chef cooks the meals.", "The meals are cooked by the chef.", ["The meals is cooked by the chef.", "The chef is cooked by the meals.", "The meals were cook by the chef."]],
    ["The children painted the pictures.", "The pictures were painted by the children.", ["The pictures was painted by the children.", "The children were painted by the pictures.", "The pictures painted the children."]],
    ["A bee stung me.", "I was stung by a bee.", ["I was stinged by a bee.", "A bee was stung by me.", "Me was stung by a bee."]],
    ["The storm destroyed the bridge.", "The bridge was destroyed by the storm.", ["The storm was destroyed by the bridge.", "The bridge destroyed the storm.", "The bridge were destroyed by the storm."]],
    ["Mum makes the beds.", "The beds are made by Mum.", ["The beds is made by Mum.", "Mum is made by the beds.", "The beds are make by Mum."]]
];

// [szó, rokon értelmű, ellentétes értelmű]
const SYN_ANT = [
    ["big", "large", "small"], ["happy", "glad", "sad"], ["fast", "quick", "slow"], ["begin", "start", "finish"],
    ["brave", "courageous", "cowardly"], ["angry", "furious", "calm"], ["tiny", "minute", "huge"], ["cold", "freezing", "hot"],
    ["easy", "simple", "difficult"], ["shout", "yell", "whisper"], ["old", "ancient", "new"], ["rich", "wealthy", "poor"],
    ["clever", "intelligent", "foolish"], ["quiet", "silent", "noisy"], ["beautiful", "lovely", "ugly"], ["strong", "powerful", "weak"],
    ["scared", "frightened", "fearless"], ["empty", "vacant", "full"], ["true", "correct", "false"], ["wet", "damp", "dry"],
    ["love", "adore", "hate"], ["shut", "close", "open"], ["kind", "caring", "cruel"], ["smart", "neat", "scruffy"]
];
const UNRELATED_WORDS = ["pencil", "Tuesday", "banana", "window", "river", "purple", "table", "orange", "bicycle", "carrot"];

const FORMAL = [
    ["Which sentence is more formal?", "Good morning. How are you today?", ["Hiya! What's up?"]],
    ["Which sentence is more formal?", "Thank you very much for your help.", ["Thanks a lot, mate!"]],
    ["Which sentence is more formal?", "The children were extremely excited.", ["The kids were dead excited."]],
    ["Which sentence is more formal?", "Please find my homework attached.", ["Here's my homework, yeah."]],
    ["Which ending is right for a formal letter?", "Yours sincerely, Tom Brown", ["See ya, Tom"]],
    ["Which sentence is more formal?", "I would like to complain about the noise.", ["That noise is doing my head in!"]],
    ["Which sentence is more formal?", "Could you tell me where the station is, please?", ["Where's the station?"]],
    ["Which sentence is more formal?", "We regret to inform you that the trip is cancelled.", ["Sorry, the trip's off."]],
    ["Which sentence is more formal?", "Pupils must not run in the corridor.", ["Don't run in the corridor, guys!"]],
    ["Choose the formal (subjunctive) form: If I ___ you, I would apologise.", "were", ["am", "is", "be"]],
    ["Choose the formal (subjunctive) form: I wish it ___ summer!", "were", ["is", "be", "am"]],
    ["Choose the formal (subjunctive) form: The teacher asked that every pupil ___ on time.", "be", ["is", "are", "being"]],
    ["Choose the formal (subjunctive) form: If he ___ taller, he could reach the shelf.", "were", ["is", "are", "be"]],
    ["Choose the formal (subjunctive) form: It is important that she ___ there early.", "be", ["is", "been", "being"]]
];

QuizApp.init({
    name: "grammar",
    sections: [
        {
            title: "Prefixes & Suffixes", emoji: "🧩",
            desc: "A <b>prefix</b> goes at the start of a word (<b>un</b>happy). A <b>suffix</b> goes at the end (happi<b>ness</b>).",
            games: [
                {
                    id: "gr-prefix-opp", title: "Make the opposite", emoji: "🔄",
                    intro: "Choose the prefix that makes the opposite.<br>" + PREFIX_RULE,
                    make: () => PREFIX_OPPOSITES.map(([w, p]) => choiceQ(
                        `Make the opposite: <b>___${w}</b>`, p, OPPOSITE_PREFIXES, `<b>${p}${w}</b>`))
                },
                {
                    id: "gr-prefix-mean", title: "Prefix meanings", emoji: "🔍",
                    intro: "<b>re</b> = again &nbsp; <b>pre</b> = before &nbsp; <b>sub</b> = under &nbsp; <b>inter</b> = between &nbsp; <b>super</b> = above &nbsp; <b>anti</b> = against &nbsp; <b>auto</b> = self &nbsp; <b>over</b> = too much &nbsp; <b>tele</b> = far &nbsp; <b>bi</b> = two &nbsp; <b>tri</b> = three",
                    make: () => PREFIX_MEANINGS.map(([w, p, m]) => choiceQ(
                        `What does the prefix <b>${p}-</b> mean in <b>${w}</b>?`, m, ALL_MEANINGS, `<b>${p}-</b> = ${m}`))
                },
                {
                    id: "gr-prefix-build", title: "Build a word", emoji: "🏗️",
                    intro: "Join the prefix and the word, and type the new word.<br>Adding a prefix <b>never changes the spelling</b> of the root word: un + necessary = u<b>nn</b>ecessary",
                    make: () => PREFIX_BUILD.map(([p, w, r]) => typeQ(`<b>${p}</b> + <b>${w}</b> = ?`, r, "Keep all the letters of the prefix and the root word."))
                },
                {
                    id: "gr-suffix", title: "Suffix finder", emoji: "🔚",
                    intro: "<b>-ful</b> = full of &nbsp; <b>-less</b> = without &nbsp; <b>-ness</b> = a quality &nbsp; <b>-ly</b> = in a … way &nbsp; <b>-able</b> = can be &nbsp; <b>-er / -ist</b> = a person who…",
                    make: () => SUFFIX_FINDER.map(([b, s, m]) => choiceQ(
                        `<b>${b}</b> + ___ = <i>${m}</i>`, s, SUFFIX_LIST, `<b>${b} + ${s}</b>`))
                }
            ]
        },
        {
            title: "Conjunctions & Openers", emoji: "🔗",
            desc: "Conjunctions join ideas: <b>and, but, so, because, although, when, while, if, unless, until</b>…",
            games: [
                {
                    id: "gr-conj", title: "Choose the conjunction", emoji: "🔗",
                    intro: "<b>and</b> adds &nbsp; <b>but / although</b> contrast &nbsp; <b>because</b> reason &nbsp; <b>so</b> result &nbsp; <b>if / unless</b> condition &nbsp; <b>when / while / before / after / until / since</b> time",
                    make: () => bankToChoice(CONJUNCTIONS)
                },
                {
                    id: "gr-join", title: "Join the sentences", emoji: "🤝",
                    intro: "Choose the best way to join the two sentences.",
                    make: () => JOIN_SENTENCES.map(([two, right, wrong]) => choiceQ(`<i>${two}</i>`, right, wrong))
                },
                {
                    id: "gr-openers", title: "Sentence openers", emoji: "🚪",
                    intro: "Good writers start sentences in different ways: <b>First, Then, Next, After that, Suddenly, Meanwhile, However, Finally</b>…",
                    make: () => bankToChoice(OPENERS)
                }
            ]
        },
        {
            title: "Reference Words", emoji: "👉",
            desc: "Pronouns and other words that point back to something, so we don't repeat ourselves.",
            games: [
                {
                    id: "gr-refer", title: "What does it refer to?", emoji: "👉",
                    intro: "Read the sentences. What does the word in <b>bold</b> point back to?",
                    make: () => REFERENCE.map(([s, a, wrong]) => choiceQ(s, a, wrong))
                },
                {
                    id: "gr-relative", title: "who, which, whose, where, when", emoji: "🧷",
                    intro: "<b>who</b> = people &nbsp; <b>which</b> = things/animals &nbsp; <b>whose</b> = belonging &nbsp; <b>where</b> = places &nbsp; <b>when</b> = times",
                    make: () => RELATIVE_BANK.map(([s, a, e]) => choiceQ(s, a, RELATIVES, e))
                },
                {
                    id: "gr-pronouns", title: "Pronoun power", emoji: "🙋",
                    intro: "Subject: <b>I, you, he, she, it, we, they</b><br>Object: <b>me, you, him, her, it, us, them</b><br>Possessive: <b>my/mine, your/yours, his, her/hers, its, our/ours, their/theirs</b>",
                    make: () => bankToChoice(PRONOUNS)
                },
                {
                    id: "gr-demonstr", title: "this, that, these, those", emoji: "👆",
                    intro: "Near: <b>this</b> (one) / <b>these</b> (more)<br>Far: <b>that</b> (one) / <b>those</b> (more)",
                    make: () => bankToChoice(DEMONSTRATIVES)
                }
            ]
        },
        {
            title: "Modal Verbs", emoji: "🚦",
            desc: "<b>must, mustn't, have to, don't have to, should, can, could, may, might</b>",
            games: [
                {
                    id: "gr-modals", title: "Choose the modal", emoji: "🚦",
                    intro: `<b>must / have to</b> = necessary &nbsp;·&nbsp; <b>mustn't</b> = not allowed &nbsp;·&nbsp; <b>don't have to</b> = not necessary<br>
                            <b>should</b> = advice &nbsp;·&nbsp; <b>can / could</b> = ability (now / past), requests &nbsp;·&nbsp; <b>may / might</b> = maybe, permission`,
                    make: () => bankToChoice(MODALS)
                },
                {
                    id: "gr-modal-meaning", title: "What does it mean?", emoji: "💭",
                    intro: "Read the sentence and choose what the modal verb means.",
                    make: () => MODAL_MEANING_BANK.map(([s, key]) => choiceQ(
                        `<i>${s}</i>`, MODAL_MEANINGS[key], Object.values(MODAL_MEANINGS)))
                }
            ]
        },
        {
            title: "Auxiliary Verbs", emoji: "🛠️",
            desc: "Helping verbs: <b>do/does/did, am/is/are, was/were, have/has/had, will</b>",
            games: [
                {
                    id: "gr-aux", title: "Helping verbs", emoji: "🛠️",
                    intro: "Questions and negatives need a helping verb.<br><b>Do</b> you…? &nbsp; <b>Does</b> she…? &nbsp; <b>Did</b> they…? &nbsp; <b>Are</b> you …ing? &nbsp; <b>Have</b> you ever…?",
                    make: () => bankToChoice(AUXILIARIES)
                },
                {
                    id: "gr-tags", title: "Question tags", emoji: "🏷️",
                    intro: "A question tag is a mini question at the end.<br>Positive sentence → negative tag: <i>It's cold, <b>isn't it</b>?</i><br>Negative sentence → positive tag: <i>He isn't here, <b>is he</b>?</i>",
                    make: () => bankToChoice(TAGS)
                }
            ]
        },
        {
            title: "Question Words", emoji: "❓",
            desc: "<b>What, Where, When, Who, Whose, Why, How, Which, How many, How much, How often, How long</b>",
            games: [
                {
                    id: "gr-qwords", title: "Question words", emoji: "❓",
                    intro: "Read the answer, then choose the question word.",
                    make: () => bankToChoice(QUESTION_WORDS)
                }
            ]
        },
        {
            title: "Adjectives: more & most", emoji: "📈",
            desc: "Comparing things: tall → <b>taller</b> → <b>the tallest</b>; beautiful → <b>more</b> beautiful → <b>the most</b> beautiful",
            games: [
                {
                    id: "gr-comp", title: "Comparatives", emoji: "⚖️",
                    intro: `${ADJ_SHORT}<br>${ADJ_DOUBLE}<br>${ADJ_Y}<br>${ADJ_LONG}<br>Irregular: good → better, bad → worse`,
                    make: () => ADJECTIVES.map(([a, c, s, rule]) => choiceQ(
                        `What is the comparative of <b>${a}</b>? <div class="q-hint">(…than)</div>`, c, wrongComparatives(a, c, s), `${a} → ${c} → ${s}. ${rule}`))
                },
                {
                    id: "gr-sup", title: "Superlatives", emoji: "🏆",
                    intro: "Type the superlative (without <i>the</i>).<br>tall → <b>tallest</b> &nbsp; happy → <b>happiest</b> &nbsp; beautiful → <b>most beautiful</b> &nbsp; good → <b>best</b>",
                    make: () => ADJECTIVES.map(([a, c, s, rule]) => typeQ(
                        `Type the superlative of <b>${a}</b>. <div class="q-hint">(the …)</div>`, [s, "the " + s], `${a} → ${c} → ${s}. ${rule}`))
                },
                {
                    id: "gr-adj-sent", title: "Adjectives in sentences", emoji: "📝",
                    intro: "Choose the correct form. Remember: <b>-er / more … than</b> for two things, <b>the -est / the most</b> for the top one.",
                    make: () => bankToChoice(ADJ_SENTENCES)
                },
                {
                    id: "gr-comp-mix", title: "Mixed: choose the form", emoji: "🎲",
                    intro: "Comparative or superlative? Read carefully!",
                    make: () => ADJECTIVES.map(([a, c, s, rule]) => Math.random() < 0.5
                        ? choiceQ(`<b>${a}</b> → comparative?`, c, wrongComparatives(a, c, s), rule)
                        : choiceQ(`<b>${a}</b> → superlative?`, s, wrongSuperlatives(a, c, s), rule))
                }
            ]
        },
        {
            title: "Year 5 & 6 Grammar", emoji: "🎓",
            desc: "Word classes, making verbs, parenthesis, relative clauses, passive voice, synonyms and formal English.",
            games: [
                {
                    id: "gr-classes", title: "Word classes", emoji: "🏷️",
                    intro: WORD_CLASS_LIST.map(c => `<b>${c}</b> – ${WORD_CLASS_INFO[c]}`).join("<br>"),
                    make: () => WORD_CLASSES.map(([s, c]) => choiceQ(`What word class is the word in <b>bold</b>?<br><i>${s}</i>`, c, WORD_CLASS_LIST,
                        `A <b>${c}</b> – ${WORD_CLASS_INFO[c]}.`))
                },
                {
                    id: "gr-make-verb", title: "Make a verb", emoji: "⚙️",
                    intro: VERB_SUFFIX_RULE,
                    make: () => MAKE_VERBS.map(([w, v]) => choiceQ(`Turn <b>${w}</b> into a verb.`, v,
                        [w + "en", w + "ify", w + "ise", w + "ate"], VERB_SUFFIX_RULE))
                },
                {
                    id: "gr-verb-prefix", title: "Verb prefixes", emoji: "🔧",
                    intro: "<b>de-</b> = remove / undo &nbsp; <b>re-</b> = again &nbsp; <b>over-</b> = too much / above &nbsp; <b>mis-</b> = wrongly &nbsp; <b>dis-</b> = not / opposite",
                    make: () => VERB_PREFIXES.map(([stem, p, m]) => choiceQ(`<b>___${stem}</b> <div class="q-hint">(${m})</div>`, p,
                        ["de", "re", "over", "mis", "dis"], `<b>${p}${stem}</b> – ${m}`))
                },
                {
                    id: "gr-possibility", title: "How sure are we?", emoji: "🤷",
                    intro: "Some words show how sure we are: <b>perhaps, maybe, probably, possibly, definitely, certainly, surely, clearly</b> and modal verbs <b>might, may, could</b>.",
                    make: () => POSSIBILITY.map(([s, a]) => choiceQ(`Which word shows how sure we are?<br><i>${s}</i>`, a,
                        s.replace(/[.!?,]/g, "").split(" ").filter(w => w !== a && w.length > 2)))
                },
                {
                    id: "gr-parenthesis", title: "Parenthesis", emoji: "🧷",
                    intro: "Parenthesis is extra information in a sentence. Put it between <b>brackets ( )</b>, <b>dashes – –</b> or <b>commas , ,</b>.<br>If you take it out, the sentence still makes sense.",
                    make: () => PARENTHESIS.map(([right, wrong]) => choiceQ("Which sentence is punctuated correctly?", right, wrong))
                },
                {
                    id: "gr-comma-clarity", title: "Commas change meaning", emoji: "🍽️",
                    intro: "A comma can change the meaning of a sentence!<br><i>Let's eat<b>,</b> Grandma!</i> (talking to Grandma) &nbsp;·&nbsp; <i>Let's eat Grandma!</i> (oh no!)",
                    make: () => COMMAS_CLARITY.map(([q, right, wrong]) => choiceQ(q, right, wrong))
                },
                {
                    id: "gr-rel-clause", title: "Find the relative clause", emoji: "🔎",
                    intro: "A relative clause gives extra information about a noun. It starts with <b>who, which, that, whose, where</b> or <b>when</b>.",
                    make: () => RELATIVE_CLAUSES.map(([s, a, wrong]) => choiceQ(`Which part is the relative clause?<br><i>${s}</i>`, a, wrong))
                },
                {
                    id: "gr-passive", title: "Active and passive", emoji: "🔄",
                    intro: "Active: <i>The dog <b>chased</b> the cat.</i><br>Passive: <i>The cat <b>was chased</b> by the dog.</i> (be + past participle)",
                    make: () => [
                        ...ACTIVE_PASSIVE.map(([act, pas, wrong]) => choiceQ(`Change to the passive:<br><i>${act}</i>`, pas, wrong, "Passive: object + <b>was / were / is / are + past participle</b> + by …")),
                        ...ACTIVE_PASSIVE.map(([act, pas]) => Math.random() < 0.5
                            ? choiceQ(`Is this sentence active or passive?<br><i>${act}</i>`, "Active", ["Passive"], "The subject does the action.")
                            : choiceQ(`Is this sentence active or passive?<br><i>${pas}</i>`, "Passive", ["Active"], "be + past participle (+ by …)"))
                    ]
                },
                {
                    id: "gr-synonyms", title: "Synonyms and antonyms", emoji: "↔️",
                    intro: "<b>Synonym</b> = a word with the same meaning (big – large).<br><b>Antonym</b> = a word with the opposite meaning (big – small).",
                    make: () => SYN_ANT.map(([w, syn, ant]) => Math.random() < 0.5
                        ? choiceQ(`Choose a <b>synonym</b> (same meaning) of <b>${w}</b>.`, syn, [ant, ...sample(UNRELATED_WORDS, 2)], `${w} = ${syn} &nbsp;·&nbsp; opposite: ${ant}`)
                        : choiceQ(`Choose an <b>antonym</b> (opposite) of <b>${w}</b>.`, ant, [syn, ...sample(UNRELATED_WORDS, 2)], `${w} ↔ ${ant} &nbsp;·&nbsp; same meaning: ${syn}`))
                },
                {
                    id: "gr-formal", title: "Formal English", emoji: "🎩",
                    intro: "Formal English is used in letters, reports and speeches: no slang, full forms, polite words.<br>Formal: <i>If I <b>were</b> you…</i> (subjunctive)",
                    make: () => FORMAL.map(([q, right, wrong]) => choiceQ(q, right, wrong))
                }
            ]
        }
    ]
});
