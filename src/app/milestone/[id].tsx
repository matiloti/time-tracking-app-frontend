import ThemedText from "@/components/atoms/ThemedText";
import { getMilestoneDetail } from "@/services/milestone";
import { MilestoneDetails } from "@/services/types/Milestone";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function MilestoneDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [ milestone, setMilestone ] = useState<MilestoneDetails>();
    const router = useRouter();

    const fetchMilestone = async () => {
        setMilestone(await getMilestoneDetail(id));
    }

    useFocusEffect(
        useCallback(() => {
            fetchMilestone();
        }, [])
    );

    return (
        <View className="mt-40 px-10 flex items-start">
            <ThemedText text={`${milestone?.name}`} className="text-5xl font-bold"/>
            <View className="mt-3">
                <ThemedText text={`From ${milestone?.startDate} until ${milestone?.endDate}`} className="text-center"/>
            </View>
            <ThemedText text={`${milestone?.description ?? '<No description>'}`} className={"flex shrink my-3 " + (milestone?.description!! ? "" : "italic")}/>
            <ThemedText text="Tasks" className="text-2xl my-5"/>
            {
                milestone?.tasks.map(task => (
                    <TouchableOpacity 
                        className="bg-gray-700 p-8 rounded-2xl w-full flex flex-row justify-between items-center mb-5"
                        onPress={() => router.push({pathname: "/task/[id]", params: {id: task.id}}) }
                    >
                        <ThemedText text={`${task.name}`} className="font-bold"/>
                        <SymbolView name="arrow.forward" tintColor="white"/>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
}