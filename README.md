# AI-Resume-Analyzer
🧠 AI Resume Analyzer

An intelligent web application that automatically analyzes resumes, extracts key information (skills, education, experience), and matches them with job descriptions to calculate a Job Fit Score — helping recruiters and candidates make better hiring decisions.

🚀 Features

✅ Smart Resume Parsing – Extracts text and structure from PDF resumes using PyPDF2.
✅ AI-Powered NLP Analysis – Uses spaCy to identify and extract skills, experience, and education.
✅ ATS Score Generator – Compares resume content with job descriptions to generate a match score.
✅ Interactive Frontend – Beautiful and responsive UI built with React + Tailwind CSS.
✅ RESTful Flask API – Handles file uploads and NLP processing in the backend.
✅ Real-Time Insights – Displays parsed results and analysis instantly.

🏗️ Tech Stack
Layer	Technologies
Frontend	React.js, Tailwind CSS
Backend	Python, Flask, Flask-CORS
NLP Engine	spaCy (en_core_web_sm)
PDF Processing	PyPDF2
Data Format	JSON API communication

resume-analyzer/
│
├── backend/
│   ├── app.py                # Main Flask server
│   ├── utils/
│   │   ├── parser.py         # Extract text from PDF
│   │   ├── matcher.py        # Extract skills using spaCy
│   │   └── __init__.py
│   └── requirements.txt      # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React UI components
│   │   ├── pages/            # Pages (Upload, Result)
│   │   └── App.js
│   ├── package.json          # Frontend dependencies
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/resume-analyzer.git
cd resume-analyzer

🧠 How It Works

User uploads a PDF resume.

Flask backend extracts text using PyPDF2.

spaCy NLP processes the text to identify skills, education, and experience.

The extracted data is compared with the provided job description.

The system generates a Job Fit Score and displays it in the UI.

📊 Example Output
Category	Extracted Info
Name	Rahul Kumar
Skills	Python, React, MongoDB, Flask
Experience	2 Years
Education	MCA – Sarala Birla University
ATS Score	87% ✅
💡 Future Enhancements

🔍 AI-based resume suggestions

📈 Detailed analytics dashboard

🌐 Multi-language resume support

☁️ Cloud resume storage and sharing

🤝 Contributing

Contributions are welcome!
If you’d like to improve features or UI, please fork the repo and submit a pull request.

🧑‍💻 Author

Rahul Kumar
🎓 MCA Student at Sarala Birla University, Ranchi
💼 Project: AI Resume Analyzer using Python & React
📧 Email: rahulkumar773954@gmail.com

🌟 Acknowledgements

Flask
spaCy
Tailwind CSS
React

