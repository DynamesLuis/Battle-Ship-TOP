const charactersData = {
  alliance: [
    {
      id: "1",
      name: "Anduin Wrynn",
      dialogues: {
        hit: [
          "Our courage has struck true.",
          "Every victory brings us closer to peace.",
          "The Light guides our aim.",
        ],
        miss: [
          "Even the Light cannot reveal every path.",
          "We must remain patient.",
          "That shot was not meant to be.",
        ],
        sunk: [
          "Another threat has been silenced.",
          "We have broken their strongest defense.",
          "May this victory prevent greater bloodshed.",
        ],
        win: [
          "The Alliance stands victorious.",
          "Let us use this victory to protect our people.",
          "Today, courage has prevailed.",
        ],
      },
      img: "Anduin Wrynn.png",
    },

    {
      id: "2",
      name: "Jaina Proudmoore",
      dialogues: {
        hit: [
          "A precise strike. Just as planned.",
          "Your defenses are beginning to melt.",
          "Arcane power never misses twice.",
        ],
        miss: [
          "Interesting... I may have miscalculated.",
          "The tides of battle are unpredictable.",
          "That spell fell short.",
        ],
        sunk: [
          "Your ship has nowhere left to hide.",
          "Another vessel joins the depths.",
          "Consider that a lesson in positioning.",
        ],
        win: [
          "The Alliance has prevailed.",
          "Knowledge and strategy win battles.",
          "The sea itself has witnessed our victory.",
        ],
      },
      img: "Jaina Proudmoore.png",
    },

    {
      id: "3",
      name: "Varian Wrynn",
      dialogues: {
        hit: [
          "That's how an attack should land!",
          "Your defenses won't hold forever.",
          "Strike hard. Strike without hesitation.",
        ],
        miss: [
          "Damn. We missed.",
          "No matter. Prepare the next attack.",
          "One mistake won't decide this battle.",
        ],
        sunk: [
          "Another enemy ship falls!",
          "Break their lines!",
          "Their fleet is weakening!",
        ],
        win: [
          "The Alliance stands triumphant!",
          "Victory belongs to those who refuse to surrender.",
          "We fought as one, and we conquered!",
        ],
      },
      img: "Varian Wrynn.png",
    },

    {
      id: "4",
      name: "Tyrande Whisperwind",
      dialogues: {
        hit: [
          "Elune has revealed their position.",
          "Our aim strikes with the fury of the night.",
          "The darkness cannot protect them.",
        ],
        miss: [
          "The night conceals their movements.",
          "Patience. We will find them.",
          "The stars have not yet revealed their path.",
        ],
        sunk: [
          "Their vessel returns to the depths.",
          "The moon watches as another enemy falls.",
          "Their defenses have been broken.",
        ],
        win: [
          "The Alliance has earned this victory.",
          "Elune has guided us through the darkness.",
          "Our enemies have been defeated.",
        ],
      },
      img: "Tyrande Whisperwind.png",
    },

    {
      id: "5",
      name: "Muradin Bronzebeard",
      dialogues: {
        hit: [
          "Ha! That one hit 'em good!",
          "Now that's a proper shot!",
          "Keep firing! We've got 'em!",
        ],
        miss: [
          "Bah! Too far to the left!",
          "That shot was rubbish!",
          "We'll get 'em next time!",
        ],
        sunk: [
          "Down she goes!",
          "That's another ship at the bottom!",
          "Ha! Their fleet's taking a beating!",
        ],
        win: [
          "Now THAT'S a victory!",
          "The Alliance stands tall!",
          "A fine battle! Someone get me an ale!",
        ],
      },
      img: "Muradin Bronzebeard.png",
    },
  ],

  horde: [
    {
      id: "6",
      name: "Thrall",
      dialogues: {
        hit: [
          "The elements have answered our call.",
          "Our strike has found its mark.",
          "The Horde advances.",
        ],
        miss: [
          "The elements are silent.",
          "We must listen and adapt.",
          "That attack was not meant to be.",
        ],
        sunk: [
          "Their vessel has been claimed by the sea.",
          "Another enemy ship has fallen.",
          "The Horde breaks through their defenses.",
        ],
        win: [
          "The Horde stands victorious.",
          "Our strength comes from standing together.",
          "The elements have guided us to victory.",
        ],
      },
      img: "Thrall.png",
    },

    {
      id: "7",
      name: "Sylvanas Windrunner",
      dialogues: {
        hit: [
          "I knew exactly where to strike.",
          "Your defenses mean nothing.",
          "Another arrow finds its mark.",
        ],
        miss: [
          "You were fortunate this time.",
          "The shadows concealed your ship.",
          "Do not mistake this miss for mercy.",
        ],
        sunk: [
          "Your ship has joined the dead.",
          "Another vessel sinks into darkness.",
          "Your fleet is slowly becoming a memory.",
        ],
        win: [
          "The Horde claims victory.",
          "Your fleet has been silenced.",
          "There is nowhere left for you to run.",
        ],
      },
      img: "Sylvanas Windrunner.png",
    },

    {
      id: "8",
      name: "Garrosh Hellscream",
      dialogues: {
        hit: [
          "Crush them!",
          "Their defenses are breaking!",
          "That's the strength of the Horde!",
        ],
        miss: [
          "Pathetic! Fire again!",
          "Do not waste another shot!",
          "We will destroy them eventually.",
        ],
        sunk: [
          "Another ship destroyed!",
          "Break their entire fleet!",
          "They cannot stand against the Horde!",
        ],
        win: [
          "THE HORDE HAS WON!",
          "Their fleet lies broken!",
          "This is what true strength looks like!",
        ],
      },
      img: "Garrosh Hellscream.png",
    },

    {
      id: "9",
      name: "Vol'jin",
      dialogues: {
        hit: [
          "Heh... gotcha.",
          "Da shot found its mark.",
          "They won't hide forever.",
        ],
        miss: [
          "Dey slipped away dis time.",
          "Patience, mon. We ain't finished.",
          "Da sea be full of hiding places.",
        ],
        sunk: [
          "Down dey go.",
          "Another ship joins da deep.",
          "Da enemy fleet be losing ground.",
        ],
        win: [
          "Da Horde be victorious.",
          "We stood together and won.",
          "Dis victory belongs to da Horde.",
        ],
      },
      img: "Vol'jin.png",
    },

    {
      id: "10",
      name: "Baine Bloodhoof",
      dialogues: {
        hit: [
          "Our strike has found its target.",
          "Their defenses have been weakened.",
          "The Earth Mother guides our hand.",
        ],
        miss: [
          "We must not lose patience.",
          "The enemy remains hidden.",
          "We will find them in time.",
        ],
        sunk: [
          "Their ship has fallen beneath the waves.",
          "Another enemy has been defeated.",
          "Our strength continues to grow.",
        ],
        win: [
          "The Horde has earned its victory.",
          "Strength means little without unity.",
          "Today, our people stand victorious.",
        ],
      },
      img: "Baine Bloodhoof.png",
    },
  ],
};

export default charactersData;
