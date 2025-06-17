import { getStyle } from "@/src/utils/formUtils";
import { useContext, useEffect, useMemo, useState } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Dropdown, DropdownOption } from "../../Dropdown/Dropdown";
import { DropdownStyles } from "../../Dropdown/types";
import { DEFAULT_FORMFIELD_VALUE } from "../constants";
import { FormContext, FormValidationContext } from "../Form";
import { FormField } from "../types";
import { defaultDropdownErrorStyles, defaultDropdownStyles, defaultStyle } from "./styles";
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
    
    useEffect(() => {
        const validation = validationRules.find(rule => !rule.execute(DEFAULT_FORMFIELD_VALUE.value));
        updateForm({[name]: DEFAULT_FORMFIELD_VALUE});
        setErrorMsg(validation?.errorMessage);
    }, [name, updateForm, validationRules]);

    useEffect(() => {
        updateForm({[name]: {value: null, isValid: false}});
    }, [name, updateForm]);

    function onSelect(selectedOption: DropdownOption<T>) {
        const validation = validationRules.find(rule => !rule.execute(selectedOption.value));
        const newValue = {value: selectedOption.value, isValid: !validation};
        setField(newValue);
        updateForm({[name]: newValue});
        setErrorMsg(validation?.errorMessage);
    }

    const CONTAINER_STYLES: StyleProp<ViewStyle> = useMemo(
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
                    StyleSheet.compose(defaultDropdownStyles.container, style?.dropdown?.container),
                    StyleSheet.compose(defaultDropdownErrorStyles.container, style?.dropdownError?.container),
                    field.isValid,
                    showErrors
                ),
                dropdownBox: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdownBox, style?.dropdown?.dropdownBox),
                    StyleSheet.compose(defaultDropdownErrorStyles.dropdownBox, style?.dropdownError?.dropdownBox),
                    field.isValid,
                    showErrors
                ),
                dropdownModal: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdownModal, style?.dropdown?.dropdownModal),
                    StyleSheet.compose(defaultDropdownErrorStyles.dropdownModal, style?.dropdownError?.dropdownModal),
                    field.isValid,
                    showErrors
                ),
                dropdownOption: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdownOption, style?.dropdown?.dropdownOption),
                    StyleSheet.compose(defaultDropdownErrorStyles.dropdownOption, style?.dropdownError?.dropdownOption),
                    field.isValid,
                    showErrors
                ),
                dropdownOptionText: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdownOptionText, style?.dropdown?.dropdownOptionText),
                    StyleSheet.compose(defaultDropdownErrorStyles.dropdownOptionText, style?.dropdownError?.dropdownOptionText),
                    field.isValid,
                    showErrors
                ),
                dropdownPlaceholder: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdownPlaceholder, style?.dropdown?.dropdownPlaceholder),
                    StyleSheet.compose(defaultDropdownErrorStyles.dropdownPlaceholder, style?.dropdownError?.dropdownPlaceholder),
                    field.isValid,
                    showErrors
                ),
                dropdownSelectedText: getStyle(
                    StyleSheet.compose(defaultDropdownStyles.dropdownSelectedText, style?.dropdown?.dropdownSelectedText),
                    StyleSheet.compose(defaultDropdownErrorStyles.dropdownSelectedText, style?.dropdownError?.dropdownSelectedText),
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
        <View style={CONTAINER_STYLES}>
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