const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/* ================= GET TASKS BY PROJECT ================= */
export const getTasksByProject = async (projectId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/tasks/project/${projectId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch tasks");
  }

  return result.data; // Task[]
};

/* ================= CREATE TASK ================= */
export const createTask = async (
  projectId: string,
  data: {
    title: string;
    description?: string;
  }
) => {
  const response = await fetch(
    `${API_BASE_URL}/tasks/${projectId}`,
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
    throw new Error(result.message || "Failed to create task");
  }

  return result.data;
};

/* ================= DELETE TASK ================= */
export const deleteTask = async (taskId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/tasks/${taskId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete task");
  }

  return result.data;
};

/* ================= UPDATE TASK STATUS ================= */
export const updateTaskStatus = async (
  taskId: string,
  status: "todo" | "in_progress" | "done"
) => {
  const response = await fetch(
    `${API_BASE_URL}/tasks/${taskId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update task");
  }

  return result.data;
};

/* ================= CREATE SUBTASK ================= */
export const createSubTask = async (taskId: string, title: string) => {
  console.log("Sending create subtask request", { taskId, title });
  const response = await fetch(
    `${API_BASE_URL}/tasks/${taskId}/subtasks`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create subtask");
  }

  return result.data;
};

/* ================= UPDATE SUBTASK STATUS ================= */
export const updateSubTaskStatus = async (
  subtaskId: string,
  isCompleted: boolean
) => {
  const response = await fetch(
    `${API_BASE_URL}/tasks/subtasks/${subtaskId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update subtask");
  }

  return result.data;
};

/* ================= DELETE SUBTASK ================= */
export const deleteSubTask = async (subtaskId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/tasks/subtasks/${subtaskId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete subtask");
  }

  return result.data;
};
