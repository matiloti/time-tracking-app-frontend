import { createContext } from "react";
import { FormFieldObject } from "../components/Form/types";

const FormContext = createContext((field: FormFieldObject) => {});
const FormValidationContext = createContext(true);

export { FormContext, FormValidationContext };

