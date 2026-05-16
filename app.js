const areas = {
  latin: {
    ACI_ERKENNEN: "AcI erkennen",
    ACI_ZEIT: "Zeitverhaeltnis",
    PRONOMEN_BEZUG: "Pronomen beziehen",
    KNG: "KNG",
    VOCAB: "Vokabeln",
    UEBERSETZUNG: "Uebersetzung"
  },
  english: {
    VOCAB_FORM: "Word families",
    VOCAB_ACTIVE: "Vokabeln aktiv schreiben",
    VOCAB_CATEGORY: "Wortfelder",
    VERB_PREP: "Verb + preposition",
    GRAMMAR_CONDITIONALS: "Conditionals U3",
    GRAMMAR_PAST_PERFECT: "Past perfect U3",
    GRAMMAR_GERUND_INF: "Gerund/Infinitive",
    LINKING: "Linking words",
    READING_EVIDENCE: "Reading/Listening Beleg",
    GENRE_READING: "Genres und Atmosphaere",
    WRITING_STRUCTURE: "Writing Struktur",
    WRITING_PHRASES: "Useful phrases",
    WRITING_GRAMMAR: "Grammatik fuer Writing",
    CONTINUATION_WRITING: "Fortsetzung schreiben"
  },
  math: {
    FUNCTION_RULE: "Funktionsregel",
    POINT_CHECK: "Punktprobe",
    LINEAR_DECODER: "Textaufgaben decodieren",
    LINEAR_EQUATION: "Gleichung verstehen",
    LINEAR_GRAPH: "Graph-Strategie",
    LINEAR_VALUE: "Werte berechnen",
    LINEAR_CONTEXT: "Bedeutung im Kontext",
    DARLEGEN: "Loesungsweg darlegen"
  }
};

const conditionalSourceFiles = {
  type1: "./materials/conditionals/conditional1.json",
  type2: "./materials/conditionals/conditional2.json",
  type3: "./materials/conditionals/conditional3.json",
  mixed: "./materials/conditionals/mixed.json"
};

const conditionalLabels = {
  type1: "Type 1",
  type2: "Type 2",
  type3: "Type 3",
  mixed: "Gemischt"
};

const conditionalTypeLabels = {
  1: "Conditional 1",
  2: "Conditional 2",
  3: "Conditional 3"
};

const conditionalRules = {
  1: "Bei Bedingungssätzen vom Typ 1 hält der Sprecher oder die Sprecherin es für möglich, dass sich die Bedingung erfüllt. Die Bedingung steht im simple present, die Folge im will future.",
  2: "Bei Bedingungssätzen vom Typ 2 hält der Sprecher oder die Sprecherin es für unwahrscheinlich, dass sich die Bedingung erfüllt. Die Bedingung steht im simple past, die Folge im conditional (would/could + Infinitiv).",
  3: "if-clause: had(n’t) + past participle; main clause: would(n’t) have + past participle"
};

const conditionalBookSignals = {
  1: "Type 1: possible",
  2: "Type 2: unlikely / hypothetical",
  3: "Type 3: impossible now"
};

const conditionalBookExamples = {
  1: "If I hurry, I’ll be able to listen to their talk.",
  2: "If they came back later, I’d listen to them.",
  3: "Well, if I had spent less time in the photo exhibit, I wouldn’t have been late for the talk."
};

const conditionalStructures = {
  1: "If + simple present, will/can/should/may/must + infinitive",
  2: "If + simple past, would/could/might + infinitive",
  3: "If + past perfect, would/could/might have + past participle"
};

const conditionalModes = {
  random: "Mix",
  cloze: "Luecke",
  type: "Typ",
  structure: "Struktur",
  clauses: "Satzteile"
};

let conditionalData = {
  type1: [],
  type2: [],
  type3: [],
  mixed: []
};
let conditionalDataLoaded = false;
let conditionalDataLoading = null;
let conditionalSettings = {
  set: "mixed",
  mode: "random"
};
let recentConditionalIds = [];

const englishCoreStages = new Set(["core", "ac3"]);
const englishReserveStages = new Set(["text_smart", "u4_start", "u4_later"]);

function stageOf(task) {
  return task.stage || "core";
}

