import { BASE_URL } from "./config";
import { TaskDetails } from "./types/Task";

const getTaskDetails = async (id: string): Promise<TaskDetails> => {
    const res = await fetch(`${BASE_URL}/tasks/${id}/details`);
    if(!res.ok) console.log(res);
    return res.json();
}

export { getTaskDetails }