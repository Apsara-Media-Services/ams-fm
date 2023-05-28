/**
 * External dependencies
 */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { __ } from "@wordpress/i18n";
import {
    EditOutlined,
    CheckOutlined,
    ExclamationOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

/**
 * Internal dependencies
 */

const items = [
    {
        label: "Monday",
        key: "/day/monday",
        icon: <EditOutlined />,
    },
    {
        label: "Tuesday",
        key: "/day/tuesday",
        icon: <CheckOutlined />,
    },
    {
        label: "Wednesday",
        key: "/day/wednesday",
        icon: <ExclamationOutlined />,
    },
    {
        label: "Thursday",
        key: "/day/thursday",
        icon: <ExclamationOutlined />,
    },
    {
        label: "Friday",
        key: "/day/friday",
        icon: <ExclamationOutlined />,
    },
    {
        label: "Saturday",
        key: "/day/saturday",
        icon: <ExclamationOutlined />,
    },
    {
        label: "Sunday",
        key: "/day/sunday",
        icon: <ExclamationOutlined />,
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
