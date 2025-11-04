import spacy

nlp = spacy.load("en_core_web_sm")

# You can expand this list later
TECH_SKILLS = [
    "python", "java", "javascript", "react", "node", "flask", "sql",
    "machine learning", "deep learning", "nlp", "aws", "docker",
    "kubernetes", "git", "mongodb", "c++", "html", "css"
]

def extract_skills(text):
    doc = nlp(text.lower())
    extracted = []
    for token in doc:
        if token.text in TECH_SKILLS:
            extracted.append(token.text)
    return list(set(extracted))
