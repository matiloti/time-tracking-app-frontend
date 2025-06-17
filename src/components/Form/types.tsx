import { ReactNode } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface FormStyle {
    formContainer?: StyleProp<ViewStyle>,
    fieldsContainer?: StyleProp<ViewStyle>,
    submitButton?: StyleProp<ViewStyle>,
    submitButtonText?: StyleProp<TextStyle>
}

interface FormProps {
  children: ReactNode
  sendForm: (formFields: FormFieldObject) => void
  style?: FormStyle
}

interface ValidationRule {
  execute: (value: any) => boolean,
  errorMessage: string
}

interface FormField<T> {
    value: T | null,
    isValid: boolean
}

type FormFieldObject = {
    [key: string]: FormField<any>
}

export { FormField, FormFieldObject, FormProps, FormStyle, ValidationRule };

