import React from "react";

export default function CourseStats({ students = [] }) {
  const courseCounts = students.reduce((acc, student) => {
    const courseName = student?.course?.trim() || "Unassigned";
    acc[courseName] = (acc[courseName] || 0) + 1;
    return acc;
  }, {});

  const courseList = Object.entries(courseCounts).sort((a, b) => b[1] - a[1]);
  const totalStudents = students.length;

  return (
    <div id="course-statistics-card" className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Course Enrollment
        </h3>
        <span className="text-xs font-medium text-slate-400">
          {courseList.length} {courseList.length === 1 ? "Course" : "Courses"}
        </span>
      </div>

      {courseList.length === 0 ? (
        <div className="py-6 text-center text-xs text-slate-400">
          No course data available.
        </div>
      ) : (
        <div className="space-y-1">
          {courseList.map(([course, count]) => {
            const percentage = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
            return (
              <div
                key={course}
                id={`course-stat-${course.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="flex justify-between items-center py-2.5 px-1 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-slate-600 font-medium line-clamp-1" title={course}>
                    {course}
                  </span>
                  <span className="text-[11px] text-slate-400">{percentage}% of total</span>
                </div>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
