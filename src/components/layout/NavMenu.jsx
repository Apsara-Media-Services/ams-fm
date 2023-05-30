/**
 * External dependencies
 */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { __ } from "@wordpress/i18n";
import { SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";

/**
 * Internal dependencies
 */

const items = [
    {
        label: "Monday",
        key: "/day/monday",
    },
    {
        label: "Tuesday",
        key: "/day/tuesday",
    },
    {
        label: "Wednesday",
        key: "/day/wednesday",
    },
    {
        label: "Thursday",
        key: "/day/thursday",
    },
    {
        label: "Friday",
        key: "/day/friday",
    },
    {
        label: "Saturday",
        key: "/day/saturday",
    },
    {
        label: "Sunday",
        key: "/day/sunday",
    },
    {
        label: "Settings",
        key: "/settings",
        icon: <SettingOutlined />,
    },
];
function NavMenu() {
    const location = useLocation();

    const nav = useNavigate();

    const [current, setCurrent] = useState(location.pathname);

    useEffect(() => {
        if (location.pathname == "/") {
            nav("/day/monday");
            setCurrent("/day/monday");
        }
    });

    const onClick = (e) => {
        nav(e.key);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
}

export default NavMenu;