const tasks = {
  latin: [
    {
      type: "ACI_ERKENNEN",
      title: "AcI erkennen",
      prompt: "Welches Wort ist das Kopfverb?",
      sentence: "Servus dicit Domitium in viam cecidisse.",
      options: ["Servus", "dicit", "Domitium", "cecidisse"],
      answer: "dicit",
      ok: "Genau. Nach dicit folgt der AcI: Domitium ... cecidisse.",
      help: "Suche zuerst ein Verb des Sagens, Sehens, Hoerens, Wissens oder Hoffens."
    },
    {
      type: "ACI_ERKENNEN",
      title: "AcI-Bausteine",
      prompt: "Was ist der Akkusativ des AcI?",
      sentence: "Spero servos cenam bonam paravisse.",
      options: ["Spero", "servos", "cenam", "paravisse"],
      answer: "servos",
      ok: "Richtig. servos ist im deutschen dass-Satz das Subjekt: dass die Sklaven ...",
      help: "Der AcI-Akkusativ ist oft die Person oder Sache, die im dass-Satz zum Subjekt wird."
    },
    {
      type: "ACI_ZEIT",
      title: "Zeitverhaeltnis",
      prompt: "Welche Zeit drueckt der Infinitiv aus?",
      sentence: "Audio tempestatem multas arbores fregisse.",
      options: ["gleichzeitig", "vorzeitig", "zukuenftig"],
      answer: "vorzeitig",
      ok: "Ja. fregisse ist Infinitiv Perfekt: Der Sturm hat die Baeume vorher zerbrochen.",
      help: "Infinitiv Perfekt endet oft auf -isse und bedeutet: vorher passiert."
    },
    {
      type: "PRONOMEN_BEZUG",
      title: "Pronomen im AcI",
      prompt: "Auf wen bezieht sich se?",
      sentence: "Flavia scit se liberam esse.",
      options: ["auf Flavia", "auf eine andere Frau", "auf Quintus"],
      answer: "auf Flavia",
      ok: "Genau. se bezieht sich auf das Subjekt des Kopfverbs: Flavia.",
      help: "Bei se frage: Wer ist das Subjekt des Kopfverbs?"
    },
    {
      type: "PRONOMEN_BEZUG",
      title: "eius verstehen",
      prompt: "Welche Uebersetzung passt fuer eius?",
      sentence: "Caupo dicit coquos eius cenam paravisse.",
      options: ["seine/ihre Koeche", "sich Koeche", "unsere Koeche"],
      answer: "seine/ihre Koeche",
      ok: "Richtig. eius ist nicht reflexiv. Es bedeutet sein/ihr von einer anderen genannten Person.",
      help: "eius ist Genitiv Singular von is/ea/id: sein/ihr, aber nicht sein eigenes im reflexiven Sinn."
    },
    {
      type: "KNG",
      title: "KNG verbinden",
      prompt: "Welche Verbindung ist grammatisch passend?",
      sentence: "Kasus, Numerus und Genus muessen uebereinstimmen.",
      options: ["vestram patriam", "vestram mare", "vestram servis"],
      answer: "vestram patriam",
      ok: "Ja. vestram und patriam sind Akkusativ Singular feminin.",
      help: "Pruefe immer drei Dinge: Kasus, Numerus, Genus."
    },
    {
      type: "UEBERSETZUNG",
      title: "Uebersetzen",
      prompt: "Welche Uebersetzung passt?",
      sentence: "Pater scit Quintum amicae auxilium dare velle.",
      options: [
        "Der Vater weiss, dass Quintus der Freundin helfen will.",
        "Der Vater will Quintus der Freundin geben.",
        "Quintus weiss, dass der Vater hilft."
      ],
      answer: "Der Vater weiss, dass Quintus der Freundin helfen will.",
      ok: "Sehr gut. Quintum wird im dass-Satz zu Quintus als Subjekt.",
      help: "Erst Kopfverb uebersetzen, dann den AcI als dass-Satz bauen."
    },
    {
      type: "VOCAB",
      title: "Vokabelblocker",
      prompt: "Was bedeutet reliquisse?",
      sentence: "Servus dicit Aufidium villam reliquisse.",
      options: ["verlassen haben", "vorbereitet haben", "gerufen haben"],
      answer: "verlassen haben",
      ok: "Richtig. relinquere -> reliquisse = verlassen haben.",
      help: "Merke Perfektinfinitive als eigene Klausurformen: venisse, fuisse, reliquisse, paravisse."
    }
  ],
  english: [
    {
      stage: "u4_start",
      type: "VOCAB_FORM",
      title: "Word family",
      prompt: "Choose the correct form.",
      sentence: "Maya signed up when she ___ for a holiday workshop. (registration)",
      options: ["registered", "registration", "registering"],
      answer: "registered",
      ok: "Correct. The sentence needs a verb in the past: registered.",
      help: "The subject is Maya and the sentence tells what she did. That needs a past verb, not the noun registration.",
      rule: "registered ist hier das Verb im simple past. registration ist ein Nomen und kann nach she nicht direkt als Praedikat stehen.",
      mistakes: {
        "registration": "registration ist ein Nomen. Nach dem Subjekt she braucht der Satz hier aber ein Verb: she registered.",
        "registering": "registering kann nach is/was oder als -ing-Form passen. Hier erzaehlt der Satz im simple past, deshalb: registered."
      }
    },
    {
      stage: "u4_start",
      type: "VOCAB_FORM",
      title: "Word family",
      prompt: "Choose the correct form.",
      sentence: "The class was very ___. (challenge)",
      options: ["challenge", "challenging", "challenged"],
      answer: "challenging",
      ok: "Yes. challenging describes the class as demanding or difficult in an interesting way.",
      help: "The class causes the challenge. It is not the thing that was challenged by someone else.",
      rule: "challenging bedeutet: etwas ist herausfordernd. challenged bedeutet: jemand oder etwas wurde herausgefordert. In 'The class was very ...' beschreibt man die Eigenschaft der class, also challenging.",
      mistakes: {
        "challenge": "challenge ist hier das Grundwort und meistens Nomen oder Verb. Nach was very brauchst du ein Adjektiv: challenging.",
        "challenged": "challenged bedeutet eher: jemand/etwas wurde herausgefordert. Die class wird hier nicht von jemandem herausgefordert, sondern sie ist herausfordernd: challenging."
      }
    },
    {
      stage: "u4_start",
      type: "VOCAB_FORM",
      title: "Word family",
      prompt: "Choose the correct form.",
      sentence: "The course included an ___ about simple robots. (introduce)",
      options: ["introduction", "introduce", "introduced"],
      answer: "introduction",
      ok: "Correct. After an you need a noun: introduction.",
      help: "an stands before a singular noun. introduce is a verb, introduced is a verb form or adjective.",
      rule: "Nach an braucht man ein zaehlbares Nomen im Singular. Deshalb: an introduction, nicht an introduce.",
      mistakes: {
        "introduce": "introduce ist ein Verb. Nach an kann aber kein Verb direkt stehen. Es muss das Nomen introduction sein.",
        "introduced": "introduced ist eine Vergangenheitsform oder ein Partizip. Nach an braucht der Satz ein Nomen: introduction."
      }
    },
    {
      stage: "u4_start",
      type: "VOCAB_ACTIVE",
      title: "Active vocabulary",
      prompt: "Which word best completes the sentence?",
      sentence: "A job in technology can be ___ if you like solving problems.",
      options: ["challenging", "challenge", "challenged"],
      answer: "challenging",
      ok: "Right. After can be you need an adjective. challenging describes what the job is like.",
      help: "Look at the gap after can be. The sentence needs an adjective that describes the job.",
      rule: "Nach can be braucht die Luecke ein Adjektiv. challenging beschreibt die Eigenschaft des Jobs: Er ist herausfordernd. challenge ist Nomen oder Verb; challenged bedeutet, dass jemand oder etwas herausgefordert wurde.",
      mistakes: {
        "challenge": "challenge ist hier nicht die richtige Form. Nach can be braucht der Satz ein Adjektiv, aber challenge ist meistens Nomen oder Verb. Richtig ist challenging.",
        "challenged": "challenged beschreibt jemanden oder etwas, der/das herausgefordert wurde. Der Job wird hier nicht herausgefordert; er hat die Eigenschaft, herausfordernd zu sein: challenging."
      }
    },
    {
      type: "VOCAB_ACTIVE",
      title: "Active vocabulary",
      prompt: "Choose the strongest phrase for a formal answer.",
      sentence: "The text says that the programme gives teenagers a chance to learn skills for future jobs.",
      options: ["career opportunity", "funny thing", "bad place"],
      answer: "career opportunity",
      ok: "Good. career opportunity is precise and useful in written answers.",
      help: "In tests, prefer precise school-English phrases over vague words like thing or stuff."
    },
    {
      type: "VOCAB_CATEGORY",
      title: "U3 vocabulary category",
      prompt: "Which category fits best?",
      sentence: "cactus / crater / wildlife / flash flood",
      options: ["natural environment", "school and work", "technology"],
      answer: "natural environment",
      ok: "Correct. These words belong to the Desert Southwest / nature field.",
      help: "Group words by topic first. Topic groups help you understand reading and listening tasks faster."
    },
    {
      type: "VOCAB_ACTIVE",
      title: "U3 school and work",
      prompt: "Which word best completes the sentence?",
      sentence: "A ___ looks for people to join a company or programme.",
      options: ["recruiter", "rancher", "witness"],
      answer: "recruiter",
      ok: "Correct. A recruiter finds people for a company, team or programme.",
      help: "Use the context words join a company or programme. That points to recruiter.",
      rule: "recruiter ist eine Person. Das Wort gehoert zum Feld school and work und passt zu recruit = jemanden anwerben."
    },
    {
      type: "VOCAB_ACTIVE",
      title: "U3 school and work",
      prompt: "Which word best completes the sentence?",
      sentence: "Too much ___ can make students feel nervous before a test.",
      options: ["pressure", "saddle", "territory"],
      answer: "pressure",
      ok: "Correct. pressure means stress or Druck.",
      help: "The signal is feel nervous before a test. That is emotional pressure.",
      rule: "pressure ist ein Nomen. Wichtige Kollokation: put pressure on someone."
    },
    {
      type: "VOCAB_ACTIVE",
      title: "U3 people in the West",
      prompt: "Which person is described?",
      sentence: "This person sees something happen and can tell a judge about it.",
      options: ["witness", "miner", "smuggler"],
      answer: "witness",
      ok: "Correct. A witness saw something and can report it.",
      help: "The words sees and tell a judge are the clues.",
      rule: "Bei Definitionsaufgaben markierst du die Funktionswoerter: person, sees, tell a judge -> witness."
    },
    {
      type: "VOCAB_ACTIVE",
      title: "U3 people in the West",
      prompt: "Which person is described?",
      sentence: "This person works with cattle, horses or a ranch.",
      options: ["rancher", "dentist", "policeman"],
      answer: "rancher",
      ok: "Correct. A rancher works on or owns a ranch.",
      help: "cattle, horses and ranch belong to the same word field.",
      rule: "Bei U3-Personen hilft das Wortfeld: ranch/cattle/horses -> rancher; mine/gold -> miner; law/court -> judge."
    },
    {
      type: "VOCAB_ACTIVE",
      title: "U3 Tombstone",
      prompt: "Which word best completes the sentence?",
      sentence: "Tombstone became a ___ when many people came there to make money.",
      options: ["boomtown", "crater", "saddle"],
      answer: "boomtown",
      ok: "Correct. A boomtown grows quickly because money or jobs attract people.",
      help: "The clue is many people came there to make money.",
      rule: "boomtown gehoert zu Tombstone/Gold Rush: Eine Stadt waechst schnell, weil es Arbeit, Geld oder Bodenschaetze gibt."
    },
    {
      type: "VOCAB_ACTIVE",
      title: "U3 Tombstone",
      prompt: "Choose the correct word.",
      sentence: "A famous old story that many people know is ___.",
      options: ["legendary", "arid", "bilingual"],
      answer: "legendary",
      ok: "Correct. legendary means famous from stories or history.",
      help: "The clues are famous, old story and many people know it.",
      rule: "legendary ist ein Adjektiv. Es beschreibt Personen, Orte oder Ereignisse, ueber die viele Geschichten erzaehlt werden."
    },
    {
      type: "VOCAB_CATEGORY",
      title: "U3 vocabulary category",
      prompt: "Which category fits best?",
      sentence: "miner / rancher / judge / witness",
      options: ["people and jobs", "natural environment", "school subjects"],
      answer: "people and jobs",
      ok: "Correct. These words all name people or jobs.",
      help: "Ask first: person, place, object, nature word or action?",
      rule: "Kategorien helfen bei Reading-Aufgaben: Du musst nicht jedes Wort perfekt uebersetzen, aber das Wortfeld erkennen."
    },
    {
      type: "VOCAB_CATEGORY",
      title: "U3 odd one out",
      prompt: "Which word does not fit?",
      sentence: "cactus / crater / wildlife / recruiter",
      options: ["recruiter", "crater", "wildlife"],
      answer: "recruiter",
      ok: "Correct. cactus, crater and wildlife belong to nature; recruiter is a person/job.",
      help: "For odd one out, say the category before choosing.",
      rule: "Odd-one-out braucht eine Begruendung: Drei Woerter gehoeren zu nature, eins gehoert zu work."
    },
    {
      stage: "u4_later",
      type: "VOCAB_CATEGORY",
      title: "U4 vocabulary category",
      prompt: "Which word belongs to work?",
      sentence: "bay / wildfire / headquarters / sailing",
      options: ["headquarters", "wildfire", "sailing"],
      answer: "headquarters",
      ok: "Right. Headquarters belongs to work/business.",
      help: "Ask: Is the word about nature, work, sports/free time, technology or social issues?"
    },
    {
      type: "VERB_PREP",
      title: "Verb + preposition",
      prompt: "Choose the correct preposition.",
      sentence: "Tourists were accused ___ taking plants from the national park.",
      options: ["of", "about", "to"],
      answer: "of",
      ok: "Correct. accuse someone of doing something.",
      help: "Learn verb + preposition as one chunk: accuse of, warn about, adapt to."
    },
    {
      type: "VERB_PREP",
      title: "Verb + preposition",
      prompt: "Choose the correct phrase.",
      sentence: "Desert animals have adapted ___ extreme heat.",
      options: ["to", "of", "about"],
      answer: "to",
      ok: "Correct. adapt to something.",
      help: "Do not translate from German word by word. Store the English phrase as a chunk."
    },
    {
      type: "VERB_PREP",
      title: "Verb + preposition",
      prompt: "Choose the correct preposition.",
      sentence: "Park rangers warn visitors ___ flash floods.",
      options: ["about", "of", "to"],
      answer: "about",
      ok: "Correct. warn someone about something.",
      help: "Learn the whole chunk: warn about.",
      rule: "warn about bedeutet vor etwas warnen. accuse of und adapt to sind andere feste Paare."
    },
    {
      type: "VERB_PREP",
      title: "Verb + preposition",
      prompt: "Choose the correct phrase.",
      sentence: "The plan did not ___ because the weather changed.",
      options: ["work out", "work to", "work about"],
      answer: "work out",
      ok: "Correct. work out means succeed or turn out well.",
      help: "not work out is one complete phrase.",
      rule: "work out ist ein phrasal verb. Es bedeutet: klappen / funktionieren / gut ausgehen."
    },
    {
      type: "GRAMMAR_CONDITIONALS",
      title: "Conditional type 1",
      prompt: "Which sentence is correct?",
      sentence: "Realistic future: If I get work experience, ...",
      options: [
        "I can learn useful skills.",
        "I would learned useful skills.",
        "I had learned useful skills."
      ],
      answer: "I can learn useful skills.",
      ok: "Correct. Type 1: if + simple present, main clause with will/can/should + infinitive.",
      help: "Type 1 is realistic: If + present, will/can/should + infinitive.",
      rule: "If I get work experience ist eine realistische Bedingung. Deshalb bleibt der if-Satz im simple present, und der Hauptsatz nimmt can/will/should + Infinitiv.",
      mistakes: {
        "I would learned useful skills.": "would learned ist keine richtige Form: Nach would steht immer der Infinitiv learn. Ausserdem waere would type 2, hier ist die Situation realistisch.",
        "I had learned useful skills.": "had learned ist past perfect. Das beschreibt etwas, das frueher passiert ist, nicht eine moegliche Folge von work experience."
      }
    },
    {
      type: "GRAMMAR_CONDITIONALS",
      title: "Conditional type 2",
      prompt: "Choose the correct form.",
      sentence: "If I ___ more time, I would visit the museum.",
      options: ["had", "have", "will have"],
      answer: "had",
      ok: "Correct. Type 2 uses simple past in the if-clause: If I had ..., I would ...",
      help: "Type 2 is hypothetical: If + simple past, would/could + infinitive.",
      rule: "would visit im Hauptsatz zeigt type 2. Deshalb braucht der if-Satz simple past: If I had more time, I would visit ...",
      mistakes: {
        "have": "have ist simple present und passt zu type 1. Der Hauptsatz hat aber would visit, also brauchst du type 2: had.",
        "will have": "will steht nicht im if-Satz. Bei type 2 steht dort simple past: had."
      }
    },
    {
      type: "GRAMMAR_CONDITIONALS",
      title: "Conditional type 1 or 2",
      prompt: "Which sentence is correct?",
      sentence: "Unreal now: If I lived near Monument Valley, ...",
      options: [
        "I would take photos every day.",
        "I will took photos every day.",
        "I had taken photos every day."
      ],
      answer: "I would take photos every day.",
      ok: "Correct. Type 2: if + simple past, would + infinitive.",
      help: "Unreal now means type 2, not type 1.",
      rule: "Bei type 2 steht im if-Satz simple past und im Hauptsatz would/could + Infinitiv: If I lived ..., I would take ..."
    },
    {
      type: "GRAMMAR_CONDITIONALS",
      title: "Conditional type 3",
      prompt: "Choose the correct form.",
      sentence: "If the hikers had checked the weather, they ___ the storm.",
      options: ["would have avoided", "would avoid", "will avoid"],
      answer: "would have avoided",
      ok: "Correct. Type 3: if + past perfect, would have + past participle.",
      help: "had checked shows type 3. The result needs would have avoided.",
      rule: "Type 3 spricht ueber die Vergangenheit: If + had + past participle, would have + past participle."
    },
    {
      type: "GRAMMAR_PAST_PERFECT",
      title: "Past perfect",
      prompt: "Choose the correct form.",
      sentence: "Annie Oakley became famous after she ___ a shooting competition.",
      options: ["had won", "has won", "wins"],
      answer: "had won",
      ok: "Correct. The winning happened before she became famous.",
      help: "Past perfect shows what happened earlier in the past: had + past participle."
    },
    {
      type: "GRAMMAR_PAST_PERFECT",
      title: "Simple past or past perfect",
      prompt: "Which form shows the earlier action?",
      sentence: "Some doctors knew little because they ___ medicine before they came west.",
      options: ["had not studied", "did not study", "do not study"],
      answer: "had not studied",
      ok: "Correct. Not studying medicine happened before they came west.",
      help: "Use past perfect for the earlier past action."
    },
    {
      type: "GRAMMAR_PAST_PERFECT",
      title: "Simple past or past perfect",
      prompt: "Choose the correct form.",
      sentence: "After the travellers ___ the map, they found the old trail.",
      options: ["had studied", "study", "have studied"],
      answer: "had studied",
      ok: "Correct. Studying the map happened before they found the trail.",
      help: "after often signals the earlier action. Earlier past = had + past participle.",
      rule: "past perfect markiert die Vorvergangenheit: After they had studied ..., they found ..."
    },
    {
      stage: "u4_start",
      type: "GRAMMAR_GERUND_INF",
      title: "Gerund or infinitive",
      prompt: "Choose the correct form.",
      sentence: "Leah wants ___ how to code.",
      options: ["learning", "to learn", "learned"],
      answer: "to learn",
      ok: "Correct. want is followed by to + infinitive.",
      help: "want, hope, decide, plan, learn -> to + infinitive."
    },
    {
      stage: "u4_start",
      type: "GRAMMAR_GERUND_INF",
      title: "Gerund after preposition",
      prompt: "Choose the correct form.",
      sentence: "Russian River Teen Camp is for teenagers interested in ___ out in nature.",
      options: ["being", "to be", "be"],
      answer: "being",
      ok: "Correct. After a preposition like in, use the -ing form.",
      help: "Preposition + verb usually means -ing: interested in being, good at drawing, thinking about going."
    },
    {
      stage: "u4_start",
      type: "GRAMMAR_GERUND_INF",
      title: "Infinitive with to",
      prompt: "Choose the correct form.",
      sentence: "The blue car stopped in order ___ an accident.",
      options: ["to avoid", "avoiding", "avoid"],
      answer: "to avoid",
      ok: "Correct. in order to + infinitive expresses purpose.",
      help: "Purpose/Ziel: in order to do something."
    },
    {
      stage: "u4_start",
      type: "GRAMMAR_GERUND_INF",
      title: "Gerund or infinitive",
      prompt: "Choose the correct form.",
      sentence: "Maya enjoys ___ short animations.",
      options: ["creating", "to create", "create"],
      answer: "creating",
      ok: "Correct. enjoy is followed by -ing.",
      help: "enjoy, avoid, finish, practise, mind -> -ing."
    },
    {
      stage: "u4_start",
      type: "GRAMMAR_GERUND_INF",
      title: "Gerund or infinitive",
      prompt: "Choose the correct form.",
      sentence: "After ___ the instructions, the group started the project.",
      options: ["reading", "to read", "read"],
      answer: "reading",
      ok: "Correct. After a preposition you use the -ing form.",
      help: "after, before, without, by, for -> usually -ing."
    },
    {
      stage: "u4_start",
      type: "GRAMMAR_GERUND_INF",
      title: "Gerund or infinitive",
      prompt: "Choose the correct form.",
      sentence: "The teacher helped us ___ our ideas.",
      options: ["organize", "to organizing", "organized"],
      answer: "organize",
      ok: "Correct. help can be followed by the infinitive without to.",
      help: "make/let/help are special. help someone do something is common."
    },
    {
      stage: "u4_start",
      type: "LINKING",
      title: "Linking words",
      prompt: "Which linking word shows a reason?",
      sentence: "Many girls do not choose tech careers ___ they are told it is a boys' field.",
      options: ["because", "although", "until"],
      answer: "because",
      ok: "Right. because gives a reason.",
      help: "Ask: Is it a reason, contrast, goal or time?"
    },
    {
      stage: "u4_start",
      type: "LINKING",
      title: "Linking words",
      prompt: "Which linking phrase expresses a goal?",
      sentence: "The company created internships ___ get more girls interested in tech.",
      options: ["in order to", "although", "until"],
      answer: "in order to",
      ok: "Correct. in order to expresses purpose.",
      help: "Purpose means Ziel: in order to / so that."
    },
    {
      stage: "u4_start",
      type: "LINKING",
      title: "Linking words",
      prompt: "Which linking word shows contrast?",
      sentence: "The camp was expensive. ___, many students wanted to join it.",
      options: ["However", "Because", "So that"],
      answer: "However",
      ok: "Correct. however introduces a contrast.",
      help: "Contrast means Gegensatz: although, however, while."
    },
    {
      stage: "u4_start",
      type: "LINKING",
      title: "Linking words",
      prompt: "Which phrase expresses a precaution?",
      sentence: "Take notes ___ you forget the details later.",
      options: ["in case", "although", "until"],
      answer: "in case",
      ok: "Correct. in case means falls/fuer den Fall, dass.",
      help: "in case is used when something might happen and you prepare for it."
    },
    {
      stage: "u4_start",
      type: "LINKING",
      title: "Linking words",
      prompt: "Which word shows time?",
      sentence: "Actors often stay in L.A. ___ they are discovered.",
      options: ["until", "because", "although"],
      answer: "until",
      ok: "Correct. until means bis.",
      help: "Ask what relationship is needed: time, reason, contrast, purpose or precaution."
    },
    {
      stage: "u4_start",
      type: "LINKING",
      title: "Linking words",
      prompt: "Which phrase shows result?",
      sentence: "The place was ___ beautiful ___ I wanted to stay longer.",
      options: ["so ... that", "in order to", "in case"],
      answer: "so ... that",
      ok: "Correct. so ... that shows a result.",
      help: "Result/Folge: so ... that or such ... that."
    },
    {
      type: "READING_EVIDENCE",
      title: "Answer with evidence",
      prompt: "What must you write next to a reading/listening answer?",
      sentence: "Do not just guess A, B or C.",
      options: ["a key word or short evidence", "a German translation of everything", "nothing"],
      answer: "a key word or short evidence",
      ok: "Exactly. Evidence makes the answer safer and reduces guessing.",
      help: "Every answer needs a tiny proof: one keyword is enough."
    },
    {
      type: "READING_EVIDENCE",
      title: "Reading strategy",
      prompt: "What is the safest first step?",
      sentence: "The question asks why a character changes her opinion.",
      options: ["underline the reason words", "translate every word", "write the first idea immediately"],
      answer: "underline the reason words",
      ok: "Yes. Reason words lead you to the evidence.",
      help: "Do not start with the answer. Start with the job: why, how, who, where, what evidence?"
    },
    {
      type: "READING_EVIDENCE",
      title: "U3 reading: true/false",
      prompt: "What is the safest way to solve a true/false task?",
      sentence: "Statement: The internship was only for adults.",
      options: [
        "find the sentence about age or teenagers first",
        "choose false because it sounds unlikely",
        "translate the headline only"
      ],
      answer: "find the sentence about age or teenagers first",
      ok: "Correct. True/false needs evidence from the text.",
      help: "Decode the statement: internship + only + adults. Then search for age words.",
      rule: "Bei true/false entscheidest du nie nach Gefuehl. Markiere das Schluesselwort und suche die Belegstelle."
    },
    {
      type: "READING_EVIDENCE",
      title: "U3 reading: paragraph matching",
      prompt: "Which heading fits this paragraph idea?",
      sentence: "A paragraph explains how young people learn practical skills and meet people from different jobs.",
      options: ["Work experience for teenagers", "Weather in the desert", "A famous gunfight"],
      answer: "Work experience for teenagers",
      ok: "Correct. skills, young people and jobs point to work experience.",
      help: "Do not match single words only. Match the main idea of the paragraph.",
      rule: "Matching: Absatzidee kurz benennen, dann die Ueberschrift waehlen, die dieselbe Idee ausdrueckt."
    },
    {
      stage: "text_smart",
      type: "GENRE_READING",
      title: "Genre",
      prompt: "Which genre fits best?",
      sentence: "A detective follows clues after a valuable object disappears.",
      options: ["crime", "romance", "travel fiction"],
      answer: "crime",
      ok: "Correct. Clues, detectives and a disappearance point to crime.",
      help: "Look for genre signals: setting, problem, characters, typical objects."
    },
    {
      stage: "text_smart",
      type: "GENRE_READING",
      title: "Atmosphere",
      prompt: "Which words create suspense?",
      sentence: "Dark clouds, empty street, stared, scared, walked faster.",
      options: ["dark / empty / stared / scared", "street / walked / clouds", "faster / clouds / street"],
      answer: "dark / empty / stared / scared",
      ok: "Right. These words build danger and tension.",
      help: "Suspense words often point to fear, darkness, silence, danger or uncertain movement."
    },
    {
      stage: "text_smart",
      type: "GENRE_READING",
      title: "Compare texts",
      prompt: "What should you compare first?",
      sentence: "Two short fictional texts describe the same city scene differently.",
      options: ["atmosphere and character description", "only the number of words", "only the headline"],
      answer: "atmosphere and character description",
      ok: "Good. Those categories quickly show how the texts differ.",
      help: "Use a grid: setting, atmosphere, people, clothes, action, body language."
    },
    {
      type: "WRITING_STRUCTURE",
      title: "Writing structure",
      prompt: "Which order is best for a short internship report?",
      sentence: "Write about a work experience programme.",
      options: [
        "where/when - tasks - what I learned - short opinion",
        "example - conclusion - random idea - opinion",
        "German notes - one English sentence"
      ],
      answer: "where/when - tasks - what I learned - short opinion",
      ok: "Yes. This gives a clear report structure.",
      help: "Use simple blocks: place/time, tasks, learning, opinion.",
      rule: "Report writing braucht Ordnung: I worked at ..., My tasks were ..., I learned ..., In my opinion ..."
    },
    {
      type: "WRITING_STRUCTURE",
      title: "U3 internship report",
      prompt: "Which detail makes the report stronger?",
      sentence: "My internship experience was with the Mob Museum in Las Vegas.",
      options: [
        "I worked 3 days a week and learned how to put together an exhibit.",
        "It was nice and good and I liked it.",
        "There were many things and people."
      ],
      answer: "I worked 3 days a week and learned how to put together an exhibit.",
      ok: "Correct. A good report gives concrete tasks and what the writer learned.",
      help: "The model solutions give place, time, tasks, difficulties, learning and a short career thought.",
      rule: "Ein guter report ist konkret: where/when, tasks, one difficulty, what I learned, opinion or future idea."
    },
    {
      type: "WRITING_PHRASES",
      title: "Useful phrase: report opening",
      prompt: "Which opening fits an internship report best?",
      sentence: "You write about work experience in New Mexico.",
      options: [
        "My internship experience was with a company in New Mexico called New Mexico Adventure Bike Tours.",
        "Hello everybody, this is my random text.",
        "I was there and it was very nice."
      ],
      answer: "My internship experience was with a company in New Mexico called New Mexico Adventure Bike Tours.",
      ok: "Correct. It names the text type, place and organisation clearly.",
      help: "Start a report by answering where and with whom. Avoid vague openings like it was nice.",
      rule: "Report opening: My internship experience was with ... / I worked at ... / It was a unique internship because ..."
    },
    {
      type: "WRITING_PHRASES",
      title: "Useful phrase: tasks",
      prompt: "Which phrase introduces tasks clearly?",
      sentence: "You want to explain what you did during an internship.",
      options: [
        "My main task was writing social media posts.",
        "There were some things.",
        "I had stuff to do."
      ],
      answer: "My main task was writing social media posts.",
      ok: "Correct. My main task was ... is clear and sounds like the model solutions.",
      help: "A good writing answer replaces stuff/things with exact tasks.",
      rule: "Useful task phrases: My main task was ... / I also helped ... / I spent a lot of time ... / I had to ..."
    },
    {
      type: "WRITING_PHRASES",
      title: "Useful phrase: opinion",
      prompt: "Which sentence gives an opinion with a reason?",
      sentence: "You write about whether the internship helped you.",
      options: [
        "It was a great experience for me because I got very good at writing online posts.",
        "It was great.",
        "I do not know what to say."
      ],
      answer: "It was a great experience for me because I got very good at writing online posts.",
      ok: "Correct. It gives an opinion and explains it with because.",
      help: "The teacher can reward the idea better when the reason is attached.",
      rule: "Opinion + reason: It was a great experience because ... / I liked it because ... / I found it difficult because ..."
    },
    {
      type: "WRITING_PHRASES",
      title: "Useful phrase: mediation",
      prompt: "Which sentence fits the start of a mediation message?",
      sentence: "A friend asks about visiting a national park.",
      options: [
        "You asked me recently about national parks in Germany.",
        "This text is German and I translate it.",
        "There are words in the article."
      ],
      answer: "You asked me recently about national parks in Germany.",
      ok: "Correct. It answers the friend's situation and starts naturally.",
      help: "Mediation starts with audience and purpose, not with a translation comment.",
      rule: "Mediation opening: You asked me about ... / I found some useful information about ... / I think the place you might enjoy most is ..."
    },
    {
      type: "WRITING_PHRASES",
      title: "Useful phrase: contrast",
      prompt: "Which sentence links a difficulty and a positive result well?",
      sentence: "You write about giving presentations during an internship.",
      options: [
        "It was hard to remember all the details, but I got a lot of positive feedback.",
        "It was hard. Feedback.",
        "Because it was hard, but feedback."
      ],
      answer: "It was hard to remember all the details, but I got a lot of positive feedback.",
      ok: "Correct. but connects difficulty and positive result in one clear sentence.",
      help: "Use but/however to show two sides of the experience.",
      rule: "Contrast in writing: It was hard to ..., but ... / However, ... / At first ..., but after ..."
    },
    {
      type: "WRITING_PHRASES",
      title: "Idiomatic phrase",
      prompt: "Which phrase is useful and natural in a report?",
      sentence: "You want to say that you may improve later.",
      options: [
        "I will get better at it over time.",
        "I become good maybe sometime.",
        "I make better in the time."
      ],
      answer: "I will get better at it over time.",
      ok: "Correct. get better at it over time is a useful idiomatic chunk.",
      help: "Learn chunks, not single words: get better at something, over time.",
      rule: "Useful idioms/chunks: get better at it over time; get the chance; make me want to; work out; in front of a group."
    },
    {
      type: "WRITING_GRAMMAR",
      title: "Grammar for writing: past perfect",
      prompt: "Which sentence uses past perfect correctly?",
      sentence: "Eating in the dark: first they gave away their phones, then they were led to the table.",
      options: [
        "Once we had done that, we were led to our table.",
        "Once we did that, we had were led to our table.",
        "Once we have done that, we were lead to our table."
      ],
      answer: "Once we had done that, we were led to our table.",
      ok: "Correct. had done shows what happened before they were led to the table.",
      help: "Use past perfect when you tell what had already happened before the next past action.",
      rule: "Writing-Grammatik: past perfect = had + past participle. It helps make the order of events clear."
    },
    {
      type: "WRITING_GRAMMAR",
      title: "Grammar for writing: conditional 2",
      prompt: "Which sentence sounds like the U3 internship model?",
      sentence: "You imagine a possible internship.",
      options: [
        "If I could do an internship anywhere, I would choose to work at a museum.",
        "If I can did an internship, I would chose a museum.",
        "If I had do an internship, I will choose a museum."
      ],
      answer: "If I could do an internship anywhere, I would choose to work at a museum.",
      ok: "Correct. This is conditional 2 for an imagined situation.",
      help: "For imagined choices, use if + simple past/could and would + infinitive.",
      rule: "Conditional 2 in writing: If I could ..., I would ... / If I got ..., I would ... / If I had ..., I would ..."
    },
    {
      type: "WRITING_GRAMMAR",
      title: "Grammar for writing: conditional 3",
      prompt: "Which sentence reflects on a past situation correctly?",
      sentence: "Tayen did not go hiking much because it was too hot.",
      options: [
        "If it had not been so hot, Tayen would have gone hiking more often.",
        "If it was not so hot, Tayen will have gone hiking.",
        "If it had not so hot, Tayen would went hiking."
      ],
      answer: "If it had not been so hot, Tayen would have gone hiking more often.",
      ok: "Correct. This is conditional 3: past situation, different possible result.",
      help: "Use conditional 3 to reflect on something that did not happen in the past.",
      rule: "Conditional 3 in writing: If + had + past participle, would have + past participle."
    },
    {
      type: "WRITING_GRAMMAR",
      title: "Grammar for writing: linking",
      prompt: "Which linking word fits the model texts?",
      sentence: "I was nervous at first. ___, after we had finished eating, we couldn't stop talking.",
      options: ["However", "Because", "In order to"],
      answer: "However",
      ok: "Correct. However shows a contrast between nervous at first and later talking.",
      help: "Choose linking words by function: reason, contrast, purpose, time or result.",
      rule: "Useful linking: because = reason, however/but = contrast, so = result, in order to = purpose, after/once = time."
    },
    {
      type: "WRITING_STRUCTURE",
      title: "Mediation / short answer",
      prompt: "What makes a short answer strong?",
      sentence: "You have to explain information from a text to a friend.",
      options: ["short, clear, relevant information", "every detail in the same order", "only single German words"],
      answer: "short, clear, relevant information",
      ok: "Correct. Select the information that fits the person and situation.",
      help: "Ask: Who needs the information? What do they need to know? Leave out decoration."
    },
    {
      type: "WRITING_STRUCTURE",
      title: "U3 writing: mediation",
      prompt: "What should you do first in a mediation task?",
      sentence: "A friend wants useful information about visiting a national park.",
      options: [
        "select the information the friend needs",
        "translate every sentence in the same order",
        "write your own opinion first"
      ],
      answer: "select the information the friend needs",
      ok: "Correct. Mediation is selecting and explaining, not word-by-word translation.",
      help: "Ask: Who is my reader? What does this person need?",
      rule: "Mediation: Zielgruppe + Zweck klaeren, relevante Informationen auswaehlen, klar auf Englisch formulieren."
    },
    {
      stage: "text_smart",
      type: "CONTINUATION_WRITING",
      title: "Continue a fictional text",
      prompt: "Which sentence continues suspense best?",
      sentence: "I turned around again. This time the man was gone.",
      options: [
        "Then I heard footsteps behind me.",
        "The weather was nice and I bought a sandwich.",
        "My favourite subject is maths."
      ],
      answer: "Then I heard footsteps behind me.",
      ok: "Yes. It keeps the danger and movement alive.",
      help: "A continuation must match atmosphere, tense, narrator and genre."
    },
    {
      stage: "text_smart",
      type: "CONTINUATION_WRITING",
      title: "Continue a fictional text",
      prompt: "What must stay consistent?",
      sentence: "The text is written in first person past tense.",
      options: ["I-perspective and past tense", "future tense and third person", "bullet points"],
      answer: "I-perspective and past tense",
      ok: "Correct. Consistency is more important than a wild plot twist.",
      help: "Before writing, mark: narrator, tense, atmosphere, place, problem."
    },
    {
      stage: "u4_start",
      type: "VOCAB_FORM",
      title: "Word family",
      prompt: "Choose the correct form.",
      sentence: "My cousin wants to become a computer ___. (science)",
      options: ["scientist", "science", "scientific"],
      answer: "scientist",
      ok: "Correct. A person who works in science is a scientist.",
      help: "The gap names a person after become a. That needs the person noun scientist.",
      rule: "Nach become a braucht man hier ein Personen-Nomen. science ist das Fach, scientific ist ein Adjektiv, scientist ist die Person.",
      mistakes: {
        "science": "science ist das Fach oder Gebiet. Nach become a brauchst du aber eine Person: scientist.",
        "scientific": "scientific ist ein Adjektiv. Nach become a brauchst du hier ein Nomen fuer eine Person: scientist."
      }
    },
    {
      stage: "u4_start",
      type: "VOCAB_FORM",
      title: "Word family",
      prompt: "Choose the correct form.",
      sentence: "The ___ class was hard because the machines were complicated. (robot)",
      options: ["robotics", "robot", "robotic"],
      answer: "robotics",
      ok: "Correct. robotics names the subject or class.",
      help: "The gap names the school subject/class, not one machine.",
      rule: "robotics ist das Fach oder der Kurs. robot ist die Maschine; robotic ist ein Adjektiv wie in robotic arm.",
      mistakes: {
        "robot": "robot ist eine einzelne Maschine. Gemeint ist aber der Kurs/das Fach: robotics.",
        "robotic": "robotic ist ein Adjektiv. Vor class kann es manchmal gehen, aber im U4-Wortfamilienmuster ist der Kurs robotics class."
      }
    },
    {
      stage: "u4_start",
      type: "VOCAB_FORM",
      title: "Word family",
      prompt: "Choose the correct form.",
      sentence: "The camp was different from my ___ before I went. (expect)",
      options: ["expectations", "expect", "expected"],
      answer: "expectations",
      ok: "Correct. After my you need a noun: expectations.",
      help: "my signals a noun. expectations means what someone thought would happen.",
      rule: "Nach my braucht die Luecke ein Nomen. expectations ist das Nomen; expect ist Verb; expected ist Verbform oder Adjektiv.",
      mistakes: {
        "expect": "expect ist ein Verb. Nach my brauchst du ein Nomen: expectations.",
        "expected": "expected ist eine Verbform oder ein Adjektiv. Gemeint sind die Vorstellungen vorher: expectations."
      }
    },
    {
      type: "VOCAB_ACTIVE",
      stage: "u4_later",
      title: "Internship feedback",
      prompt: "Which phrase fits the feedback dialogue?",
      sentence: "My manager is happy because I follow ___ carefully.",
      options: ["instructions", "panic", "legal status"],
      answer: "instructions",
      ok: "Correct. You follow instructions.",
      help: "Learn this as a chunk: follow instructions.",
      rule: "In feedback-dialogues the phrase is follow instructions. panic is a feeling; legal status belongs to work permission."
    },
    {
      type: "VOCAB_ACTIVE",
      stage: "u4_later",
      title: "Internship feedback",
      prompt: "Which phrase fits best?",
      sentence: "She is from Germany and cannot accept paid work because of her ___.",
      options: ["legal status", "instructions", "customers"],
      answer: "legal status",
      ok: "Correct. legal status can prevent someone from accepting a paid job.",
      help: "Use context: paid work, student, US. That points to legal status.",
      rule: "legal status beschreibt die rechtliche Situation einer Person, z.B. ob sie arbeiten darf."
    },
    {
      type: "VOCAB_ACTIVE",
      stage: "u4_later",
      title: "Synonyms and antonyms",
      prompt: "Choose the antonym.",
      sentence: "The opposite of accepted is ___.",
      options: ["rejected", "increased", "obvious"],
      answer: "rejected",
      ok: "Correct. accept and reject are opposites.",
      help: "Antonym means opposite. accepted -> rejected.",
      rule: "Bei antonym-Aufgaben suchst du nicht ein verwandtes Thema, sondern das Gegenteil."
    },
    {
      type: "VOCAB_ACTIVE",
      stage: "u4_later",
      title: "Synonyms and antonyms",
      prompt: "Choose the phrase with a similar meaning.",
      sentence: "easy to see = ___.",
      options: ["obvious", "bilingual", "suburban"],
      answer: "obvious",
      ok: "Correct. obvious means easy to see or understand.",
      help: "Synonym means similar meaning, not same topic.",
      rule: "Bei synonym-Aufgaben pruefst du die Bedeutung im Satz: obvious = easy to see/understand."
    },
    {
      type: "VOCAB_CATEGORY",
      stage: "u4_later",
      title: "Odd one out",
      prompt: "Which word does not fit?",
      sentence: "park / countryside / suburban / urban",
      options: ["park", "countryside", "urban"],
      answer: "park",
      ok: "Correct. countryside, suburban and urban describe kinds of places; park is a specific place.",
      help: "For odd one out, explain the category first.",
      rule: "Odd-one-out braucht immer eine Begruendung: Welche drei gehoeren zusammen, und warum passt eins nicht?"
    },
    {
      type: "VOCAB_CATEGORY",
      stage: "u4_later",
      title: "British and American English",
      prompt: "Choose the American English word.",
      sentence: "BE: mobile phone. AE: ___",
      options: ["cell phone", "torch", "lift"],
      answer: "cell phone",
      ok: "Correct. In American English, mobile phone is cell phone.",
      help: "AE/BE Aufgaben fragen nach der passenden Variante, nicht nach freier Uebersetzung.",
      rule: "Lerne AE/BE paarweise: mobile phone/cell phone, lift/elevator, flat/apartment."
    },
    {
      stage: "u4_later",
      type: "GRAMMAR_GERUND_INF",
      title: "Indirect question + infinitive",
      prompt: "Which sentence reports the question correctly?",
      sentence: "Question: How many eggs should I use?",
      options: [
        "He wants to know how many eggs to use.",
        "He wants to know how many eggs use.",
        "He wants to know how many eggs using."
      ],
      answer: "He wants to know how many eggs to use.",
      ok: "Correct. Indirect question: question word + to-infinitive.",
      help: "After wants to know, use question word + to + verb.",
      rule: "Indirekte Fragen mit Infinitiv: how/where/what/whether + to + Infinitiv. Beispiel: how many eggs to use.",
      mistakes: {
        "He wants to know how many eggs use.": "Nach how many eggs fehlt der to-infinitive: to use.",
        "He wants to know how many eggs using.": "using ist hier falsch. Das Muster ist question word + to + Infinitiv: to use."
      }
    },
    {
      stage: "u4_later",
      type: "GRAMMAR_GERUND_INF",
      title: "Indirect question + infinitive",
      prompt: "Choose the correct reported question.",
      sentence: "Question: Should I make the sauce myself or buy it?",
      options: [
        "He needs to decide whether to make the sauce himself or buy it.",
        "He needs to decide whether making the sauce himself or buy it.",
        "He needs to decide whether he to make the sauce himself."
      ],
      answer: "He needs to decide whether to make the sauce himself or buy it.",
      ok: "Correct. whether + to-infinitive reports a yes/no choice.",
      help: "For should I ... or ..., use whether to ... or ...",
      rule: "Bei Entscheidungsfragen passt whether + to + Infinitiv: whether to make ... or buy ..."
    },
    {
      stage: "u4_later",
      type: "GRAMMAR_GERUND_INF",
      title: "Superlative + infinitive",
      prompt: "Choose the correct sentence.",
      sentence: "Sequoia National Park / one of the first national parks / create",
      options: [
        "Sequoia was one of the first national parks to be created.",
        "Sequoia was one of the first national parks creating.",
        "Sequoia was one of the first national parks to created."
      ],
      answer: "Sequoia was one of the first national parks to be created.",
      ok: "Correct. After one of the first, use to be + past participle for passive meaning.",
      help: "Superlative/first/only + noun is often followed by a to-infinitive.",
      rule: "Nach the first/the only/the best place kann ein to-infinitive folgen: the best place to learn, the first park to be created.",
      mistakes: {
        "Sequoia was one of the first national parks creating.": "creating macht den Park aktiv. Gemeint ist passiv: der Park wurde geschaffen, also to be created.",
        "Sequoia was one of the first national parks to created.": "Nach to steht der Infinitiv. Fuer Passiv brauchst du to be created."
      }
    },
    {
      stage: "u4_later",
      type: "GRAMMAR_GERUND_INF",
      title: "Object + infinitive",
      prompt: "Which rewrite is correct?",
      sentence: "Director: Keep people out of the shot.",
      options: [
        "I want you to keep people out of the shot.",
        "I want you keep people out of the shot.",
        "I want that you keeping people out of the shot."
      ],
      answer: "I want you to keep people out of the shot.",
      ok: "Correct. want + object + to-infinitive.",
      help: "I want/expect/would like + person + to + verb.",
      rule: "Bei want/expect/would like mit Objekt: I want you to keep..., I expect you to be..., I would like you to help..."
    },
    {
      stage: "u4_later",
      type: "GRAMMAR_GERUND_INF",
      title: "Infinitive with or without to",
      prompt: "Choose the correct form.",
      sentence: "Let me ___ your phone number before you go.",
      options: ["write down", "to write down", "writing down"],
      answer: "write down",
      ok: "Correct. After let me, use the infinitive without to.",
      help: "let + object + infinitive without to.",
      rule: "Nach let/make/help kann der Infinitiv ohne to stehen: let me write, make him wait, help her carry."
    },
    {
      type: "LINKING",
      stage: "u4_later",
      title: "Adverbial clauses",
      prompt: "Which linking word fits?",
      sentence: "Actors may choose rural homes ___ their children can have more privacy.",
      options: ["so that", "until", "such ... that"],
      answer: "so that",
      ok: "Correct. so that expresses purpose.",
      help: "Ask: Is the clause a goal, time limit or result?",
      rule: "so that + subject + verb zeigt ein Ziel: damit jemand etwas tun/kann."
    },
    {
      type: "LINKING",
      stage: "u4_later",
      title: "Adverbial clauses",
      prompt: "Which linking phrase fits?",
      sentence: "They went to ___ many auditions ___ it was easier to live in L.A.",
      options: ["so ... that", "in order to", "until"],
      answer: "so ... that",
      ok: "Correct. so many ... that shows result.",
      help: "so ... that links intensity and result.",
      rule: "Resultat: so + adjective/adverb/many/much + that. Bei Nomen mit adjective oft such ... that."
    },
    {
      type: "READING_EVIDENCE",
      title: "Reading: paragraph matching",
      prompt: "Which strategy prepares matching tasks best?",
      sentence: "A reading task gives headings and paragraph letters A-E.",
      options: [
        "mark one key idea in each paragraph",
        "translate the whole text first",
        "choose the shortest paragraph"
      ],
      answer: "mark one key idea in each paragraph",
      ok: "Correct. Matching tasks are solved by paragraph key ideas.",
      help: "Read for the main idea first, not every detail.",
      rule: "Bei matching-Aufgaben: pro Absatz eine Hauptidee markieren, dann erst Antwortoptionen vergleichen."
    },
    {
      type: "READING_EVIDENCE",
      title: "Reading: short answer",
      prompt: "Which answer format is safest?",
      sentence: "Question: Why did she change her opinion about camp?",
      options: [
        "because she had new positive experiences there",
        "camp",
        "I think it is nice"
      ],
      answer: "because she had new positive experiences there",
      ok: "Correct. The answer gives a reason, not just a topic.",
      help: "For why-questions, answer with because + reason.",
      rule: "Fragewort entscheidet Antwortform: why -> reason, how -> way/process, what -> fact, who -> person."
    },
    {
      type: "WRITING_STRUCTURE",
      stage: "u4_later",
      title: "Mediation",
      prompt: "What is the best first sentence for a presentation mediation?",
      sentence: "You explain a German brand story to exchange students.",
      options: [
        "In my presentation, I am going to explain how the brand became successful in the US.",
        "The text is long and German.",
        "I cannot translate everything."
      ],
      answer: "In my presentation, I am going to explain how the brand became successful in the US.",
      ok: "Correct. It names audience, topic and purpose clearly.",
      help: "Mediation is not word-by-word translation. Select useful information for the audience.",
      rule: "Mediation: Zielgruppe klaeren, relevante Informationen auswaehlen, klar und knapp auf Englisch formulieren."
    },
    {
      type: "WRITING_STRUCTURE",
      stage: "u4_later",
      title: "Writing: California argument",
      prompt: "Which sentence starts a balanced paragraph well?",
      sentence: "Topic: the different sides of life in California.",
      options: [
        "California offers many opportunities, but it also has serious problems.",
        "California is California and I like it.",
        "There are people and things."
      ],
      answer: "California offers many opportunities, but it also has serious problems.",
      ok: "Correct. It opens a balanced argument.",
      help: "A strong opening sentence names both sides if the task asks for a balanced view.",
      rule: "Argument writing: claim -> reason -> example -> result/contrast. Useful contrast: but, however, on the other hand."
    }
  ],
  math: [
    {
      type: "FUNCTION_RULE",
      title: "Funktion erkennen",
      prompt: "Welche Regel ist richtig?",
      sentence: "Eine Zuordnung ist eine Funktion, wenn ...",
      options: [
        "jedem x-Wert genau ein y-Wert zugeordnet ist",
        "jeder y-Wert nur einmal vorkommt",
        "immer eine gerade Linie entsteht"
      ],
      answer: "jedem x-Wert genau ein y-Wert zugeordnet ist",
      ok: "Richtig. Der Blick geht vom x-Wert aus: Jeder x-Wert darf genau einen y-Wert haben.",
      help: "Mehrere x-Werte duerfen denselben y-Wert haben. Kritisch ist nur: Ein x darf nicht zwei verschiedene y-Werte haben."
    },
    {
      type: "FUNCTION_RULE",
      title: "Pfeildiagramm",
      prompt: "Ist das eine Funktion?",
      sentence: "1 -> 4, 2 -> 4, 3 -> 4",
      options: ["Ja", "Nein", "Nur wenn 4 groesser ist als 3"],
      answer: "Ja",
      ok: "Genau. Jeder linke Wert hat genau einen Pfeil. Dass rechts dreimal die 4 steht, ist erlaubt.",
      help: "Pruefe die linken Werte. Von jedem linken Wert darf genau ein Pfeil ausgehen."
    },
    {
      type: "POINT_CHECK",
      title: "Punktprobe",
      prompt: "Welcher Antwortsatz passt?",
      sentence: "P(2 | 7), y = 3x + 1. Rechnung: 3 · 2 + 1 = 7.",
      options: [
        "Ja, P liegt auf dem Graphen, weil der berechnete y-Wert 7 ist.",
        "Das ist eine proportionale Funktion.",
        "x ist 7 und y ist 2."
      ],
      answer: "Ja, P liegt auf dem Graphen, weil der berechnete y-Wert 7 ist.",
      ok: "Richtig. Der Satz beantwortet genau die Frage: Liegt der Punkt auf dem Graphen?",
      help: "Nach einer Punktprobe immer schreiben: Der Punkt liegt / liegt nicht auf dem Graphen, weil ..."
    },
    {
      type: "POINT_CHECK",
      title: "Punktprobe",
      prompt: "Liegt der Punkt auf dem Graphen?",
      sentence: "P(4 | 8), y = 2x - 1",
      options: ["Nein, denn 2 · 4 - 1 = 7.", "Ja, denn 2 · 4 - 1 = 8.", "Ja, weil 4 kleiner als 8 ist."],
      answer: "Nein, denn 2 · 4 - 1 = 7.",
      ok: "Richtig. Der berechnete y-Wert ist 7, der Punkt hat aber y = 8.",
      help: "Setze nur den x-Wert ein. Danach vergleichst du mit dem y-Wert des Punktes."
    },
    {
      type: "POINT_CHECK",
      title: "Aussage pruefen",
      prompt: "Ist die Aussage wahr?",
      sentence: "Badewanne: y = -12x + 150. Aussage: Nach 5 Minuten sind noch 90 l Wasser in der Badewanne.",
      options: ["Wahr, denn -12 · 5 + 150 = 90.", "Falsch, denn -12 · 5 + 150 = 145.", "Wahr, weil 150 groesser als 90 ist."],
      answer: "Wahr, denn -12 · 5 + 150 = 90.",
      ok: "Genau. Du hast x = 5 eingesetzt und den y-Wert verglichen.",
      help: "Aussagen zu Funktionen pruefst du wie eine Punktprobe: x einsetzen, y berechnen, Aussage vergleichen."
    },
    {
      type: "POINT_CHECK",
      title: "Aussage pruefen",
      prompt: "Ist die Aussage wahr?",
      sentence: "Badewanne: y = -12x + 150. Aussage: Nach 12 Minuten ist die Badewanne leer.",
      options: ["Falsch, denn -12 · 12 + 150 = 6.", "Wahr, denn 12 Minuten sind viel.", "Wahr, denn -12 ist negativ."],
      answer: "Falsch, denn -12 · 12 + 150 = 6.",
      ok: "Richtig. Nach 12 Minuten sind noch 6 l da, also ist die Badewanne nicht leer.",
      help: "Leer bedeutet y = 0. Berechne zuerst den y-Wert."
    },
    {
      type: "LINEAR_DECODER",
      title: "Textaufgabe decodieren",
      prompt: "Was ist der Startwert?",
      sentence: "Ein Taxi kostet 4 Euro Grundgebuehr und 2 Euro pro Kilometer.",
      options: ["4 Euro", "2 Euro", "1 Kilometer"],
      answer: "4 Euro",
      ok: "Richtig. Die Grundgebuehr ist der Startwert b.",
      help: "Suche nach Grundpreis, Anfangswert oder Start. Das ist meistens b."
    },
    {
      type: "LINEAR_DECODER",
      title: "Einheiten decodieren",
      prompt: "Welche Steigung pro Minute passt?",
      sentence: "Der Wasserstand steigt um 1 cm in 10 Minuten.",
      options: ["0,1 cm pro Minute", "10 cm pro Minute", "1 cm pro Minute"],
      answer: "0,1 cm pro Minute",
      ok: "Ja. 1 cm in 10 Minuten bedeutet 0,1 cm in 1 Minute.",
      help: "Wenn x Minuten bedeutet, brauchst du die Veraenderung pro 1 Minute."
    },
    {
      type: "LINEAR_DECODER",
      title: "Textaufgabe decodieren",
      prompt: "Was ist die Steigung?",
      sentence: "Eine Kerze ist 18 cm lang und wird pro Stunde 1,5 cm kuerzer.",
      options: ["-1,5 cm pro Stunde", "18 cm", "4 Stunden"],
      answer: "-1,5 cm pro Stunde",
      ok: "Ja. Kuerzer bedeutet Abnahme, also negative Steigung.",
      help: "Pro Stunde/pro km/pro Monat zeigt die Veraenderung pro Schritt. Bei Abnahme ist sie negativ."
    },
    {
      type: "LINEAR_CONTEXT",
      title: "Bedeutung im Kontext",
      prompt: "Was bedeutet x?",
      sentence: "Erdbeerpackungen kosten 3,50 Euro pro Packung. y = 3,5x",
      options: ["Anzahl der Packungen", "Gesamtpreis in Euro", "Preis pro Packung"],
      answer: "Anzahl der Packungen",
      ok: "Genau. x ist die Anzahl der Packungen, die du kaufst.",
      help: "x ist meist die Eingabe: Anzahl, Zeit, Strecke oder Menge."
    },
    {
      type: "LINEAR_CONTEXT",
      title: "Bedeutung im Kontext",
      prompt: "Was bedeutet y?",
      sentence: "Erdbeerpackungen kosten 3,50 Euro pro Packung. y = 3,5x",
      options: ["Gesamtpreis in Euro", "Anzahl der Packungen", "Preis pro Packung"],
      answer: "Gesamtpreis in Euro",
      ok: "Richtig. y ist hier der Gesamtpreis.",
      help: "y ist das Ergebnis, das aus x berechnet wird."
    },
    {
      type: "LINEAR_CONTEXT",
      title: "Bedeutung im Kontext",
      prompt: "Welche Gleichung passt?",
      sentence: "Ein Regenfass ist 50 cm gefuellt. Der Wasserstand steigt um 1 cm in 10 Minuten. x ist die Zeit in Minuten.",
      options: ["y = 0,1x + 50", "y = 10x + 1", "y = 50x + 0,1"],
      answer: "y = 0,1x + 50",
      ok: "Richtig. Startwert 50, Steigung 0,1 cm pro Minute.",
      help: "Erst Startwert finden, dann die Veraenderung auf pro 1 Minute umrechnen."
    },
    {
      type: "LINEAR_EQUATION",
      title: "Gleichung verstehen",
      prompt: "Welche Bedeutung hat b in y = mx + b?",
      sentence: "y = 3x + 5",
      options: ["Startwert", "Steigung", "x-Wert"],
      answer: "Startwert",
      ok: "Genau. b ist der Startwert, hier 5.",
      help: "In y = mx + b steht b hinten und zeigt den Anfangswert."
    },
    {
      type: "LINEAR_EQUATION",
      title: "Gleichung aufstellen",
      prompt: "Welche Gleichung passt?",
      sentence: "Startwert 10, pro Woche kommen 4 dazu.",
      options: ["y = 4x + 10", "y = 10x + 4", "y = 4x - 10"],
      answer: "y = 4x + 10",
      ok: "Richtig. 4 ist die Veraenderung pro Woche, 10 ist der Startwert.",
      help: "Erst Steigung m finden, dann Startwert b: y = m x + b."
    },
    {
      type: "LINEAR_VALUE",
      title: "Wert berechnen",
      prompt: "Was ist y fuer x = 6?",
      sentence: "y = 2x + 3",
      options: ["15", "11", "12"],
      answer: "15",
      ok: "Richtig. y = 2 · 6 + 3 = 15.",
      help: "Setze x ein: 2 mal x plus 3."
    },
    {
      type: "LINEAR_GRAPH",
      title: "Graph verstehen",
      prompt: "Was bedeutet positive Steigung?",
      sentence: "Die Gerade steigt von links nach rechts.",
      options: ["y wird groesser", "y wird kleiner", "x bleibt immer 0"],
      answer: "y wird groesser",
      ok: "Ja. Positive Steigung bedeutet: Wenn x groesser wird, wird y groesser.",
      help: "Steigt die Gerade nach rechts, ist m positiv."
    },
    {
      type: "LINEAR_GRAPH",
      title: "Steigungsschritt erkennen",
      prompt: "Welche Strategie passt zu dieser Steigung?",
      sentence: "g(x) = -0,5x + 1",
      options: [
        "Start bei 1, dann 2 nach rechts und 1 nach unten",
        "Start bei -0,5, dann 1 nach oben",
        "Start bei 1, dann 2 nach links und 1 nach oben"
      ],
      answer: "Start bei 1, dann 2 nach rechts und 1 nach unten",
      ok: "Genau. -0,5 bedeutet -1/2: 2 nach rechts, 1 nach unten.",
      help: "b ist der Start auf der y-Achse. Die App fragt nur die Strategie ab; gezeichnet wird auf Papier."
    },
    {
      type: "LINEAR_GRAPH",
      title: "Koordinaten",
      prompt: "Wie liest du P(3 | -2)?",
      sentence: "Ein Punkt hat immer die Reihenfolge (x | y).",
      options: ["3 nach rechts, 2 nach unten", "2 nach rechts, 3 nach oben", "3 nach unten, 2 nach rechts"],
      answer: "3 nach rechts, 2 nach unten",
      ok: "Richtig. Erst x, dann y.",
      help: "Merksatz: Erst laufen, dann steigen oder fallen."
    },
    {
      type: "LINEAR_CONTEXT",
      title: "Kontext erklären",
      prompt: "Welcher Antwortsatz passt?",
      sentence: "Eine Kerze ist nach 4 Stunden noch 12 cm lang.",
      options: [
        "Nach 4 Stunden ist die Kerze 12 cm lang.",
        "x ist 12 und fertig.",
        "Die Kerze kostet 12 Euro."
      ],
      answer: "Nach 4 Stunden ist die Kerze 12 cm lang.",
      ok: "Richtig. Der Antwortsatz nennt Zeit, Ergebnis und Einheit.",
      help: "In Textaufgaben reicht die Zahl nicht. Schreibe einen Satz mit Einheit."
    },
    {
      type: "DARLEGEN",
      title: "Operator darlegen",
      prompt: "Welche Antwort erfuellt 'Lege deinen Loesungsweg dar'?",
      sentence: "Wie viel kosten 5 Broetchen zu je 0,50 Euro?",
      options: [
        "2,50 Euro",
        "5 · 0,5 = 2,5. Antwort: 2,50 Euro.",
        "5"
      ],
      answer: "5 · 0,5 = 2,5. Antwort: 2,50 Euro.",
      ok: "Richtig. Ein knapper Rechenweg plus Antwortsatz mit Einheit reicht.",
      help: "Darlegen bedeutet: Ansatz, Rechnung, Antwortsatz. Das Ergebnis allein ist zu knapp."
    },
    {
      type: "DARLEGEN",
      title: "Lineare Funktion darlegen",
      prompt: "Welche Loesung ist vollstaendig genug?",
      sentence: "y = 0,1x + 50. Berechne den Wasserstand nach 30 Minuten.",
      options: [
        "53",
        "y = 0,1 · 30 + 50 = 53. Antwort: Nach 30 Minuten steht das Wasser 53 cm hoch.",
        "0,1x + 50"
      ],
      answer: "y = 0,1 · 30 + 50 = 53. Antwort: Nach 30 Minuten steht das Wasser 53 cm hoch.",
      ok: "Genau. x wurde eingesetzt, gerechnet und im Kontext beantwortet.",
      help: "Bei linearen Funktionen: x klaeren, einsetzen oder aufstellen, dann Antwortsatz mit Kontext und Einheit."
    },
    {
      type: "DARLEGEN",
      title: "Graph-Strategie darlegen",
      prompt: "Welche Notiz bereitet die Papierzeichnung richtig vor?",
      sentence: "g(x) = -0,5x + 1",
      options: [
        "b = 1, m = -0,5 = -1/2; Start (0 | 1), dann 2 nach rechts und 1 nach unten.",
        "Die Gerade ist fertig.",
        "x ist immer 1."
      ],
      answer: "b = 1, m = -0,5 = -1/2; Start (0 | 1), dann 2 nach rechts und 1 nach unten.",
      ok: "Richtig. Das ist die Strategie; die Zeichnung wird danach auf Papier geuebt.",
      help: "Die App bewertet keine Freihandzeichnung. Sie trainiert Startwert, Steigung und Kontrollpunkte."
    }
  ]
};

