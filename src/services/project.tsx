import { BASE_URL } from "./config";
import { CreateProject, Project } from "./types/Project";

async function createProject(project: CreateProject) {
  const res = await fetch(`${BASE_URL}/project`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
        console.log(res);
  }

  console.log(res);
}

const findAllProjects = async (): Promise<Project[]> => {
    const res = await fetch(`${BASE_URL}/projects/findAll`);

    if(!res.ok) {
        console.log(res);
    }


    return res.json();
}

export { createProject, findAllProjects }