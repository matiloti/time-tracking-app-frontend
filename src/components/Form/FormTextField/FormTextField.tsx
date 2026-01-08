import { DismissFieldFocusContext } from "@/src/context/DismissFieldFocusContext";
import { getStyle } from "@/src/utils/formUtils";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
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

    const dismissContext = useContext(DismissFieldFocusContext);

    const getFirstFailingValidationRule = useCallback((text: string) => {
        return validationRules.find(rule => !rule.execute(text));
    }, [validationRules]);

    useEffect(() => {
        const firstFailingValidation = getFirstFailingValidationRule(DEFAULT_FORMFIELD_VALUE.value);
        updateForm({[name]: DEFAULT_FORMFIELD_VALUE});
        setErrorMsg(firstFailingValidation?.errorMessage);
    }, [name, updateForm, validationRules, getFirstFailingValidationRule]);

    function updateFormTextField(newValue: FormField<string>) {
        setField(newValue);
        updateForm({[name]: newValue});
    }

    function onChangeText(text: string) {
        const firstFailingValidation = getFirstFailingValidationRule(text);
        const textIsValid = !firstFailingValidation;
        const newValue = {value: text, isValid: textIsValid};
        updateFormTextField(newValue);
        setErrorMsg(firstFailingValidation?.errorMessage);
    }

    const FIELDGROUP_STYLES: StyleProp<ViewStyle> = useMemo(
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

    const TEXTINPUT_STYLES: StyleProp<TextStyle> = useMemo(
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
        <View style={FIELDGROUP_STYLES}>
            {label && <Text style={LABEL_STYLES}>{label}</Text>}
                <TextInput 
                    onFocus={() => dismissContext?.dismissOnlyNotStandardFields()}
                    style={TEXTINPUT_STYLES} 
                    placeholder={placeholder} 
                    placeholderTextColor={!field.isValid && showErrors ? placeholderColors?.error : placeholderColors?.normal}
                    onChangeText={onChangeText}
                    multiline={multiline}
                />
            <Text style={ERRORMSG_STYLE}>{(!field.isValid && showErrors && errorMsg) ? `* ${errorMsg}` : ''}</Text>
        </View>
    );
}