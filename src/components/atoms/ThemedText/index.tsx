import { Text, useColorScheme } from "react-native";
import { ThemedTextProps } from "./types";
import { getTheme } from "@/constants/theme";

export default function ThemedText({
    text,
    className
}: ThemedTextProps) {
    const isDark = useColorScheme() === 'dark';
    return (
        <Text className={`text-black dark:text-gray-200 ${className}`}>{text}</Text>
    );
}