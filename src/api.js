const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function fetchStudents() {
  const response = await fetch(`${API_BASE_URL}/api/students`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || `Error ${response.status}: Failed to fetch students`;
    throw new Error(errorMessage);
  }

  return response.json();
}
