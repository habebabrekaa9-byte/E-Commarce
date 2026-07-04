export async function getCatgories() {
    try {
        const response = await fetch(
            "https://ecommerce.routemisr.com/api/v1/categories"
        );
        if (!response.ok) {
            throw new Error("Failed to fetch Catgories");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : "Something went wrong"
        );
    }
}