/**
 * External dependencies
 */
import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { compact } from "lodash";
import apiFetch from "@wordpress/api-fetch";
/**
 * Internal dependencies
 */
import { formatTimeRange } from "../../utils";
import Page from "../../components/layout/Page";
import { fetchCategories } from "../../data";

const category = await fetchCategories();
const resources = [
    {
        title: "Hello Monday programs",
        slug: "uncategories",
        description: "Hello this is the radio program",
        time_range: ["06:00:00", "08:00:00"],
        cover: [
            {
                id: 9,
                sizes: {
                    thumbnail: {
                        url: "http://wp.local/wp-content/uploads/2023/05/IMG_0748-150x150.jpg",
                    },
                },
                url: "http://wp.local/wp-content/uploads/2023/05/IMG_0748.jpg",
            },
            {
                id: 11,
                sizes: {
                    thumbnail: {
                        url: "http://wp.local/wp-content/uploads/2023/05/fm97-youth-logo-150x150.png",
                    },
                },
                url: "http://wp.local/wp-content/uploads/2023/05/fm97-youth-logo.png",
            },
        ],
        category: "",
    },
];
console.log(category);
const onFinishHandler = () => {
    return;
};

const Monday = () => {
    console.log("test");
    const [src, setResources] = useState(formatTimeRange(resources));
    const onFieldsChangeHandler = (e = []) => {
        try {
            const entries = e[0];
            if (entries.name.length === 1) {
                setResources(compact(entries.value));
            } else {
                const index = entries.name[1];
                const key = entries.name[2];
                setResources((prev) => {
                    prev[index] = { ...prev[index], [key]: entries.value };
                    return prev;
                });
            }
        } catch (e) {
            // console.log(e);
        }
    };

    return (
        <Page
            onFinish={onFinishHandler}
            initialValue={src}
            onFieldsChange={onFieldsChangeHandler}
            src={formatTimeRange(src, true)}
        />
    );
};

export default Monday;
