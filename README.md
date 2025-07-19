# CodeReview - AI-Powered Code Analysis Assistant

<p align="center">
  <strong>CodeReview</strong> is a web application built with Next.js that leverages the power of Generative AI to provide instant, insightful, and comprehensive code reviews. It's designed to help developers and teams improve code quality, save time, and accelerate the development cycle.
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a>
</p>

---

## ✨ Key Features

-   **🤖 Instant AI Analysis**: Get feedback on your code in seconds. Just paste a snippet, select the language, and let our AI do the heavy lifting.
-   **🛡️ Comprehensive Review**: The AI provides a detailed explanation of the code, identifies potential issues (bugs, security vulnerabilities, performance), and offers concrete suggestions for improvement.
-   **👤 User Authentication**: Secure user accounts and sessions managed with Supabase for a personalized experience.
-   **🎨 Modern & Responsive UI/UX**: A clean, intuitive, and fully responsive interface built with ShadCN UI and Tailwind CSS, ensuring a great user experience on any device.
-   **🚧 (In Development)**:
    -   **VCS Integration**: Seamlessly connect with Git repositories (GitHub, GitLab, Bitbucket) to automate code reviews on pull requests.
    -   **Analytics Dashboard**: Visualize code quality trends and common issues over time.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Authentication & Database**: [Supabase](https://supabase.io/)
-   **Deployment**: Ready for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) or any Node.js environment.

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later)
-   npm, pnpm, or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/CodingWithAbii/codereview.git
    cd codereview
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add the following variables. You can get these from your Supabase and Google AI project dashboards.

    ```env
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

    # Google AI
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

