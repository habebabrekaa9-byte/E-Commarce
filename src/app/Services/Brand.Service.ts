

export async function getBrands() {
    try {
        const response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/brands`, {
            method: "GET"
        }
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



export async function getBrandDetails(BrandId: string) {
    try {
        const response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/brands/${BrandId}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch Brand");
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