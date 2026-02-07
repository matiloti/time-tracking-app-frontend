import { FormContext, FormValidationContext } from "@/context/FormContext";
import { useCallback, useMemo, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Button from "../Button/Button";
import { ButtonStyles } from "../Button/types";
import { defaultButtonStyles, defaultStyle } from "./styles";
import { FormFieldObject, FormProps } from "./types";

function Form({
    children,
    sendForm,
    style
}: FormProps) {
    const [formFields, setFormFields] = useState<FormFieldObject>({});
    const [formIsValid, setFormIsValid] = useState(true);

    function submitForm() {
        const formIsValid = Object.keys(formFields).reduce((prev, curr) => prev && formFields[curr].isValid, true);
        setFormIsValid(formIsValid);
        if(formIsValid) sendForm(formFields);
    }

    const updateForm = useCallback((field: FormFieldObject) => {
        setFormFields(prev => ({
            ...prev,
            ...field
        }));
    }, []);

    const CONTAINER_STYLES: StyleProp<ViewStyle> = useMemo(
        () => StyleSheet.compose(defaultStyle.formContainer, style?.formContainer),
        [style]
    );

    const FIELDS_CONTAINER_STYLES: StyleProp<ViewStyle> = useMemo(
        () => StyleSheet.compose(defaultStyle.fieldsContainer, style?.fieldsContainer),
        [style]
    );

    const BUTTON_STYLES: ButtonStyles = useMemo(
        () => ({
            button: StyleSheet.compose(defaultButtonStyles.button, style?.submitButton), 
            text: StyleSheet.compose(defaultButtonStyles.text, style?.submitButtonText),
        }),
        [style]
    );

    return(
        <FormContext value={updateForm}>
            <FormValidationContext value={!formIsValid}>
                <View style={CONTAINER_STYLES}>
                    <View style={FIELDS_CONTAINER_STYLES}>
                        {children}
                    </View>
                    <Button 
                        text='Create' 
                        onPress={submitForm} 
                        style={BUTTON_STYLES}
                    />
                </View>
            </FormValidationContext>
        </FormContext>
    );
}

export { Form, FormContext, FormFieldObject, FormValidationContext };

