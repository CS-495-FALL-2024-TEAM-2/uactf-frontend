export const fetchData = async (uri: string) => {
    try {
        const response = await fetch(uri);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (err) {
        throw err
    }
};
