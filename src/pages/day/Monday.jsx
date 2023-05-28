/**
 * External dependencies
 */
import { useState } from "react";
import dayjs from "dayjs";
import { __ } from "@wordpress/i18n";
import { Col, Row } from "antd";
import ReactJson from "react-json-view";

/**
 * Internal dependencies
 */
import ProgramForm from "../../components/form/ProgramForm";
import { compact } from "lodash";

const timeFormat = "HH:mm:ss";

const resources = [
    {
        title: "Hello Monday programs",
        uri: "ams.com.kh/fm97",
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
    },
];
const onFinishHandler = () => {
    return;
    // console.log(formatTimeRage(resources, true));
};

const formatTimeRage = (data = [], reverse = false) => {
    return data.map((item) => {
        if (item.time_range) {
            const time_range = item.time_range.map((i) => {
                if (reverse) {
                    return i.format(timeFormat);
                } else {
                    return dayjs(i, timeFormat);
                }
            });
            return { ...item, time_range };
        }
    });
};

const Monday = () => {
    const [src, setResources] = useState(formatTimeRage(resources));

    const onFieldsChangeHandler = (e = []) => {
        const entries = e[0];

        if (entries.name.length === 1) {
            setResources(compact(entries.value));
        } else {
            // console.log(entries);
            const index = entries.name[1];
            const key = entries.name[2];
            setResources((prev) => {
                prev[index] = { ...prev[index], [key]: entries.value };
                return prev;
            });
        }
    };

    return (
        <Row>
            <Col span={8}>
                <>
                    <ProgramForm
                        formatTimeRage={formatTimeRage}
                        onFinish={onFinishHandler}
                        initialValue={src}
                        onFieldsChange={onFieldsChangeHandler}
                    />
                </>
            </Col>
            <Col span={16}>
                <ReactJson src={formatTimeRage(src, true)} />
            </Col>
        </Row>
    );
};

export default Monday;
