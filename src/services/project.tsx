import { BASE_URL } from "./config";
import { CreateProject, Project } from "./types/Project";

async function createProject(project: CreateProject) {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
        console.log(res);
  }

  console.log(res);
}

const listAllProjects = async (): Promise<Project[]> => {
  console.log(BASE_URL)
    const res = await fetch(`${BASE_URL}/projects/listAll`);

    if(!res.ok) {
        console.log(res);
    }

    return res.json();
}

export { createProject, listAllProjects as findAllProjects }