type Priority = {
    id: number;
    en: string;
    textColor: string;
    bgColor: string;
}

const PRIORITIES: Priority[]  = [
    {
        id: 0,
        en: 'Undefined',
        textColor: 'text-gray-500',
        bgColor: 'bg-gray-500',
    },
    {
        id: 1,
        en: 'Low',
        textColor: 'text-blue-500',
        bgColor: 'bg-blue-500',
    },
    {
        id: 2,
        en: 'Medium',
        textColor: 'text-blue-500',
        bgColor: 'bg-blue-500',
    },
    {
        id: 3,
        en: 'High',
        textColor: 'text-green-500',
        bgColor: 'bg-green-500',
    }
]

const getPriority = (priorityId?: number) => {
    if(priorityId === undefined) return PRIORITIES[0];
    const priority = PRIORITIES.find(p => p.id == priorityId);
    if(priority === undefined) return PRIORITIES[0];
    return priority;
}

export { getPriority }