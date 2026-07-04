export async function getProducts(limit: number) {
    try {
        const response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch Products");
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

export async function getProductDetails(id: string) {
    try {
        const response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/products/${id}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch Product");
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