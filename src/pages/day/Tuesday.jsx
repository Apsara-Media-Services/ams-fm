/**
 * External dependencies
 */
import { useState, useEffect } from "react";
import { compact } from "lodash";
import apiFetch from "@wordpress/api-fetch";
import { Skeleton, message, notification } from "antd";

/**
 * Internal dependencies
 */
import { formatTimeRange } from "../../utils";
import Page from "../../components/layout/Page";

const Tuesday = () => {
    const [api, contextHolder] = notification.useNotification();
    const [resources, setResources] = useState([]);
    const [schedule, setSchedule] = useState({});
    const [loading, setLoading] = useState(false);

    const openNotification = ({ message, description }) => {
        api.open({
            message,
            description,
        });
    };

    const onFinishHandler = async ({ resources }) => {
        await apiFetch({
            path: "/wp/v2/settings",
            method: "POST",
            parse: false,
            data: {
                ams_schedule: {
                    ...schedule,
                    tuesday: formatTimeRange(resources, true),
                },
            },
        }).then((response) => {
            // console.log(response, await response.json());
            if (response.ok) {
                openNotification({
                    message: "Successful",
                    description: "The records has been save successfuly.",
                });
            }
        });
    };

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

    const fetchData = async () => {
        setLoading(true);
        await apiFetch({
            path: "/wp/v2/settings",
        }).then((data) => {
            setSchedule(data?.ams_schedule);
            setResources(formatTimeRange(data?.ams_schedule?.tuesday));
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {contextHolder}
            {loading && <Skeleton />}
            {!loading && (
                <Page
                    onFinish={onFinishHandler}
                    initialValue={resources}
                    onFieldsChange={onFieldsChangeHandler}
                    reactJson={formatTimeRange(resources, true)}
                />
            )}
        </>
    );
};

export default Tuesday;
