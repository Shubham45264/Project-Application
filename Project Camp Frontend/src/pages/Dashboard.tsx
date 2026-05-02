import { useEffect, useState, useCallback } from "react";
import { Plus, LogOut, Tent, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "sonner";

import { getProjects } from "@/services/project.api";
import { getTasksByProject } from "@/services/task.api";

import ProjectCard, {
  Project,
  TaskStats,
} from "@/pages/projects/ProjectCard";

/* ---------------- TYPES ---------------- */
interface Task {
  _id: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

/* ---------------- DASHBOARD ---------------- */
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [projects, setProjects] = useState<any[]>([]); // { project, role, stats }
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /* -------- LOAD PROJECTS -------- */
  const loadProjects = useCallback(async (query = "") => {
    try {
      setLoading(true);
      const data = await getProjects(query);
      setProjects(data); // Backend now returns stats inside each item
    } catch (error: any) {
      alert(error.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial Load + Search Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      loadProjects(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, loadProjects]);

  // Refetch when returning from create/edit
  useEffect(() => {
    if (location.state?.refresh) {
      loadProjects(search);
    }
  }, [location, loadProjects, search]);

  /* -------- LOGOUT -------- */
  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.removeItem("user");

      toast.success("Signed out successfully", {
        description: `See you soon, ${user.fullName || user.username || "Friend"}!`,
        duration: 4000,
      });

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 border-r bg-card/50 flex flex-col">
        <div className="h-16 px-6 border-b flex items-center gap-2">
          <Tent className="w-5 h-5 text-primary" />
          <span className="font-semibold text-lg">
            Project<span className="text-primary">Camp</span>
          </span>
        </div>

        <div className="mt-auto p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 px-6 border-b flex justify-between items-center">
          <h1 className="text-xl font-semibold">Projects</h1>

          <div className="flex gap-3">
            <Input
              placeholder="Search projects by name..."
              className="w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="outline"
              onClick={() => {
                loadProjects(search);
              }}
            >
              Refresh
            </Button>

            <Button variant="hero" asChild>
              <Link to="/projects/new">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Link>
            </Button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 p-6">
          {loading ? (
            <p className="text-muted-foreground">Loading projects…</p>
          ) : projects.length === 0 ? (
            <p className="text-muted-foreground">No projects found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((item) => (
                <div key={item.project._id} className="relative group">
                  <div
                    onClick={() => navigate(`/project/${item.project._id}`)}
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <ProjectCard
                      project={item.project}
                      stats={item.stats || { todo: 0, inProgress: 0, done: 0 }}
                    />
                    <div className="text-xs text-muted-foreground mt-1 text-center">
                      Progress: {item.stats?.progress || 0}%
                    </div>
                  </div>

                  {/* Edit Button - Visible on Hover or always visible */}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/${item.project._id}/edit`);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
