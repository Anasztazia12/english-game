# English Game

An interactive web-based game for practicing English sentences, designed for children (Year 3–5) and beginner learners.

## Game Modes

- **Fill in the blank:** Choose the correct word to complete the sentence.
- **Sentence order:** Arrange the given words to form a correct sentence.

## Features

- 100+ randomly generated sentences per session
- Two difficulty levels: Easy and Hard
- Instant feedback with sound effects
- Colorful, child-friendly design
- All interface and feedback in English

## How to Play

1. Open `index.html` in your browser.
2. Select a difficulty (Easy/Hard).
3. Choose a game mode.
4. Play and practice English sentences!

## Customization & Development

- All game logic is now in `english-game.js`. To add new sentence patterns, verbs, or objects, edit this file.
- The HTML (`index.html`) only contains the UI structure and loads the JS.
- To change sound effects, replace `correct.mp3` and `wrong.mp3` (if present).
- For design changes, edit `style.css`.

## File Structure

- `index.html` – Main HTML, loads the UI and JS
- `english-game.js` – All game logic, question generation, and state
- `style.css` – All styles, responsive and modern look

## How to Use / Run

1. Download or clone the repository.
2. Open `index.html` in your browser (no server needed).
3. Play!

## Extending the Game

- To add new verbs or objects, update the `verbs` and `verbObjects` in `english-game.js`.
- To add new game modes, create new functions in `english-game.js` and add UI in `index.html`.

## Requirements

- Modern web browser (Chrome, Firefox, Edge, Safari, etc.)

---

## UX 5 Plan (Jesse James Garrett model)

### 1. Strategy

- **Goal:** Help children (8–12) and beginners practice English sentences in a fun, interactive way.
- **User needs:** Motivation, engagement, instant feedback, simple operation.

### 2. Scope

- **Features:**

- Fill in the blank and sentence order game modes
- 100+ random sentences per session
- Easy/Hard difficulty
- Sound feedback
- Colorful, accessible design

### 3. Structure

- **Information architecture:**

- Home: Difficulty and mode selection
- Game: Question display, answer options, feedback

- **Interaction design:**

- Click/tap to select answers and navigate

### 4. Skeleton

- **Layout:**

- Central container with title, controls, game area, feedback
- Large, touch-friendly buttons
- **Navigation:**
- Simple, always visible mode and difficulty selectors

### 5. Surface

- **Visual design:**

- Bright, playful colors
- Rounded buttons, clear fonts
- Immediate visual and audio feedback

---

## Credits

- Developed for English language practice for children.
- Sentence generation and design by AI (GitHub Copilot)
