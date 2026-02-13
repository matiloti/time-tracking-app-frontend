import ThemedText from "@/components/atoms/ThemedText";
import { getPriority } from "@/constants/priorities";
import { getTaskDetails } from "@/services/task";
import { TaskDetails } from "@/services/types/Task";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function MilestoneDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [ task, setTask ] = useState<TaskDetails>();
    const router = useRouter();

    const fetchTask = async () => {
        setTask(await getTaskDetails(id));
    }

    useFocusEffect(
        useCallback(() => {
            fetchTask();
        }, [])
    );

    return (
        <View className="mt-40 px-10 flex items-start">
            <View className="mt-3 flex-row items-center">
                <TouchableOpacity onPress={() => setTask((prev) => prev ? {...prev, completed: !prev.completed} : prev)}>
                    <SymbolView name={task?.completed!! ? "checkmark.circle.fill" : "circle"} className="w-20 " size={40}/>
                </TouchableOpacity>
                <ThemedText text={`${task?.name}`} className="text-5xl font-bold ml-2"/>
            </View>
            <View className={`rounded-full dark:border-white ${getPriority(task?.priorityId).bgColor} p-1 px-3 min-w-20 mt-3`}>
                <ThemedText text={`${getPriority(task?.priorityId).en}`} className="text-center"/>
            </View>
            <ThemedText text={`${task?.description ?? '<No description>'}`} className={"flex shrink my-3 " + (task?.description!! ? "" : "italic")}/>
        </View>
    );
}