import { DropdownOption } from "@/components/Dropdown/Dropdown";
import { DropdownStyles } from "@/components/Dropdown/types";
import { Form, FormFieldObject } from "@/components/Form/Form";
import FormDropdown from "@/components/Form/FormDropdown/FormDropdown";
import { FormDropdownStyles } from "@/components/Form/FormDropdown/types";
import FormTextField from "@/components/Form/FormTextField/FormTextField";
import { FormTextFieldStyles, PlaceholderColors } from "@/components/Form/FormTextField/types";
import GLOBAL_STYLES from "@/constants/styles";
import { isValidDropdown, isValidString, isValidStringWithLength } from "@/utils/formUtils";
import { useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";
import DismissKeyboardView from "@/components/wrappers/DismissKeyboardView";
import { createProject } from "@/services/project";
import { Router, Stack, useRouter } from "expo-router";

interface Category {
    id: Int32,
    value: string
}

const CATEGORIES = [
    {
        id: 1,
        value: 'Software'
    },
    {
        id: 2,
        value: 'Content Creation'
    },
    {
        id: 3,
        value: 'Design'
    },
    {
        id: 4,
        value: 'Marketing'
    },
    {
        id: 5,
        value: 'Writing'
    },
    {
        id: 6,
        value: 'Research'
    },
    {
        id: 7,
        value: 'Education'
    },
    {
        id: 8,
        value: 'Consulting'
    },
    {
        id: 9,
        value: 'Finance'
    },
    {
        id: 10,
        value: 'Legal'
    },
    {
        id: 11,
        value: 'Other'
    }
]

function mapCategoryToDropdownOption(category: Category): DropdownOption<Int32> {
    return {
        text: category.value, 
        value: category.id
    };
}

export default function CreateProject() {

  const router: Router = useRouter();
    const [categories, setCategories] = useState(CATEGORIES);
    
    const DROPDOWN_OPTIONS = useMemo(
        () => categories.map(mapCategoryToDropdownOption), 
        [categories]
    );

    function sendForm(formFields: FormFieldObject) {
        const project = {
            name: formFields.name.value,
            description: formFields.description?.value,
            categoryId: Number(formFields.category.value)
        };
        console.log(project);
        createProject(project);
        router.back();
    }

    return (
        <DismissKeyboardView>
            <View className="mt-30 flex-1 justify-between p-10">
                <Form sendForm={sendForm}>
                    <FormTextField 
                        name='name'
                        placeholder='Project name...' 
                        validationRules={[{
                            execute: (value) => isValidStringWithLength(value, 25),
                            errorMessage: 'name is required'
                        }]}
                        style={NAME_FIELD_STYLE}
                        placeholderColors={PLACEHOLDER_COLORS}
                    />
                    <FormTextField 
                        name='description'
                        placeholder='Insert a description...' 
                        validationRules={[
                            {
                                execute: (value) => isValidString(value),
                                errorMessage: 'Description is required'
                            },
                            {
                                execute: (value) => isValidStringWithLength(value, 500),
                                errorMessage: "Description can't exceed 200 characters"
                            }
                        ]}
                        style={DESCRIPTION_FIELD_STYLE}
                        placeholderColors={PLACEHOLDER_COLORS}
                        multiline
                    />
                    <FormDropdown 
                        name='category'
                        label='Category'
                        options={DROPDOWN_OPTIONS} 
                        placeholder='Select a category...'
                        validationRules={[{
                            execute: isValidDropdown,
                            errorMessage: 'Category is required'
                        }]}
                        style={DROPDOWN_FIELD_STYLE}
                    />
                </Form>
            </View>

        </DismissKeyboardView>
    );
}

const PLACEHOLDER_COLORS: PlaceholderColors = {
    normal: 'gray',
    error: 'rgb(255, 0, 0)'
}

const NAME_FIELD_STYLE: FormTextFieldStyles = StyleSheet.create({
    fieldGroup: {
    },
    fieldGroupError: {
    },
    textInput: {
        fontSize: 30,
        backgroundColor: 'rgb(242, 242, 242)',
        color: 'black',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    textInputError: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    }
});

const DESCRIPTION_FIELD_STYLE: FormTextFieldStyles = StyleSheet.create({
    fieldGroup: {
        marginTop: 20
    },
    textInput: {
        minHeight: 100,
        maxHeight: 200,
        color: 'black',
        textAlignVertical: 'top'
    },
    textInputError: {
        borderWidth: 0
    }
});

const DROPDOWN_FIELD_STYLE: FormDropdownStyles = {
    fieldGroup: {
        marginTop: 20
    },
    fieldGroupError: {

    },
    label: {
        
    },
    labelError: {
        
    },
    dropdown: {
        dropdownBox: {
        },
    } as DropdownStyles,
    dropdownError: {
        dropdownBox: {
            borderColor: 'red',
        },
        dropdownPlaceholder: {
            color: 'red'
        }
    } as DropdownStyles,
};

const style = StyleSheet.create({
    container: {
        ...GLOBAL_STYLES.container,
        flex: 1,
        justifyContent: 'space-between',
    }
});