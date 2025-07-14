Streakly

Streakly is a modern, interactive web application designed to help you track and maintain your daily task streaks with a gamified experience. Create tasks, swipe to complete them, and visualize your progress with a vibrant grid and weekly trends chart. Stay motivated with streaks and export your progress to share your achievements!
Features

Task Creation: Easily add tasks with a title, description, and timeframe.
Tinder-like Swipe Interface: Swipe right to complete tasks, updating your streak and progress grid.
Progress Grid: Visualize your completed tasks in a 10x10 grid with dynamic colors.
Weekly Trends: Track task completions with a beautiful line chart showing daily activity.
Exportable Grid: Save your progress grid as a high-quality PNG image.
Responsive Design: Optimized for desktop and mobile devices with a sleek, modern UI.
Animations: Smooth transitions and animations powered by Framer Motion for an engaging experience.
Local Storage: Persists tasks, grid, and streak data across sessions using browser localStorage.

To set up Streakly locally, follow these steps:
Prerequisites

Node.js (v18 or higher)
npm or yarn
Git

Steps

Clone the Repository:
git clone https://github.com/OperaCode/Streakly.git
cd streakly

Install Dependencies:
npm install

or
yarn install

Run the Development Server:
npm start

or
yarn start

Open your browser and navigate to http://localhost:3000 to view the app.

Usage

Add a Task:

Enter a task title, description, and timeframe in the input fields.
Click "Add Task" to save it to your task list.

Swipe Tasks:

Swipe right on a task card to mark it as complete, adding it to your progress grid and updating your streak.
Tasks are automatically removed after being swiped right.

Track Progress:

View your streak count and progress grid to see your completed tasks.
Check the weekly trends chart to monitor your daily task completions.

Technologies Used

React: Frontend framework for building the UI.
React Router: For navigation between pages.
Tailwind CSS: Utility-first CSS framework for styling.
Framer Motion: For animations and transitions.
Chart.js & react-chartjs-2: For rendering the weekly trends chart.
react-tinder-card: For the swipeable task card interface.

Open a Pull Request:Submit a pull request with a clear description of your changes.

Inspired by habit-tracking apps and gamified productivity tools.
Thanks to the open-source community for providing amazing libraries like Framer Motion, Chart.js, and react-tinder-card.

Streakly - Build unstoppable streaks, one task at a time! 🚀
