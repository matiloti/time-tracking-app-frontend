type CreateProject = {
  name: string;
  description?: string;
  categoryId: number;
};

type ProjectItem = {
  id: string;
  name: string;
  description?: string;
  categoryId: number;
};

type ProjectDetails = {
  id: string;
  name: string;
  description?: string;
  categoryId: number;
  createdAt: Date;
  milestones: MilestoneItem[]
};

export { CreateProject, ProjectItem, ProjectDetails }