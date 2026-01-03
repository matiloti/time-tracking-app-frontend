import { DismissFieldFocusContext } from '@/src/context/DismissFieldFocusContext';
import React from 'react';
import { Keyboard, TouchableWithoutFeedback, ViewProps } from 'react-native';

type Props = React.PropsWithChildren<ViewProps>;

export default function DismissKeyboardView({children, ...props}: Props) {

    const listeners = React.useRef(new Set<() => void>());

    const register = (fn: () => void) => {
        listeners.current.add(fn);
        return () => listeners.current.delete(fn);
    };

    function dismissAll() {
        Keyboard.dismiss();
        listeners.current.forEach(fn => fn());
    }

    function dismissOnlyNotStandardFields() {
        listeners.current.forEach(fn => fn());
    }

    function dismissOnlyStandardFields() {
        Keyboard.dismiss();
    }

    return (
        <DismissFieldFocusContext value={{dismissAll, dismissOnlyStandardFields, dismissOnlyNotStandardFields, register}}>
            <TouchableWithoutFeedback onPress={dismissAll} accessible={false}>
                {children}
            </TouchableWithoutFeedback>
        </DismissFieldFocusContext>
    );
};