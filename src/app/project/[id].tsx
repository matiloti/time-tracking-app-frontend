import ThemedText from "@/components/atoms/ThemedText";
import { getProjectDetail } from "@/services/project";
import { ProjectDetails } from "@/services/types/Project";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Host } from '@expo/ui/swift-ui';
import { buttonStyle, controlSize } from "@expo/ui/swift-ui/modifiers";


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
            <View className="flex-row items-center justify-between w-full">
                <ThemedText text="Milestones" className="text-3xl flex shrink my-5"/>
                <Host matchContents style={[{height: 40, width: 40}]}>
                    <Button modifiers={[buttonStyle('glass'), controlSize('regular')]} >
                        <SymbolView name="plus" tintColor="white" size={40}/>
                    </Button>
                </Host>
            </View>
            { project?.milestones.map(milestone => (
                <TouchableOpacity 
                    key={milestone.id}
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