const englishU3ExpansionTasks = [
  {
    type: "VOCAB_ACTIVE",
    title: "U3 school and work",
    prompt: "Which word best completes the sentence?",
    sentence: "In ___, students learn how people live together in a society.",
    options: ["social studies", "spring break", "pressure"],
    answer: "social studies",
    ok: "Correct. social studies is the school subject about society and relationships.",
    help: "The clue is learn how people live together in a society.",
    rule: "social studies ist ein Schulfach. Nicht mit social media verwechseln."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 school and work",
    prompt: "Which word best completes the sentence?",
    sentence: "Many American students have one week without classes during ___.",
    options: ["spring break", "social studies", "retire"],
    answer: "spring break",
    ok: "Correct. spring break is a short school holiday in spring.",
    help: "The clue is one week without classes.",
    rule: "spring break ist die Ferienwoche im Fruehjahr."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 school and work",
    prompt: "Which word best completes the sentence?",
    sentence: "People usually ___ when they finish their professional career.",
    options: ["retire", "struggle", "attract"],
    answer: "retire",
    ok: "Correct. retire means to stop working at the end of a career.",
    help: "The clue is finish their professional career.",
    rule: "retire ist ein Verb: retire from a job / retire at 65."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 people in the West",
    prompt: "Which person is described?",
    sentence: "This person works underground or in rocks to find gold, silver or other materials.",
    options: ["miner", "judge", "dentist"],
    answer: "miner",
    ok: "Correct. A miner works in a mine and looks for valuable materials.",
    help: "The clue is gold, silver or other materials.",
    rule: "mine = Bergwerk; miner = Person, die in einer Mine arbeitet."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 people in the West",
    prompt: "Which person is described?",
    sentence: "This person treats people's teeth.",
    options: ["dentist", "smuggler", "rancher"],
    answer: "dentist",
    ok: "Correct. A dentist treats teeth.",
    help: "The clue is teeth.",
    rule: "dentist ist eine Person. tooth/teeth gehoeren zum Bedeutungsfeld."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 people in the West",
    prompt: "Which person is described?",
    sentence: "This person brings goods into a country illegally.",
    options: ["smuggler", "policeman", "rider"],
    answer: "smuggler",
    ok: "Correct. A smuggler transports things illegally.",
    help: "The clue is illegally.",
    rule: "smuggler gehoert zum Wortfeld crime/law."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 people in the West",
    prompt: "Which person is described?",
    sentence: "This person has done something against the law.",
    options: ["criminal", "judge", "witness"],
    answer: "criminal",
    ok: "Correct. A criminal has committed a crime.",
    help: "The clue is against the law.",
    rule: "criminal = Taeter/in oder kriminelle Person; crime = Verbrechen."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 people in the West",
    prompt: "Which person is described?",
    sentence: "This person decides in court whether someone is guilty.",
    options: ["judge", "rancher", "miner"],
    answer: "judge",
    ok: "Correct. A judge makes decisions in court.",
    help: "The clue is court and guilty.",
    rule: "judge gehoert zum Wortfeld law/court."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 Tombstone",
    prompt: "Which word best completes the sentence?",
    sentence: "Tombstone is close to the ___ border.",
    options: ["Mexican", "scandalous", "unimportant"],
    answer: "Mexican",
    ok: "Correct. Mexican describes the border with Mexico.",
    help: "The clue is border.",
    rule: "Mexican ist hier ein Adjektiv: the Mexican border."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 Tombstone",
    prompt: "Which word best completes the sentence?",
    sentence: "A ___ is a place where people can be safe from danger or bad weather.",
    options: ["shelter", "gunfight", "novel"],
    answer: "shelter",
    ok: "Correct. A shelter is a safe place.",
    help: "The clue is safe from danger or bad weather.",
    rule: "shelter kann Schutz oder Unterkunft bedeuten."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 Tombstone",
    prompt: "Which word best completes the sentence?",
    sentence: "A tourist show with actors in old clothes can be called a ___.",
    options: ["living history show", "territory", "crater"],
    answer: "living history show",
    ok: "Correct. A living history show presents history with actors.",
    help: "The clues are tourist show, actors and old clothes.",
    rule: "living history show als ganzer Chunk lernen."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 Tombstone",
    prompt: "Which word best completes the sentence?",
    sentence: "Museums and shows ___ thousands of visitors every year.",
    options: ["attract", "regret", "contradict"],
    answer: "attract",
    ok: "Correct. attract visitors means bring visitors to a place.",
    help: "The clue is visitors every year.",
    rule: "attract ist ein Verb: a place attracts tourists."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 Tombstone",
    prompt: "Which word best completes the sentence?",
    sentence: "Stories about crime and shocking behaviour can sound ___.",
    options: ["scandalous", "southern", "geological"],
    answer: "scandalous",
    ok: "Correct. scandalous means shocking or morally wrong.",
    help: "The clue is crime and shocking behaviour.",
    rule: "scandalous ist ein Adjektiv und beschreibt Verhalten oder Geschichten."
  },
  {
    type: "VERB_PREP",
    title: "Verb + preposition",
    prompt: "Choose the correct phrase.",
    sentence: "Some plants can help people ___ health problems.",
    options: ["heal from", "accuse of", "adapt to"],
    answer: "heal from",
    ok: "Correct. heal from a health problem means recover from it.",
    help: "The clue is health problems.",
    rule: "heal from gehoert als Chunk zusammen."
  },
  {
    type: "VERB_PREP",
    title: "Verb + preposition",
    prompt: "Choose the correct verb.",
    sentence: "A new historical report can ___ an older story about the Wild West.",
    options: ["contradict", "warn about", "work out"],
    answer: "contradict",
    ok: "Correct. contradict means say the opposite or not agree with something.",
    help: "The clue is new report versus older story.",
    rule: "contradict braucht hier keine Praeposition."
  },
  {
    type: "VERB_PREP",
    title: "Verb + preposition",
    prompt: "Choose the correct phrase.",
    sentence: "Teenagers can ___ conservation programmes to protect national parks.",
    options: ["become involved in", "relate to", "accuse of"],
    answer: "become involved in",
    ok: "Correct. become involved in means take part in something.",
    help: "The clue is take part in programmes.",
    rule: "become involved in als ganzer Chunk lernen."
  },
  {
    type: "VOCAB_CATEGORY",
    title: "U3 word categories",
    prompt: "Which category fits best?",
    sentence: "covered wagons / railroad / air-conditioning / saddle",
    options: ["things created by humans", "natural environment", "people and relationships"],
    answer: "things created by humans",
    ok: "Correct. These are objects or inventions made by people.",
    help: "Sort by meaning before translating every word.",
    rule: "Kategorisieren hilft beim Reading: Dinge, Natur, Personen/Beziehungen."
  },
  {
    type: "VOCAB_CATEGORY",
    title: "U3 word categories",
    prompt: "Which category fits best?",
    sentence: "temperature / heat / cactus / wildlife / arid",
    options: ["natural environment", "school and work", "crime and law"],
    answer: "natural environment",
    ok: "Correct. These words describe nature or desert conditions.",
    help: "temperature, heat and arid point to climate; cactus and wildlife point to nature.",
    rule: "Ein Wortfeld muss man oft nur erkennen, nicht perfekt uebersetzen."
  },
  {
    type: "VOCAB_CATEGORY",
    title: "U3 odd one out",
    prompt: "Which word does not fit?",
    sentence: "army / gunfighter / patrol / policeman",
    options: ["gunfighter", "army", "patrol"],
    answer: "gunfighter",
    ok: "Correct. army, patrol and policeman can belong to official protection/law; gunfighter is not official.",
    help: "Say the shared category first, then choose the outsider.",
    rule: "Odd-one-out braucht Begruendung: Welche drei Woerter teilen eine Kategorie?"
  },
  {
    type: "READING_EVIDENCE",
    title: "Reading: internship programme",
    prompt: "What is the best answer?",
    sentence: "Text: A museum in Arizona offers a summer programme for teenagers. They help prepare small exhibits, write short labels for photos and talk to visitors once a week. The programme is not paid, but students get useful work experience and feedback from museum staff. Question: Why can the programme still be useful although it is unpaid?",
    options: [
      "because students get work experience and feedback",
      "because students become full-time museum directors",
      "because visitors write all the labels"
    ],
    answer: "because students get work experience and feedback",
    ok: "Correct. The evidence is work experience and feedback from museum staff.",
    help: "Although unpaid creates a contrast. Look for the positive reason after but.",
    rule: "Bei why-Fragen mit although/but suchst du den Grund, der den Gegensatz erklaert."
  },
  {
    type: "READING_EVIDENCE",
    title: "Reading: Tombstone",
    prompt: "Which statement is true?",
    sentence: "Text: The town of Silver Creek was a boomtown in the 1880s. Today, tourists do not see real gunfights there, but actors perform a living history show every afternoon. Some stories are based on facts, while others were made more dramatic in novels. Statement: All stories about Silver Creek are completely factual.",
    options: ["false", "true", "not in the text"],
    answer: "false",
    ok: "Correct. The text says some stories are factual, but others were made more dramatic.",
    help: "Watch out for all. One counterexample makes the statement false.",
    rule: "True/false: Signalwoerter wie all, only, never, always genau pruefen."
  },
  {
    type: "READING_EVIDENCE",
    title: "Reading: national park",
    prompt: "Which heading fits best?",
    sentence: "Text: Every spring, rangers invite local students to help with conservation work. The teenagers learn how desert animals adapt to heat, why visitors must stay on the trails and how signs can warn people about flash floods. They also write short posts for the park website. Heading?",
    options: ["Teenagers help protect a desert park", "A dangerous gunfight in town", "A new restaurant in Las Vegas"],
    answer: "Teenagers help protect a desert park",
    ok: "Correct. Students, rangers, conservation and desert park are the main ideas.",
    help: "Do not choose a heading because of one word. Choose the main idea.",
    rule: "Heading-Aufgabe: Wer? Was tun sie? Wo? Zweck?"
  },
  {
    type: "WRITING_PHRASES",
    title: "Writing from reading",
    prompt: "Which sentence could use information from the national park text in a short answer?",
    sentence: "You answer: What did the teenagers learn in the programme?",
    options: [
      "They learned how desert animals adapt to heat and how to warn visitors about flash floods.",
      "They learned many things and it was good.",
      "The text is about a park."
    ],
    answer: "They learned how desert animals adapt to heat and how to warn visitors about flash floods.",
    ok: "Correct. The sentence gives exact information from the text.",
    help: "Short answers need precise content, not vague words.",
    rule: "Reading-to-writing: Antwort = Frage aufnehmen + genaue Info + passendes Verb."
  }
];

