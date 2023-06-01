/**
 * External dependencies
 */
import dayjs from "dayjs";

const timeFormat = "HH:mm:ss";
export const formatTimeRange = (data = [], reverse = false) => {
    if (Array.isArray(data) && data.length)
        return data.map((item) => {
            if (item?.time_range) {
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
    return [];
};
