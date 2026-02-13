type TaskDetails = {
    id: string;
    name: string;
    description?: string;
    priorityId: number;
    completed: boolean;
    milestoneId: string;
    milestoneName: string,
}

export { TaskDetails };