tasks.english.push(...englishU3ExpansionTasks);

const englishU3FinalCoverageTasks = [
  {
    type: "VOCAB_ACTIVE",
    title: "U3 Tombstone",
    prompt: "Which word best completes the sentence?",
    sentence: "A ___ is a fight in which people shoot at each other.",
    options: ["gunfight", "shelter", "resort"],
    answer: "gunfight",
    ok: "Correct. A gunfight is a fight with guns.",
    help: "The clue is shoot at each other.",
    rule: "gunfight ist ein Nomen aus gun + fight."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 Tombstone",
    prompt: "Which word best completes the sentence?",
    sentence: "In the 19th century, Arizona was still a ___ before it became a state.",
    options: ["Territory", "novel", "shelter"],
    answer: "Territory",
    ok: "Correct. A Territory was an area that was not yet a state.",
    help: "The clue is before it became a state.",
    rule: "Territory ist hier ein historischer Begriff: Gebiet vor dem Bundesstaat."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 Tombstone",
    prompt: "Which word best completes the sentence?",
    sentence: "Tombstone is in the ___ part of Arizona.",
    options: ["southern", "scandalous", "unimportant"],
    answer: "southern",
    ok: "Correct. southern means in the south.",
    help: "The clue is part of Arizona.",
    rule: "southern ist ein Adjektiv: the southern part of ..."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 Tombstone",
    prompt: "Which word best completes the sentence?",
    sentence: "You will not ___ visiting the museum because it is really interesting.",
    options: ["regret", "attack", "contradict"],
    answer: "regret",
    ok: "Correct. regret means feel sorry about something later.",
    help: "The clue is you will not feel sorry after visiting.",
    rule: "regret + -ing ist haeufig: You won't regret visiting ..."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 Tombstone",
    prompt: "Which word best completes the sentence?",
    sentence: "A long fictional book is a ___.",
    options: ["novel", "territory", "patrol"],
    answer: "novel",
    ok: "Correct. A novel is a fictional book.",
    help: "The clue is fictional book.",
    rule: "novel = Roman; nicht mit new verwechseln."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 people in the West",
    prompt: "Which person is described?",
    sentence: "This person works for the police and protects people.",
    options: ["policeman", "criminal", "smuggler"],
    answer: "policeman",
    ok: "Correct. A policeman works for the police.",
    help: "The clue is works for the police.",
    rule: "policeman gehoert zum Wortfeld law/protection."
  },
  {
    type: "VERB_PREP",
    title: "Verb + preposition",
    prompt: "Choose the correct verb.",
    sentence: "A wild animal may ___ if it feels threatened.",
    options: ["attack", "accuse", "retire"],
    answer: "attack",
    ok: "Correct. attack means try to hurt someone or something.",
    help: "The clue is wild animal and feels threatened.",
    rule: "attack braucht hier keine Praeposition."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 word category",
    prompt: "Which word best completes the sentence?",
    sentence: "A ___ is a seat used when riding a horse.",
    options: ["saddle", "crater", "settlement"],
    answer: "saddle",
    ok: "Correct. A saddle is used for riding a horse.",
    help: "The clue is riding a horse.",
    rule: "saddle gehoert zu horses/ranching."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 word category",
    prompt: "Which word best completes the sentence?",
    sentence: "A ___ is a place where people have started to live.",
    options: ["settlement", "bomb", "marriage"],
    answer: "settlement",
    ok: "Correct. A settlement is a place where people settle and live.",
    help: "The clue is people have started to live.",
    rule: "settlement kommt von settle = sich ansiedeln."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "U3 word category",
    prompt: "Which word best completes the sentence?",
    sentence: "A ___ is a person who fights bravely, often in a traditional group.",
    options: ["warrior", "resort", "railroad"],
    answer: "warrior",
    ok: "Correct. A warrior is a fighter.",
    help: "The clue is fights bravely.",
    rule: "warrior gehoert zum Personen-/Geschichtswortfeld."
  },
  {
    type: "READING_EVIDENCE",
    title: "Reading: exact statement",
    prompt: "Which evidence makes the statement false?",
    sentence: "Text: The old town attracts many tourists. Some visitors come for the museums, while others come for the living history show. The town is popular, but it is not important for modern business. Statement: The town is unimportant for tourists.",
    options: [
      "attracts many tourists",
      "not important for modern business",
      "old town"
    ],
    answer: "attracts many tourists",
    ok: "Correct. This evidence directly contradicts the statement about tourists.",
    help: "Do not grab the word unimportant too quickly. Check what it refers to.",
    rule: "Reading-Falle: Ein Wort kann stimmen, aber zu einem anderen Bezug gehoeren."
  },
  {
    type: "WRITING_STRUCTURE",
    title: "Writing checklist",
    prompt: "Which checklist would help most before handing in a text?",
    sentence: "You wrote an internship report.",
    options: [
      "task answered, concrete details, useful phrases, verb forms, word order",
      "nice handwriting only",
      "as many difficult words as possible"
    ],
    answer: "task answered, concrete details, useful phrases, verb forms, word order",
    ok: "Correct. This is the safest final check for a test text.",
    help: "A good text is clear, correct and concrete. Difficult words only help if they are right.",
    rule: "Final check: Aufgabe beantwortet? Details? Phrasen? Verben? Wortstellung?"
  }
];

tasks.english.push(...englishU3FinalCoverageTasks);

const englishAcrossCulturesTasks = [
  {
    stage: "ac3",
    type: "VOCAB_ACTIVE",
    title: "Across Cultures 3: key word",
    prompt: "Which phrase best completes the definition?",
    sentence: "People who lived in North America long before Europeans arrived are called ___.",
    options: ["Indigenous peoples", "living history shows", "recruiters"],
    answer: "Indigenous peoples",
    ok: "Correct. Indigenous peoples is the respectful general phrase for the first peoples of a place.",
    help: "The clue is lived there long before Europeans arrived.",
    rule: "Across Cultures 3: Indigenous peoples = indigene Voelker. Use peoples in plural when you mean different nations and cultures.",
    markers: [
      ["Signal", "long before Europeans"],
      ["Begriff", "Indigenous peoples"],
      ["Falle", "not costume label"]
    ]
  },
  {
    stage: "ac3",
    type: "VOCAB_ACTIVE",
    title: "Across Cultures 3: key word",
    prompt: "Which word fits the explanation?",
    sentence: "A place where some Indigenous people live today, sometimes with their own laws, is a ___.",
    options: ["reservation", "boomtown", "shelter"],
    answer: "reservation",
    ok: "Correct. A reservation can be an area connected with an Indigenous nation.",
    help: "The clue is Indigenous people + live there + own laws.",
    rule: "reservation ist hier ein historisch-politischer Begriff, nicht eine Tischreservierung.",
    markers: [
      ["Signal", "live today"],
      ["Begriff", "reservation"],
      ["Check", "own laws"]
    ]
  },
  {
    stage: "ac3",
    type: "VOCAB_ACTIVE",
    title: "Across Cultures 3: history",
    prompt: "Choose the correct phrase.",
    sentence: "On the Trail of Tears, many Indigenous people were ___ to leave their ancestral land and move west.",
    options: ["forced", "registered", "retired"],
    answer: "forced",
    ok: "Correct. forced means they did not choose freely.",
    help: "Trail of Tears is about forced removal, not a voluntary journey.",
    rule: "be forced to + infinitive = gezwungen werden, etwas zu tun.",
    markers: [
      ["Textsignal", "Trail of Tears"],
      ["Verbchunk", "be forced to"],
      ["Inhalt", "move west"]
    ]
  },
  {
    stage: "ac3",
    type: "VOCAB_ACTIVE",
    title: "Across Cultures 3: culture",
    prompt: "Which word completes the sentence?",
    sentence: "___ means that people are pushed to give up their own culture and live like another group.",
    options: ["Assimilation", "A gunfight", "Spring break"],
    answer: "Assimilation",
    ok: "Correct. Assimilation means pressure to give up one's own culture.",
    help: "The clue is give up their own culture.",
    rule: "Assimilation: eigene Kultur/Traditionen sollen verschwinden und durch eine andere Lebensweise ersetzt werden.",
    markers: [
      ["Signal", "give up culture"],
      ["Begriff", "assimilation"],
      ["Falle", "not integration as free choice"]
    ]
  },
  {
    stage: "ac3",
    type: "READING_EVIDENCE",
    title: "Across Cultures 3: fact question",
    prompt: "Which evidence answers the question?",
    sentence: "Question: Why was the Trail of Tears terrible for many families? Text: Thousands of people were forced to move west. They did not have enough food or clothes, and many people died on the journey.",
    options: [
      "They did not have enough food or clothes, and many people died.",
      "Thousands of people",
      "move west"
    ],
    answer: "They did not have enough food or clothes, and many people died.",
    ok: "Correct. This phrase gives the reason why the journey was terrible.",
    help: "why asks for a reason. Do not choose only a topic word.",
    rule: "Reading-Decoder: why -> reason. Mark the reason words, then answer briefly.",
    markers: [
      ["Fragewort", "Why?"],
      ["Suche", "reason"],
      ["Beleg", "food/clothes/died"]
    ]
  },
  {
    stage: "ac3",
    type: "READING_EVIDENCE",
    title: "Across Cultures 3: statement",
    prompt: "Is the statement true or false?",
    sentence: "Text: Some Indigenous nations have their own languages, traditions and laws. Statement: All Indigenous nations have exactly the same culture.",
    options: ["false", "true", "not in the text"],
    answer: "false",
    ok: "Correct. The text says there are different languages, traditions and laws.",
    help: "All and exactly are danger words. Look for difference or variety in the text.",
    rule: "True/false: all, only, never, exactly muessen besonders streng geprueft werden.",
    markers: [
      ["Warnwort", "All / exactly"],
      ["Beleg", "different traditions"],
      ["Antwort", "false"]
    ]
  },
  {
    stage: "ac3",
    type: "WRITING_STRUCTURE",
    title: "Across Cultures 3: mediation",
    prompt: "What is the safest first step in this mediation?",
    sentence: "A German text explains why some people have a problem with Indigenous costumes at carnival. Your English-speaking friend wants to understand the problem.",
    options: [
      "explain the problem in simple English for the friend",
      "translate every German sentence in the same order",
      "start with a long personal story"
    ],
    answer: "explain the problem in simple English for the friend",
    ok: "Correct. Mediation means selecting useful information for the reader.",
    help: "Ask: Who is reading this? What do they need to understand?",
    rule: "Mediation: Zielgruppe klaeren, wichtige Informationen auswaehlen, einfach und sinngemaess auf Englisch schreiben.",
    markers: [
      ["Auftrag", "mediation"],
      ["Adressat", "friend"],
      ["Ziel", "understand problem"]
    ],
    paperSteps: [
      "Schreibe auf Papier: My friend needs to know that ...",
      "Notiere drei Kernwoerter: culture, respect, costume.",
      "Formuliere vier einfache Saetze, keine Woerterbuch-Uebersetzung.",
      "Pruefe: Hat jeder Satz eine klare Information?"
    ]
  },
  {
    stage: "ac3",
    type: "WRITING_PHRASES",
    title: "Across Cultures 3: opinion",
    prompt: "Which sentence gives a clear opinion with a reason?",
    sentence: "Topic: wearing Indigenous clothes as a carnival costume.",
    options: [
      "I think it can be disrespectful because it turns a real culture into fun.",
      "I think costumes are things.",
      "The text is about costumes and people."
    ],
    answer: "I think it can be disrespectful because it turns a real culture into fun.",
    ok: "Correct. The sentence gives an opinion and a reason.",
    help: "Opinion points need because. A vague sentence is not enough.",
    rule: "Opinion writing: I think ... because ... / In my opinion, ... because ...",
    markers: [
      ["Meinung", "I think"],
      ["Begruendung", "because"],
      ["Fachwort", "disrespectful"]
    ],
    paperSteps: [
      "Schreibe zwei opinion-Saetze mit because.",
      "Nutze mindestens zwei Woerter: disrespectful, culture, respect, tradition.",
      "Schreibe einen Gegengedanken mit However, ...",
      "Unterstreiche die Begruendung."
    ]
  },
  {
    stage: "ac3",
    type: "WRITING_PHRASES",
    title: "Across Cultures 3: useful phrase",
    prompt: "Which phrase is best for a short English explanation?",
    sentence: "You want to explain that the clothes are part of a real culture.",
    options: [
      "These clothes are part of a real culture and tradition.",
      "These clothes are funny and old stuff.",
      "It is a thing with people."
    ],
    answer: "These clothes are part of a real culture and tradition.",
    ok: "Correct. This phrase is respectful, clear and useful for mediation or opinion writing.",
    help: "Good exam English is simple but precise.",
    rule: "Useful phrase: be part of a real culture/tradition. Avoid vague words like stuff or thing.",
    markers: [
      ["Chunk", "part of"],
      ["Nomen", "culture/tradition"],
      ["Stil", "clear, respectful"]
    ]
  }
];

tasks.english.push(...englishAcrossCulturesTasks);

const englishAutomationDrillTasks = [
  {
    type: "VOCAB_ACTIVE",
    title: "Klausurdrill U3: school and work",
    prompt: "Complete the definition.",
    sentence: "Someone who looks for people to join a company or an organization is called a ___.",
    options: ["recruiter", "rancher", "witness"],
    answer: "recruiter",
    ok: "Correct. This is the standard definition pattern for recruiter.",
    help: "The words looks for people to join point directly to recruiter.",
    rule: "Automatisieren: looks for people to join a company -> recruiter."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "Klausurdrill U3: school and work",
    prompt: "Complete the definition.",
    sentence: "The time in spring when many American students do not have classes for a week is called ___.",
    options: ["spring break", "social studies", "career opportunity"],
    answer: "spring break",
    ok: "Correct. This definition points to spring break.",
    help: "one week without classes in spring = spring break.",
    rule: "Automatisieren: spring + one week off school -> spring break."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "Klausurdrill U3: school and work",
    prompt: "Complete the definition.",
    sentence: "When people finish their professional career, they ___ from their job.",
    options: ["retire", "struggle", "register"],
    answer: "retire",
    ok: "Correct. retire means finish a professional career.",
    help: "professional career + finish = retire.",
    rule: "Automatisieren: finish career -> retire from a job."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "Klausurdrill U3: people",
    prompt: "Complete the definition.",
    sentence: "A ___ is someone who works with cattle or horses on a ranch.",
    options: ["rancher", "smuggler", "dentist"],
    answer: "rancher",
    ok: "Correct. cattle, horses and ranch point to rancher.",
    help: "Do not overthink: ranch -> rancher.",
    rule: "Automatisieren: ranch/cattle/horses -> rancher."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "Klausurdrill U3: people",
    prompt: "Complete the definition.",
    sentence: "A ___ is someone who saw what happened and can tell the police or a judge.",
    options: ["witness", "criminal", "miner"],
    answer: "witness",
    ok: "Correct. saw what happened + tell police/judge = witness.",
    help: "The function is seeing and reporting.",
    rule: "Automatisieren: saw event + reports it -> witness."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "Klausurdrill U3: Tombstone",
    prompt: "Choose the correct word.",
    sentence: "Tombstone attracted many people and quickly became a ___.",
    options: ["boomtown", "shelter", "novel"],
    answer: "boomtown",
    ok: "Correct. A town that grows quickly is a boomtown.",
    help: "many people + quickly became = boomtown.",
    rule: "Automatisieren: town grows quickly because of money/jobs -> boomtown."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "Klausurdrill U3: Tombstone",
    prompt: "Choose the correct word.",
    sentence: "Visitors can watch actors perform a ___ about the Wild West.",
    options: ["living history show", "gunfight", "territory"],
    answer: "living history show",
    ok: "Correct. actors perform history = living history show.",
    help: "The clue is actors perform history.",
    rule: "Automatisieren: actors + history performance -> living history show."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "Klausurdrill U3: Tombstone",
    prompt: "Choose the correct word.",
    sentence: "The town is in the ___ part of Arizona, near the Mexican border.",
    options: ["southern", "scandalous", "legendary"],
    answer: "southern",
    ok: "Correct. southern means in the south.",
    help: "part of Arizona asks for direction/location.",
    rule: "Automatisieren: southern part = suedlicher Teil."
  },
  {
    type: "VOCAB_ACTIVE",
    title: "Klausurdrill U3: Tombstone",
    prompt: "Choose the correct word.",
    sentence: "If you like history, you will not ___ visiting this museum.",
    options: ["regret", "retire", "relate"],
    answer: "regret",
    ok: "Correct. You will not regret visiting means you will be happy you went.",
    help: "will not regret + -ing is a useful chunk.",
    rule: "Automatisieren: You won't regret visiting ..."
  },
  {
    type: "VERB_PREP",
    title: "Klausurdrill U3: verb + preposition",
    prompt: "Choose the correct preposition.",
    sentence: "Tourists were accused ___ taking plants from the park.",
    options: ["of", "to", "about"],
    answer: "of",
    ok: "Correct. accuse someone of doing something.",
    help: "This is a fixed chunk: accuse of.",
    rule: "Automatisieren: accuse someone of doing something."
  },
  {
    type: "VERB_PREP",
    title: "Klausurdrill U3: verb + preposition",
    prompt: "Choose the correct preposition.",
    sentence: "Desert animals have adapted ___ extreme heat.",
    options: ["to", "of", "from"],
    answer: "to",
    ok: "Correct. adapt to something.",
    help: "This is a fixed chunk: adapt to.",
    rule: "Automatisieren: adapt to + noun."
  },
  {
    type: "VERB_PREP",
    title: "Klausurdrill U3: verb + preposition",
    prompt: "Choose the correct preposition.",
    sentence: "Signs warn visitors ___ flash floods.",
    options: ["about", "to", "in"],
    answer: "about",
    ok: "Correct. warn someone about something.",
    help: "This is a fixed chunk: warn about.",
    rule: "Automatisieren: warn visitors about danger."
  },
  {
    type: "VERB_PREP",
    title: "Klausurdrill U3: verb + preposition",
    prompt: "Choose the correct phrase.",
    sentence: "Students can become involved ___ conservation programmes.",
    options: ["in", "of", "from"],
    answer: "in",
    ok: "Correct. become involved in something.",
    help: "This is a fixed chunk: become involved in.",
    rule: "Automatisieren: become involved in programmes."
  },
  {
    stage: "u4_start",
    type: "VOCAB_FORM",
    title: "Klausurdrill U4 Anfang: word family",
    prompt: "Choose the correct form.",
    sentence: "Avery signed up when she ___ for summer camp. (registration)",
    options: ["registered", "registration", "registering"],
    answer: "registered",
    ok: "Correct. The sentence needs the past verb registered.",
    help: "she + action in the past = registered.",
    rule: "Automatisieren: she registered; registration ist das Nomen."
  },
  {
    stage: "u4_start",
    type: "VOCAB_FORM",
    title: "Klausurdrill U4 Anfang: word family",
    prompt: "Choose the correct form.",
    sentence: "The coding class was not too ___. (challenge)",
    options: ["challenging", "challenge", "challenged"],
    answer: "challenging",
    ok: "Correct. The class is challenging.",
    help: "The class causes the challenge; it is not challenged by someone.",
    rule: "Automatisieren: class/job/task is challenging."
  },
  {
    stage: "u4_start",
    type: "VOCAB_FORM",
    title: "Klausurdrill U4 Anfang: word family",
    prompt: "Choose the correct form.",
    sentence: "They gave us an ___ to a new computer program. (introduce)",
    options: ["introduction", "introduce", "introduced"],
    answer: "introduction",
    ok: "Correct. an needs a noun: introduction.",
    help: "an + noun. introduce is a verb.",
    rule: "Automatisieren: an introduction."
  },
  {
    stage: "u4_start",
    type: "VOCAB_FORM",
    title: "Klausurdrill U4 Anfang: word family",
    prompt: "Choose the correct form.",
    sentence: "Her least favourite class was ___. (robot)",
    options: ["robotics", "robot", "robotic"],
    answer: "robotics",
    ok: "Correct. robotics is the school subject.",
    help: "The gap names a class/subject, not one machine.",
    rule: "Automatisieren: robotics class / robotics as a subject."
  },
  {
    stage: "u4_start",
    type: "GRAMMAR_GERUND_INF",
    title: "Klausurdrill U4 Anfang: gerund",
    prompt: "Choose the correct form.",
    sentence: "Maya enjoys ___ short animations.",
    options: ["creating", "to create", "create"],
    answer: "creating",
    ok: "Correct. enjoy is followed by -ing.",
    help: "enjoy + -ing. Do not use to after enjoy.",
    rule: "Automatisieren: enjoy doing something."
  },
  {
    stage: "u4_start",
    type: "GRAMMAR_GERUND_INF",
    title: "Klausurdrill U4 Anfang: gerund",
    prompt: "Choose the correct form.",
    sentence: "Teenagers interested in ___ outdoors can join the camp.",
    options: ["being", "to be", "be"],
    answer: "being",
    ok: "Correct. interested in is followed by -ing.",
    help: "Preposition in + -ing.",
    rule: "Automatisieren: interested in being/doing."
  },
  {
    stage: "u4_start",
    type: "GRAMMAR_GERUND_INF",
    title: "Klausurdrill U4 Anfang: infinitive",
    prompt: "Choose the correct form.",
    sentence: "The group stopped in order ___ a photo.",
    options: ["to take", "taking", "take"],
    answer: "to take",
    ok: "Correct. in order to + infinitive.",
    help: "Purpose/Ziel: in order to do something.",
    rule: "Automatisieren: in order to + infinitive."
  },
  {
    stage: "u4_start",
    type: "LINKING",
    title: "Klausurdrill U4 Anfang: linking",
    prompt: "Which linking word fits?",
    sentence: "The camp was expensive. ___, many students wanted to join it.",
    options: ["However", "Because", "Until"],
    answer: "However",
    ok: "Correct. However shows contrast.",
    help: "expensive but many wanted to join = contrast.",
    rule: "Automatisieren: However = Gegensatz am Satzanfang."
  },
  {
    stage: "u4_start",
    type: "READING_EVIDENCE",
    title: "Klausurdrill Reading: Beleg",
    prompt: "Which evidence answers the question?",
    sentence: "Question: Why did the company create the internship? Text: The company created the programme in order to get more girls interested in technology.",
    options: [
      "to get more girls interested in technology",
      "the company created",
      "internship"
    ],
    answer: "to get more girls interested in technology",
    ok: "Correct. That phrase gives the reason.",
    help: "why asks for reason/purpose. Look for in order to.",
    rule: "Automatisieren: why -> because / to / in order to."
  }
];

