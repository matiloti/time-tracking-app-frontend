import { BASE_URL } from "./config";
import { MilestoneDetails } from "./types/Milestone";

const getMilestoneDetail = async (id: string): Promise<MilestoneDetails> => {
  const res = await fetch(`${BASE_URL}/milestones/${id}/details`);
  if(!res.ok) console.log(res);
  return res.json();
}

export { getMilestoneDetail }