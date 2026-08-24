import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory student dataset representing Question 2 Student REST API
  let students = [
    { id: 1, name: "Aarav Sharma", email: "aarav.sharma@university.edu.in", course: "Computer Science", marks: 92 },
    { id: 2, name: "Ananya Iyer", email: "ananya.iyer@university.edu.in", course: "Information Technology", marks: 78 },
    { id: 3, name: "Rohan Mukherjee", email: "rohan.mukherjee@university.edu.in", course: "Data Science", marks: 95 },
    { id: 4, name: "Priya Sundaram", email: "priya.sundaram@university.edu.in", course: "Computer Science", marks: 84 },
    { id: 5, name: "Vikram Malhotra", email: "vikram.malhotra@university.edu.in", course: "Electronics", marks: 68 },
    { id: 6, name: "Sneha Reddy", email: "sneha.reddy@university.edu.in", course: "Mechanical Engineering", marks: 74 },
    { id: 7, name: "Aditya Verma", email: "aditya.verma@university.edu.in", course: "Data Science", marks: 89 },
    { id: 8, name: "Kavya Patel", email: "kavya.patel@university.edu.in", course: "Information Technology", marks: 81 },
    { id: 9, name: "Ishaan Gupta", email: "ishaan.gupta@university.edu.in", course: "Computer Science", marks: 98 },
    { id: 10, name: "Diya Nair", email: "diya.nair@university.edu.in", course: "Electronics", marks: 62 },
    { id: 11, name: "Arjun Banerjee", email: "arjun.banerjee@university.edu.in", course: "Data Science", marks: 91 },
    { id: 12, name: "Pooja Choudhury", email: "pooja.choudhury@university.edu.in", course: "Mechanical Engineering", marks: 83 }
  ];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // GET /api/students - Retrieve all students
  app.get("/api/students", (req, res) => {
    try {
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve student records" });
    }
  });

  // POST /api/students - Add a student (Question 2 CRUD support)
  app.post("/api/students", (req, res) => {
    const { name, email, course, marks } = req.body;
    if (!name || !email || !course || marks === undefined || marks === null) {
      return res.status(400).json({ message: "All fields (name, email, course, marks) are required" });
    }
    const newStudent = {
      id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
      name: String(name).trim(),
      email: String(email).trim(),
      course: String(course).trim(),
      marks: Number(marks)
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
  });

  // DELETE /api/students/:id - Delete a student
  app.delete("/api/students/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const initialLength = students.length;
    students = students.filter(s => s.id !== id);
    if (students.length === initialLength) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  });

  // POST /api/students/reset - Reset sample dataset
  app.post("/api/students/reset", (req, res) => {
    students = [
      { id: 1, name: "Aarav Sharma", email: "aarav.sharma@university.edu.in", course: "Computer Science", marks: 92 },
      { id: 2, name: "Ananya Iyer", email: "ananya.iyer@university.edu.in", course: "Information Technology", marks: 78 },
      { id: 3, name: "Rohan Mukherjee", email: "rohan.mukherjee@university.edu.in", course: "Data Science", marks: 95 },
      { id: 4, name: "Priya Sundaram", email: "priya.sundaram@university.edu.in", course: "Computer Science", marks: 84 },
      { id: 5, name: "Vikram Malhotra", email: "vikram.malhotra@university.edu.in", course: "Electronics", marks: 68 },
      { id: 6, name: "Sneha Reddy", email: "sneha.reddy@university.edu.in", course: "Mechanical Engineering", marks: 74 },
      { id: 7, name: "Aditya Verma", email: "aditya.verma@university.edu.in", course: "Data Science", marks: 89 },
      { id: 8, name: "Kavya Patel", email: "kavya.patel@university.edu.in", course: "Information Technology", marks: 81 },
      { id: 9, name: "Ishaan Gupta", email: "ishaan.gupta@university.edu.in", course: "Computer Science", marks: 98 },
      { id: 10, name: "Diya Nair", email: "diya.nair@university.edu.in", course: "Electronics", marks: 62 },
      { id: 11, name: "Arjun Banerjee", email: "arjun.banerjee@university.edu.in", course: "Data Science", marks: 91 },
      { id: 12, name: "Pooja Choudhury", email: "pooja.choudhury@university.edu.in", course: "Mechanical Engineering", marks: 83 }
    ];
    res.json(students);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