tasks.english.push(...englishAutomationDrillTasks);

const vocab = {
  latin: [
    {
      lesson: "16",
      word: "fuisse",
      meaning: "gewesen sein",
      category: "Infinitiv Perfekt",
      sentence: "Puto vitam in Gallia non facilem ___.",
      solution: "fuisse",
      hint: "Vorzeitigkeit im AcI: dass etwas gewesen ist."
    },
    {
      lesson: "16",
      word: "reduxisse",
      meaning: "zurueckgebracht haben",
      category: "Infinitiv Perfekt",
      sentence: "Audivi vos Flaviam domum ___.",
      solution: "reduxisse",
      hint: "Perfektinfinitiv im AcI, also vorher passiert."
    },
    {
      lesson: "16",
      word: "sacrificavisse",
      meaning: "geopfert haben",
      category: "Infinitiv Perfekt",
      sentence: "Audivistine nos deis ___.",
      solution: "sacrificavisse",
      hint: "Zu sacrificare; in Lektion 16 mit römischer Religion verbunden."
    },
    {
      lesson: "16",
      word: "eius",
      meaning: "sein/ihr",
      category: "Pronomen",
      sentence: "Audivimus de salvatione ___.",
      solution: "eius",
      hint: "Nicht reflexiv. Reflexiv waere suus/sua/suum."
    },
    {
      lesson: "16",
      word: "se",
      meaning: "sich / er selbst / sie selbst",
      category: "Pronomen im AcI",
      sentence: "Quintus narrat ___ in Gallia fuisse.",
      solution: "se",
      hint: "Bezieht sich meist auf das Subjekt des Kopfverbs."
    },
    {
      lesson: "16",
      word: "eum",
      meaning: "ihn / diesen",
      category: "is, ea, id",
      sentence: "Domitius cognoscit ___ humanum esse.",
      solution: "eum",
      hint: "Akkusativ Singular maskulin."
    },
    {
      lesson: "17",
      word: "ambulabimus",
      meaning: "wir werden spazieren",
      category: "Futur I",
      sentence: "Brevi per Forum Romanum ___.",
      solution: "ambulabimus",
      hint: "a-Konjugation: -bimus."
    },
    {
      lesson: "17",
      word: "videbitis",
      meaning: "ihr werdet sehen",
      category: "Futur I",
      sentence: "Ibi templa pulchra ___.",
      solution: "videbitis",
      hint: "e-Konjugation: -bitis."
    },
    {
      lesson: "17",
      word: "quis",
      meaning: "wer?",
      category: "Fragepronomen",
      sentence: "___ ante columnam stat?",
      solution: "Quis",
      hint: "Frage nach einer Person im Nominativ."
    },
    {
      lesson: "17",
      word: "quid",
      meaning: "was?",
      category: "Fragepronomen",
      sentence: "___ id erit?",
      solution: "Quid",
      hint: "Frage nach einer Sache."
    }
  ],
  english: [
    {
      lesson: "U3",
      word: "cactus",
      meaning: "Kaktus",
      category: "Desert Southwest",
      sentence: "A ___ can survive in a very dry desert.",
      solution: "cactus",
      hint: "Nature word from the Desert Southwest."
    },
    {
      lesson: "U3",
      word: "flash flood",
      meaning: "Sturzflut",
      category: "Desert Southwest",
      sentence: "After heavy rain, a ___ can be dangerous in a canyon.",
      solution: "flash flood",
      hint: "Sudden water after heavy rain."
    },
    {
      lesson: "U3",
      word: "wildlife",
      meaning: "Wildtiere / Tierwelt",
      category: "Desert Southwest",
      sentence: "Visitors should not disturb the ___ in a national park.",
      solution: "wildlife",
      hint: "Animals living in nature."
    },
    {
      lesson: "U3",
      word: "recruiter",
      meaning: "Person, die neue Leute fuer eine Firma/Organisation sucht",
      category: "School and work",
      sentence: "A ___ looks for people to join a company.",
      solution: "recruiter",
      hint: "Person noun from recruit."
    },
    {
      lesson: "U3",
      word: "pressure",
      meaning: "Druck",
      category: "School and work",
      sentence: "Parents should not put too much ___ on teenagers.",
      solution: "pressure",
      hint: "Common phrase: put pressure on someone."
    },
    {
      lesson: "U3",
      word: "struggle",
      meaning: "sich abmuehen / Kampf",
      category: "School and work",
      sentence: "Some students ___ with difficult tasks at first.",
      solution: "struggle",
      hint: "Have problems and keep trying."
    },
    {
      lesson: "U3",
      word: "rancher",
      meaning: "Rancher/in",
      category: "People in the West",
      sentence: "A ___ works with cattle or horses.",
      solution: "rancher",
      hint: "Person connected with a ranch."
    },
    {
      lesson: "U3",
      word: "witness",
      meaning: "Zeuge/Zeugin",
      category: "People in the West",
      sentence: "A ___ saw what happened and told the judge.",
      solution: "witness",
      hint: "A person who saw an event."
    },
    {
      lesson: "U3",
      word: "boomtown",
      meaning: "schnell wachsende Stadt",
      category: "Tombstone",
      sentence: "Tombstone became a ___ when many people arrived.",
      solution: "boomtown",
      hint: "A town that grows quickly because of money or jobs."
    },
    {
      lesson: "U3",
      word: "legendary",
      meaning: "legendär / sagenumwoben",
      category: "Tombstone",
      sentence: "The ___ gunfight made the town famous.",
      solution: "legendary",
      hint: "Famous from stories or history."
    },
    {
      lesson: "U3",
      word: "adapt to",
      meaning: "sich anpassen an",
      category: "Verb + preposition",
      sentence: "Desert animals adapt ___ extreme heat.",
      solution: "to",
      hint: "Verb chunk: adapt to."
    },
    {
      lesson: "U3",
      word: "accuse of",
      meaning: "beschuldigen",
      category: "Verb + preposition",
      sentence: "They accused him ___ stealing plants.",
      solution: "of",
      hint: "Verb chunk: accuse someone of doing something."
    },
    {
      lesson: "U3",
      word: "warn about",
      meaning: "warnen vor",
      category: "Verb + preposition",
      sentence: "Rangers warn visitors ___ flash floods.",
      solution: "about",
      hint: "Verb chunk: warn someone about something."
    },
    {
      lesson: "U3",
      word: "not work out",
      meaning: "nicht klappen",
      category: "Verb phrase",
      sentence: "The plan did ___ because the weather changed.",
      solution: "not work out",
      hint: "Phrase meaning: did not succeed."
    },
    {
      lesson: "U3",
      word: "social studies",
      meaning: "Sozialkunde / Gesellschaftslehre",
      category: "School and work",
      sentence: "In ___, students learn about society.",
      solution: "social studies",
      hint: "School subject about society."
    },
    {
      lesson: "U3",
      word: "spring break",
      meaning: "Fruehjahrsferien",
      category: "School and work",
      sentence: "They visited Arizona during ___.",
      solution: "spring break",
      hint: "One-week school holiday in spring."
    },
    {
      lesson: "U3",
      word: "retire",
      meaning: "in Rente gehen / aus dem Beruf ausscheiden",
      category: "School and work",
      sentence: "My grandfather will ___ from his job next year.",
      solution: "retire",
      hint: "Finish a professional career."
    },
    {
      lesson: "U3",
      word: "miner",
      meaning: "Bergarbeiter/in",
      category: "People in the West",
      sentence: "A ___ looked for silver near the town.",
      solution: "miner",
      hint: "Person who works in a mine."
    },
    {
      lesson: "U3",
      word: "smuggler",
      meaning: "Schmuggler/in",
      category: "People in the West",
      sentence: "The ___ carried goods across the border illegally.",
      solution: "smuggler",
      hint: "Person connected with illegal transport."
    },
    {
      lesson: "U3",
      word: "judge",
      meaning: "Richter/in",
      category: "People in the West",
      sentence: "The ___ listened to the witness in court.",
      solution: "judge",
      hint: "Person who makes decisions in court."
    },
    {
      lesson: "U3",
      word: "shelter",
      meaning: "Schutz / Unterkunft",
      category: "Tombstone",
      sentence: "The old building gave travellers ___ during the storm.",
      solution: "shelter",
      hint: "Safe place."
    },
    {
      lesson: "U3",
      word: "living history show",
      meaning: "Geschichtsvorfuehrung mit Schauspielern",
      category: "Tombstone",
      sentence: "Actors perform a ___ every afternoon.",
      solution: "living history show",
      hint: "Tourist show that presents history."
    },
    {
      lesson: "U3",
      word: "attract",
      meaning: "anziehen / anlocken",
      category: "Tombstone",
      sentence: "The museum can ___ many visitors.",
      solution: "attract",
      hint: "Bring visitors to a place."
    },
    {
      lesson: "U3",
      word: "scandalous",
      meaning: "skandaloes / schockierend",
      category: "Tombstone",
      sentence: "The newspaper told a ___ story about the gunfight.",
      solution: "scandalous",
      hint: "Shocking or morally wrong."
    },
    {
      lesson: "U3",
      word: "become involved in",
      meaning: "sich beteiligen an",
      category: "Verb + preposition",
      sentence: "Students can become involved ___ conservation programmes.",
      solution: "in",
      hint: "Verb chunk: become involved in."
    },
    {
      lesson: "U3",
      word: "heal from",
      meaning: "sich erholen von / heilen von",
      category: "Verb + preposition",
      sentence: "Some plants helped people heal ___ injuries.",
      solution: "from",
      hint: "Verb chunk: heal from."
    },
    {
      lesson: "U3",
      word: "relate to",
      meaning: "sich beziehen auf / nachvollziehen koennen",
      category: "Verb + preposition",
      sentence: "Many teenagers can relate ___ feeling pressure at school.",
      solution: "to",
      hint: "Verb chunk: relate to."
    },
    {
      lesson: "AC3",
      word: "Indigenous peoples",
      meaning: "indigene Voelker",
      category: "Across Cultures 3",
      sentence: "___ lived in North America long before Europeans arrived.",
      solution: "Indigenous peoples",
      hint: "Respectful phrase for the first peoples of a place."
    },
    {
      lesson: "AC3",
      word: "reservation",
      meaning: "Reservat",
      category: "Across Cultures 3",
      sentence: "Some Indigenous people live on a ___.",
      solution: "reservation",
      hint: "Historical/political word here, not a table booking."
    },
    {
      lesson: "AC3",
      word: "ancestral land",
      meaning: "angestammtes Land",
      category: "Across Cultures 3",
      sentence: "For many families, ___ is connected with history and culture.",
      solution: "ancestral land",
      hint: "Land connected with ancestors and family history."
    },
    {
      lesson: "AC3",
      word: "be forced to",
      meaning: "gezwungen werden zu",
      category: "Across Cultures 3",
      sentence: "Many people were ___ leave their homes.",
      solution: "forced to",
      hint: "Use passive: were forced to leave."
    },
    {
      lesson: "AC3",
      word: "assimilation",
      meaning: "Anpassungsdruck / Assimilation",
      category: "Across Cultures 3",
      sentence: "___ can mean that people are pushed to give up their traditions.",
      solution: "Assimilation",
      hint: "Key idea: giving up one's own culture under pressure."
    },
    {
      lesson: "AC3",
      word: "disrespectful",
      meaning: "respektlos",
      category: "Across Cultures 3 opinion",
      sentence: "Some people think these costumes are ___.",
      solution: "disrespectful",
      hint: "Useful opinion word: not showing respect."
    },
    {
      lesson: "AC3",
      word: "respect and recognition",
      meaning: "Respekt und Anerkennung",
      category: "Across Cultures 3 opinion",
      sentence: "Many people ask for ___ for Indigenous cultures.",
      solution: "respect and recognition",
      hint: "Useful pair for mediation and opinion writing."
    },
    {
      lesson: "U4",
      word: "challenging",
      meaning: "herausfordernd",
      category: "Word family",
      sentence: "The coding class was very ___.",
      solution: "challenging",
      hint: "The class is demanding or difficult in an interesting way.",
      rule: "challenging beschreibt die Sache, die herausfordert. challenged beschreibt jemanden oder etwas, das herausgefordert wurde."
    },
    {
      lesson: "U4",
      word: "registered",
      meaning: "meldete sich an / registrierte sich",
      category: "Word family",
      sentence: "Maya ___ for a holiday workshop.",
      solution: "registered",
      hint: "The sentence needs the verb in the past.",
      rule: "registered ist ein Verb im simple past. registration ist ein Nomen."
    },
    {
      lesson: "U4",
      word: "including",
      meaning: "einschließlich / darunter",
      category: "Word family",
      sentence: "They introduced new programs, ___ one for video games.",
      solution: "including",
      hint: "including adds an example to the group of programs.",
      rule: "including bedeutet hier 'darunter/einschliesslich'. include waere das Verb, included die Vergangenheitsform."
    },
    {
      lesson: "U4",
      word: "animation",
      meaning: "Animation",
      category: "Technology",
      sentence: "She liked doing ___.",
      solution: "animation",
      hint: "After doing you need the activity as a noun.",
      rule: "animation ist das Nomen. animated beschreibt etwas als animiert."
    },
    {
      lesson: "U4",
      word: "scientist",
      meaning: "Wissenschaftler/in",
      category: "Person",
      sentence: "She thought about becoming a computer ___.",
      solution: "scientist",
      hint: "Person from science."
    },
    {
      lesson: "U4",
      word: "in order to",
      meaning: "um zu",
      category: "Linking word",
      sentence: "The company created internships ___ help girls.",
      solution: "in order to",
      hint: "Shows purpose."
    },
    {
      lesson: "U4",
      word: "although",
      meaning: "obwohl",
      category: "Linking word",
      sentence: "___ tech is interesting, many girls do not feel welcome.",
      solution: "Although",
      hint: "Shows contrast."
    },
    {
      lesson: "U4",
      word: "low-income housing",
      meaning: "Wohnraum für Menschen mit geringem Einkommen",
      category: "California",
      sentence: "Some people support ___ in Santa Barbara.",
      solution: "low-income housing",
      hint: "Important topic in Unit 4 listening."
    },
    {
      lesson: "U4",
      word: "internship",
      meaning: "Praktikum",
      category: "Work",
      sentence: "Leah has an ___ at a start-up.",
      solution: "internship",
      hint: "Work experience, often for students."
    },
    {
      lesson: "U4",
      word: "evidence",
      meaning: "Beleg / Nachweis",
      category: "Reading strategy",
      sentence: "Give ___ for your answer.",
      solution: "evidence",
      hint: "Key word for reading/listening answers."
    },
    {
      lesson: "U4",
      word: "robotics",
      meaning: "Robotik",
      category: "Word family",
      sentence: "Her least favourite class was ___.",
      solution: "robotics",
      hint: "School subject/field from robot."
    },
    {
      lesson: "U4",
      word: "expectation",
      meaning: "Erwartung",
      category: "Word family",
      sentence: "The camp was different from her ___.",
      solution: "expectation",
      hint: "Noun from expect."
    },
    {
      lesson: "U4",
      word: "legal status",
      meaning: "Aufenthalts-/Rechtsstatus",
      category: "Internship",
      sentence: "Her ___ prevents her from accepting a paid job.",
      solution: "legal status",
      hint: "Important phrase in the internship dialogue."
    },
    {
      lesson: "U4",
      word: "bilingual",
      meaning: "zweisprachig",
      category: "Work",
      sentence: "The company needs someone who is ___.",
      solution: "bilingual",
      hint: "bi = two."
    }
  ]
};

const paperTasks = [
  {
    title: "Latein: AcI auf Papier",
    steps: [
      "Schreibe drei Saetze aus dem Lateinbereich ab.",
      "Markiere Kopfverb blau, Akkusativ orange, Infinitiv gruen.",
      "Schreibe unter jeden Satz einen deutschen dass-Satz.",
      "Notiere eine Fehlerfalle, die du vermeiden willst."
    ]
  },
  {
    title: "Latein: Mini-Uebersetzung",
    steps: [
      "Uebersetze Text 1 oder Text 2 aus der Datei Latein_Uebersetzungstexte.",
      "Schreibe zuerst eine Rohuebersetzung.",
      "Verbessere danach nur das Deutsch.",
      "Markiere am Ende alle Perfektinfinitive."
    ]
  },
  {
    title: "Englisch: internship report",
    steps: [
      "Waehle ein Praktikum: museum, national park, bike tour company oder school project.",
      "Schreibe zuerst vier Notizen: where/when, tasks, one difficulty, what I learned.",
      "Schreibe 80-120 Woerter.",
      "Nutze mindestens vier Bausteine: My internship experience was with ..., My main task was ..., It was hard to ..., I learned that ...",
      "Pruefe danach: konkrete Details, past tense, mindestens ein because/but/so."
    ],
    solution: "Kontrollschema: Der Text nennt Ort/Organisation, Aufgaben, ein konkretes Detail, eine Schwierigkeit oder Erfahrung und eine kurze Bewertung. Gute Bausteine: My internship experience was with ...; My main task was ...; I also helped ...; It was a great experience because ..."
  },
  {
    title: "Englisch: mediation message",
    steps: [
      "Lies die Aufgabe und markiere: Wer fragt? Was braucht die Person?",
      "Schreibe keine Wort-fuer-Wort-Uebersetzung.",
      "Beginne mit: You asked me about ... oder I found some useful information about ...",
      "Schreibe 5-7 Saetze mit nur relevanten Informationen.",
      "Schliesse mit einem hilfreichen Satz: I think you might enjoy ... / Hopefully this helps."
    ],
    solution: "Kontrollschema: Zielperson angesprochen? Nur relevante Infos? Klarer Anfang? Keine deutschen Satzstrukturen? Gute Bausteine: You asked me recently about ...; The most important information is ...; You should know that ...; I think the place you might enjoy most is ..."
  },
  {
    title: "Englisch: Reading mini test - internship",
    steps: [
      "Lies den Text: A museum in Arizona offers a summer programme for teenagers. They help prepare small exhibits, write short labels for photos and talk to visitors once a week. The programme is not paid, but students get useful work experience and feedback from museum staff.",
      "Beantworte: Why can the programme still be useful although it is unpaid?",
      "Beantworte: What are two tasks the teenagers do?",
      "Markiere im Text je ein Belegwort fuer jede Antwort.",
      "Schreibe danach einen eigenen Satz: I would/would not like this programme because ..."
    ],
    solution: "Moegliche Loesung: It is useful because students get work experience and feedback. Two tasks are preparing exhibits and writing labels for photos / talking to visitors. Belege: work experience, feedback, prepare small exhibits, write short labels, talk to visitors."
  },
  {
    title: "Englisch: Reading mini test - Tombstone style",
    steps: [
      "Lies den Text: The town of Silver Creek was a boomtown in the 1880s. Today, tourists do not see real gunfights there, but actors perform a living history show every afternoon. Some stories are based on facts, while others were made more dramatic in novels.",
      "Entscheide true/false: All stories about Silver Creek are completely factual.",
      "Erklaere kurz, warum.",
      "Finde drei U3-Woerter aus dem Tombstone-Wortfeld.",
      "Schreibe einen Website-Satz mit attract oder living history show."
    ],
    solution: "Loesung: false. The text says some stories are based on facts, while others were made more dramatic in novels. U3-Woerter: boomtown, gunfights, living history show, novels. Beispiel: The living history show attracts many visitors."
  },
  {
    title: "Englisch: Reading mini test - national park",
    steps: [
      "Lies den Text: Every spring, rangers invite local students to help with conservation work. The teenagers learn how desert animals adapt to heat, why visitors must stay on the trails and how signs can warn people about flash floods. They also write short posts for the park website.",
      "Waehle eine passende Ueberschrift.",
      "Beantworte: What do the teenagers learn about animals?",
      "Beantworte: Why are signs important?",
      "Schreibe danach zwei Saetze fuer einen internship report mit My main task was ... und I learned that ..."
    ],
    solution: "Moegliche Ueberschrift: Teenagers help protect a desert park. Animals: They learn how desert animals adapt to heat. Signs: Signs warn people about flash floods. Writing: My main task was helping with conservation work. I learned that desert animals adapt to heat."
  },
  {
    title: "Englisch: argumentierendes Schreiben",
    steps: [
      "Schreibe 80-100 Woerter zu einer Pro-/Contra-Frage.",
      "Nutze mindestens vier Starter: I think, One reason, For example, In conclusion.",
      "Unterstreiche alle linking words.",
      "Korrigiere danach nur Verben und Wortstellung."
    ],
    solution: "Musterstruktur: I think that ... One reason is that ... For example, ... However, ... In conclusion, ... Kontrolliere danach: Meinung, zwei Gruende, ein Beispiel, mindestens vier linking words, Verben und Wortstellung."
  },
  {
    title: "Englisch: Reading/Listening Belege",
    steps: [
      "Nimm vier englische Verstehensaufgaben.",
      "Schreibe die Antwort nicht allein auf.",
      "Notiere daneben ein Schluesselwort als Beleg.",
      "Wenn du keinen Beleg findest, markiere die Aufgabe gelb."
    ],
    solution: "Musterkontrolle: Jede Antwort braucht ein Schluesselwort aus der Frage und ein Belegwort aus Text oder Audio. Eine Antwort ohne Beleg ist noch nicht fertig."
  },
  {
    title: "Englisch: schriftlicher Vokabeltest",
    steps: [
      "Lasse dir 20 deutsche Bedeutungen diktieren oder abschreiben.",
      "Schreibe die englischen Woerter zuerst auf Papier.",
      "Kontrolliere danach Rechtschreibung und Wortart.",
      "Jedes falsche Wort: dreimal schreiben und einen eigenen Satz bilden."
    ],
    solution: "Kontrollschema: Bedeutung richtig? Rechtschreibung richtig? Wortart richtig? Eigener Satz sinnvoll? Bei Nein: Wort dreimal schreiben, dann einen neuen Satz bilden."
  },
  {
    title: "Englisch: Across Cultures 3 mediation",
    steps: [
      "Schreibe zuerst den Adressaten auf: an English-speaking friend.",
      "Notiere vier Pflichtwoerter: Indigenous peoples, culture, costume, respect.",
      "Schreibe 5 Saetze: The problem is ... / Some people think ... / Indigenous culture is ... / In my opinion ... / because ...",
      "Pruefe danach: keine Wort-fuer-Wort-Uebersetzung, einfache Verben, klare Information."
    ],
    solution: "Muster: Some people have a problem with Indigenous costumes because they are part of a real culture. For many Indigenous peoples, clothes and traditions are connected with history and respect. If people wear them only for fun, it can be disrespectful. In my opinion, people should learn about the culture first and avoid costumes that make fun of it."
  },
  {
    title: "Englisch: Across Cultures 3 Fakten sichern",
    steps: [
      "Schreibe sechs kurze Fakten auf Englisch.",
      "Nutze diese Starter: Indigenous peoples ... / Some reservations ... / The Trail of Tears ... / Assimilation means ... / Treaties were ... / Some costumes can be ...",
      "Unterstreiche in jedem Satz das wichtigste Fachwort.",
      "Lies die Saetze laut vor und verbessere nur die Verben."
    ],
    solution: "Beispielsaetze: Indigenous peoples lived in North America long before Europeans arrived. Some reservations have their own laws. The Trail of Tears was a forced journey west. Assimilation means that people are pushed to give up their culture. Treaties were often unfair or made under pressure. Some costumes can be disrespectful."
  },
  {
    title: "Englisch: Wortfamilien auf Papier",
    steps: [
      "Zeichne vier Spalten: noun, verb, adjective, example sentence.",
      "Trage acht U3-Woerter ein, zum Beispiel recruiter, pressure, struggle, witness, legendary.",
      "Schreibe zu jeder Familie einen kurzen englischen Satz.",
      "Markiere, welche Form im Satz wirklich gebraucht wird."
    ],
    solution: "Beispiel: legend -> legendary. The legendary gunfight made Tombstone famous. Regel: Erst pruefen, welche Wortart die Luecke braucht."
  },
  {
    title: "Englisch: Genre und Atmosphaere",
    steps: [
      "Lies zwei kurze Erzaehlabschnitte.",
      "Erstelle eine Tabelle: setting, atmosphere, people, clothes, action, body language.",
      "Notiere pro Feld nur Stichworte.",
      "Schreibe danach drei Saetze: The first text is more ..., because ..."
    ]
  },
  {
    title: "Englisch: Fortsetzung schreiben",
    steps: [
      "Markiere im Ausgangstext: narrator, tense, atmosphere, problem.",
      "Schreibe 50-100 Woerter weiter.",
      "Bleibe in derselben Erzaehlperspektive und Zeit.",
      "Baue mindestens drei Atmosphaere-Woerter ein."
    ],
    solution: "Kontrollschema: Gleiche Perspektive? Gleiche Zeitform? Atmosphaere erhalten? Problem weitergefuehrt? Mindestens drei passende Atmosphaere-Woerter?"
  },
  {
    title: "Mathe: Decoder fuer lineare Textaufgaben",
    steps: [
      "Zeichne eine Tabelle mit fuenf Zeilen: x, y, Startwert b, Steigung m, Gleichung.",
      "Aufgabe: Eine Regentonne ist 50 cm gefuellt. Das Wasser steigt in 10 Minuten um 1 cm.",
      "Fuellerst du die Tabelle aus, ohne direkt eine Gleichung zu schreiben.",
      "Schreibe danach die Gleichung und einen Antwortsatz zur Bedeutung von m."
    ]
  },
  {
    title: "Mathe: Punktprobe auf Papier",
    steps: [
      "Pruefe: Liegt P(1,5 | 5,25) auf y = 3,5x?",
      "Schreibe drei Zeilen: x einsetzen, y vergleichen, Antwortsatz.",
      "Der Antwortsatz muss mit 'Der Punkt liegt ...' beginnen.",
      "Erfinde danach einen zweiten Punkt, der nicht auf dem Graphen liegt."
    ]
  },
  {
    title: "Mathe: Papiertraining Graph",
    steps: [
      "Diese Aufgabe wird nicht in der App geloest, sondern mit dem Vater auf Papier.",
      "Zeichne ein Koordinatensystem von -5 bis 8.",
      "Zeichne y = -0,5x + 1.",
      "Markiere den Startwert b orange und das Steigungsdreieck gruen.",
      "Kontrolliere mit zwei Punkten: (0 | 1) und (2 | 0)."
    ]
  },
  {
    title: "Mathe: Badewanne als Aussage pruefen",
    steps: [
      "Gegeben ist y = -12x + 150.",
      "Erklaere zuerst, warum die Badewanne entleert wird.",
      "Pruefe mit Rechnung: Nach 5 Minuten sind noch 90 l da.",
      "Pruefe mit Rechnung: Nach 12 Minuten ist die Badewanne leer."
    ]
  }
];

