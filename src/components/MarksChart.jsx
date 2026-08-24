import React from "react";

export default function MarksChart({ students = [] }) {
  // Aggregate sum and count for each course
  const coursePerformance = students.reduce((acc, student) => {
    const course = student?.course?.trim() || "Unassigned";
    const marks = student && typeof student.marks === "number" ? student.marks : Number(student?.marks);
    
    if (!acc[course]) {
      acc[course] = { sum: 0, count: 0 };
    }
    
    if (!isNaN(marks) && marks !== null) {
      acc[course].sum += marks;
      acc[course].count += 1;
    }
    return acc;
  }, {});

  const chartColors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-emerald-500",
    "bg-indigo-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-cyan-500"
  ];

  const chartData = Object.entries(coursePerformance)
    .map(([course, data], index) => ({
      course,
      average: data.count > 0 ? parseFloat((data.sum / data.count).toFixed(1)) : 0,
      studentCount: data.count,
      color: chartColors[index % chartColors.length]
    }))
    .sort((a, b) => b.average - a.average);

  return (
    <div id="average-marks-chart-card" className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Average Marks / Course
          </h3>
          <span className="text-xs text-slate-400 font-medium">Avg Score %</span>
        </div>

        {chartData.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No grade records to chart.
          </div>
        ) : (
          <div className="pt-4">
            {/* Vertical Bar Chart Container */}
            <div className="flex items-end justify-between gap-3 h-36 border-b border-slate-100 pb-2 px-1">
              {chartData.map((item) => (
                <div key={item.course} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] font-medium py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10">
                    {item.average}% ({item.studentCount} {item.studentCount === 1 ? "student" : "students"})
                  </div>

                  <span className="text-[10px] font-semibold text-slate-700 mb-1">
                    {item.average}%
                  </span>
                  <div
                    className={`w-full ${item.color} rounded-t-sm transition-all duration-500 ease-out hover:opacity-90`}
                    style={{ height: `${Math.min(Math.max(item.average, 8), 100)}%` }}
                    title={`${item.course}: ${item.average}%`}
                  />
                  <span
                    className="text-[10px] mt-2 text-slate-500 font-medium truncate max-w-full text-center"
                    title={item.course}
                  >
                    {item.course.length > 8 ? `${item.course.slice(0, 7)}.` : item.course}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-[10px] text-center text-slate-400 mt-6">
        Dynamic Chart • React Analytics Engine
      </p>
    </div>
  );
}
