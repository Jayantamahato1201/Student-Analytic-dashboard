import React, { useState } from "react";
import { ArrowUpDown, User } from "lucide-react";

export default function StudentTable({ students = [], isFiltered = false }) {
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    let valA = a?.[sortField];
    let valB = b?.[sortField];

    if (sortField === "marks") {
      valA = typeof valA === "number" ? valA : Number(valA) || 0;
      valB = typeof valB === "number" ? valB : Number(valB) || 0;
    } else {
      valA = (valA || "").toString().toLowerCase();
      valB = (valB || "").toString().toLowerCase();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const getCourseBadge = (course) => {
    if (!course) {
      return (
        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-md font-medium">
          Unassigned
        </span>
      );
    }
    const lower = course.toLowerCase();
    if (lower.includes("computer") || lower.includes("cs")) {
      return (
        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
          {course}
        </span>
      );
    }
    if (lower.includes("math") || lower.includes("statistics")) {
      return (
        <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md font-medium">
          {course}
        </span>
      );
    }
    if (lower.includes("physics") || lower.includes("mech") || lower.includes("civil")) {
      return (
        <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-md font-medium">
          {course}
        </span>
      );
    }
    if (lower.includes("bio") || lower.includes("data") || lower.includes("ai")) {
      return (
        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-md font-medium">
          {course}
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium">
        {course}
      </span>
    );
  };

  return (
    <div
      id="student-records-table-container"
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full"
    >
      <div className="overflow-x-auto flex-grow">
        <table id="students-data-table" className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white border-b border-slate-200">
            <tr>
              <th
                scope="col"
                onClick={() => handleSort("name")}
                className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors select-none"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Student Name</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th
                scope="col"
                onClick={() => handleSort("email")}
                className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors select-none"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Email Address</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th
                scope="col"
                onClick={() => handleSort("course")}
                className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors select-none"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Course</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th
                scope="col"
                onClick={() => handleSort("marks")}
                className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors select-none text-right"
              >
                <div className="flex items-center justify-end space-x-1.5">
                  <span>Marks</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedStudents.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <User className="w-7 h-7 text-slate-300" />
                    <p className="font-medium text-slate-500 text-sm">
                      {isFiltered ? "No students match your filter criteria" : "No student records found"}
                    </p>
                    {isFiltered && (
                      <p className="text-xs text-slate-400">Try adjusting your search terms or course selection</p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              sortedStudents.map((student, idx) => (
                <tr
                  key={student.id ?? idx}
                  id={`student-row-${student.id ?? idx}`}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-3 font-medium text-slate-700 whitespace-nowrap">
                    {student.name || "Unnamed Student"}
                  </td>
                  <td className="px-6 py-3 text-slate-500 text-sm whitespace-nowrap">
                    {student.email ? (
                      <a
                        href={`mailto:${student.email}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {student.email}
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">No email</span>
                    )}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {getCourseBadge(student.course)}
                  </td>
                  <td className="px-6 py-3 text-right font-mono font-semibold text-slate-800 whitespace-nowrap">
                    {student.marks !== null && student.marks !== undefined && !isNaN(Number(student.marks))
                      ? Number(student.marks).toFixed(1)
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
