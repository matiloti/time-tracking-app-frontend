import { BASE_URL } from "./config";
import { MilestoneDetails } from "./types/Milestone";
import { CreateProject, ProjectDetails, ProjectItem } from "./types/Project";

async function createProject(project: CreateProject) {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    console.log(res);
  }
}

const listAllProjects = async (): Promise<ProjectItem[]> => {
  const res = await fetch(`${BASE_URL}/projects/listAll`);
  if(!res.ok) console.log(res);
  return res.json();
}

const getProjectDetail = async (id: string): Promise<ProjectDetails> => {
  const res = await fetch(`${BASE_URL}/projects/${id}/details`);
  if(!res.ok) console.log(res);
  return res.json();
}


export { createProject, listAllProjects, getProjectDetail }