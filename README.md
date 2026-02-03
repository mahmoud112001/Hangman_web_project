# 🎮 Hangman Game

A fun and interactive web-based Hangman game built with vanilla HTML, CSS, and JavaScript. Guess the secret word by selecting letters before the hangman is completed!

## 📋 Features

- **Multiple Categories**: Choose from 4 different word categories:
  - Programming
  - Movies
  - Animals
  - Sports

- **Dynamic Gameplay**:
  - Player name input validation
  - Interactive letter keyboard
  - Visual hangman drawing (8 stages)
  - Real-time score tracking

- **Scoring System**:
  - Start with 600 points
  - Lose 25 points for each wrong guess
  - Lose 50 points for each hint used
  - Score decreases by 1 point per second (timer-based)

- **Hint System**:
  - 2 hints per game (requires 50 points)
  - Automatically reveals one letter when used

- **Results Screen**:
  - Shows win/loss status
  - Displays final score
  - Shows number of mistakes made
  - Option to play again

## 🎯 How to Play

1. **Enter Your Name**: Start by entering your name (minimum 2 characters)
2. **Choose Category**: Select a word category to begin the game
3. **Guess Letters**: Click on letters in the keyboard to make guesses
4. **Watch the Hangman**: Each wrong guess adds a part to the hangman
5. **Use Hints Wisely**: You have 2 hints to help reveal hidden letters
6. **Win or Lose**: Reveal all letters before the hangman is complete to win!

## 📁 Project Structure

```
JS hangman project/
├── index.html       # Main HTML structure
├── style.css        # Styling and layout
├── script.js        # Game logic and interactivity
├── README.md        # Documentation
└── screenshots/     # Game screenshots (optional)
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Gradient backgrounds, grid layout, responsive design
- **JavaScript (ES5)**: Game logic, DOM manipulation, event handling

## 🎨 Design Features

- Beautiful gradient background
- Colorful category buttons with hover effects
- Animated hangman drawing
- Responsive grid layout for the keyboard
- Modern card-based UI design
- Modal popup for game results

## 📊 Game Statistics

- **Words per Category**: 4 words each
- **Hangman Stages**: 8 stages (base, stand, top, rope, head, body, hands, legs)
- **Available Letters**: 26 (a-z)
- **Starting Points**: 600

## 🎮 Game Rules

1. You must enter a valid name (2+ characters) to start
2. Correct guesses reveal the corresponding letters
3. Wrong guesses add parts to the hangman and cost 25 points
4. Using a hint costs 50 points and reveals one letter
5. Win by revealing all letters before 8 mistakes
6. Game ends immediately when you win or lose

## 🚀 Getting Started

1. Clone or download the project files
2. Open `index.html` in your web browser
3. Enter your name and select a category to play
4. Start guessing letters and try to achieve the highest score!

## 💡 Tips for High Scores

- Guess common letters first (E, A, R, O, T, etc.)
- Use hints strategically to avoid using them unnecessarily
- Try to win with fewer mistakes to maximize your score
- Remember the timer keeps deducting points, so play quickly!

## 📝 License

This project is open source and available for personal and educational use.

---

Enjoy playing! 🎉
