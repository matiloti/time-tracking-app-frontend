type CreateMilestone = {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
};

type Milestone = CreateMilestone & {
  id: string;
  projectId: string;
  createdAt: string;
  milestones: Milestone[]
};

type MilestoneItem = {
  id: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
};

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