const conditionalSituations = [
  {
    type: "type1",
    focus: "main clause",
    title: "Type 1: main clause",
    prompt: "Choose the correct ending for a realistic situation.",
    sentence: "If I practise the U3 words every day, ...",
    answer: "I will remember them in the test.",
    wrong: ["I would remembered them in the test.", "I had remembered them in the test."],
    ok: "Type 1 fits because daily practice is a realistic condition with a possible future result.",
    help: "This is realistic, so use if + simple present and will/can + infinitive.",
    rule: "Type 1: If + simple present, will/can/should + infinitive. Use it for realistic conditions and possible results.",
    mistakes: {
      "I would remembered them in the test.": "would remembered ist doppelt falsch: would passt zu type 2, und nach would steht immer der Infinitiv remember, nicht remembered.",
      "I had remembered them in the test.": "had remembered ist past perfect. Das passt zu Vorzeitigkeit oder type 3, aber hier geht es um eine realistische Folge in der Zukunft."
    }
  },
  {
    type: "type1",
    focus: "main clause",
    title: "Type 1: main clause",
    prompt: "Choose the correct form.",
    sentence: "If the reading text gives evidence, I ___ the answer.",
    answer: "can check",
    wrong: ["would checked", "had checked"],
    ok: "Type 1 fits: the evidence can really help you check the answer.",
    help: "After if + simple present, the main clause can use can/will + infinitive.",
    rule: "Type 1 stays close to real life: If something happens, something can/will happen.",
    mistakes: {
      "would checked": "would checked ist keine richtige Verbform. Nach would steht der Infinitiv check. Ausserdem ist die Situation realistisch, deshalb passt can check.",
      "had checked": "had checked blickt in die Vergangenheit zurueck. Der Satz meint aber: Wenn es Belege gibt, kann ich jetzt oder in der Arbeit pruefen."
    }
  },
  {
    type: "type1",
    focus: "if-clause",
    title: "Type 1: if-clause",
    prompt: "Choose the correct if-clause.",
    sentence: "___, she will learn useful work skills.",
    answer: "If she joins the work experience programme",
    wrong: ["If she joined the work experience programme", "If she had joined the work experience programme"],
    ok: "This is a realistic future possibility, so the if-clause uses simple present.",
    help: "For type 1, do not use would in the if-clause.",
    rule: "Type 1: If she joins ..., she will learn ... The if-clause uses simple present.",
    mistakes: {
      "If she joined the work experience programme": "joined ist simple past und macht daraus type 2. Der zweite Satzteil hat aber will learn, also braucht der if-Satz type 1: joins.",
      "If she had joined the work experience programme": "had joined ist past perfect und wuerde zu type 3 gehoeren. Hier steht will learn, also geht es um eine moegliche Zukunft."
    }
  },
  {
    type: "type1",
    focus: "error repair",
    title: "Type 1: Fehler reparieren",
    prompt: "Which corrected sentence is right?",
    sentence: "Wrong: If I will ask my cousin, he will help me understand the text.",
    answer: "If I ask my cousin, he will help me understand the text.",
    wrong: ["If I would ask my cousin, he will help me understand the text.", "If I asked my cousin, he will helps me understand the text."],
    ok: "Correct. In a type 1 if-clause, use simple present, not will.",
    help: "The result can have will. The if-clause does not use will in type 1.",
    rule: "Type 1: If + simple present, will + infinitive. Do not put will into the if-clause.",
    mistakes: {
      "If I would ask my cousin, he will help me understand the text.": "would darf in diesem type-1-if-Satz nicht stehen. Die Bedingung ist realistisch: If I ask ..., he will help ...",
      "If I asked my cousin, he will helps me understand the text.": "asked macht den if-Satz zu type 2, aber will passt zu type 1. Ausserdem steht nach will der Infinitiv help, nicht helps."
    }
  },
  {
    type: "type1",
    focus: "two-part tense",
    title: "Type 1: beide Satzteile",
    prompt: "Choose the pair of verb forms.",
    sentence: "If I ___ in the children's activity center, I ___ new skills. (work / learn)",
    answer: "work / will learn",
    wrong: ["will work / learn", "worked / would learn"],
    ok: "Correct. Type 1 uses simple present in the if-clause and will + infinitive in the main clause.",
    help: "First clause after if: present. Result clause: will + infinitive.",
    rule: "Type 1 has two time choices: if-clause = simple present; main clause = will/can + infinitive.",
    mistakes: {
      "will work / learn": "will gehoert bei type 1 in den Hauptsatz, nicht direkt hinter if. Richtig ist: If I work ..., I will learn ...",
      "worked / would learn": "worked / would learn ist type 2. Der Satz trainiert aber eine realistische Moeglichkeit: work / will learn."
    }
  },
  {
    type: "type1",
    focus: "meaning",
    title: "Type 1 oder type 2?",
    prompt: "Which type fits the meaning?",
    sentence: "The weather forecast for tomorrow is good, so if it stays like this, we will go hiking.",
    answer: "type 1 because it is a real possibility",
    wrong: ["type 2 because it uses if", "type 3 because it is about the past"],
    ok: "Correct. Tomorrow's weather is a real possible condition.",
    help: "Do not decide only because you see if. Decide from meaning and verb forms.",
    rule: "Type 1 is for real or possible situations: if + present, will + infinitive.",
    mistakes: {
      "type 2 because it uses if": "if allein entscheidet nicht den Typ. stays ist simple present und will go ist will + Infinitiv: Das ist type 1.",
      "type 3 because it is about the past": "Der Satz nennt tomorrow und will go. Er schaut nach vorn, nicht in eine unwirkliche Vergangenheit."
    }
  },
  {
    type: "type2",
    focus: "if-clause",
    title: "Type 2: if-clause",
    prompt: "Choose the correct form for a hypothetical situation.",
    sentence: "If I ___ near Monument Valley, I would visit the desert.",
    answer: "lived",
    wrong: ["live", "will live"],
    ok: "Type 2 fits because the sentence imagines a situation that is not real now.",
    help: "Hypothetical condition: if + simple past, would + infinitive.",
    rule: "Type 2: If + simple past, would/could + infinitive. Use it for imagined or unlikely situations.",
    mistakes: {
      "live": "live waere simple present und passt zu type 1. Der Hauptsatz hat would visit, also braucht der if-Satz simple past: lived.",
      "will live": "will steht nicht im if-Satz. Bei type 2 steht dort simple past: If I lived ..., I would visit ..."
    }
  },
  {
    type: "type2",
    focus: "main clause",
    title: "Type 2: main clause",
    prompt: "Choose the correct ending.",
    sentence: "If more students joined the history project, ...",
    answer: "they would get more practice.",
    wrong: ["they will got more practice.", "they had got more practice."],
    ok: "The sentence imagines a possible change, so type 2 uses would + infinitive.",
    help: "Do not write would got. After would, use the infinitive: would get.",
    rule: "After would/could, use the infinitive without to: would get, would learn, could practise.",
    mistakes: {
      "they will got more practice.": "will got ist keine richtige Form. Nach will steht get. Weil der if-Satz joined hat, passt hier aber would get.",
      "they had got more practice.": "had got ist past perfect. Der Satz beschreibt keine fruehere Handlung, sondern eine gedachte Folge: would get."
    }
  },
  {
    type: "type2",
    focus: "whole sentence",
    title: "Type 2: ganzer Satz",
    prompt: "Which sentence is correct?",
    sentence: "Hypothetical: I do not have enough time now.",
    answer: "If I had more time, I would write a better text.",
    wrong: ["If I have more time, I would wrote a better text.", "If I will have more time, I write a better text."],
    ok: "This sentence imagines a different present situation.",
    help: "Type 2 uses simple past in the if-clause and would + infinitive in the main clause.",
    rule: "Type 2 does not mean past time here. The simple past form shows distance from reality.",
    mistakes: {
      "If I have more time, I would wrote a better text.": "have ist type 1, would gehoert aber zu type 2. Dazu kommt: Nach would steht write, nicht wrote.",
      "If I will have more time, I write a better text.": "will steht nicht im if-Satz. Fuer diese gedachte Gegenwart brauchst du: If I had ..., I would write ..."
    }
  },
  {
    type: "type2",
    focus: "two-part tense",
    title: "Type 2: beide Satzteile",
    prompt: "Choose the pair of verb forms.",
    sentence: "If Tayen ___ a wild horse, her mother ___ worried. (ride / be)",
    answer: "rode / would be",
    wrong: ["rides / will be", "would ride / was"],
    ok: "Correct. Type 2: rode in the if-clause, would be in the main clause.",
    help: "Do not put would into the if-clause. Put would into the result clause.",
    rule: "Type 2 has two time choices: if-clause = simple past; main clause = would/could + infinitive.",
    mistakes: {
      "rides / will be": "rides / will be ist type 1. Der Satz mit einem wilden Pferd ist hier als gedachte Situation angelegt, deshalb: rode / would be.",
      "would ride / was": "would gehoert in den Hauptsatz, nicht in den if-Satz. Nach if steht bei type 2 simple past: rode."
    }
  },
  {
    type: "type2",
    focus: "error repair",
    title: "Type 2: Fehler reparieren",
    prompt: "Which corrected sentence is right?",
    sentence: "Wrong: If she would go to a school close to the reservation, she could spend weekends at home.",
    answer: "If she went to a school close to the reservation, she could spend weekends at home.",
    wrong: ["If she will go to a school close to the reservation, she could spend weekends at home.", "If she went to a school close to the reservation, she can spends weekends at home."],
    ok: "Correct. Type 2 uses simple past in the if-clause, not would.",
    help: "would belongs to the main clause, not after if.",
    rule: "Type 2: If + simple past, would/could + infinitive. The if-clause does not use would.",
    mistakes: {
      "If she will go to a school close to the reservation, she could spend weekends at home.": "will gehoert nicht in den if-Satz. could im Hauptsatz zeigt type 2, also: If she went ...",
      "If she went to a school close to the reservation, she can spends weekends at home.": "can spends ist falsch: Nach can steht spend. Fuer type 2 ist noch besser: could spend."
    }
  },
  {
    type: "type2",
    focus: "were",
    title: "Type 2: If I were you",
    prompt: "Choose the correct form.",
    sentence: "If I ___ you, I would wear a scarf inside.",
    answer: "were",
    wrong: ["am", "will be"],
    ok: "Correct. The fixed phrase is: If I were you, I would ...",
    help: "This is advice with an imagined situation, so use type 2.",
    rule: "For advice, learn the chunk: If I were you, I would + infinitive.",
    mistakes: {
      "am": "am waere echte Gegenwart. Bei einem Rat stellst du dir vor, du waerst die andere Person: If I were you ...",
      "will be": "will be zeigt Zukunft, aber dieser Rat ist eine gedachte Situation. Der feste Ausdruck lautet: If I were you ..."
    }
  },
  {
    type: "type2",
    focus: "meaning",
    title: "Type 1 oder type 2?",
    prompt: "Which type fits the meaning?",
    sentence: "I do not have a cousin at the museum. If I had one, I would ask him.",
    answer: "type 2 because it is not real now",
    wrong: ["type 1 because it can happen tomorrow", "type 3 because it uses had"],
    ok: "Correct. had is simple past here, not past perfect. It shows an unreal present situation.",
    help: "In type 2, simple past can talk about an unreal present.",
    rule: "Type 2 often sounds like past, but it means unreal now: If I had ..., I would ...",
    mistakes: {
      "type 1 because it can happen tomorrow": "Der Satz sagt: I do not have a cousin. Es ist also nicht real jetzt. had + would ask zeigt type 2.",
      "type 3 because it uses had": "had allein ist hier simple past von have. Past perfect waere had had oder had asked. Deshalb ist es type 2."
    }
  },
  {
    type: "type3",
    focus: "if-clause",
    title: "Type 3: if-clause",
    prompt: "Choose the correct if-clause for a past situation.",
    sentence: "___, he would have learned more about the Navajo code talkers.",
    answer: "If Adam had attended the presentation",
    wrong: ["If Adam attended the presentation", "If Adam would attend the presentation"],
    ok: "Correct. Type 3 looks back: if + past perfect.",
    help: "For a past unreal condition, use had + past participle in the if-clause.",
    rule: "Type 3: If + past perfect, would have + past participle. Use it for unreal past situations.",
    mistakes: {
      "If Adam attended the presentation": "attended ist simple past. Der Hauptsatz would have learned zeigt aber type 3, also muss der if-Satz past perfect haben: had attended.",
      "If Adam would attend the presentation": "would gehoert nicht in den if-Satz. Bei type 3 steht dort had + past participle."
    }
  },
  {
    type: "type3",
    focus: "main clause",
    title: "Type 3: main clause",
    prompt: "Choose the correct result clause.",
    sentence: "If Tayen had injured herself while she was alone in the park, ...",
    answer: "she would have called a ranger.",
    wrong: ["she would call a ranger.", "she had called a ranger."],
    ok: "Correct. Type 3 result: would have + past participle.",
    help: "The result is also unreal past, so use would have called.",
    rule: "Type 3 main clause: would/could have + past participle.",
    mistakes: {
      "she would call a ranger.": "would call ist type 2. Der if-Satz hat had injured, also geht es um type 3: would have called.",
      "she had called a ranger.": "had called ist nur past perfect. Im Hauptsatz von type 3 brauchst du would have + past participle."
    }
  },
  {
    type: "type3",
    focus: "two-part tense",
    title: "Type 3: beide Satzteile",
    prompt: "Choose the pair of verb forms.",
    sentence: "If Adam ___ to New Mexico, he ___ the desert museum. (not go / not see)",
    answer: "had not gone / would not have seen",
    wrong: ["did not go / would not see", "would not go / had not seen"],
    ok: "Correct. Type 3 uses past perfect in the if-clause and would have + past participle in the main clause.",
    help: "Both parts point to an unreal past situation.",
    rule: "Type 3 has two time choices: if-clause = had + past participle; main clause = would have + past participle.",
    mistakes: {
      "did not go / would not see": "did not go / would not see mischt simple past mit type 2. Fuer eine unwirkliche Vergangenheit brauchst du had not gone / would not have seen.",
      "would not go / had not seen": "would steht nicht in den if-Satz. Ausserdem braucht der Hauptsatz would not have seen."
    }
  },
  {
    type: "mixed",
    focus: "type choice",
    title: "Typ erkennen",
    prompt: "Which sentence is type 1?",
    sentence: "Find the realistic future condition.",
    answer: "If I find the brochure, I will send it to the school.",
    wrong: ["If I found the brochure, I would send it to the school.", "If I had found the brochure, I would have sent it to the school."],
    ok: "Correct. type 1 uses present + will for a realistic future condition.",
    help: "Compare the verb forms in both sentence parts.",
    rule: "Type 1: present + will. Type 2: past + would. Type 3: past perfect + would have.",
    mistakes: {
      "If I found the brochure, I would send it to the school.": "found + would send ist type 2. Gesucht ist type 1, also present + will: find / will send.",
      "If I had found the brochure, I would have sent it to the school.": "had found + would have sent ist type 3. Gesucht ist die realistische Zukunft mit type 1."
    }
  },
  {
    type: "mixed",
    focus: "type choice",
    title: "Typ erkennen",
    prompt: "Which sentence is type 2?",
    sentence: "Find the imagined present condition.",
    answer: "If there was no electricity, people would get nervous.",
    wrong: ["If there is no electricity, people will get nervous.", "If there had been no electricity, people would have got nervous."],
    ok: "Correct. type 2 uses simple past + would for an imagined situation.",
    help: "was/were in the if-clause plus would in the main clause points to type 2.",
    rule: "Type 2: If + simple past, would/could + infinitive.",
    mistakes: {
      "If there is no electricity, people will get nervous.": "is + will get ist type 1. Gesucht ist eine gedachte Situation, deshalb: was / would get.",
      "If there had been no electricity, people would have got nervous.": "had been + would have got ist type 3. Gesucht ist type 2 fuer eine gedachte Gegenwart."
    }
  }
];

const understandingTasks = [
  {
    subject: "Mathe",
    task: "Eine Textaufgabe enthaelt mehrere Zahlen. Du sollst begruenden, welche Rechnung sinnvoll ist.",
    operator: "begründen",
    steps: [
      "Operator einkreisen: begruenden heisst nicht nur rechnen.",
      "Gegeben/Gesucht-Tabelle schreiben.",
      "Eine Rechnung waehlen und in einem Satz erklaeren.",
      "Antwortsatz mit Einheit schreiben."
    ]
  },
  {
    subject: "Mathe",
    task: "Berechne den gesuchten Wert und gib das Ergebnis mit Einheit an.",
    operator: "berechne",
    steps: [
      "Gesucht markieren.",
      "Gegebene Zahlen notieren.",
      "Passenden Rechenweg waehlen.",
      "Ergebnis pruefen: Einheit und Antwortsatz?"
    ]
  },
  {
    subject: "Englisch",
    task: "Read the text and give evidence for your answer.",
    operator: "give evidence",
    steps: [
      "Frage-Schluesselwort markieren.",
      "Textstelle suchen.",
      "Antwort waehlen.",
      "Ein Belegwort oder eine kurze Belegstelle dazuschreiben."
    ]
  },
  {
    subject: "Englisch",
    task: "Write a short report about a work experience programme.",
    operator: "write",
    steps: [
      "Thema in eigene Worte fassen.",
      "Ort, Zeit und Aufgabe notieren.",
      "Was gelernt wurde notieren.",
      "Mit where/when - tasks - what I learned - short opinion schreiben."
    ]
  },
  {
    subject: "Englisch",
    task: "Continue the story in 50-100 words.",
    operator: "continue",
    steps: [
      "Erzaehlperspektive markieren.",
      "Zeitform markieren.",
      "Atmosphaere in drei Stichworten notieren.",
      "Erst dann weiterschreiben."
    ]
  },
  {
    subject: "Englisch",
    task: "Compare the two texts and say which one is more interesting.",
    operator: "compare / give reasons",
    steps: [
      "Nicht sofort Meinung schreiben.",
      "Zwei Vergleichspunkte waehlen: atmosphere, action, people, body language.",
      "Pro Text ein Belegwort notieren.",
      "Dann erst den Antwortsatz schreiben."
    ]
  },
  {
    subject: "Englisch",
    task: "Use the word in a meaningful sentence.",
    operator: "use",
    steps: [
      "Wortart klaeren: noun, verb, adjective or phrase.",
      "Ein einfaches Satzmuster waehlen.",
      "Mindestens sechs Woerter schreiben.",
      "Pruefen: passt die Bedeutung wirklich?"
    ]
  },
  {
    subject: "Latein",
    task: "Markiere und beschrifte alle AcIs im Text.",
    operator: "markiere und beschrifte",
    steps: [
      "Kopfverben suchen.",
      "Akkusativ + Infinitiv finden.",
      "Nur die gefragten Teile markieren.",
      "KV, Akk, Inf und Zeitverhaeltnis dazuschreiben."
    ]
  },
  {
    subject: "Latein",
    task: "Uebersetze den folgenden lateinischen Text in angemessenes Deutsch.",
    operator: "übersetze",
    steps: [
      "Nicht sofort losschreiben.",
      "Finite Verben und moegliche AcIs markieren.",
      "Pronomen beziehen.",
      "Rohuebersetzung schreiben, danach Deutsch glaetten."
    ]
  }
];

const ruleTasks = [
  {
    subject: "Latein",
    rule: "AcI",
    trigger: "Kopfverb wie dicit, audit, videt, scit, sperat",
    example: "Servus dicit Domitium in viam cecidisse.",
    why: "Nach dicit steht Domitium + cecidisse. Der Akkusativ wird im Deutschen zum Subjekt des dass-Satzes.",
    transfer: "Bau einen eigenen Satz mit audio + Akkusativ + Infinitiv."
  },
  {
    subject: "Latein",
    rule: "Infinitiv Perfekt",
    trigger: "Formen wie fuisse, venisse, paravisse, reliquisse",
    example: "Spero servos cenam paravisse.",
    why: "paravisse zeigt, dass das Vorbereiten vorher passiert ist.",
    transfer: "Verändere den Satz so, dass Gleichzeitigkeit entsteht."
  },
  {
    subject: "Latein",
    rule: "se im AcI",
    trigger: "se steht im abhängigen Satz und verweist meist zurück",
    example: "Flavia scit se liberam esse.",
    why: "se bezieht sich auf Flavia, weil Flavia das Subjekt von scit ist.",
    transfer: "Schreibe einen Satz mit Quintus dicit se ..."
  },
  {
    subject: "Englisch",
    rule: "Conditional 1",
    trigger: "realistische Bedingung mit if",
    example: "If I practise the U3 words, I will understand the text faster.",
    why: "Die Bedingung ist realistisch. Deshalb steht im if-Satz simple present und im Hauptsatz will + Infinitiv.",
    transfer: "Schreibe einen eigenen Type-1-Satz mit practise und test."
  },
  {
    subject: "Englisch",
    rule: "Past perfect",
    trigger: "zwei Handlungen in der Vergangenheit",
    example: "After they had studied the map, they found the old trail.",
    why: "had studied ist frueher passiert als found.",
    transfer: "Schreibe einen eigenen Satz mit after + had + past participle."
  },
  {
    subject: "Englisch",
    rule: "Reading evidence",
    trigger: "true/false, short answer oder give evidence",
    example: "The answer is true because the paragraph says 'teenagers'.",
    why: "Ein Belegwort macht die Antwort kontrollierbar.",
    transfer: "Schreibe zu einer Reading-Antwort ein Belegwort auf."
  },
  {
    subject: "Mathe",
    rule: "Lineare Funktion im Text",
    trigger: "Startwert plus Veraenderung pro Schritt",
    example: "Ein Fass ist 50 cm gefuellt und steigt um 1 cm in 10 Minuten.",
    why: "50 ist der Startwert. 1 cm in 10 Minuten muss bei x = Minuten zu 0,1 cm pro Minute werden.",
    transfer: "Erfinde eine aehnliche Aufgabe mit Startwert und Veraenderung pro Zeit."
  }
];

