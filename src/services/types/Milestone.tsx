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

type MilestoneTaskItem = {
    id: string;
    name: string;
    description?: string;
    priorityId: number;
    completed: boolean;
}

type MilestoneDetails = {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  projectId: string;
  projectName: string;
  tasks: MilestoneTaskItem[]
};

export { MilestoneDetails, MilestoneItem };