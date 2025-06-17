import { getStyle } from "@/src/utils/formUtils";
import { useContext, useEffect, useMemo, useState } from "react";
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { DEFAULT_FORMFIELD_VALUE } from "../constants";
import { FormContext, FormValidationContext } from "../Form";
import { FormField } from "../types";
import { defaultStyle } from "./styles";
import { FormTextFieldProps } from "./types";

export default function FormTextField({
    name,
    label,
    placeholder = 'Insert text...', 
    multiline = false,
    validationRules = [],
    style,
    placeholderColors
}: FormTextFieldProps) {
    const updateForm = useContext(FormContext);
    const showErrors = useContext(FormValidationContext);

    const [field, setField] = useState<FormField<string>>(DEFAULT_FORMFIELD_VALUE);
    const [errorMsg, setErrorMsg] = useState<string>();

    useEffect(() => {
        const validation = validationRules.find(rule => !rule.execute(DEFAULT_FORMFIELD_VALUE.value));
        updateForm({[name]: DEFAULT_FORMFIELD_VALUE});
        setErrorMsg(validation?.errorMessage);
    }, [name, updateForm, validationRules]);

    function onChangeText(text: string) {
        const validation = validationRules.find(rule => !rule.execute(text));
        const newValue = {value: text, isValid: !validation};
        setField(newValue);
        updateForm({[name]: newValue});
        setErrorMsg(validation?.errorMessage);
    }

    const CONTAINER_STYLES: StyleProp<ViewStyle> = useMemo(
        () => getStyle(
            StyleSheet.compose(defaultStyle.fieldGroup, style?.fieldGroup),
            StyleSheet.compose(defaultStyle.fieldGroupError, style?.fieldGroupError), 
            field.isValid, 
            showErrors),
        [style, showErrors, field.isValid]
    );

    const LABEL_STYLES: StyleProp<TextStyle> = useMemo(
        () => getStyle(
            StyleSheet.compose(defaultStyle.label, style?.label), 
            StyleSheet.compose(defaultStyle.labelError, style?.labelError), 
            field.isValid, 
            showErrors),
        [style, showErrors, field.isValid]
    );

    const TEXT_STYLES: StyleProp<TextStyle> = useMemo(
        () => getStyle(
            StyleSheet.compose(defaultStyle.textInput, style?.textInput), 
            StyleSheet.compose(defaultStyle.textInputError, style?.textInputError), 
            field.isValid, 
            showErrors),
        [style, showErrors, field.isValid]
    );

    const ERRORMSG_STYLE: StyleProp<TextStyle> = useMemo(
        () => StyleSheet.compose(defaultStyle.errorMsg, style?.errorMsg),
        [style]
    );

    return (
        <View style={CONTAINER_STYLES}>
            {label && <Text style={LABEL_STYLES}>{label}</Text>}
            <TextInput 
                style={TEXT_STYLES} 
                placeholder={placeholder} 
                placeholderTextColor={!field.isValid && showErrors ? placeholderColors?.error : placeholderColors?.normal}
                onChangeText={onChangeText}
                multiline={multiline}
            />
            <Text style={ERRORMSG_STYLE}>{(!field.isValid && showErrors && errorMsg) ? `* ${errorMsg}` : ''}</Text>
        </View>
    );
}