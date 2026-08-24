import React from "react";
import { Users, Award, TrendingUp } from "lucide-react";

export default function SummaryCards({ students = [] }) {
  const totalStudents = students.length;

  const validMarks = students
    .map((s) => (s && typeof s.marks === "number" ? s.marks : Number(s?.marks)))
    .filter((m) => !isNaN(m) && m !== null);

  const averageMarks =
    validMarks.length > 0
      ? (validMarks.reduce((sum, val) => sum + val, 0) / validMarks.length).toFixed(1)
      : "0";

  const highestMarks =
    validMarks.length > 0 ? Math.max(...validMarks) : "N/A";

  const topStudent = students.find((s) => Number(s?.marks) === highestMarks);

  const courseCount = new Set(
    students
      .map((s) => s?.course?.trim())
      .filter(Boolean)
  ).size;

  return (
    <div id="summary-cards-container" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1: Total Students */}
      <div
        id="summary-total-students"
        className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs transition-shadow hover:shadow-sm"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Students</p>
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{totalStudents}</h2>
        <div className="mt-2 text-xs text-emerald-600 font-medium flex items-center space-x-1">
          <span>Active enrolled students</span>
        </div>
      </div>

      {/* Card 2: Average Marks */}
      <div
        id="summary-average-marks"
        className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs transition-shadow hover:shadow-sm"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500 mb-1">Average Marks</p>
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
          {averageMarks}
          <span className="text-lg text-slate-400 font-normal">/100</span>
        </h2>
        <div className="mt-2 text-xs text-slate-400 font-medium">
          Across {courseCount} active {courseCount === 1 ? "course" : "courses"}
        </div>
      </div>

      {/* Card 3: Highest Marks */}
      <div
        id="summary-highest-marks"
        className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs transition-shadow hover:shadow-sm"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500 mb-1">Highest Marks</p>
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
          {highestMarks !== "N/A" ? `${highestMarks}` : "N/A"}
        </h2>
        <div className="mt-2 text-xs text-amber-600 font-medium truncate" title={topStudent?.name ? `Top scorer: ${topStudent.name}` : "Top academic score"}>
          {topStudent?.name ? `Top: ${topStudent.name}` : "Top score achieved"}
        </div>
      </div>
    </div>
  );
}
