type CreateProject = {
  name: string;
  description?: string;
  categoryId: number;
};

type Project = CreateProject & {
  id: string;
  createdAt: string;
};

export { CreateProject, Project }