const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

/* ================= GET PROJECTS ================= */
export const getProjects = async (search?: string) => {
  const url = search
    ? `${API_BASE_URL}/projects?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/projects`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch projects");
  }

  return result.data;
};

/* ================= GET PROJECT BY ID ================= */
export const getProjectById = async (projectId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch project");
  }

  return result.data;
};

/* ================= CREATE PROJECT ================= */
export const createProject = async (data: {
  name: string;
  description?: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create project");
  }

  return result.data;
};

/* ================= UPDATE PROJECT ================= */
export const updateProject = async (
  projectId: string,
  data: { name: string; description?: string }
) => {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update project");
  }

  return result.data;
};

/* ================= GET MY ROLE ================= */
export const getMyProjectRole = async (projectId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/role`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch role");
  }

  return result.data; // { role: string }
};

/* ================= ADD MEMBER ================= */
export const addMember = async (
  projectId: string,
  data: { email: string; role: "member" | "project_admin" | "admin" }
) => {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/members`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to add member");
  }

  return result.data;
};
