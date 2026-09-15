import anduin from "../assets/characters/anduin.jpeg";
import jaina from "../assets/characters/jaina.jpeg";
import varian from "../assets/characters/varian.jpg";
import tyrande from "../assets/characters/tyrande.jpeg";
import muradin from "../assets/characters/muradin.jpg";
import genn from "../assets/characters/genn.jpg";
import thrall from "../assets/characters/thrall.jpg";
import sylvanas from "../assets/characters/sylvanas.jpeg";
import garrosh from "../assets/characters/garrosh.jpeg";
import voljin from "../assets/characters/voljin.jpg";
import baine from "../assets/characters/baine.jpg";
import lorthemar from "../assets/characters/lordthemar.jpg";

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
          "Our resolve grows stronger.",
          "That strike may turn the battle in our favor.",
        ],
        miss: [
          "Even the Light cannot reveal every path.",
          "We must remain patient.",
          "That shot was not meant to be.",
          "We cannot lose hope.",
          "The battle is not decided yet.",
        ],
        sunk: [
          "Another threat has been silenced.",
          "We have broken their strongest defense.",
          "May this victory prevent greater bloodshed.",
          "Their fleet has suffered a great loss.",
          "One more obstacle stands defeated.",
        ],
        win: [
          "The Alliance stands victorious.",
          "Let us use this victory to protect our people.",
          "Today, courage has prevailed.",
          "The Light has guided us through this battle.",
          "Together, we have overcome them.",
        ],
      },
      img: anduin,
    },

    {
      id: "2",
      name: "Jaina Proudmoore",
      dialogues: {
        hit: [
          "A precise strike. Just as planned.",
          "Your defenses are beginning to melt.",
          "Arcane power never misses twice.",
          "A flawless strike.",
          "I've seen enough. I know how to break their formation.",
        ],
        miss: [
          "Interesting... I may have miscalculated.",
          "The tides of battle are unpredictable.",
          "That spell fell short.",
          "I'll need to adjust my calculations.",
          "One mistake is enough to teach us something.",
        ],
        sunk: [
          "Your ship has nowhere left to hide.",
          "Another vessel joins the depths.",
          "Consider that a lesson in positioning.",
          "Another ship claimed by the sea.",
          "Their fleet is running out of options.",
        ],
        win: [
          "The Alliance has prevailed.",
          "Knowledge and strategy win battles.",
          "The sea itself has witnessed our victory.",
          "A victory worthy of the Alliance.",
          "Once again, preparation has made the difference.",
        ],
      },
      img: jaina,
    },

    {
      id: "3",
      name: "Varian Wrynn",
      dialogues: {
        hit: [
          "That's how an attack should land!",
          "Your defenses won't hold forever.",
          "Strike hard. Strike without hesitation.",
          "Keep the pressure on!",
          "That's the strike I was waiting for!",
        ],
        miss: [
          "Damn. We missed.",
          "No matter. Prepare the next attack.",
          "One mistake won't decide this battle.",
          "We won't falter over one miss.",
          "Aim again and hit harder!",
        ],
        sunk: [
          "Another enemy ship falls!",
          "Break their lines!",
          "Their fleet is weakening!",
          "Another ship bites the dust!",
          "Their formation is falling apart!",
        ],
        win: [
          "The Alliance stands triumphant!",
          "Victory belongs to those who refuse to surrender.",
          "We fought as one, and we conquered!",
          "We came to fight, and we conquered!",
          "Let the enemy remember this day!",
        ],
      },
      img: varian,
    },

    {
      id: "4",
      name: "Tyrande Whisperwind",
      dialogues: {
        hit: [
          "Elune has revealed their position.",
          "Our aim strikes with the fury of the night.",
          "The darkness cannot protect them.",
          "Their weakness has been revealed.",
          "Press the attack. Do not give them time to recover.",
        ],
        miss: [
          "The night conceals their movements.",
          "Patience. We will find them.",
          "The stars have not yet revealed their path.",
          "The shadows still hide them.",
          "We must remain vigilant.",
        ],
        sunk: [
          "Their vessel returns to the depths.",
          "The moon watches as another enemy falls.",
          "Their defenses have been broken.",
          "Another vessel is swallowed by darkness.",
          "One more ship has been cast into the depths.",
        ],
        win: [
          "The Alliance has earned this victory.",
          "Elune has guided us through the darkness.",
          "Our enemies have been defeated.",
          "The night has witnessed our triumph.",
          "We will not allow this victory to be forgotten.",
        ],
      },
      img: tyrande,
    },

    {
      id: "5",
      name: "Muradin Bronzebeard",
      dialogues: {
        hit: [
          "Ha! That one hit 'em good!",
          "Now that's a proper shot!",
          "Keep firing! We've got 'em!",
          "Ha! Right where it hurts!",
          "Now we're giving 'em a real fight!",
        ],
        miss: [
          "Bah! Too far to the left!",
          "That shot was rubbish!",
          "We'll get 'em next time!",
          "Blast it! We nearly had 'em!",
          "A wee bit more to the right next time!",
        ],
        sunk: [
          "Down she goes!",
          "That's another ship at the bottom!",
          "Ha! Their fleet's taking a beating!",
          "Another one sent to Davy Jones!",
          "Ha! That's how you sink a ship!",
        ],
        win: [
          "Now THAT'S a victory!",
          "The Alliance stands tall!",
          "A fine battle! Someone get me an ale!",
          "We smashed 'em good!",
          "Now that's a battle worth celebrating!",
        ],
      },
      img: muradin,
    },

    {
      id: "6",
      name: "Genn Greymane",
      dialogues: {
        hit: [
          "Aye! That's the way to strike!",
          "They won't escape us now.",
          "Their defenses are beginning to crumble.",
          "Keep your eyes on the enemy!",
          "We have them right where we want them.",
        ],
        miss: [
          "Damn! We missed our mark.",
          "The sea hides them well.",
          "No matter. We'll hunt them down.",
          "We'll find them soon enough.",
          "One miss won't stop the hunt.",
        ],
        sunk: [
          "Another ship sinks beneath the waves.",
          "Their fleet grows weaker by the minute.",
          "Ha! Let them try to run now.",
          "Another enemy vessel has been claimed.",
          "Their defenses are falling apart.",
        ],
        win: [
          "The Alliance stands victorious!",
          "We have driven them from the seas.",
          "They never stood a chance against us.",
          "The Alliance has earned another victory.",
          "Let them remember the strength of Gilneas.",
        ],
      },
      img: genn,
    },
  ],

  horde: [
    {
      id: "7",
      name: "Thrall",
      dialogues: {
        hit: [
          "The elements have answered our call.",
          "Our strike has found its mark.",
          "The Horde advances.",
          "The elements strengthen our resolve.",
          "Press forward. We have the advantage.",
        ],
        miss: [
          "The elements are silent.",
          "We must listen and adapt.",
          "That attack was not meant to be.",
          "We must not let frustration guide us.",
          "The battle demands patience.",
        ],
        sunk: [
          "Their vessel has been claimed by the sea.",
          "Another enemy ship has fallen.",
          "The Horde breaks through their defenses.",
          "Another threat has been swept away.",
          "The tide of battle turns in our favor.",
        ],
        win: [
          "The Horde stands victorious.",
          "Our strength comes from standing together.",
          "The elements have guided us to victory.",
          "The Horde has proven its strength.",
          "Together, we have overcome our enemies.",
        ],
      },
      img: thrall,
    },

    {
      id: "8",
      name: "Sylvanas Windrunner",
      dialogues: {
        hit: [
          "I knew exactly where to strike.",
          "Your defenses mean nothing.",
          "Another arrow finds its mark.",
          "You cannot hide from death.",
          "You left yourself exposed.",
        ],
        miss: [
          "You were fortunate this time.",
          "The shadows concealed your ship.",
          "Do not mistake this miss for mercy.",
          "Enjoy your fleeting fortune.",
          "You will not escape me forever.",
        ],
        sunk: [
          "Your ship has joined the dead.",
          "Another vessel sinks into darkness.",
          "Your fleet is slowly becoming a memory.",
          "Another soul belongs to the darkness.",
          "Your fleet is dying piece by piece.",
        ],
        win: [
          "The Horde claims victory.",
          "Your fleet has been silenced.",
          "There is nowhere left for you to run.",
          "Your defeat was inevitable.",
          "The living have fallen silent.",
        ],
      },
      img: sylvanas,
    },

    {
      id: "9",
      name: "Garrosh Hellscream",
      dialogues: {
        hit: [
          "Crush them!",
          "Their defenses are breaking!",
          "That's the strength of the Horde!",
          "WRECK THEM!",
          "They are no match for our might!",
        ],
        miss: [
          "Pathetic! Fire again!",
          "Do not waste another shot!",
          "We will destroy them eventually.",
          "FOOLS! AIM BETTER!",
          "Do not make me wait for victory!",
        ],
        sunk: [
          "Another ship destroyed!",
          "Break their entire fleet!",
          "They cannot stand against the Horde!",
          "SEND THEM TO THE DEPTHS!",
          "Their fleet is ours to destroy!",
        ],
        win: [
          "THE HORDE HAS WON!",
          "Their fleet lies broken!",
          "This is what true strength looks like!",
          "NO ONE CAN DEFEAT THE HORDE!",
          "LET THEM REMEMBER THE MIGHT OF THE HORDE!",
        ],
      },
      img: garrosh,
    },

    {
      id: "10",
      name: "Vol'jin",
      dialogues: {
        hit: [
          "Heh... gotcha.",
          "Da shot found its mark.",
          "They won't hide forever.",
          "Heh... dey never saw dat comin'.",
          "Da spirits favor us today.",
        ],
        miss: [
          "Dey slipped away dis time.",
          "Patience, mon. We ain't finished.",
          "Da sea be full of hiding places.",
          "Heh... dey got lucky.",
          "We take our time, mon.",
        ],
        sunk: [
          "Down dey go.",
          "Another ship joins da deep.",
          "Da enemy fleet be losing ground.",
          "Da deep be claimin' another one.",
          "Another ship be lost to da waves.",
        ],
        win: [
          "Da Horde be victorious.",
          "We stood together and won.",
          "Dis victory belongs to da Horde.",
          "Da Horde stands strong today.",
          "We faced dem together, mon.",
        ],
      },
      img: voljin,
    },

    {
      id: "11",
      name: "Baine Bloodhoof",
      dialogues: {
        hit: [
          "Our strike has found its target.",
          "Their defenses have been weakened.",
          "The Earth Mother guides our hand.",
          "Our patience has paid off.",
          "We have found their weakness.",
        ],
        miss: [
          "We must not lose patience.",
          "The enemy remains hidden.",
          "We will find them in time.",
          "Even the strongest must know patience.",
          "Let us wait for the right moment.",
        ],
        sunk: [
          "Their ship has fallen beneath the waves.",
          "Another enemy has been defeated.",
          "Our strength continues to grow.",
          "Another vessel has returned to the earth.",
          "Their fleet grows weaker.",
        ],
        win: [
          "The Horde has earned its victory.",
          "Strength means little without unity.",
          "Today, our people stand victorious.",
          "The Horde has stood strong together.",
          "May this victory bring honor to our people.",
        ],
      },
      img: baine,
    },

    {
      id: "12",
      name: "Lor'themar Theron",
      dialogues: {
        hit: [
          "A precise strike, exactly as intended.",
          "Their defenses have revealed a weakness.",
          "Our strategy is proving effective.",
          "The might of Quel'Thalas strikes true.",
          "The Sunwell has not forsaken us.",
        ],
        miss: [
          "A minor setback. Nothing more.",
          "We will adjust our strategy.",
          "Their position was better concealed than expected.",
          "We must remain patient.",
          "We shall not repeat that mistake.",
        ],
        sunk: [
          "Another vessel has been sent beneath the waves.",
          "Their fleet continues to crumble.",
          "Their defenses have suffered another defeat.",
          "One more obstacle has been removed.",
          "The balance of power shifts in our favor.",
        ],
        win: [
          "The Horde has secured a decisive victory.",
          "Our strategy has carried us to victory.",
          "The Horde stands united and victorious.",
          "The Sunwell shines upon our triumph.",
          "Quel'Thalas stands strong with the Horde.",
        ],
      },
      img: lorthemar,
    },
  ],
};

export default charactersData;