const helpCards = {
  aci: {
    title: "Latein: AcI-Übersetzung",
    rule: "Kopfverb + Akkusativ + Infinitiv wird im Deutschen oft ein dass-Satz.",
    example: "Spero servos cenam paravisse. -> Ich hoffe, dass die Sklaven das Essen vorbereitet haben.",
    steps: [
      "Kopfverb suchen: spero.",
      "Akkusativ suchen: servos.",
      "Infinitiv suchen: paravisse.",
      "Zeit prüfen: paravisse = vorher passiert.",
      "Dass-Satz bauen."
    ],
    followUps: [
      "Scio Quintum venisse.",
      "Audio servum clamavisse.",
      "Dicit Flaviam fugisse."
    ],
    paper: "Schreibe einen eigenen AcI mit spero und einem Infinitiv Perfekt."
  },
  gerund: {
    title: "Englisch: Conditional 1-3",
    rule: "Der Typ entscheidet die Zeiten: type 1 realistisch, type 2 gedacht, type 3 unwirkliche Vergangenheit.",
    example: "If I practise the U3 words, I will understand the text faster.",
    steps: [
      "Bedeutung klaeren: realistisch, gedacht oder vergangen?",
      "if-clause markieren.",
      "main clause markieren.",
      "Zeiten vergleichen und Satz laut lesen."
    ],
    followUps: [
      "If I practise, I ___ remember more words. (will/would/would have)",
      "If I had more time, I ___ write a better answer. (will/would/would have)",
      "If she had checked the map, she ___ found the trail. (would have/would/will)"
    ],
    paper: "Schreibe je einen Satz zu type 1, type 2 und type 3."
  },
  linking: {
    title: "Englisch: Past perfect",
    rule: "Past perfect markiert, was frueher in der Vergangenheit passiert ist: had + past participle.",
    example: "After they had studied the map, they found the old trail.",
    steps: [
      "Zwei vergangene Handlungen finden.",
      "Fruehere Handlung markieren.",
      "Fruehere Handlung mit had + past participle bilden.",
      "Spaetere Handlung im simple past lassen."
    ],
    followUps: [
      "After Annie ___ the competition, she became famous. (win)",
      "They found the trail after they ___ the map. (study)",
      "She was nervous because she ___ the text. (not read)"
    ],
    paper: "Schreibe drei after/because-Saetze mit past perfect."
  },
  textproblem: {
    title: "Mathe: Lineare Textaufgabe decodieren",
    rule: "Vor dem Rechnen muss klar sein: Was ist x, was ist y, was ist der Startwert, was ist die Veraenderung pro 1 x?",
    example: "Ein Fass ist 50 cm gefuellt und steigt um 1 cm in 10 Minuten. Bei x = Minuten gilt: y = 0,1x + 50.",
    steps: [
      "x bestimmen: Zeit, Anzahl, Strecke oder Menge?",
      "y bestimmen: Was wird berechnet?",
      "Startwert markieren.",
      "Veraenderung pro Schritt markieren.",
      "Falls noetig auf pro 1 x umrechnen.",
      "Gleichung und Antwortsatz schreiben."
    ],
    followUps: [
      "Markiere x, y, m und b in einer Aufgabe, ohne zu rechnen.",
      "Schreibe einen Antwortsatz mit Einheit.",
      "Erfinde eine aehnliche Aufgabe mit anderen Zahlen."
    ],
    paper: "Fuelle die Decoder-Maske fuer eine lineare Bettermarks-Textaufgabe aus."
  }
};

const basics = {
  FUNCTION_RULE: "Eine Funktion ordnet jedem x-Wert genau einen y-Wert zu. Entscheidend ist also der linke Wert.",
  POINT_CHECK: "Bei einer Punktprobe setzt du den x-Wert ein, berechnest y und vergleichst mit dem y-Wert des Punktes oder der Aussage.",
  LINEAR_DECODER: "Eine lineare Textaufgabe hat meist Startwert b und Veraenderung m. Erst x, y, m und b klaeren, dann rechnen.",
  LINEAR_EQUATION: "In y = mx + b ist m die Veraenderung pro 1 x und b der Startwert bei x = 0.",
  LINEAR_GRAPH: "Die App trainiert Graph-Strategie: b erkennen, m als Schritt verstehen, Kontrollpunkte bestimmen. Gezeichnet wird auf Papier.",
  LINEAR_VALUE: "Zum Berechnen eines Werts setzt du die gegebene Zahl fuer x ein und rechnest Schritt fuer Schritt.",
  LINEAR_CONTEXT: "Im Kontext ist x die Eingabe, y das Ergebnis, m die Veraenderung pro Schritt und b der Anfangswert.",
  DARLEGEN: "Darlegen bedeutet: Ansatz, Rechnung und Antwortsatz. Bei linearen Funktionen kommt der Kontext mit Einheit dazu.",
  ACI_ERKENNEN: "Beim AcI suchst du zuerst Kopfverb, Akkusativ und Infinitiv.",
  ACI_ZEIT: "Der Infinitiv zeigt das Zeitverhaeltnis: Perfektinfinitiv auf -isse bedeutet vorher passiert.",
  PRONOMEN_BEZUG: "Bei Pronomen zuerst fragen: Auf welches Wort im Satz kann es sich grammatisch und inhaltlich beziehen?",
  KNG: "KNG heisst: Kasus, Numerus und Genus muessen zusammenpassen.",
  VOCAB: "Vokabeln muessen in beide Richtungen sicher werden: erkennen, schreiben, im Satz benutzen.",
  UEBERSETZUNG: "Uebersetzen beginnt mit Satzstruktur: Verb, Subjekt, Objekte und dann erst schoenes Deutsch.",
  VOCAB_FORM: "Bei Wortfamilien entscheidet die Luecke: Brauchst du Nomen, Verb, Adjektiv oder Person?",
  VOCAB_ACTIVE: "Aktiver Wortschatz wird sicher, wenn das Wort in einem eigenen Satz benutzt wird.",
  VOCAB_CATEGORY: "Wortfelder helfen beim Verstehen: nature, work, sports, technology, social issues.",
  VERB_PREP: "Verb + preposition als Chunk lernen: accuse of, warn about, adapt to, become involved in.",
  GRAMMAR_CONDITIONALS: "Conditionals erst nach Bedeutung unterscheiden: type 1 realistisch, type 2 hypothetisch.",
  GRAMMAR_PAST_PERFECT: "Past perfect markiert die fruehere Vergangenheit: had + past participle.",
  GRAMMAR_GERUND_INF: "Der Ausloeser entscheidet: enjoy/avoid/finish -> -ing; want/hope/decide -> to + infinitive.",
  LINKING: "Bei linking words zuerst die Beziehung bestimmen: Grund, Gegensatz, Ziel, Zeit oder Fall.",
  READING_EVIDENCE: "Bei Lese- und Hoeraufgaben braucht jede Antwort einen kleinen Beleg.",
  GENRE_READING: "Genre und Atmosphaere erkennst du an setting, Figuren, Woertern fuer Spannung und typischen Handlungen.",
  WRITING_STRUCTURE: "Ein Schreibtext braucht Plan: Aussage, Grund, Beispiel, Abschluss.",
  WRITING_PHRASES: "Useful phrases werden als ganze Bausteine gelernt: opening, task, reason, contrast, result.",
  WRITING_GRAMMAR: "Writing-Grammatik bedeutet: Zeitformen und Satzmuster gezielt benutzen, damit der Text klarer wird.",
  CONTINUATION_WRITING: "Beim Fortsetzen muessen Perspektive, Zeitform, Ort und Atmosphaere gleich bleiben."
};

let activeSubject = null;
const STORAGE_VERSION = "v1";

function key() {
  return `fsg-learning-${STORAGE_VERSION}`;
}

function initialState() {
  return {
    version: STORAGE_VERSION,
    latin: {},
    english: {},
    math: {},
    completed: 0,
    updatedAt: new Date().toISOString()
  };
}

function loadState() {
  return JSON.parse(localStorage.getItem(key()) || JSON.stringify(initialState()));
}

function saveState(state) {
  state.version = STORAGE_VERSION;
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(key(), JSON.stringify(state));
}

function scoreFor(domain, type) {
  const state = loadState();
  state[domain] = state[domain] || {};
  const item = state[domain][type] || { ok: 0, miss: 0 };
  return item;
}

function record(domain, type, correct) {
  const state = loadState();
  state[domain] = state[domain] || {};
  state[domain][type] = state[domain][type] || { ok: 0, miss: 0 };
  if (correct) state[domain][type].ok += 1;
  else state[domain][type].miss += 1;
  state.completed += 1;
  saveState(state);
  renderDashboard();
}

function statusClass(domain, type) {
  const { ok, miss } = scoreFor(domain, type);
  if (ok >= 3 && miss === 0) return "green";
  if (ok >= 2 && ok >= miss) return "yellow";
  return "red";
}

function chooseTask(domain, preferredType = null) {
  const domainTasks = domain === "english" ? likelyEnglishTasks() : tasks[domain];
  if (preferredType) {
    const pool = domainTasks.filter((task) => task.type === preferredType);
    if (pool.length) return pool[Math.floor(Math.random() * pool.length)];
  }
  const weakest = [...new Set(domainTasks.map((task) => task.type))]
    .sort((a, b) => {
      const sa = scoreFor(domain, a);
      const sb = scoreFor(domain, b);
      return (sb.miss - sb.ok * 0.5) - (sa.miss - sa.ok * 0.5);
    })[0];
  const pool = domainTasks.filter((task) => task.type === weakest);
  return pool[Math.floor(Math.random() * pool.length)];
}

function likelyEnglishTasks() {
  return tasks.english.filter((task) => englishCoreStages.has(stageOf(task)));
}

function reserveEnglishTasks() {
  return tasks.english.filter((task) => englishReserveStages.has(stageOf(task)));
}

function renderTask(domain, preferredType = null) {
  const task = chooseTask(domain, preferredType);
  const node = document.getElementById(`${domain}Task`);
  renderChoiceTaskNode(node, domain, task);
}

function renderChoiceTaskNode(node, domain, task, repeatCallback = () => renderTask(domain, task.type), paperContext = null) {
  node.innerHTML = `
    <div class="taskMeta">${escapeHtml(task.title)}</div>
    ${renderTaskMarkers(domain, task)}
    <div class="prompt">${task.prompt}</div>
    <div class="sentence">${task.sentence}</div>
    <div class="answers">
      ${task.options.map((option) => `<button class="answerButton" data-answer="${escapeHtml(option)}">${option}</button>`).join("")}
    </div>
    <div class="feedback" hidden></div>
    ${paperPromptForTask(domain, task, paperContext)}
  `;
  node.querySelectorAll(".answerButton").forEach((button) => {
    button.addEventListener("click", () => {
      const correct = button.dataset.answer === task.answer;
      record(domain, task.type, correct);
      lockAnswers(node, button, task.answer);
      const feedback = node.querySelector(".feedback");
      feedback.hidden = false;
      feedback.className = correct ? "feedback" : "feedback warn";
      feedback.innerHTML = buildFeedback({
        correct,
        domain,
        type: task.type,
        answer: task.answer,
        ok: task.ok,
        help: task.help,
        rule: task.rule,
        selected: button.dataset.answer,
        mistake: task.mistakes ? task.mistakes[button.dataset.answer] : null
      });
      const repeat = feedback.querySelector("[data-repeat-type]");
      repeat.addEventListener("click", repeatCallback);
    });
  });
}

function renderTaskMarkers(domain, task) {
  if (domain !== "english") return "";
  const stageLabel = {
    core: "Basis",
    ac3: "Across Cultures 3",
    text_smart: "Reserve: Text smart 2",
    u4_start: "Zusatz: U4 Anfang",
    u4_later: "Zusatz: U4 spaeter"
  }[stageOf(task)] || "Basis";
  const markers = task.markers || [
    ["Bereich", areas.english[task.type] || "Englisch"],
    ["Stufe", stageLabel]
  ];
  return `
    <div class="decoderMarks" aria-label="Decoder-Markierungen">
      <span class="stagePill ${stageOf(task)}">${escapeHtml(stageLabel)}</span>
      ${markers.map(([label, value]) => `
        <span class="decoderMark"><strong>${escapeHtml(label)}</strong>${escapeHtml(value)}</span>
      `).join("")}
    </div>
  `;
}

function paperPromptForTask(domain, task, paperContext = null) {
  if (domain !== "english") return "";
  const prompt = englishPaperPrompt(task, paperContext);
  if (!prompt) return "";
  return `
    <aside class="inlinePaper">
      <div>
        <span class="paperLabel">Papier</span>
        <strong>${escapeHtml(prompt.title)}</strong>
      </div>
      <ol>${prompt.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
    </aside>
  `;
}

function englishPaperPrompt(task, paperContext = null) {
  if (task.paperSteps) {
    return {
      title: "Satz auf Papier automatisieren",
      steps: task.paperSteps
    };
  }

  const vocabTypes = ["VOCAB_FORM", "VOCAB_ACTIVE", "VOCAB_CATEGORY", "VERB_PREP"];
  const grammarTypes = ["GRAMMAR_CONDITIONALS", "GRAMMAR_PAST_PERFECT", "GRAMMAR_GERUND_INF", "LINKING"];
  const readingTypes = ["READING_EVIDENCE", "GENRE_READING"];
  const writingTypes = ["WRITING_STRUCTURE", "WRITING_PHRASES", "WRITING_GRAMMAR", "CONTINUATION_WRITING"];

  if (paperContext === "writing") {
    return {
      title: "Writing auf Papier vorbereiten",
      steps: [
        "Schreibe erst den Texttyp auf: report, mediation, answer oder continuation.",
        "Notiere vier Bausteine: place/topic, task/information, detail/example, opinion/result.",
        "Formuliere vier englische Saetze auf Papier.",
        "Baue mindestens eine useful phrase und eine passende Grammatikform ein: past perfect, conditional oder linking word."
      ]
    };
  }

  if (paperContext === "reading") {
    return {
      title: "Beleg notieren",
      steps: [
        "Schreibe die Frageart auf: who, why, how, what oder evidence.",
        "Notiere ein Schluesselwort aus der Aufgabe.",
        "Schreibe eine moegliche Belegstelle als kurzen Ausdruck."
      ]
    };
  }

  if (paperContext === "conditionals") {
    return {
      title: "Conditionals automatisieren",
      steps: [
        "Schreibe den richtigen Satz vollstaendig ab.",
        "Markiere den if-clause blau und den main clause gruen.",
        "Schreibe die Zeiten daneben: present + will, past + would oder past perfect + would have.",
        "Erfinde einen zweiten Satz mit neuen Woertern aus U3."
      ]
    };
  }

  if (vocabTypes.includes(task.type)) {
    return {
      title: "Wort aktiv sichern",
      steps: [
        `Schreibe die richtige Loesung: ${task.answer}.`,
        "Schreibe einen eigenen englischen Satz mit diesem Wort oder Chunk.",
        "Markiere die Stelle, die du leicht verwechseln koenntest."
      ]
    };
  }

  if (grammarTypes.includes(task.type)) {
    return {
      title: "Regel in eigenen Satz uebertragen",
      steps: [
        "Schreibe die Regel in einem kurzen deutschen Satz.",
        "Schreibe einen neuen englischen Beispielsatz mit anderer Situation.",
        "Unterstreiche den Ausloeser und die richtige Form."
      ]
    };
  }

  if (readingTypes.includes(task.type)) {
    return {
      title: "Beleg notieren",
      steps: [
        "Schreibe die Frageart auf: who, why, how, what oder evidence.",
        "Notiere ein Schluesselwort aus der Aufgabe.",
        "Schreibe eine moegliche Belegstelle als kurzen Ausdruck."
      ]
    };
  }

  if (writingTypes.includes(task.type)) {
    return {
      title: "Mini-Absatz vorbereiten",
      steps: [
        "Schreibe erst den Texttyp auf: report, mediation, answer oder continuation.",
        "Notiere vier Bausteine: place/topic, task/information, detail/example, opinion/result.",
        "Formuliere vier englische Saetze auf Papier.",
        "Markiere useful phrases und pruefe die Verben."
      ]
    };
  }

  return null;
}

function lockAnswers(node, selectedButton, answer) {
  node.querySelectorAll(".answerButton").forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === answer) button.classList.add("isCorrect");
    if (button === selectedButton && button.dataset.answer !== answer) button.classList.add("isWrong");
  });
}

function buildFeedback({ correct, domain, type, answer, ok, help, rule, selected, mistake = null }) {
  const ruleText = rule || help || basics[type] || "Erst die Regel nennen, dann die Aufgabe loesen.";
  const whyText = mistake || help || ruleText;
  const label = areas[domain][type] || "Grundlage";
  const cleanOk = stripFeedbackLead(ok);
  const correction = correct
    ? `<div class="feedbackLine successLine"><span class="feedbackLabel">Richtig</span><p>${escapeHtml(cleanOk)}</p></div>`
    : `<div class="feedbackLine correctionLine"><span class="feedbackLabel">Korrektur</span><p>Richtig ist <span class="answerInline">${escapeHtml(answer)}</span>. Deine Wahl war <span class="answerInline">${escapeHtml(selected)}</span>.</p></div>`;
  const explanation = correct
    ? `<div class="feedbackLine"><span class="feedbackLabel">Regel</span><p>${escapeHtml(ruleText)}</p></div>`
    : `<div class="feedbackLine"><span class="feedbackLabel">Warum</span><p>${escapeHtml(whyText)}</p></div><div class="feedbackLine"><span class="feedbackLabel">Regel</span><p>${escapeHtml(ruleText)}</p></div>`;
  const next = correct
    ? "Noch eine Aufgabe aus diesem Bereich festigen"
    : "Gleichen Bereich sofort noch einmal ueben";
  return `
    <div class="feedbackBlock">
      ${correction}
      ${explanation}
      <div class="feedbackLine"><span class="feedbackLabel">Merkschritt</span><p>Sag die Regel einmal laut und loese dann eine aehnliche Aufgabe.</p></div>
      <button class="quiet feedbackAction" data-repeat-type="${escapeHtml(type)}">${next}: ${escapeHtml(label)}</button>
    </div>
  `;
}

function stripFeedbackLead(text) {
  return text.replace(/^(Correct|Yes|Right|Exactly|Good|Genau|Richtig|Ja|Sehr gut)\.\s*/i, "");
}

function renderGrammarTask() {
  const focus = document.getElementById("grammarFocus").value;
  const pool = likelyEnglishTasks().filter((task) => task.type === focus);
  const task = pool[Math.floor(Math.random() * pool.length)];
  renderChoiceTaskNode(document.getElementById("grammarTask"), "english", task, renderGrammarTask);
}

function renderEnglishModule(module = "exam") {
  document.querySelectorAll("[data-english-module]").forEach((button) => {
    button.classList.toggle("active", button.dataset.englishModule === module);
  });

  if (module === "exam") {
    renderTask("english");
    return;
  }

  if (module === "vocab") {
    renderEnglishVocabModule();
    return;
  }

  if (module === "conditionals") {
    renderConditionalTrainer();
    return;
  }

  if (module === "grammar") {
    renderEnglishFilteredTask(["GRAMMAR_CONDITIONALS", "GRAMMAR_PAST_PERFECT", "GRAMMAR_GERUND_INF", "LINKING", "VOCAB_FORM"], module);
    return;
  }

  if (module === "reading") {
    renderEnglishFilteredTask(["READING_EVIDENCE", "GENRE_READING"], module);
    return;
  }

  if (module === "writing") {
    renderEnglishWritingModule();
    return;
  }

  if (module === "reserve") {
    renderEnglishReserveModule();
    return;
  }

  renderEnglishPaperModule();
}

function renderEnglishFilteredTask(types, module) {
  const pool = likelyEnglishTasks().filter((task) => types.includes(task.type));
  if (!pool.length) {
    document.getElementById("englishTask").innerHTML = `
      <div class="feedback warn">Dieser Bereich ist im aktuellen Basisplan nicht freigegeben. Nutze ihn im Zusatzteil, wenn die Lehrerin ihn nennt.</div>
    `;
    return;
  }
  const task = pool[Math.floor(Math.random() * pool.length)];
  renderChoiceTaskNode(document.getElementById("englishTask"), "english", task, () => renderEnglishModule(module), module);
}

function renderEnglishWritingModule() {
  const types = ["WRITING_STRUCTURE", "WRITING_PHRASES", "WRITING_GRAMMAR", "CONTINUATION_WRITING", "GRAMMAR_CONDITIONALS", "GRAMMAR_PAST_PERFECT"];
  const pool = likelyEnglishTasks().filter((task) => types.includes(task.type));
  const task = pool[Math.floor(Math.random() * pool.length)];
  const node = document.getElementById("englishTask");
  renderChoiceTaskNode(node, "english", task, () => renderEnglishModule("writing"), "writing");
  node.insertAdjacentHTML("afterbegin", `
    <section class="writingCoach">
      <div>
        <div class="taskMeta">Writing-Kompass nach den Musterloesungen</div>
        <p>Guter Text: klare Textsorte, konkrete Details, passende linking words, richtige Zeitformen.</p>
      </div>
      <div class="phraseGrid">
        <span>My internship experience was with ...</span>
        <span>My main task was ...</span>
        <span>It was a great experience because ...</span>
        <span>At first ..., but after ...</span>
        <span>Once we had ..., we ...</span>
        <span>If I could ..., I would ...</span>
      </div>
    </section>
  `);
}

function renderEnglishReserveModule() {
  const pool = reserveEnglishTasks();
  const task = pool[Math.floor(Math.random() * pool.length)];
  const node = document.getElementById("englishTask");
  node.innerHTML = `
    <div class="reserveIntro">
      <div>
        <div class="taskMeta">Zusatzteil und Reserve</div>
        <div class="prompt">Text smart 2 und U4 nur nutzen, wenn diese Inhalte im Unterricht wirklich sichtbar werden. Der Basisweg bleibt U3 und Across Cultures 3.</div>
      </div>
      <button class="quiet feedbackAction" id="newReserveTask">Andere Zusatzaufgabe</button>
    </div>
    <div id="reserveTaskSlot"></div>
  `;
  renderChoiceTaskNode(
    document.getElementById("reserveTaskSlot"),
    "english",
    task,
    renderEnglishReserveModule,
    "reserve"
  );
  document.getElementById("newReserveTask").addEventListener("click", renderEnglishReserveModule);
}

function renderConditionalTrainer() {
  const node = document.getElementById("englishTask");
  if (!conditionalDataLoaded) {
    node.innerHTML = `
      <div class="paperBox">
        <div class="taskMeta">Conditionals</div>
        <div class="prompt">Die 400 neuen Satzbausteine werden geladen.</div>
        <div class="feedback">Danach mischt die App Type 1, Type 2, Type 3 und gemischte Aufgaben automatisch.</div>
      </div>
    `;
    loadConditionalData().then(renderConditionalTrainer).catch(() => {
      node.innerHTML = `
        <div class="paperBox">
          <div class="taskMeta">Conditionals</div>
          <div class="prompt">Die JSON-Dateien konnten nicht geladen werden.</div>
          <div class="feedback warn">Bitte pruefe, ob die Dateien im Ordner materials/conditionals liegen.</div>
        </div>
      `;
    });
    return;
  }

  const task = buildConditionalJsonTask();
  renderConditionalTask(node, task);
}

function loadConditionalData() {
  if (conditionalDataLoaded) return Promise.resolve();
  if (conditionalDataLoading) return conditionalDataLoading;
  conditionalDataLoading = Promise.all(Object.entries(conditionalSourceFiles).map(([key, source]) => (
    fetch(source)
      .then((response) => {
        if (!response.ok) throw new Error(source);
        return response.json();
      })
      .then((data) => {
        conditionalData[key] = normalizeConditionalEntries(data.entries || [], key).filter(isEndU3ConditionalEntry);
      })
  ))).then(() => {
    conditionalDataLoaded = true;
  });
  return conditionalDataLoading;
}

function normalizeConditionalEntries(entries, set) {
  return entries.map((entry, index) => {
    const fallbackType = set === "type1" ? 1 : set === "type2" ? 2 : set === "type3" ? 3 : Number(entry.conditionalType || 1);
    return {
      ...entry,
      conditionalType: Number(entry.conditionalType || fallbackType),
      id: entry.id || `${set}-${index + 1}`
    };
  });
}

function isEndU3ConditionalEntry(entry) {
  const text = [
    entry.sentence,
    entry.ifClause,
    entry.mainClause,
    entry.cloze,
    entry.writingUseCase,
    entry.writingTaskConnection,
    entry.paragraphPrompt,
    ...(entry.vocabularyFocus || [])
  ].filter(Boolean).join(" ");
  return !/\b(U4|California|low-income|housing|coding|technology|tech|robotics|robot|challenging|registered|Bay Area|Silicon Valley)\b/i.test(text);
}

function buildConditionalJsonTask() {
  const pool = getConditionalPool();
  const entry = chooseFreshConditional(pool);
  const mode = resolveConditionalMode();
  if (mode === "type") return buildConditionalTypeTask(entry);
  if (mode === "structure") return buildConditionalStructureTask(entry);
  if (mode === "clauses") return buildConditionalClauseTask(entry, pool);
  return buildConditionalClozeTask(entry);
}

function getConditionalPool() {
  const selected = conditionalSettings.set;
  if (selected === "mixed") return conditionalData.mixed.length ? conditionalData.mixed : [...conditionalData.type1, ...conditionalData.type2, ...conditionalData.type3];
  return conditionalData[selected].length ? conditionalData[selected] : conditionalData.mixed;
}

