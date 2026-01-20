import { MobileLayout } from "@/components/layout/MobileLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AlertTriangle, Calendar, Menu, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

// ---- Mock Data with new fields ----
const projects = [
  {
    id: 1,
    title: "City Center Mall Renovation",
    client: "Urban Development Authority",
    status: "Active",
    statusColor: "bg-emerald-100 text-emerald-700",
    progress: 65,
    startDate: "01 Sep 2024",
    endDate: "15 Dec 2024",
    dueDate: "15 Dec 2024",
    pendingDays: 18,
    criticalPending: true,
    deadlineCrossed: false,
    budget: "Rs 1.2L",
    tags: ["Commercial", "Civil"],
  },
  {
    id: 2,
    title: "Highway 45 Extension",
    client: "National Highways Dept",
    status: "Submitted",
    statusColor: "bg-blue-100 text-blue-700",
    progress: 100,
    startDate: "10 Jun 2024",
    endDate: "20 Jan 2025",
    dueDate: "20 Jan 2025",
    pendingDays: 0,
    criticalPending: false,
    deadlineCrossed: false,
    budget: "Rs 4.5L",
    tags: ["Infrastructure", "Road"],
  },
  {
    id: 3,
    title: "Green Valley Housing Phase 2",
    client: "Green Valley Pvt Ltd",
    status: "Draft",
    statusColor: "bg-gray-100 text-gray-700",
    progress: 40,
    startDate: "01 Feb 2025",
    endDate: "30 Mar 2025",
    dueDate: "30 Mar 2025",
    pendingDays: 42,
    criticalPending: false,
    deadlineCrossed: false,
    budget: "Rs 85k",
    tags: ["Residential"],
  },
  {
    id: 4,
    title: "Tech Park Block C",
    client: "Innovate Builders",
    status: "Active",
    statusColor: "bg-purple-100 text-purple-700",
    progress: 70,
    startDate: "01 Oct 2024",
    endDate: "30 Nov 2024",
    dueDate: "30 Nov 2024",
    pendingDays: -5,
    criticalPending: true,
    deadlineCrossed: true,
    budget: "Rs 2.1L",
    tags: ["Commercial", "Tech"],
  },
];


type Project = {
  id: number;
  title: string;
  client: string;
  status: string;
  statusColor: string;
  progress: number;
  startDate: string;
  endDate: string;
  dueDate: string;
  pendingDays: number;
  criticalPending: boolean;
  deadlineCrossed: boolean;
  budget: string;
  tags: string[];
};


const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={`/project/${project.id}`} key={project.id}>
      <a className="block">
        <Card className="border-none shadow-sm ring-1 ring-black/5">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              {/* Status */}
              <Badge className={`rounded-md px-2 py-0.5 ${project.statusColor}`}>
                {project.status}
              </Badge>

              {/* Pending days */}
              <span
                className={cn(
                  "text-base font-semibold",
                  project.pendingDays < 0 ? "text-red-600" : "text-muted-foreground"
                )}
              >
                {project.pendingDays === 0 ? null : project.pendingDays < 0
                  ? `${Math.abs(project.pendingDays)}d overdue`
                  : `${project.pendingDays}d`}
              </span>
            </div>

            <CardTitle className="text-lg mt-2">{project.title}</CardTitle>
            <p className="text-xs text-muted-foreground">{project.client}</p>
          </CardHeader>

          <CardContent className="p-4 pt-2 space-y-3">
            {/* Dates */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Start: {project.startDate}</span>
              <span>End: {project.endDate}</span>
            </div>

            {/* Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={cn("h-full transition-all", getProgressClass(project))}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Alerts */}
            {project.deadlineCrossed && (
              <div className="flex items-center gap-1 text-xs text-red-600">
                <XCircle className="h-3.5 w-3.5" /> Deadline crossed
              </div>
            )}
            {!project.deadlineCrossed && project.criticalPending && (
              <div className="flex items-center gap-1 text-xs text-yellow-600">
                <AlertTriangle className="h-3.5 w-3.5" /> Critical items pending
              </div>
            )}
          </CardContent>

          <CardFooter className="p-4 flex justify-between items-center text-xs border-t">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>Due: {project.dueDate}</span>
            </div>
          </CardFooter>
        </Card>
      </a>
    </Link>
  )
}



// ---- Helper for progress color ----
const getProgressClass = (project: Project) => {
  if (project.deadlineCrossed) return "bg-red-500";
  if (project.criticalPending) return "bg-yellow-500";
  if (project.progress === 100) return "bg-emerald-500";
  return "bg-primary";
};

export default function ProjectList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <MobileLayout title="Projects" sidebarOpen={sidebarOpen} onCloseSidebar={() => setSidebarOpen(false)}>
      {/* Header */}
      <div className="sticky top-0 bg-background z-20 pt-6 pb-2 px-5 space-y-4">
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Projects</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9 bg-secondary/30 border-none rounded-xl h-11" />
        </div>
      </div>

      {/* Project Cards */}
      <div className="px-5 py-2 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </MobileLayout>
  );
}
