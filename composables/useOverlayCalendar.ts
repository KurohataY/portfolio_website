export const useOverlayCalendar = () => {
    const value = useState('overlayCalendar', () => false)
    return {
        stateValue: value,
        updateState: updateOverlayCalendarValue(value),
    };
}

export const updateOverlayCalendarValue = (bool) => (text) =>
    (bool.value = text);
