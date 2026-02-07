import { getStyle } from "@/utils/formUtils";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Dropdown, DropdownOption } from "../../Dropdown/Dropdown";
import { DropdownStyles } from "../../Dropdown/types";
import { DEFAULT_FORMFIELD_VALUE } from "../constants";
import { FormContext, FormValidationContext } from "../Form";
import { FormField } from "../types";
import { defaultDropdownStyles, defaultStyle } from "./styles";
import { FormDropdownProps } from "./types";

export default function FormDropdown<T>({
    name,
    label,
    placeholder = 'Select an option...', 
    options = [],
    validationRules = [],
    style
}: FormDropdownProps<T>) {    
    const updateForm = useContext(FormContext);
    const showErrors = useContext(FormValidationContext);

    const [field, setField] = useState<FormField<T>>(DEFAULT_FORMFIELD_VALUE);
    const [errorMsg, setErrorMsg] = useState<string>();
    
    const getFirstFailingValidationRule = useCallback((selectedOption: DropdownOption<T>) => {
        return validationRules.find(rule => !selectedOption || !rule.execute(selectedOption.value));
    }, [validationRules]);
    
    useEffect(() => {
        const firstFailingValidation = getFirstFailingValidationRule(DEFAULT_FORMFIELD_VALUE.value);
        updateForm({[name]: DEFAULT_FORMFIELD_VALUE});
        setErrorMsg(firstFailingValidation?.errorMessage);
    }, [name, updateForm, validationRules, getFirstFailingValidationRule]);

    function updateFormDropdownField(newValue: FormField<T>) {
        setField(newValue);
        updateForm({[name]: newValue});
    }

    function onSelect(selectedOption: DropdownOption<T>) {
        const firstFailingValidation = getFirstFailingValidationRule(selectedOption);
        const selectedOptionIsValid = !firstFailingValidation;
        const newValue = {value: selectedOption.value, isValid: selectedOptionIsValid};
        updateFormDropdownField(newValue);
        setErrorMsg(firstFailingValidation?.errorMessage);
    }

    const FIELDGROUP_STYLE: StyleProp<ViewStyle> = useMemo(
        () => getStyle(
            StyleSheet.compose(defaultStyle.fieldGroup, style?.fieldGroup), 
            StyleSheet.compose(defaultStyle.fieldGroupError, style?.fieldGroupError),
            field.isValid,
            showErrors
        ),
        [style, showErrors, field.isValid]
    );

    const LABEL_STYLE: StyleProp<TextStyle> = useMemo(
        () => getStyle(
            StyleSheet.compose(defaultStyle.label, style?.label), 
            StyleSheet.compose(defaultStyle.labelError, style?.labelError),
            field.isValid,
            showErrors
        ),
        [field.isValid, showErrors, style]
    );

    const DROPDOWN_STYLE: DropdownStyles = useMemo(
        () => (
            {
                container: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdown?.container, style?.dropdown?.container),
                    StyleSheet.compose(defaultDropdownStyles.dropdownError?.container, style?.dropdownError?.container),
                    field.isValid,
                    showErrors
                ),
                dropdownBox: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdown?.dropdownBox, style?.dropdown?.dropdownBox),
                    StyleSheet.compose(defaultDropdownStyles.dropdownError?.dropdownBox, style?.dropdownError?.dropdownBox),
                    field.isValid,
                    showErrors
                ),
                dropdownModal: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdown?.dropdownModal, style?.dropdown?.dropdownModal),
                    StyleSheet.compose(defaultDropdownStyles.dropdownError?.dropdownModal, style?.dropdownError?.dropdownModal),
                    field.isValid,
                    showErrors
                ),
                dropdownOption: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdown?.dropdownOption, style?.dropdown?.dropdownOption),
                    StyleSheet.compose(defaultDropdownStyles.dropdownError?.dropdownOption, style?.dropdownError?.dropdownOption),
                    field.isValid,
                    showErrors
                ),
                dropdownOptionText: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdown?.dropdownOptionText, style?.dropdown?.dropdownOptionText),
                    StyleSheet.compose(defaultDropdownStyles.dropdownError?.dropdownOptionText, style?.dropdownError?.dropdownOptionText),
                    field.isValid,
                    showErrors
                ),
                dropdownPlaceholder: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdown?.dropdownPlaceholder, style?.dropdown?.dropdownPlaceholder),
                    StyleSheet.compose(defaultDropdownStyles.dropdownError?.dropdownPlaceholder, style?.dropdownError?.dropdownPlaceholder),
                    field.isValid,
                    showErrors
                ),
                dropdownSelectedText: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdown?.dropdownSelectedText, style?.dropdown?.dropdownSelectedText),
                    StyleSheet.compose(defaultDropdownStyles.dropdownError?.dropdownSelectedText, style?.dropdownError?.dropdownSelectedText),
                    field.isValid,
                    showErrors
                ),
            } as DropdownStyles
        ),
        [field.isValid, showErrors, style]
    );

    const ERRORMSG_STYLE: StyleProp<TextStyle> = useMemo(
        () => StyleSheet.compose(defaultStyle.errorMsg, style?.errorMsg),
        [style]
    );

    return (
        <View style={FIELDGROUP_STYLE}>
            {label && <Text style={LABEL_STYLE}>{label}</Text>}
            <Dropdown 
                options={options}
                style={DROPDOWN_STYLE} 
                placeholder={placeholder} 
                onSelect={onSelect}
            />
            <Text style={ERRORMSG_STYLE}>{(!field.isValid && showErrors && errorMsg) ? `* ${errorMsg}` : ''}</Text>
        </View>
    );
}