
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const noteApi = {
    // Get all notes for a project
    getProjectNotes: async (projectId: string) => {
        const response = await api.get(`/notes/${projectId}`);
        return response.data;
    },

    // Create a new note
    createNote: async (projectId: string, content: string) => {
        const response = await api.post(`/notes/${projectId}`, { content });
        return response.data;
    },

    // Get note by ID
    getNoteById: async (projectId: string, noteId: string) => {
        const response = await api.get(`/notes/${projectId}/n/${noteId}`);
        return response.data;
    },

    // Update a note
    updateNote: async (projectId: string, noteId: string, content: string) => {
        const response = await api.put(`/notes/${projectId}/n/${noteId}`, { content });
        return response.data;
    },

    // Delete a note
    deleteNote: async (projectId: string, noteId: string) => {
        const response = await api.delete(`/notes/${projectId}/n/${noteId}`);
        return response.data;
    },
};
