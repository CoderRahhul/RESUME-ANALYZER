def calculate_match(resume_skills, jd_skills):
    """
    Calculates percentage match between resume and job description skills.
    """
    matched = list(set(resume_skills) & set(jd_skills))
    missing = list(set(jd_skills) - set(resume_skills))

    if len(jd_skills) == 0:
        score = 0
    else:
        score = (len(matched) / len(jd_skills)) * 100

    return {
        "matchScore": round(score, 2),
        "extractedSkills": matched,
        "missingSkills": missing,
        "strengths": [f"Strong in: {', '.join(matched)}"] if matched else ["No major skill matches found"],
        "improvements": [f"Consider learning: {', '.join(missing)}"] if missing else ["All skills match well!"]
    }
