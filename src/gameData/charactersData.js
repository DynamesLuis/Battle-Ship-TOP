import aldren from "../assets/characters/aldren.jpeg";
import brannic from "../assets/characters/brannic.jpeg";
import drogath from "../assets/characters/drogath.jpeg";
import elian from "../assets/characters/elian.jpeg";
import grik from "../assets/characters/grik.jpeg";
import korga from "../assets/characters/korga.jpeg";
import lyra from "../assets/characters/lyra.jpeg";
import maela from "../assets/characters/maela.jpeg";
import seraphine from "../assets/characters/seraphine.jpeg";
import tessa from "../assets/characters/tessa.jpeg";
import torren from "../assets/characters/torren.jpeg";
import veyra from "../assets/characters/veyra.jpeg";


const charactersData = {
  valedorn: [
    {
      id: "1",
      name: "Aldren Veyr",
      dialogues: {
        hit: [
          "Our strike has found its mark.",
          "Hold your ground. We have them where we want them.",
          "Valedorn stands firm.",
          "A disciplined strike is a decisive one.",
          "Their defenses are beginning to crumble.",
        ],

        miss: [
          "A miscalculation. We adjust and continue.",
          "The sea has denied us this time.",
          "Do not let one failure shake your resolve.",
          "Patience. The battle is far from over.",
          "We learn from every mistake.",
        ],

        sunk: [
          "Their vessel has been sent beneath the waves.",
          "Another enemy ship has fallen.",
          "One more threat removed from our path.",
          "Their defenses have been broken.",
          "Valedorn's fleet advances.",
        ],

        win: [
          "Valedorn stands victorious.",
          "We endured, and we prevailed.",
          "Our strength lies in standing together.",
          "The sea belongs to those who refuse to yield.",
          "Let this victory remind us what unity can achieve.",
        ],
      },

      img: aldren,
    },

    {
      id: "2",
      name: "Lyra Thalen",
      dialogues: {
        hit: [
          "Got you! I knew you were hiding there.",
          "The wind never lies. I just had to listen.",
          "A clean shot. Not bad, right?",
          "I knew that spot looked suspicious.",
          "Looks like the hunt is going well.",
        ],

        miss: [
          "Huh. Guess the wind fooled me.",
          "That was embarrassing.",
          "Fine, fine. I'll try again.",
          "The sea is playing tricks on me.",
          "One miss doesn't end the hunt.",
        ],

        sunk: [
          "There goes another one! What a beautiful shot.",
          "Down she goes! I hope you weren't attached to that ship.",
          "Another vessel lost to the hunt.",
          "Found it, struck it, sank it. Simple.",
          "The sea just claimed another prize.",
        ],

        win: [
          "Ha! I told you I'd find you.",
          "Now that's what I call a successful hunt.",
          "Looks like I win. You can admit I'm good.",
          "The hunt is over, and I got my prize.",
          "That was fun! We should do this again sometime.",
        ],
      },

      img: lyra,
    },

    {
      id: "3",
      name: "Brannic-7",
      dialogues: {
        hit: [
          "Target located. Hypothesis confirmed.",
          "Impact registered. Excellent.",
          "The probability model was correct.",
          "Their position has been successfully identified.",
          "One variable has been eliminated.",
        ],

        miss: [
          "Unexpected result.",
          "The probability calculation requires revision.",
          "Interesting. My model was incorrect.",
          "The target was not where predicted.",
          "I will update my calculations.",
        ],

        sunk: [
          "Target destroyed. Efficiency: acceptable.",
          "Their vessel has been removed from the equation.",
          "Structural integrity: zero.",
          "Another vessel eliminated. Proceeding.",
          "The experiment continues to produce favorable results.",
        ],

        win: [
          "Result confirmed: Valedorn victory.",
          "All enemy vessels have been eliminated.",
          "The calculations have produced the expected outcome.",
          "Victory achieved. Fascinating.",
          "Conclusion: my strategy was effective.",
        ],
      },

      img: brannic,
    },

    {
      id: "4",
      name: "Seraphine Vale",
      dialogues: {
        hit: [
          "As expected. Their position was obvious.",
          "A precise strike requires precise thinking.",
          "Their defenses were rather predictable.",
          "The tides of magic favor us today.",
          "Another successful calculation.",
        ],

        miss: [
          "That should have worked.",
          "Curious. I clearly underestimated them.",
          "A minor inconvenience. Nothing more.",
          "The sea has disrupted my calculations.",
          "Very well. I shall reconsider my approach.",
        ],

        sunk: [
          "Their vessel has succumbed to our assault.",
          "One less obstacle in our path.",
          "Their defenses were no match for us.",
          "Another ship consigned to the depths.",
          "The tide is turning exactly as I predicted.",
        ],

        win: [
          "Victory. As I expected.",
          "Valedorn has prevailed through discipline and knowledge.",
          "Another battle solved through superior strategy.",
          "The outcome was never truly in doubt.",
          "A satisfying conclusion to an otherwise predictable battle.",
        ],
      },

      img: seraphine,
    },

    {
      id: "5",
      name: "Torren Oakshield",
      dialogues: {
        hit: [
          "The forest teaches us to wait for the right moment.",
          "Our roots run deep. We will not be moved.",
          "A strong strike, but remember to remain patient.",
          "Nature rewards those who know when to act.",
          "The tide has shifted in our favor.",
        ],

        miss: [
          "Even the strongest hunter misses sometimes.",
          "Be patient. The right moment will come.",
          "The sea has hidden them well.",
          "Do not rush. Let the battle reveal itself.",
          "A missed strike is still a lesson.",
        ],

        sunk: [
          "Another vessel returns to the depths.",
          "The sea has reclaimed what was taken from it.",
          "Their ship has fallen. We move forward.",
          "One more threat has been washed away.",
          "The tide carries our enemies into darkness.",
        ],

        win: [
          "Peace may be our goal, but we will defend it.",
          "The roots of Valedorn hold strong.",
          "We stood together, and the storm has passed.",
          "The forest endures. So do we.",
          "May this victory bring us closer to peace.",
        ],
      },

      img: torren,
    },

    {
      id: "6",
      name: "Elian Marr",
      dialogues: {
        hit: [
          "Ha! Right where I wanted you.",
          "Now that's a captain's shot!",
          "Looks like the sea is on our side today.",
          "I knew there was a ship hiding there.",
          "One good shot can change the whole battle.",
        ],

        miss: [
          "Well... that wasn't my finest shot.",
          "The sea owes me one after that.",
          "All right, I may have guessed wrong.",
          "Nothing to worry about. I've survived worse.",
          "Let's call that a warning shot.",
        ],

        sunk: [
          "Down she goes! Beautiful!",
          "Another ship for the bottom of the sea.",
          "Now that's how you sink a ship!",
          "Cheers to that one! ...Preferably from a safe distance.",
          "Their fleet is starting to look rather empty.",
        ],

        win: [
          "Now that's a voyage worth telling stories about!",
          "Valedorn wins, and I intend to celebrate.",
          "A fine battle, a finer victory.",
          "The sea tested us, and we passed.",
          "Someone remind me to write this one down.",
        ],
      },

      img: elian,
    },
  ],

  ashes: [
    {
      id: "7",
      name: "Korga Rompehuesos",
      dialogues: {
        hit: [
          "HA! I knew you were hiding there!",
          "Found you. Now face the consequences.",
          "The Pacto does not fear your defenses.",
          "Strike hard. Strike without hesitation.",
          "Your ship has nowhere left to run.",
        ],

        miss: [
          "Grrr. You cannot hide forever.",
          "The sea saved you this time.",
          "Enough games. I'll find you.",
          "A miss. Nothing more.",
          "Run while you still can.",
        ],

        sunk: [
          "BREAK! CRUSH! SINK!",
          "Another ship dragged into the depths!",
          "Your fleet is falling apart!",
          "That's one less enemy standing in our way.",
          "The Pacto grows stronger with every ship we sink.",
        ],

        win: [
          "We survived. We always do.",
          "The Pacto stands when others fall.",
          "You wanted to break us. You failed.",
          "We have endured worse than this.",
          "Today, the sea belongs to us!",
        ],
      },

      img: korga,
    },

    {
      id: "8",
      name: "Veyra Noctis",
      dialogues: {
        hit: [
          "There you are. I wondered how long you'd hide.",
          "The shadows revealed your position.",
          "You cannot hide from the darkness.",
          "Interesting. Your movements were quite predictable.",
          "The night has found you.",
        ],

        miss: [
          "How curious. The shadows deceived me.",
          "You were closer than I thought.",
          "The darkness keeps its secrets.",
          "A temporary inconvenience.",
          "Very well. Let us try again.",
        ],

        sunk: [
          "Another vessel disappears into the darkness.",
          "The sea has swallowed your defenses.",
          "One more shadow joins the depths.",
          "Your ship has reached its final destination.",
          "The darkness grows stronger.",
        ],

        win: [
          "The shadows have spoken. We have won.",
          "You cannot defeat those who refuse to disappear.",
          "The Pacto survives another battle.",
          "In the end, the darkness always finds its prey.",
          "Perhaps now you understand why we endure.",
        ],
      },

      img: veyra,
    },

    {
      id: "9",
      name: "Grik",
      dialogues: {
        hit: [
          "HA! I HIT SOMETHING!",
          "Did you see that?! Perfect shot!",
          "Boom! Well... almost boom.",
          "I knew that was a good spot!",
          "Something went down there!",
        ],

        miss: [
          "Oops.",
          "Okay, that one went a little wide.",
          "I swear I almost hit it!",
          "Hmm... maybe I need a bigger cannon.",
          "No worries! I'll just try somewhere else.",
        ],

        sunk: [
          "BOOM! DOWN IT GOES!",
          "THAT SHIP IS VERY, VERY SINKY NOW!",
          "HA! DID YOU SEE THAT?!",
          "Another ship bites the... water!",
          "I told you the cannon would work!",
        ],

        win: [
          "WE WON! I KNEW THE EXPLOSIONS WOULD WORK!",
          "The Pacto wins! Can we celebrate with more explosions?",
          "VICTORY! Someone give me a bigger cannon!",
          "Ha! That was fantastic!",
          "We survived, we won, and nothing exploded on our ship!",
        ],
      },

      img: grik,
    },

    {
      id: "10",
      name: "Maela Ashborn",
      dialogues: {
        hit: [
          "The spirits have guided our hand.",
          "Your vessel could not hide forever.",
          "The sea has revealed your position.",
          "Our ancestors watch over this battle.",
          "The balance has shifted.",
        ],

        miss: [
          "The spirits remain silent.",
          "Perhaps we were not meant to strike there.",
          "Patience. The answer will reveal itself.",
          "Even the sea keeps some secrets.",
          "We must listen before we act again.",
        ],

        sunk: [
          "Another vessel has returned to the depths.",
          "May the fallen find peace beneath the waves.",
          "Their journey has come to an end.",
          "The sea claims another ship.",
          "The spirits grow quiet around their fallen vessel.",
        ],

        win: [
          "The spirits have guided us to victory.",
          "We fought together, and we endured.",
          "The fallen are remembered. The living move forward.",
          "The Pacto survives another storm.",
          "May this victory bring peace to those who follow us.",
        ],
      },

      img: maela,
    },

    {
      id: "11",
      name: "Drogath",
      dialogues: {
        hit: [
          "Found you.",
          "You left a trail.",
          "I knew you'd be there.",
          "The hunt continues.",
          "You're running out of places to hide.",
        ],

        miss: [
          "Nothing.",
          "The trail went cold.",
          "I'll find you.",
          "Not there.",
          "Patience.",
        ],

        sunk: [
          "The hunt is one step closer to ending.",
          "Another ship has fallen.",
          "The sea took them.",
          "Their trail ends here.",
          "One less target.",
        ],

        win: [
          "The hunt is over.",
          "We survived.",
          "Our enemies are gone.",
          "The Pacto remains.",
          "The prey became the hunted.",
        ],
      },

      img: drogath,
    },

    {
      id: "12",
      name: "Tessa Copperhand",
      dialogues: {
        hit: [
          "YES! It actually worked!",
          "I knew that would hit! Probably.",
          "Ha! Take that, fancy ship!",
          "Something went BOOM in the right place!",
          "See? Engineering!",
        ],

        miss: [
          "Okay... that was not supposed to happen.",
          "Maybe I calculated that a little wrong.",
          "Don't worry! I have another idea.",
          "Hmm. I'll need to adjust a few things.",
          "Well, at least nothing exploded this time.",
        ],

        sunk: [
          "YES! THAT SHIP IS GOING DOWN!",
          "Ha! My calculations were only slightly wrong!",
          "Another one! This is going incredibly well!",
          "Boom, splash, victory!",
          "I told you my invention would work!",
        ],

        win: [
          "WE WON! AND NOTHING BLEW UP! ...Much.",
          "The Pacto wins! I definitely planned all of this.",
          "See? Chaos can be a strategy!",
          "That was amazing! I have about twelve new ideas.",
          "Victory! Someone write this down before I forget how I did it.",
        ],
      },

      img: tessa,
    },
  ],
};

export default charactersData;
