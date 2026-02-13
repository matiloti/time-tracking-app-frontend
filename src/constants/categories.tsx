type Category = {
    en: string;
    textColor: string;
    bgColor: string;
}

const CATEGORIES: Record<number, Category> = {
    1: {
        en: 'Software',
        textColor: 'text-red-500',
        bgColor: 'bg-red-500',
    },
    2: {
        en: 'Content Creation',
        textColor: 'text-blue-500',
        bgColor: 'bg-blue-500',
    },
    3: {
        en: 'Learning',
        textColor: 'text-green-500',
        bgColor: 'bg-green-500',
    }
}

export { CATEGORIES }