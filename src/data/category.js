import apiFetch from "@wordpress/api-fetch";

export const fetchCategories = async () => {
    const categories = await apiFetch({ path: "/wp/v2/categories" });
    return categories.map((cat) => ({ name: cat.name, value: cat.slug }));
};
