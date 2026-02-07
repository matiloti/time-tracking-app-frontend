import { DismissFieldFocusContext } from "@/context/DismissFieldFocusContext";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FlatList, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native";
import { defaultStyle } from "./styles";
import { DropdownOption, DropdownProps } from "./types";
import { getContainerStyle, getModalStyle, getSelectedTextStyle } from "./utils";

function Dropdown<T>({
    id = Math.floor(Math.random() * 100000).toString().padStart(5, '0'),
    options = [],
    selected,
    onSelect,
    placeholder = 'Select an option...',
    style,
    size = 'auto'
}: DropdownProps<T>) {

    const DEFAULT_OPTION: DropdownOption<T> = useMemo(() => ({
        text: placeholder,
        value: null,
        isPlaceholder: true
    }), [placeholder]);

    const getDefaultOption = useCallback((): DropdownOption<T> => {
        const defaultSelectedOption = options.filter(option => option.value === selected);
        return defaultSelectedOption.length > 0 ? defaultSelectedOption[0] : DEFAULT_OPTION;
    }, [DEFAULT_OPTION, options, selected]);

    const [visible, setVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(getDefaultOption);
    const [dropdownWidth, setDropdownWidth] = useState(0);

    const {width} = useWindowDimensions();

    const dismissContext = useContext(DismissFieldFocusContext);

    useEffect(() => {
        if(size === 'auto') {
            setDropdownWidth(width - width * 0.2);
        } else {
            setDropdownWidth(size);
        }
    }, [size, width]);

    useEffect(() => {
        if (!dismissContext) return;

        const unregister = dismissContext.register(() => {
            setVisible(false);
        });

        return unregister;
    }, [dismissContext]);

    function onDropdownPress() {
        setVisible(!visible);
        dismissContext?.dismissOnlyStandardFields();
    }

    function onDropdownOptionPress(option: DropdownOption<T>) {
        setSelectedOption(option);
        setVisible(false);
        onSelect(option);
    }

    const CONTAINER_STYLE: StyleProp<ViewStyle> = useMemo(
        () => getContainerStyle(dropdownWidth, defaultStyle, style), 
        [dropdownWidth, style]
    );

    const MODAL_STYLE: StyleProp<ViewStyle> = useMemo(
        () => getModalStyle(visible, dropdownWidth, defaultStyle, style), 
        [visible, dropdownWidth, style]
    );

    const DROPDOWN_BOX_STYLE: StyleProp<ViewStyle> = useMemo(
        () => StyleSheet.compose(defaultStyle.dropdownBox, style?.dropdownBox), 
        [style]
    );

    const SELECTED_TEXT_STYLE: StyleProp<TextStyle> = useMemo(
        () => getSelectedTextStyle(selectedOption.isPlaceholder, defaultStyle, style),
        [selectedOption.isPlaceholder, style]
    );

    const DROPDOWN_OPTION_STYLE: StyleProp<ViewStyle> = useMemo(
        () => StyleSheet.compose(defaultStyle.dropdownOption, style?.dropdownOption), 
        [style]
    );

    const DROPDOWN_OPTION_TEXT_STYLE: StyleProp<TextStyle> = useMemo(
        () => StyleSheet.compose(defaultStyle.dropdownOptionText, style?.dropdownOptionText), 
        [style]
    );

    return (
        <View style={CONTAINER_STYLE}>
            <TouchableOpacity onPress={onDropdownPress} style={DROPDOWN_BOX_STYLE}>
                <Text style={SELECTED_TEXT_STYLE}>{selectedOption.text}</Text>
            </TouchableOpacity>

            <View style={MODAL_STYLE}>
                <FlatList 
                    data={options}
                    keyExtractor={(item) => `${id}-${item.value}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => onDropdownOptionPress(item)}
                            style={DROPDOWN_OPTION_STYLE}
                        >
                            <Text style={DROPDOWN_OPTION_TEXT_STYLE}>{item.text}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

export {
    Dropdown,
    DropdownOption,
    DropdownProps
};

