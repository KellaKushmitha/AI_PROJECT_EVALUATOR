AI Project Evaluator

An AI-powered web application that evaluates software projects and provides intelligent feedback using the Google Gemini API.

The application helps students and developers understand the strengths, weaknesses, technical quality, and potential improvements of their projects through an AI-powered evaluation system.

🔗 Live Demo: https://ai-project-evaluator.vercel.app/

📌 About The Project

Building a project is only the first step. Understanding whether a project is technically strong, practical, innovative, and suitable for a portfolio or resume can be difficult.

AI Project Evaluator provides an easy way to get AI-powered feedback on a project.

Users can enter their project information and receive an evaluation generated using the Google Gemini API.

The application combines:

🌐 Frontend web development
🐍 Python and Flask
🗄️ Database management
🤖 Generative AI
🔌 REST API communication
☁️ Web deployment
✨ Features
🤖 AI-Powered Project Evaluation

The application uses the Google Gemini API to analyze submitted project information and generate meaningful feedback.

📊 Project Analysis

The evaluator analyzes the provided project information and generates feedback related to areas such as:

Technical implementation
Project quality
Complexity
Innovation
Practical usefulness
Strengths
Areas for improvement
📝 AI-Generated Feedback

Instead of providing only a numerical score, the application generates descriptive feedback that helps users understand how their project can be improved.

📚 Evaluation History

Users can access previous project evaluations through the History section.

💾 Saved Evaluations

Important evaluations can be saved for future reference.

🎨 Interactive Dashboard

The application provides a simple interface with sections such as:

Home
Evaluate Project
History
Saved Reports
About
🌐 Deployed Web Application

The project is deployed and accessible through a web browser.

🖥️ Live Demo

🚀 Try the application:

https://ai-project-evaluator.vercel.app/

🏗️ Architecture
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Frontend        │
                    │   HTML / CSS / JS   │
                    └──────────┬──────────┘
                               │
                         HTTP Request
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Flask Backend    │
                    │      REST API       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Gemini API       │
                    │  Google Generative  │
                    │        AI           │
                    └──────────┬──────────┘
                               │
                         AI Evaluation
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Evaluation Result   │
                    │ Feedback / Analysis │
                    └─────────────────────┘
🛠️ Tech Stack
Frontend
HTML5
CSS3
JavaScript
Single Page Application (SPA)
Backend
Python
Flask
Flask-SQLAlchemy
REST API
Artificial Intelligence
Google Gemini API
Generative AI
Prompt-based project evaluation
Database
SQLAlchemy
Relational database
Deployment
Vercel
🔄 How It Works
1. Enter Project Information

The user provides the required details about their project through the web interface.

2. Submit the Project

The frontend sends the project information to the Flask backend.

3. Backend Processing

The Flask backend receives and processes the submitted information.

4. Gemini AI Evaluation

The backend sends the relevant project information to the Google Gemini API.

Gemini analyzes the project based on the evaluation prompt and generates an AI-powered response.

5. Generate Results

The backend processes the Gemini response and returns the evaluation to the frontend.

6. Display Evaluation

The frontend displays the generated project analysis and feedback to the user.

🔌 API
Evaluate Project
POST /evaluate

This endpoint accepts project information and uses the Gemini API to generate an evaluation.

Request Example
{
  "project_name": "AI Project Evaluator",
  "description": "An AI-powered application for evaluating software projects.",
  "technologies": [
    "Python",
    "Flask",
    "JavaScript",
    "Gemini API"
  ]
}
Response

The API returns the AI-generated evaluation produced from the submitted project information.

The exact response structure depends on the implementation of the backend.

🔐 Gemini API Configuration

The project uses a Google Gemini API key to communicate with Google's generative AI services.

For security, the API key should be stored as an environment variable instead of being committed directly to the repository. Google recommends using environment variables such as GEMINI_API_KEY for this purpose.

Environment Variable
GEMINI_API_KEY=your_api_key_here

Never commit your actual API key to GitHub.

If an API key is accidentally exposed, it should be replaced/revoked and the application updated with a new key.

🚀 Getting Started
Prerequisites

Make sure you have:

Python 3.9+
Git
A Google Gemini API key
1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/AI-Project-Evaluator.git
cd AI-Project-Evaluator
2. Create a Virtual Environment
python -m venv venv
Windows
venv\Scripts\activate
Linux / macOS
source venv/bin/activate
3. Install Dependencies
pip install -r requirements.txt

If your project uses the Google GenAI Python SDK, the current package is google-genai.

4. Configure the Gemini API Key

Create an environment variable:

GEMINI_API_KEY=your_api_key_here

For local development, you can use a .env file if your project is configured to load environment variables.

Example:

GEMINI_API_KEY=your_gemini_api_key

Make sure .env is included in .gitignore.

5. Run the Flask Application
python app.py

The backend will start on the configured local host and port.

For example:

http://localhost:5000
📂 Project Structure
AI-Project-Evaluator/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── app.py
│   ├── models.py
│   └── ...
│
├── requirements.txt
├── .gitignore
├── README.md
└── ...

Update this structure to match the actual folders and files in your repository.

🧠 AI Evaluation Pipeline
User Input
     │
     ▼
Project Details
     │
     ▼
Frontend
     │
     ▼
Flask API
     │
     ▼
Evaluation Prompt
     │
     ▼
Google Gemini API
     │
     ▼
AI Generated Analysis
     │
     ▼
Flask Response
     │
     ▼
Frontend Result
🎯 Use Cases

AI Project Evaluator can be useful for:

👨‍🎓 Computer Science students
💻 Software developers
🎓 Final-year project teams
🚀 Hackathon participants
📄 Resume and portfolio builders
💼 Internship applicants
🧑‍💻 Beginners looking for project feedback
💡 Why I Built This

Many students build projects but don't have an easy way to understand the quality and potential of their work.

I built AI Project Evaluator to explore how Generative AI can be combined with a web application to provide useful, automated project feedback.

The project also gave me practical experience integrating an AI API into a full-stack application.

📚 What I Learned

Through this project, I gained practical experience in:

Building a full-stack web application
Developing REST APIs with Flask
Integrating a Generative AI API
Working with the Google Gemini API
Database integration with SQLAlchemy
Frontend-backend communication
Prompt engineering
Handling AI-generated responses
Environment variable management
Deploying web applications
🔮 Future Improvements

Some potential improvements include:

🔐 User authentication
📄 PDF evaluation reports
📊 More detailed scoring
🧑‍💻 GitHub repository integration
🔍 Automated source-code analysis
📈 Project comparison
🤖 Support for multiple AI models
🧪 Automated testing
📱 Improved mobile responsiveness
📊 Evaluation analytics
🌐 Multi-language support