function chooseFreshConditional(pool) {
  const fresh = pool.filter((entry) => !recentConditionalIds.includes(entry.id));
  const source = fresh.length ? fresh : pool;
  const entry = source[Math.floor(Math.random() * source.length)];
  recentConditionalIds = [entry.id, ...recentConditionalIds.filter((id) => id !== entry.id)].slice(0, 30);
  return entry;
}

function resolveConditionalMode() {
  if (conditionalSettings.mode !== "random") return conditionalSettings.mode;
  const modes = conditionalSettings.set === "mixed"
    ? ["cloze", "type", "structure", "clauses"]
    : ["cloze", "structure", "clauses"];
  return modes[Math.floor(Math.random() * modes.length)];
}

function buildConditionalClozeTask(entry) {
  const answer = entry.clozeAnswer || entry.modalInMainClause || modalAnswerForType(entry.conditionalType);
  const sentence = entry.cloze && entry.cloze.includes("___")
    ? entry.cloze
    : entry.sentence.replace(answer, "___");
  const wrong = conditionalModalDistractors(entry.conditionalType, answer);
  return conditionalTaskFromEntry(entry, {
    title: `${conditionalTypeLabels[entry.conditionalType]}: Luecke`,
    prompt: "Choose the correct verb block.",
    sentence,
    answer,
    options: shuffle([answer, ...wrong]).slice(0, 4),
    ok: `Richtig. ${answer} passt zur Struktur: ${entry.structure || conditionalStructures[entry.conditionalType]}.`,
    help: conditionalHelpForType(entry.conditionalType),
    mistakes: buildConditionalOptionMistakes(entry, wrong, "cloze")
  });
}

function buildConditionalTypeTask(entry) {
  const answer = conditionalTypeLabels[entry.conditionalType];
  const wrong = Object.values(conditionalTypeLabels).filter((label) => label !== answer);
  return conditionalTaskFromEntry(entry, {
    title: "Conditional-Typ erkennen",
    prompt: "Which conditional type is this sentence?",
    sentence: entry.sentence,
    answer,
    options: shuffle([answer, ...wrong]),
    ok: `Richtig. Die Formen zeigen ${answer}: ${entry.structure || conditionalStructures[entry.conditionalType]}.`,
    help: "Entscheide nicht nur nach if. Pruefe beide Satzteile: if-clause und main clause.",
    mistakes: Object.fromEntries(wrong.map((option) => [option, typeMismatchExplanation(entry, option)]))
  });
}

function buildConditionalStructureTask(entry) {
  const answer = conditionalStructures[entry.conditionalType];
  const wrong = Object.entries(conditionalStructures)
    .filter(([type]) => Number(type) !== entry.conditionalType)
    .map(([, structure]) => structure);
  return conditionalTaskFromEntry(entry, {
    title: `${conditionalTypeLabels[entry.conditionalType]}: Struktur`,
    prompt: "Which structure explains the sentence?",
    sentence: entry.sentence,
    answer,
    options: shuffle([answer, ...wrong]),
    ok: `Richtig. Im Satz steht: ${entry.ifClause} / ${entry.mainClause}.`,
    help: "Markiere zuerst den if-clause, dann den main clause. Danach bestimmst du die Zeiten.",
    mistakes: Object.fromEntries(wrong.map((option) => [option, structureMismatchExplanation(entry, option)]))
  });
}

function buildConditionalClauseTask(entry, pool) {
  const otherClauses = shuffle(pool
    .filter((candidate) => candidate.id !== entry.id && candidate.ifClause !== entry.ifClause)
    .map((candidate) => candidate.ifClause))
    .slice(0, 2);
  return conditionalTaskFromEntry(entry, {
    title: `${conditionalTypeLabels[entry.conditionalType]}: Satzteile`,
    prompt: "Which if-clause belongs to this main clause?",
    sentence: entry.mainClause,
    answer: entry.ifClause,
    options: shuffle([entry.ifClause, ...otherClauses]),
    ok: "Richtig. Beide Satzteile gehoeren inhaltlich und grammatisch zusammen.",
    help: "Der if-clause muss zur Bedeutung und zur Conditional-Struktur des main clause passen.",
    mistakes: Object.fromEntries(otherClauses.map((option) => [option, clauseMismatchExplanation(entry, option)]))
  });
}

function conditionalTaskFromEntry(entry, task) {
  return {
    type: "GRAMMAR_CONDITIONALS",
    sourceId: entry.id,
    conditionalType: entry.conditionalType,
    writingUseCase: entry.writingUseCase,
    writingFunction: entry.writingFunction,
    vocabularyFocus: entry.vocabularyFocus || [],
    paragraphPrompt: entry.paragraphPrompt,
    title: task.title,
    prompt: task.prompt,
    sentence: task.sentence,
    options: task.options,
    answer: task.answer,
    ok: task.ok,
    help: task.help,
    rule: conditionalRules[entry.conditionalType],
    bookSignal: conditionalBookSignals[entry.conditionalType],
    bookExample: conditionalBookExamples[entry.conditionalType],
    mistakes: task.mistakes,
    paperSteps: conditionalPaperSteps(entry)
  };
}

function renderConditionalTask(node, task) {
  node.innerHTML = `
    ${buildConditionalControls()}
    <div class="taskMeta">${escapeHtml(task.title)} · ${escapeHtml(task.writingUseCase || "writing scaffold")}</div>
    <div class="prompt">${escapeHtml(task.prompt)}</div>
    <div class="sentence">${escapeHtml(task.sentence)}</div>
    <div class="conditionalHintGrid">
      <span><strong>Typ</strong>${escapeHtml(conditionalTypeLabels[task.conditionalType])}</span>
      <span><strong>Buchsignal</strong>${escapeHtml(task.bookSignal)}</span>
      <span><strong>Writing</strong>${escapeHtml(task.writingFunction || "sentence building")}</span>
      <span><strong>Vokabeln</strong>${escapeHtml(task.vocabularyFocus.length ? task.vocabularyFocus.join(", ") : "U3")}</span>
    </div>
    <div class="answers">
      ${task.options.map((option) => `<button class="answerButton" data-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("")}
    </div>
    <div class="feedback" hidden></div>
    ${paperPromptForTask("english", task, "conditionals")}
  `;

  node.querySelectorAll("[data-cond-set]").forEach((button) => {
    button.addEventListener("click", () => {
      conditionalSettings.set = button.dataset.condSet;
      renderConditionalTrainer();
    });
  });
  node.querySelectorAll("[data-cond-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      conditionalSettings.mode = button.dataset.condMode;
      renderConditionalTrainer();
    });
  });
  node.querySelector("[data-cond-next]").addEventListener("click", renderConditionalTrainer);
  node.querySelectorAll(".answerButton").forEach((button) => {
    button.addEventListener("click", () => {
      const correct = button.dataset.answer === task.answer;
      record("english", task.type, correct);
      lockAnswers(node, button, task.answer);
      const feedback = node.querySelector(".feedback");
      feedback.hidden = false;
      feedback.className = correct ? "feedback" : "feedback warn";
      feedback.innerHTML = buildFeedback({
        correct,
        domain: "english",
        type: task.type,
        answer: task.answer,
        ok: task.ok,
        help: task.help,
        rule: task.rule,
        selected: button.dataset.answer,
        mistake: task.mistakes ? task.mistakes[button.dataset.answer] : null
      });
      feedback.querySelector("[data-repeat-type]").addEventListener("click", renderConditionalTrainer);
    });
  });
}

function buildConditionalControls() {
  const setButtons = Object.entries(conditionalLabels).map(([key, label]) => (
    `<button class="miniToggle ${conditionalSettings.set === key ? "active" : ""}" data-cond-set="${key}">${label}</button>`
  )).join("");
  const modeButtons = Object.entries(conditionalModes).map(([key, label]) => (
    `<button class="miniToggle ${conditionalSettings.mode === key ? "active" : ""}" data-cond-mode="${key}">${label}</button>`
  )).join("");
  return `
    <div class="conditionalTrainerBar">
      <div><span class="barLabel">Typ</span>${setButtons}</div>
      <div><span class="barLabel">Modus</span>${modeButtons}</div>
      <button class="miniToggle nextToggle" type="button" data-cond-next="true">Neue Zufallsaufgabe</button>
    </div>
  `;
}

function modalAnswerForType(type) {
  if (type === 1) return "will";
  if (type === 2) return "would";
  return "would have";
}

function conditionalModalDistractors(type, answer) {
  const pools = {
    1: ["would", "had", "would have", "will have"],
    2: ["will", "had", "would have", "will have"],
    3: ["would", "will", "had", "will have"]
  };
  return pools[type].filter((item) => item !== answer).slice(0, 3);
}

function conditionalHelpForType(type) {
  if (type === 1) return "Realistische Bedingung: if + simple present, danach will/can/should + Infinitiv.";
  if (type === 2) return "Gedachte Situation: if + simple past, danach would/could/might + Infinitiv.";
  return "Unwirkliche Vergangenheit: if + past perfect, danach would/could/might have + past participle.";
}

function buildConditionalOptionMistakes(entry, wrongOptions, mode) {
  return Object.fromEntries(wrongOptions.map((option) => {
    if (entry.conditionalType === 1) {
      return [option, `${option} passt hier nicht, weil der Satz eine realistische Bedingung ausdrueckt. In Type 1 steht im main clause will/can/should + Infinitiv, nicht die Form von Type 2 oder Type 3.`];
    }
    if (entry.conditionalType === 2) {
      return [option, `${option} passt hier nicht, weil der Satz eine gedachte Situation ausdrueckt. Type 2 braucht would/could/might + Infinitiv im main clause.`];
    }
    return [option, `${option} passt hier nicht, weil der Satz auf eine unwirkliche Vergangenheit zurueckblickt. Type 3 braucht would/could/might have + past participle.`];
  }));
}

function typeMismatchExplanation(entry, option) {
  const chosen = Number(option.replace("Conditional ", ""));
  return `Das waere ${option}, aber der Satz zeigt ${conditionalTypeLabels[entry.conditionalType]}: ${entry.structure || conditionalStructures[entry.conditionalType]}. Pruefe beide Satzteile, nicht nur das Wort if.`;
}

function structureMismatchExplanation(entry, option) {
  return `Diese Struktur passt nicht zu den Verbformen im Satz. Hier steht: ${entry.ifClause} / ${entry.mainClause}. Das ist ${conditionalStructures[entry.conditionalType]}.`;
}

function clauseMismatchExplanation(entry, option) {
  return `${option} passt nicht sauber zum main clause "${entry.mainClause}". Der richtige if-clause ist "${entry.ifClause}", weil Bedeutung und Verbform zusammengehoeren.`;
}

function conditionalPaperSteps(entry) {
  return [
    `Schreibe den ganzen Satz ab: ${entry.sentence}`,
    `Markiere den if-clause: ${entry.ifClause}`,
    `Markiere den main clause: ${entry.mainClause}`,
    `Vergleiche mit dem Buchsignal: ${conditionalBookSignals[entry.conditionalType]}`,
    `Notiere die Struktur: ${entry.structure || conditionalStructures[entry.conditionalType]}`,
    entry.paragraphPrompt || "Schreibe danach einen zweiten eigenen Satz mit anderem U3-Wortschatz."
  ];
}

function renderEnglishVocabModule() {
  const item = chooseVocab("english");
  const node = document.getElementById("englishTask");
  node.innerHTML = `${buildChoiceTask("english", "VOCAB_ACTIVE", item, "Welche Loesung passt?", item.sentence, item.solution)}
    <aside class="inlinePaper">
      <div>
        <span class="paperLabel">Papier</span>
        <strong>Vokabel wirklich koennen</strong>
      </div>
      <ol>
        <li>Schreibe die richtige Loesung: ${escapeHtml(item.solution)}.</li>
        <li>Schreibe die Bedeutung: ${escapeHtml(item.meaning)}.</li>
        <li>Schreibe einen eigenen Satz mit dem Wort.</li>
      </ol>
    </aside>`;
  attachChoiceHandlers(node, "english", "VOCAB_ACTIVE", item.solution, `Richtig. ${item.hint}`, item.hint, renderEnglishVocabModule, item.rule);
}

function renderEnglishPaperModule() {
  const englishTasks = paperTasks.filter((task) => task.title.startsWith("Englisch:"));
  const task = englishTasks[Math.floor(Math.random() * englishTasks.length)];
  document.getElementById("englishTask").innerHTML = `
    <div class="paperBox">
      <div class="taskMeta">${task.title}</div>
      <ol>${task.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
      <div class="feedback">Dieser Auftrag gehoert zum Englischtraining und soll schriftlich bearbeitet werden.</div>
      ${task.solution ? `
        <button class="quiet revealEnglishSolution">Musterloesung / Kontrollblick zeigen</button>
        <div class="feedback solutionBox" hidden>${escapeHtml(task.solution)}</div>
      ` : ""}
      <button class="quiet feedbackAction" id="newEnglishPaperTask">Neuer Englisch-Papierauftrag</button>
    </div>
  `;
  const reveal = document.querySelector("#englishTask .revealEnglishSolution");
  if (reveal) {
    reveal.addEventListener("click", () => {
      document.querySelector("#englishTask .solutionBox").hidden = false;
      reveal.disabled = true;
    });
  }
  document.getElementById("newEnglishPaperTask").addEventListener("click", () => renderEnglishModule("paper"));
}

function renderDashboard() {
  renderStatus("latin");
  renderStatus("english");
  renderStatus("math");
  renderRecommendation();
}

function renderStatus(domain) {
  const node = document.getElementById(`${domain}Status`);
  node.innerHTML = Object.entries(areas[domain]).map(([type, label]) => {
    const score = scoreFor(domain, type);
    const cls = statusClass(domain, type);
    return `
      <div class="statusRow">
        <span class="dot ${cls}"></span>
        <strong>${label}</strong>
        <span>${score.ok} richtig / ${score.miss} Luecke</span>
      </div>
    `;
  }).join("");
}

function renderRecommendation() {
  const state = loadState();
  const all = [];
  for (const domain of ["latin", "english", "math"]) {
    for (const [type, label] of Object.entries(areas[domain])) {
      const score = state[domain][type] || { ok: 0, miss: 0 };
      all.push({ domain, type, label, weight: score.miss - score.ok * 0.4 });
    }
  }
  all.sort((a, b) => b.weight - a.weight);
  const next = all[0];
  const domainName = next.domain === "latin" ? "Latein" : next.domain === "english" ? "Englisch" : "Mathe";
  document.getElementById("recommendation").innerHTML = `
    <strong>${domainName}: ${next.label}</strong>
    <span>Starte mit einer kurzen Aufgabe. Wenn sie falsch ist, bleibt das System in diesem Bereich, bis Sicherheit entsteht.</span>
  `;
}

function renderPaperTask() {
  const task = paperTasks[Math.floor(Math.random() * paperTasks.length)];
  document.getElementById("paperTask").innerHTML = `
    <div class="paperBox">
      <div class="taskMeta">${task.title}</div>
      <ol>${task.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
      <div class="feedback">Dieser Teil soll bewusst handschriftlich gemacht werden, weil die Arbeit Schreiben und Struktur verlangt.</div>
      ${task.solution ? `
        <button class="quiet revealSolution">Musterloesung / Kontrollblick zeigen</button>
        <div class="feedback solutionBox" hidden>${escapeHtml(task.solution)}</div>
      ` : ""}
    </div>
  `;
  const reveal = document.querySelector("#paperTask .revealSolution");
  if (reveal) {
    reveal.addEventListener("click", () => {
      document.querySelector("#paperTask .solutionBox").hidden = false;
      reveal.disabled = true;
    });
  }
}

function chooseVocab(subject) {
  const type = subject === "latin" ? "VOCAB" : "VOCAB_ACTIVE";
  const words = subject === "english" ? activeEnglishVocab() : vocab[subject];
  const misses = scoreFor(subject, type).miss;
  const index = (loadState().completed + misses) % words.length;
  return words[index];
}

function activeEnglishVocab() {
  return vocab.english.filter((item) => item.lesson === "U3" || item.lesson === "AC3");
}

function renderVocabTask() {
  const subject = document.getElementById("vocabSubject").value;
  const mode = document.getElementById("vocabMode").value;
  const item = chooseVocab(subject);
  const node = document.getElementById("vocabTask");
  const type = subject === "latin" ? "VOCAB" : "VOCAB_ACTIVE";

  if (mode === "card") {
    node.innerHTML = `
      <div class="flashcard">
        <div class="tagRow">
          <span class="tag">${subject === "latin" ? "Latein" : "Englisch"}</span>
          <span class="tag">${item.lesson}</span>
          <span class="tag">${item.category}</span>
        </div>
        <div class="vocabWord">${item.word}</div>
        <button class="primary" id="revealVocab">Rueckseite zeigen</button>
        <div id="vocabBack" hidden>
          <div class="vocabMeaning">${item.meaning}</div>
          <div class="feedback">${item.hint}</div>
        </div>
      </div>
    `;
    document.getElementById("revealVocab").addEventListener("click", () => {
      document.getElementById("vocabBack").hidden = false;
      record(subject, type, true);
    });
    return;
  }

  if (mode === "paper") {
    node.innerHTML = `
      <div class="paperBox">
        <div class="taskMeta">Papierauftrag Vokabeln</div>
        <div class="prompt">${item.word}</div>
        <ol>
          <li>Schreibe das Wort dreimal sauber ab.</li>
          <li>Schreibe die Bedeutung daneben: ${item.meaning}.</li>
          <li>Schreibe den Beispielsatz mit Loesung: ${item.sentence.replace("___", item.solution)}.</li>
          <li>Notiere die Fehlerfalle: ${item.hint}</li>
        </ol>
      </div>
    `;
    record(subject, type, true);
    return;
  }

  if (mode === "cloze") {
    node.innerHTML = buildChoiceTask(subject, type, item, "Welche Form passt in die Luecke?", item.sentence, item.solution);
    attachChoiceHandlers(node, subject, type, item.solution, `Richtig. ${item.hint}`, item.hint, renderVocabTask, item.rule || null, item.mistakes || null);
    return;
  }

  if (mode === "context") {
    node.innerHTML = buildChoiceTask(subject, type, item, "Welche Aussage passt zu diesem Wort?", item.word, item.hint);
    attachChoiceHandlers(node, subject, type, item.hint, `Ja. ${item.word}: ${item.meaning}`, `Schau auf die Kategorie: ${item.category}.`, renderVocabTask, item.rule || null, item.mistakes || null);
    return;
  }

  node.innerHTML = buildChoiceTask(subject, type, item, "Welche Bedeutung passt?", item.word, item.meaning);
  attachChoiceHandlers(node, subject, type, item.meaning, `Richtig. ${item.word} bedeutet: ${item.meaning}.`, item.hint, renderVocabTask, item.rule || null, item.mistakes || null);
}

function buildChoiceTask(subject, type, item, prompt, sentence, answer) {
  const sourceWords = subject === "english" ? activeEnglishVocab() : vocab[subject];
  const distractors = sourceWords
    .filter((candidate) => candidate.word !== item.word)
    .slice(0, 8)
    .map((candidate) => prompt.includes("Aussage") ? candidate.hint : prompt.includes("Bedeutung") ? candidate.meaning : candidate.solution);
  const options = shuffle([answer, ...distractors.slice(0, 2)]);
  return `
    <div class="taskMeta">${item.lesson} · ${item.category}</div>
    <div class="prompt">${prompt}</div>
    <div class="sentence">${sentence}</div>
    <div class="answers">
      ${options.map((option) => `<button class="answerButton" data-answer="${escapeHtml(option)}">${option}</button>`).join("")}
    </div>
    <div class="feedback" hidden></div>
  `;
}

function attachChoiceHandlers(node, subject, type, answer, ok, help, repeatCallback = renderVocabTask, rule = null, mistakes = null) {
  node.querySelectorAll(".answerButton").forEach((button) => {
    button.addEventListener("click", () => {
      const correct = button.dataset.answer === answer;
      record(subject, type, correct);
      lockAnswers(node, button, answer);
      const feedback = node.querySelector(".feedback");
      feedback.hidden = false;
      feedback.className = correct ? "feedback" : "feedback warn";
      feedback.innerHTML = buildFeedback({
        correct,
        domain: subject,
        type,
        answer,
        ok,
        help,
        rule,
        selected: button.dataset.answer,
        mistake: mistakes ? mistakes[button.dataset.answer] : null
      });
      feedback.querySelector("[data-repeat-type]").addEventListener("click", repeatCallback);
    });
  });
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function renderUnderstandingTask() {
  const task = understandingTasks[Math.floor(Math.random() * understandingTasks.length)];
  document.getElementById("understandingTask").innerHTML = `
    <div class="paperBox">
      <div class="taskMeta">${task.subject}: Aufgabenverstaendnis</div>
      <div class="prompt">${task.task}</div>
      <div class="sentence">Operator: <strong>${task.operator}</strong></div>
      <ol>${task.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
      <div class="feedback">Erst wenn du sagen kannst, was am Ende auf dem Papier stehen muss, beginnt das Loesen.</div>
    </div>
  `;
}

function renderRuleTask() {
  const task = ruleTasks[Math.floor(Math.random() * ruleTasks.length)];
  document.getElementById("ruleTask").innerHTML = `
    <div class="paperBox">
      <div class="taskMeta">${task.subject}: ${task.rule}</div>
      <div class="prompt">${task.example}</div>
      <div class="sentence"><strong>Ausloeser:</strong> ${task.trigger}</div>
      <ol>
        <li>Vermute die Regel, bevor du die Loesung liest.</li>
        <li>Erklaere: ${task.why}</li>
        <li>Schreibe auf Papier: Woran erkenne ich diese Regel?</li>
        <li>Transfer: ${task.transfer}</li>
      </ol>
      <div class="feedback">Regel gilt erst als sicher, wenn du sie erklaeren und mit neuen Woertern anwenden kannst.</div>
    </div>
  `;
}

function renderHelpCard() {
  const card = helpCards[document.getElementById("helpTopic").value];
  document.getElementById("helpOutput").innerHTML = `
    <div class="paperBox">
      <div class="taskMeta">${card.title}</div>
      <div class="prompt">${card.rule}</div>
      <div class="sentence">${card.example}</div>
      <h3>Schritte</h3>
      <ol>${card.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
      <h3>Ähnliche Übungen</h3>
      <ol>${card.followUps.map((item) => `<li>${item}</li>`).join("")}</ol>
      <div class="feedback">${card.paper}</div>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

document.querySelectorAll(".nav").forEach((button) => {
  button.addEventListener("click", () => {
    showView(button.dataset.view, button.dataset.subject || null);
    if (button.dataset.englishModule) renderEnglishModule(button.dataset.englishModule);
  });
});

document.querySelectorAll("[data-go-view]").forEach((button) => {
  button.addEventListener("click", () => {
    const subject = button.dataset.startDomain || null;
    showView(button.dataset.goView, subject);
    if (button.dataset.startDomain === "english") renderEnglishModule("exam");
    else if (button.dataset.startDomain) renderTask(button.dataset.startDomain);
  });
});

function showView(view, subject = activeSubject) {
  activeSubject = view === "start" ? null : subject;
  document.querySelectorAll("[data-subject-nav]").forEach((item) => {
    item.hidden = item.dataset.subjectNav !== activeSubject;
  });
  document.querySelectorAll(".nav").forEach((item) => {
    const sameView = item.dataset.view === view;
    const sameSubject = !activeSubject || !item.dataset.subject || item.dataset.subject === activeSubject;
    item.classList.toggle("active", sameView && sameSubject);
  });
  document.querySelectorAll(".view").forEach((item) => item.classList.toggle("active", item.id === view));
}

document.querySelectorAll("[data-start]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.start === "english") renderEnglishModule("exam");
    else renderTask(button.dataset.start);
  });
});

document.querySelectorAll("[data-english-module]").forEach((button) => {
  button.addEventListener("click", () => renderEnglishModule(button.dataset.englishModule));
});

document.getElementById("newPaperTask").addEventListener("click", renderPaperTask);
document.getElementById("newUnderstandingTask").addEventListener("click", renderUnderstandingTask);
document.getElementById("newRuleTask").addEventListener("click", renderRuleTask);
document.getElementById("generateHelp").addEventListener("click", renderHelpCard);
document.getElementById("helpTopic").addEventListener("change", renderHelpCard);
document.getElementById("newVocabTask").addEventListener("click", renderVocabTask);
document.getElementById("vocabSubject").addEventListener("change", renderVocabTask);
document.getElementById("vocabMode").addEventListener("change", renderVocabTask);
document.getElementById("newGrammarTask").addEventListener("click", renderGrammarTask);
document.getElementById("grammarFocus").addEventListener("change", renderGrammarTask);

document.getElementById("resetProgress").addEventListener("click", () => {
  saveState(initialState());
  renderDashboard();
});

renderDashboard();
renderTask("latin");
renderEnglishModule("exam");
renderTask("math");
renderPaperTask();
renderUnderstandingTask();
renderRuleTask();
renderHelpCard();
renderVocabTask();
renderGrammarTask();
