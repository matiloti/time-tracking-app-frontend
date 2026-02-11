import { Text, useColorScheme } from "react-native";
import { ThemedTextProps } from "./types";
import { getTheme } from "@/constants/theme";

export default function ThemedText({
    text,
    lightThemeColor = 'text-black',
    darkThemeColor = 'dark:text-white',
    className
}: ThemedTextProps) {
    return (
        <Text className={`${lightThemeColor} ${darkThemeColor} ${className}`}>{text}</Text>
    );
}