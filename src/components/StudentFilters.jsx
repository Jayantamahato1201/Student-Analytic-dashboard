import React from "react";
import { Search, X, ChevronDown } from "lucide-react";

export default function StudentFilters({
  searchTerm,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  courses = [],
  totalCount = 0,
  filteredCount = 0
}) {
  const isFiltered = searchTerm.trim() !== "" || selectedCourse !== "";

  const handleReset = () => {
    onSearchChange("");
    onCourseChange("");
  };

  return (
    <div
      id="student-filters-container"
      className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4"
    >
      {/* Search by student name */}
      <div className="flex-grow w-full relative">
        <span className="absolute left-3 top-2.5 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </span>
        <input
          id="student-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search students by name..."
          className="w-full pl-10 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 placeholder:text-slate-400"
        />
        {searchTerm && (
          <button
            id="clear-search-button"
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Course Filter Dropdown */}
      <div className="w-full md:w-64 relative shrink-0">
        <select
          id="course-filter-dropdown"
          value={selectedCourse}
          onChange={(e) => onCourseChange(e.target.value)}
          aria-label="Filter by course"
          className="w-full pl-4 pr-10 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 cursor-pointer"
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-2.5 pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* Filter Info / Reset Action */}
      <div className="flex items-center space-x-2 shrink-0 self-end md:self-auto">
        {isFiltered && (
          <button
            id="reset-filters-button"
            type="button"
            onClick={handleReset}
            className="text-xs font-medium text-slate-500 hover:text-slate-700 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
          >
            Reset
          </button>
        )}
        <span className="text-xs text-slate-400 font-medium px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-200/80 whitespace-nowrap">
          {filteredCount} of {totalCount}
        </span>
      </div>
    </div>
  );
}
