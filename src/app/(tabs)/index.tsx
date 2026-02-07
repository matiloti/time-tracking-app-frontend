import ThemedText from "@/components/atoms/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
      <SafeAreaView>
        <ThemedText text="What are you working on?" className="text-5xl font-bold m-10 dark:color-gray-200"/>
      </SafeAreaView>
  );
}