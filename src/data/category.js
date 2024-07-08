import apiFetch from "@wordpress/api-fetch";
import { each, filter, isEmpty, map, set } from "lodash";

function unflatten(array, parent, tree) {
    tree = typeof tree !== "undefined" ? tree : [];
    parent =
        typeof parent !== "undefined"
            ? parent
            : {
                  id: 0,
              };
    map(array, function (arr) {
        set(arr, "isParent", true);
    });

    var children = filter(array, function (child) {
        return child.parent == parent.id;
    });

    if (!isEmpty(children)) {
        if (parent.id == 0) {
            tree = children;
        } else {
            parent["children"] = children;
        }
        each(children, function (child) {
            var posts = map(child.posts, function (post) {
                return set(post, "isParent", false);
            });
            child["children"] = posts;
            delete child.posts;
            unflatten(array, child);
        });
    }

    return tree;
}

export const fetchCategories = async () => {
    try {
        const categories = await apiFetch({ path: "/wp/v2/podcasting_podcasts?per_page=100" });
        // console.log('Fetched categories:', categories);  // Log the response
        const arr = categories.map((item) => {
            return { ...item, label: item.name, value: item.slug };
        });
        return unflatten(arr);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};
