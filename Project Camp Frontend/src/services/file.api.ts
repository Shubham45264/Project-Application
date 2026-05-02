const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

/* ================= GET PROJECT FILES ================= */
export const getProjectFiles = async (projectId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/files`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch project files");
  }

  return result.data;
};

/* ================= UPLOAD FILE ================= */
export const uploadFile = async (projectId: string, formData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/files`,
    {
      method: "POST",
      credentials: "include",
      // No Content-Type header needed for FormData; browser sets it with boundary
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to upload file");
  }

  return result.data;
};

/* ================= DELETE FILE ================= */
export const deleteFile = async (projectId: string, fileId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/files/${fileId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete file");
  }

  return result.data;
};
