from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

from utils.parser import extract_text
from utils.matcher import extract_skills
from utils.scoring import calculate_match

# Path to React build folder
frontend_build = os.path.join(os.path.dirname(__file__), "..", "frontend", "build")

app = Flask(
    __name__,
    static_folder=frontend_build,
    static_url_path=""
)

CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Serve React frontend
@app.route("/")
def home():
    if os.path.exists(os.path.join(frontend_build, "index.html")):
        return send_from_directory(frontend_build, "index.html")
    return jsonify({"message": "Frontend not built yet."})

# API
@app.route('/analyze', methods=['POST'])
def analyze_resume():
    resume_file = request.files.get('resume')
    job_description = request.form.get('jobDescription')

    if not resume_file or not job_description:
        return jsonify({"error": "Missing file or job description"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, resume_file.filename)
    resume_file.save(file_path)

    resume_text = extract_text(file_path)

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    result = calculate_match(resume_skills, jd_skills)

    return jsonify(result)

# Handle React routes
@app.route("/<path:path>")
def serve_react(path):
    file_path = os.path.join(frontend_build, path)

    if os.path.exists(file_path):
        return send_from_directory(frontend_build, path)

    return send_from_directory(frontend_build, "index.html")

if __name__ == "__main__":
    app.run(debug=True)