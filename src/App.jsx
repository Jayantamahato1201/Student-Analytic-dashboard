import React, { useState, useEffect, useMemo, useCallback } from "react";
import { fetchStudents } from "./api.js";
import SummaryCards from "./components/SummaryCards.jsx";
import CourseStats from "./components/CourseStats.jsx";
import MarksChart from "./components/MarksChart.jsx";
import StudentFilters from "./components/StudentFilters.jsx";
import StudentTable from "./components/StudentTable.jsx";
import { RefreshCw, AlertCircle, Loader2 } from "lucide-react";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load student data. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Extract unique courses dynamically from API data
  const uniqueCourses = useMemo(() => {
    const courses = new Set();
    students.forEach((s) => {
      if (s?.course && typeof s.course === "string" && s.course.trim()) {
        courses.add(s.course.trim());
      }
    });
    return Array.from(courses).sort();
  }, [students]);

  // Combined search and course filtering
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const nameMatch = (student?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

      const courseMatch =
        !selectedCourse ||
        (student?.course || "").toLowerCase() === selectedCourse.toLowerCase();

      return nameMatch && courseMatch;
    });
  }, [students, searchTerm, selectedCourse]);

  return (
    <div id="student-analytics-app" className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl w-full mx-auto flex flex-col flex-grow">
        {/* Clean Minimalism Header */}
        <header id="app-header" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">Student Analytics Dashboard</h1>
            <p className="text-sm text-slate-500 font-medium">Full-Stack Machine Test Output &bull; GET /api/students</p>
          </div>

          <div className="flex items-center space-x-3 self-end sm:self-auto">
            {/* Status indicator */}
            {!error && !loading && (
              <div className="flex items-center bg-emerald-50 border border-emerald-200/80 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                API Connected
              </div>
            )}

            {/* Refresh button */}
            <button
              id="refresh-data-button"
              type="button"
              onClick={loadData}
              disabled={loading}
              className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-xs hover:shadow-sm disabled:opacity-50 transition-all flex items-center space-x-2 cursor-pointer"
              title="Refresh data from server"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-blue-600" : "text-slate-500"}`} />
              <span>{error ? "Retry Fetch" : "Refresh"}</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div id="app-main-content" className="flex-grow flex flex-col space-y-6">
          {/* Loading State */}
          {loading && (
            <div id="loading-state-container" className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center justify-center space-y-4 shadow-sm flex-grow">
              <Loader2 className="w-9 h-9 text-blue-600 animate-spin" />
              <div className="text-center">
                <h3 className="text-sm font-semibold text-slate-800">Fetching Student Analytics</h3>
                <p className="text-xs text-slate-400 mt-1">Connecting to REST API endpoint GET /api/students...</p>
              </div>
            </div>
          )}

          {/* Error State with Retry option */}
          {!loading && error && (
            <div id="error-state-container" className="bg-rose-50 border border-rose-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-rose-900">Failed to Retrieve Student Records</h3>
                  <p className="text-xs text-rose-700 mt-1 leading-relaxed">{error}</p>
                  <div className="mt-4">
                    <button
                      id="retry-fetch-button"
                      type="button"
                      onClick={loadData}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry Fetch</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loaded Dashboard Content */}
          {!loading && !error && (
            <>
              {/* 1. Summary Cards */}
              <section id="summary-section">
                <SummaryCards students={students} />
              </section>

              {/* 2. Search & Course Filters */}
              <section id="filters-section">
                <StudentFilters
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedCourse={selectedCourse}
                  onCourseChange={setSelectedCourse}
                  courses={uniqueCourses}
                  totalCount={students.length}
                  filteredCount={filteredStudents.length}
                />
              </section>

              {/* 3. 2-Column Dashboard: Table on Left, Statistics & Visual Chart on Right */}
              <section id="dashboard-grid-section" className="flex flex-col lg:flex-row gap-6 items-start flex-grow">
                {/* Left Column: Student Records Table */}
                <div className="flex-grow w-full min-w-0">
                  <StudentTable
                    students={filteredStudents}
                    isFiltered={searchTerm.trim() !== "" || selectedCourse !== ""}
                  />
                </div>

                {/* Right Column: Course Stats & Average Marks Chart */}
                <div className="w-full lg:w-80 xl:w-96 flex flex-col space-y-6 shrink-0">
                  <CourseStats students={students} />
                  <MarksChart students={students} />
                </div>
              </section>
            </>
          )}
        </div>

        {/* Clean Minimalism Footer */}
        <footer id="app-footer" className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
          <div>
            Endpoint: <span className="font-mono text-slate-500">GET /api/students</span>
          </div>
          <div>Powered by React.js & Student Analytics Engine</div>
        </footer>
      </div>
    </div>
  );
}
