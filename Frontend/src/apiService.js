const API_BASE_URL = "http://localhost:5009";

export async function getData() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/sample/student`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
