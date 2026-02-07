import ThemedText from "@/components/atoms/ThemedText";
import { getProjectDetail } from "@/services/project";
import { ProjectDetails } from "@/services/types/Project";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function ProjectDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [ project, setProject ] = useState<ProjectDetails>();
    const router = useRouter();

    const fetchProject = async () => {
        setProject(await getProjectDetail(id));
    }

    useFocusEffect(
        useCallback(() => {
            fetchProject();
        }, [])
    );
    return (
        <View className="mt-40 px-10 flex items-start">
            <ThemedText text={`${project?.name}`} className="text-5xl font-bold"/>
            <View className="rounded-full dark:border-white bg-amber-500 p-1 px-3 min-w-20 mt-3">
                <ThemedText text={`${project?.categoryId}`} className="text-center"/>
            </View>
            <ThemedText text={`${project?.description}`} className="flex shrink my-3"/>
            <ThemedText text="Milestones" className="text-3xl flex shrink my-5"/>
            { project?.milestones.map(milestone => (
                <TouchableOpacity 
                    className="bg-gray-700 p-8 rounded-2xl w-full flex flex-row justify-between items-center mb-5"
                    onPress={() => router.push({pathname: "/milestone/[id]", params: {id: milestone.id}}) }
                >
                    <ThemedText text={`${milestone.name}`} className="font-bold"/>
                    <SymbolView name="arrow.forward" tintColor="white"/>
                </TouchableOpacity>
            ))}
        </View>
    );
}