import React, { useState } from 'react';
import { Upload, FileText, Briefcase, CheckCircle, XCircle, TrendingUp, Award, AlertCircle, Download, RefreshCw, Zap, Target, BookOpen } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
      } else {
        alert('Please upload a PDF or DOC file');
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const analyzeResume = async () => {
    if (!resumeFile || !jobDescription) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setAnalysisResult(data);
      setActiveTab("results");
    } catch (err) {
      alert("Error analyzing resume");
    } finally {
      setIsAnalyzing(false);
    }
  };


  const resetAnalysis = () => {
    setActiveTab('upload');
    setAnalysisResult(null);
    setResumeFile(null);
    setJobDescription('');
  };

  const downloadReport = () => {
    alert('Report download feature coming soon!');
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                <Zap className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI Resume Analyzer
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Optimize your resume with AI-powered insights</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-lg">

              <span className="text-xs font-medium text-gray-700">DEVELOPED BY RAHUL</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${activeTab === 'upload'
                ? 'bg-white shadow-lg text-indigo-600 ring-2 ring-indigo-600'
                : 'bg-white text-gray-600 shadow hover:shadow-md'
              }`}
          >
            <Upload size={20} />
            <span>Upload & Analyze</span>
          </button>
          <button
            onClick={() => analysisResult && setActiveTab('results')}
            disabled={!analysisResult}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${activeTab === 'results'
                ? 'bg-white shadow-lg text-indigo-600 ring-2 ring-indigo-600'
                : 'bg-white text-gray-600 shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
              }`}
          >
            <TrendingUp size={20} />
            <span>Analysis Results</span>
          </button>
        </div>

        {activeTab === 'upload' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <FileText className="text-indigo-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Upload Your Resume</h2>
              </div>

              <div
                className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all ${dragActive
                    ? 'border-indigo-600 bg-indigo-50 scale-105'
                    : 'border-indigo-300 hover:border-indigo-500 bg-indigo-50/30'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer block">
                  <Upload className="mx-auto text-indigo-600 mb-4" size={48} />
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                </label>
              </div>

              {resumeFile && (
                <div className="mt-5 flex items-center justify-between bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={22} />
                    <div>
                      <p className="text-green-800 font-semibold">{resumeFile.name}</p>
                      <p className="text-green-600 text-sm">{(resumeFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setResumeFile(null)}
                    className="text-red-600 hover:text-red-800 font-semibold hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Briefcase className="text-purple-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Job Description</h2>
              </div>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here..."
                className="w-full h-72 p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none resize-none text-gray-700"
              />

              <div className="mt-4 flex items-start space-x-2 bg-blue-50 p-3 rounded-lg">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-blue-600" />
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Include all required skills for accurate matching.
                </p>
              </div>
            </div>

            <button
              onClick={analyzeResume}
              disabled={!resumeFile || !jobDescription || isAnalyzing}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Analyzing Resume with AI...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <Zap size={22} />
                  <span>Analyze Resume with AI</span>
                </span>
              )}
            </button>
          </div>
        )}

        {activeTab === 'results' && analysisResult && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2">Match Score</h2>
                  <p className="text-indigo-100 text-lg">Overall compatibility</p>
                </div>
                <div className="text-center">
                  <div className="text-7xl sm:text-8xl font-extrabold mb-3">{analysisResult.matchScore}%</div>
                  <div className="bg-white/25 backdrop-blur-sm rounded-full px-5 py-2">
                    <span className="text-sm font-bold">
                      {analysisResult.matchScore >= 75 ? '🎉 Excellent Match' : '👍 Good Match'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-5">
                  <CheckCircle className="text-green-600" size={28} />
                  <h3 className="text-xl font-bold text-gray-800">Matched Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.extractedSkills.map((skill, idx) => (
                    <span key={idx} className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-5">
                  <XCircle className="text-red-600" size={28} />
                  <h3 className="text-xl font-bold text-gray-800">Missing Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.missingSkills.map((skill, idx) => (
                    <span key={idx} className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
                      ✕ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-5">
                <Target className="text-blue-600" size={28} />
                <h3 className="text-xl font-bold text-gray-800">Key Strengths</h3>
              </div>
              <ul className="space-y-4">
                {analysisResult.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={22} />
                    <span className="text-gray-700 font-medium">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-5">
                <BookOpen className="text-orange-600" size={28} />
                <h3 className="text-xl font-bold text-gray-800">Recommended Improvements</h3>
              </div>
              <ul className="space-y-4">
                {analysisResult.improvements.map((improvement, idx) => (
                  <li key={idx} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="bg-orange-200 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-800 font-bold text-sm">{idx + 1}</span>
                    </div>
                    <span className="text-gray-700 font-medium">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetAnalysis}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
              >
                <RefreshCw size={20} />
                <span>Analyze Another</span>
              </button>
              <button
                onClick={downloadReport}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <Download size={20} />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">
              Developed by <span className="font-bold text-indigo-600">Rahul Kumar</span>
            </p>
            <p className="text-gray-500 text-xs">
              © 2025 All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;