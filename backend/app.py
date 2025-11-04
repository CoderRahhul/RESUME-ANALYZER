from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from utils.parser import extract_text
from utils.matcher import extract_skills
from utils.scoring import calculate_match

app = Flask(__name__)
CORS(app)  # Allow connection from React frontend

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return jsonify({"message": "Backend running successfully!"})

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    resume_file = request.files.get('resume')
    job_description = request.form.get('jobDescription')

    if not resume_file or not job_description:
        return jsonify({"error": "Missing file or job description"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, resume_file.filename)
    resume_file.save(file_path)

    # Extract text from resume
    resume_text = extract_text(file_path)

    # Extract skills using spaCy
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    # Calculate match score
    result = calculate_match(resume_skills, jd_skills)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
