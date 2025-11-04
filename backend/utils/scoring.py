def calculate_match(resume_skills, jd_skills):
    matched = list(set(resume_skills) & set(jd_skills))
    missing = list(set(jd_skills) - set(resume_skills))
    
    if len(jd_skills) > 0:
        score = int((len(matched) / len(jd_skills)) * 100)
    else:
        score = 0

    return {
        "matchScore": score,
        "extractedSkills": matched,
        "missingSkills": missing,
        "strengths": [f"Proficient in {', '.join(matched)}"],
        "improvements": [f"Consider learning: {', '.join(missing)}"]
    }
