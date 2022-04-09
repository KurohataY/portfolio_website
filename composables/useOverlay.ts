export const useOverlay = () => {
    const value = useState('overlay', () => false)
    return {
        overlayStateValue: value,
        updateOverlay: updateOverlayValue(value),
    };
}

export const updateOverlayValue = (bool) => (text) =>
    (bool.value = text);
