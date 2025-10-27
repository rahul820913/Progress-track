# Progress-Track: Visualize Your Codeforces Journey

<!-- Badges: Replace placeholders with actual URLs/services -->

**Progress-Track** is a modern web application designed for competitive programmers who use Codeforces. It provides a user-friendly interface to visualize performance statistics and track progress over time. Simply enter a Codeforces username to generate a personalized dashboard.

---

**Live Demo:**[https://progresstrack.app](https://progresstrack.vercel.app/)


![VisualForces Welcome Screen](<public/Screenshot 2025-10-27 004645.png>) <!-- Replace with actual image URL -->
*Welcome screen prompting user input.*

---

## Key Features:

* **User Profile Display:** Shows essential Codeforces profile information (Handle, Picture, Ranks, Ratings) with color-coding based on rank.
* **Detailed Statistics Card:** Presents key numerical insights (Contests attended, Submissions, Problems Tried/Solved, Best/Worst Rank, Max Rating Changes).
* **Interactive Visualizations:**
    * **Rating Changes & Distribution:** See how ratings have changed over time and the distribution of problems solved by rating.
        ![Rating Changes and Distribution Charts](<public/Screenshot 2025-10-27 004714.png>) 
    * **Problem Topics & Levels:** Understand strengths and weaknesses through charts showing solved problems by topic (pie chart) and difficulty level (bar chart).
        ![Problem Levels and Topics Charts](<public/Screenshot 2025-10-27 004720.png>) 
    * **Submission Activity:** Visualize coding consistency with a GitHub-style calendar heatmap of submission frequency over the past year.
        ![Submission Activity Heatmap](<public/Screenshot 2025-10-27 004725.png>) 
* **Modern & Responsive Design:** Built with React and styled using Tailwind CSS, featuring a sleek dark theme and responsiveness across devices.
* **User Interaction:** Includes a clear search bar to look up users and a contact form.

---

## Tech Stack

* **Frontend:** React, Tailwind CSS
* **Charts:** Recharts
* **Data Source:** Codeforces API

---

## Getting Started

### Prerequisites

* Node.js (v16 or later recommended)
* npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rahul820913/Progress-track.git
    cd Progress-track
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
2.  Open your browser and navigate to `http://localhost:3000` (or the port specified in your console).

---

## Usage

1.  Once the application is running, you will see a search bar.
2.  Enter a valid Codeforces username (handle) into the search bar.
3.  Press Enter or click the search icon.
4.  The dashboard will load and display the profile information, statistics, and visualizations for the specified user.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code follows the project's coding style and includes tests where applicable.

---

## License

---
*This README provides a basic template. Feel free to add more details about specific components, API usage, deployment, etc.*
