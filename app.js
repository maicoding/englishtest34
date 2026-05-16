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
      type: "VOCAB_ACTIVE",
      title: "Active vocabulary",
      prompt: "Which word best completes the sentence?",
      sentence: "A job in technology can be ___ if you like solving problems.",
      options: ["challenging", "challenge", "challenged"],
      answer: "challenging",
      ok: "Right. challenging means demanding but interesting.",
      help: "The job has the quality of being demanding. It is not being challenged by another person.",
      rule: "challenging beschreibt eine Sache, die herausfordert. challenged beschreibt jemanden oder etwas, das herausgefordert wurde. A job can be challenging.",
      mistakes: {
        "challenge": "challenge ist kein passendes Adjektiv nach can be. Der Satz braucht eine Eigenschaft des Jobs: challenging.",
        "challenged": "challenged wuerde bedeuten, dass der Job herausgefordert wurde. Gemeint ist aber: Der Job fordert dich heraus, also challenging."
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
      prompt: "Which order is best for a short opinion paragraph?",
      sentence: "Write about low-income apartments in California.",
      options: [
        "opinion - reason - example - conclusion",
        "example - conclusion - random idea - opinion",
        "German notes - one English sentence"
      ],
      answer: "opinion - reason - example - conclusion",
      ok: "Yes. This structure is simple and works under pressure.",
      help: "Use: I think that ... One reason is ... For example ... In conclusion ..."
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
      type: "CONTINUATION_WRITING",
      title: "Continue a fictional text",
      prompt: "What must stay consistent?",
      sentence: "The text is written in first person past tense.",
      options: ["I-perspective and past tense", "future tense and third person", "bullet points"],
      answer: "I-perspective and past tense",
      ok: "Correct. Consistency is more important than a wild plot twist.",
      help: "Before writing, mark: narrator, tense, atmosphere, place, problem."
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
    title: "Englisch: Wortfamilien auf Papier",
    steps: [
      "Zeichne vier Spalten: noun, verb, adjective, example sentence.",
      "Trage acht Wortfamilien ein.",
      "Schreibe zu jeder Familie einen kurzen englischen Satz.",
      "Markiere, welche Form im Satz wirklich gebraucht wird."
    ],
    solution: "Beispiel: science -> scientist -> scientific. The scientist worked on robotics. Regel: Erst pruefen, welche Wortart die Luecke braucht."
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
    sentence: "If I practise the U4 words every day, ...",
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
    sentence: "___, she will learn useful tech skills.",
    answer: "If she joins the internship",
    wrong: ["If she joined the internship", "If she had joined the internship"],
    ok: "This is a realistic future possibility, so the if-clause uses simple present.",
    help: "For type 1, do not use would in the if-clause.",
    rule: "Type 1: If she joins ..., she will learn ... The if-clause uses simple present.",
    mistakes: {
      "If she joined the internship": "joined ist simple past und macht daraus type 2. Der zweite Satzteil hat aber will learn, also braucht der if-Satz type 1: joins.",
      "If she had joined the internship": "had joined ist past perfect und wuerde zu type 3 gehoeren. Hier steht will learn, also geht es um eine moegliche Zukunft."
    }
  },
  {
    type: "type1",
    focus: "error repair",
    title: "Type 1: Fehler reparieren",
    prompt: "Which corrected sentence is right?",
    sentence: "Wrong: If I will ask my cousin, he will help me get an internship.",
    answer: "If I ask my cousin, he will help me get an internship.",
    wrong: ["If I would ask my cousin, he will help me get an internship.", "If I asked my cousin, he will helps me get an internship."],
    ok: "Correct. In a type 1 if-clause, use simple present, not will.",
    help: "The result can have will. The if-clause does not use will in type 1.",
    rule: "Type 1: If + simple present, will + infinitive. Do not put will into the if-clause.",
    mistakes: {
      "If I would ask my cousin, he will help me get an internship.": "would darf in diesem type-1-if-Satz nicht stehen. Die Bedingung ist realistisch: If I ask ..., he will help ...",
      "If I asked my cousin, he will helps me get an internship.": "asked macht den if-Satz zu type 2, aber will passt zu type 1. Ausserdem steht nach will der Infinitiv help, nicht helps."
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
    sentence: "If I ___ in California, I would visit the desert.",
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
    sentence: "If more girls joined the coding club, ...",
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
    task: "Write a short paragraph about whether more girls should be encouraged to work in tech.",
    operator: "write",
    steps: [
      "Thema in eigene Worte fassen.",
      "Meinung festlegen.",
      "Grund und Beispiel notieren.",
      "Mit opinion - reason - example - conclusion schreiben."
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
    rule: "Gerund",
    trigger: "enjoy, avoid, finish, practise, mind",
    example: "Maya enjoys creating animations.",
    why: "enjoy ist der Auslöser für die -ing-Form.",
    transfer: "Schreibe einen eigenen Satz mit avoid + -ing."
  },
  {
    subject: "Englisch",
    rule: "to-infinitive",
    trigger: "want, hope, decide, plan, learn",
    example: "Leah wants to learn coding.",
    why: "want ist der Auslöser für to + infinitive.",
    transfer: "Schreibe einen eigenen Satz mit decide to ..."
  },
  {
    subject: "Englisch",
    rule: "Linking word nach Funktion",
    trigger: "Frage nach Beziehung: Warum, trotzdem, wozu, wann, falls?",
    example: "The club was started in order to help younger students.",
    why: "in order to zeigt ein Ziel.",
    transfer: "Schreibe je einen Satz mit because und although."
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
    title: "Englisch: Gerund/Infinitive",
    rule: "Der Auslöser entscheidet: enjoy/avoid/finish -> -ing; want/hope/decide -> to + infinitive.",
    example: "Maya enjoys creating animations. / Leah wants to learn coding.",
    steps: [
      "Wort vor der Lücke suchen.",
      "Auslöser einer Regel zuordnen.",
      "Form einsetzen.",
      "Satz einmal laut lesen."
    ],
    followUps: [
      "She avoids ___ personal data. (share)",
      "They decided ___ a club. (start)",
      "After ___ the text, he answered. (read)"
    ],
    paper: "Schreibe je einen Satz mit enjoy, want und after."
  },
  linking: {
    title: "Englisch: Linking Words",
    rule: "Nicht das Wort raten, sondern die Beziehung bestimmen: Grund, Gegensatz, Ziel, Zeit oder Fall.",
    example: "The club was started in order to help younger students.",
    steps: [
      "Satzteile lesen.",
      "Beziehung bestimmen.",
      "Passendes linking word wählen.",
      "Prüfen, ob der Satz grammatisch passt."
    ],
    followUps: [
      "I joined the workshop ___ I wanted to learn coding.",
      "___ it was difficult, I kept trying.",
      "Bring notes ___ you forget the details."
    ],
    paper: "Schreibe fünf Sätze: Grund, Gegensatz, Ziel, Zeit, Fall."
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
  const domainTasks = tasks[domain];
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

function renderTask(domain, preferredType = null) {
  const task = chooseTask(domain, preferredType);
  const node = document.getElementById(`${domain}Task`);
  renderChoiceTaskNode(node, domain, task);
}

function renderChoiceTaskNode(node, domain, task, repeatCallback = () => renderTask(domain, task.type), paperContext = null) {
  node.innerHTML = `
    <div class="taskMeta">${task.title}</div>
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
  const vocabTypes = ["VOCAB_FORM", "VOCAB_ACTIVE", "VOCAB_CATEGORY", "VERB_PREP"];
  const grammarTypes = ["GRAMMAR_CONDITIONALS", "GRAMMAR_PAST_PERFECT", "GRAMMAR_GERUND_INF", "LINKING"];
  const readingTypes = ["READING_EVIDENCE", "GENRE_READING"];
  const writingTypes = ["WRITING_STRUCTURE", "CONTINUATION_WRITING"];

  if (paperContext === "writing") {
    return {
      title: "Writing auf Papier vorbereiten",
      steps: [
        "Schreibe erst einen Plan: opinion, reason, example, conclusion.",
        "Formuliere vier englische Saetze auf Papier.",
        "Baue mindestens eine useful phrase und eine passende Grammatikform ein."
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
        "Erfinde einen zweiten Satz mit neuen Woertern aus U3/U4."
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
        "Schreibe erst einen Plan: opinion, reason, example, conclusion.",
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
  const pool = tasks.english.filter((task) => task.type === focus);
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
    renderEnglishFilteredTask(["WRITING_STRUCTURE", "CONTINUATION_WRITING", "LINKING", "GRAMMAR_CONDITIONALS"], module);
    return;
  }

  renderEnglishPaperModule();
}

function renderEnglishFilteredTask(types, module) {
  const pool = tasks.english.filter((task) => types.includes(task.type));
  const task = pool[Math.floor(Math.random() * pool.length)];
  renderChoiceTaskNode(document.getElementById("englishTask"), "english", task, () => renderEnglishModule(module), module);
}

function renderConditionalTrainer() {
  const base = conditionalSituations[Math.floor(Math.random() * conditionalSituations.length)];
  const task = {
    type: "GRAMMAR_CONDITIONALS",
    title: base.title,
    prompt: base.prompt,
    sentence: base.sentence,
    options: shuffle([base.answer, ...base.wrong]),
    answer: base.answer,
    ok: base.ok,
    help: base.help,
    rule: base.rule,
    mistakes: base.mistakes
  };
  renderChoiceTaskNode(document.getElementById("englishTask"), "english", task, renderConditionalTrainer, "conditionals");
}

function renderEnglishVocabModule() {
  const item = chooseVocab("english");
  const node = document.getElementById("englishTask");
  node.innerHTML = `${buildChoiceTask("english", "VOCAB_FORM", item, "Welche Form oder Bedeutung passt?", item.sentence, item.solution)}
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
  attachChoiceHandlers(node, "english", "VOCAB_FORM", item.solution, `Richtig. ${item.hint}`, item.hint, renderEnglishVocabModule, item.rule);
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
  const type = subject === "latin" ? "VOCAB" : "VOCAB_FORM";
  const words = vocab[subject];
  const misses = scoreFor(subject, type).miss;
  const index = (loadState().completed + misses) % words.length;
  return words[index];
}

function renderVocabTask() {
  const subject = document.getElementById("vocabSubject").value;
  const mode = document.getElementById("vocabMode").value;
  const item = chooseVocab(subject);
  const node = document.getElementById("vocabTask");
  const type = subject === "latin" ? "VOCAB" : "VOCAB_FORM";

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
    attachChoiceHandlers(node, subject, type, item.solution, `Richtig. ${item.hint}`, item.hint);
    return;
  }

  if (mode === "context") {
    node.innerHTML = buildChoiceTask(subject, type, item, "Welche Aussage passt zu diesem Wort?", item.word, item.hint);
    attachChoiceHandlers(node, subject, type, item.hint, `Ja. ${item.word}: ${item.meaning}`, `Schau auf die Kategorie: ${item.category}.`);
    return;
  }

  node.innerHTML = buildChoiceTask(subject, type, item, "Welche Bedeutung passt?", item.word, item.meaning);
  attachChoiceHandlers(node, subject, type, item.meaning, `Richtig. ${item.word} bedeutet: ${item.meaning}.`, item.hint);
}

function buildChoiceTask(subject, type, item, prompt, sentence, answer) {
  const distractors = vocab[subject]
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

function attachChoiceHandlers(node, subject, type, answer, ok, help, repeatCallback = renderVocabTask, rule = null) {
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
        mistake: item.mistakes ? item.mistakes[button.dataset.answer] : null
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
  return value.replace(/[&<>"']/g, (char) => ({
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
