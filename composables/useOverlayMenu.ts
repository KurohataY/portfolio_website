export const useOverlayMenu = () => {
    const value = useState('overlayMenu', () => false)
    return {
        stateValue: value,
        updateState: updateOverlayMenuValue(value),
    };
}

export const updateOverlayMenuValue = (bool) => (text) =>
    (bool.value = text);
