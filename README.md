# 📌 BattleShipGame

This is a practice project from The Odin Project curriculum.

---

## 🎯 Learning Objective  
The main goal of this project was not only to build a functional BattleShio game, but also to practice software development principles and improve problem-solving skills through a project-based learning approach.

During development, the focus was on:
- Practice JavaScript Object-Oriented Programming by building the game around classes and clear responsibilities.
- Learn how to structure a larger JavaScript application using controllers, models, and shared state.
- Practice Test-Driven Development (TDD) by writing tests before implementing new features.
- Improve DOM manipulation and event handling in a multi-screen application.
- Learn how to manage game state and keep the UI and game logic separated.
- Build a simple computer opponent with target-based attack behavior.
- Practice working with external assets such as images and sound effects.

---

## 🛠️ Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Vite
- Jest
- DOM API
- Pixabay for some sound effects
- AI-generated artwork for the original characters

No frameworks or external libraries were used. The project was intentionally built using only core web technologies to strengthen fundamental frontend development skills.

---

## 📷 Examples / Screenshots
# Start screen


# Character selection
<img width="1345" height="607" alt="main2" src="https://github.com/user-attachments/assets/362ad16e-031f-4d47-90c2-9ea7f3adf48f" />

# Ship Placement
<img width="1335" height="620" alt="dark" src="https://github.com/user-attachments/assets/5eb0e0ac-b920-4681-b042-a8b619d394d4" />

# Game
<img width="1348" height="638" alt="units" src="https://github.com/user-attachments/assets/bed6cead-51e6-4371-8c6b-82ef64290e9e" />

# Game over

---

## 📂 Project Structure
```text
src/
├── appController/
│   └── appController.js
│   └── appController.test.js
│
├── appState/
│   └── AppState.js
│   └── AppState.test.js
│
├── assets/
│   ├── audios/
│       ├── affects/
│       ├── music/
│   ├── characters/
│   ├── cursors/
│   ├── factions/
│
├── AudioController/
│   └── AudioController.js
│   └── AudioController.test.js
│
├── gameData/
│   └── charactersData.js
│   └── getCharactersByFaction.js
│   └── getShipById.js
│   └── shipsData.js
|
├── helpers/
│   └── delay.js
│   └── typeWriter.js
│
├── modules/
│   ├── Character/
│        └── Character.js
│        └── Character.test.js
│        └── CharacterFactory.js
│        └── CharacterFactory.test.js
│      
│   ├── Computer/
│        └── Computer.js
│        └── Computer.test.js
│        └── computerShipPlacer.js
│        └── computerShipPlacer.test.js
│   ├── Game/
│        └── Game.js
│        └── Game.test.js
│   ├── GameBoard/
│        └── GameBoard.js
│        └── GameBoard.test.js
│   ├── Player/
│        └── Player.js
│        └── Player.test.js
│   ├── Ship/
│        └── Ship.js
│        └── Ship.test.js
|        
|
|├── ui/
│   ├── BoardRender/
│        └── BoardRender.js
│        └── BoardRender.test.js
│   ├── CharacterSelectionController/
│        └── CharacterSelectionController.js
│        └── CharacterSelectionController.test.js
│   ├── ScreenController/
│        └── ScreenController.js
│        └── ScreenController.test.js
│   ├── ShipPlacementController/
│        └── ShipPlacementController.js
│        └── ShipPlacementController.test.js
│   ├── ShipPlacementRenderer/
│        └── ShipPlacementRenderer.js
│        └── ShipPlacementRenderer.test.js
│   ├── StartScreenController/
│        └── StartScreenController.js
│        └── StartScreenController.test.js
│   ├── UIController/
│        └── UIController.js
│        └── UIController.test.js
│   └── domSelector.js
|
├── index.js
└── styles.css
test/
├── fileMock.js
index.html
```

The application follows a modular architecture where each module has a single responsibility:

- State Module → Stores the application's global state.
- UI Module → Handles rendering and user interactions.
- Weahter Module → Handles weather operations.
- Utils → Store utils functions.
- Services → Get and reutrn values from APIs
- Coordinator Module → Orchestrates communication between modules.

---

## 📚 Learnings
This project helped me understand how to organize a larger JavaScript application instead of keeping everything inside a few files.

I learned how to separate game logic from UI logic using different controllers and classes. I also learned how to use a shared application state to move information between different screens.

One of the main things I practiced was Test-Driven Development. I wrote tests for game rules, controllers, state changes, ship placement, attacks, and other important parts of the application before implementing the final behavior.

I also learned more about event listeners and the importance of managing their lifecycle. During development, I found problems caused by duplicated listeners and old controller instances. Fixing these problems helped me understand how application state and object lifetime affect the UI.

Another important learning was designing the computer opponent. It started with random attacks and was later improved to remember successful hits, search nearby cells, detect the direction of a ship, and continue attacking until the ship was sunk.

Finally, I learned how to integrate audio into a web application while keeping audio logic separated from the UI.

---

## 🔮 Possible Improvements
### Features
- Add different difficulty levels for the computer opponent.
- Add more ship types and different board sizes.
- Add a game settings screen.
- Add sound and volume controls.
- Add more original characters and different factions.
- Add a local two-player mode.
- Add a statistics system with wins, losses, and completed games.
- Add more game modes with different rules.

### UI and UX
- Add more animations and transitions.
- Improve the responsive design for smaller screens and mobile devices.
- Add clearer visual feedback during the computer's turn.
- Improve the Game Over screen and battle report.
- Add accessibility improvements such as better keyboard navigation and clearer focus states.

### Technical Improvements
- Refactor some controllers as the application grows.
- Improve the computer's targeting strategy.
- Add more tests for edge cases and full game flows.
- Improve the way application state is reset and managed between games.
- Consider using TypeScript for stronger type safety.
- Improve the project structure and documentation as more features are added.