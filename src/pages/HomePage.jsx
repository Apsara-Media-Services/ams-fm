/**
 * External dependencies
 */
import { __ } from "@wordpress/i18n";
import { Form } from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";
import { Col, Row } from "antd";

/**
 * Internal dependencies
 */
import Dashboard from "../components/dashboard/Dashboard";

const schema = {
    title: "Schedual weekly",
    description:
        "In this form you can set up a schedual for weekly for the AMS FM97",
    type: "object",
    properties: {
        monday: {
            title: "Monday",
            type: "array",
            items: {
                $ref: "#/definitions/record",
            },
        },
        tuesday: {
            title: "Tuesday",
            type: "array",
            items: {
                $ref: "#/definitions/record",
            },
        },
        wednesday: {
            title: "Wednesday",
            type: "array",
            items: {
                $ref: "#/definitions/record",
            },
        },
        thursday: {
            title: "Thursday",
            type: "array",
            items: {
                $ref: "#/definitions/record",
            },
        },
        friday: {
            title: "Friday",
            type: "array",
            items: {
                $ref: "#/definitions/record",
            },
        },
        saturday: {
            title: "Saturday",
            type: "array",
            items: {
                $ref: "#/definitions/record",
            },
        },
        sunday: {
            title: "Sunday",
            type: "array",
            items: {
                $ref: "#/definitions/record",
            },
        },
    },
    definitions: {
        record: {
            title: "Program",
            type: "object",
            properties: {
                title: {
                    title: "Title",
                    type: "string",
                },
                uri: {
                    title: "Uri",
                    type: "string",
                    format: "uri",
                },
                description: {
                    title: "Description",
                    type: "string",
                },
                start: {
                    title: "Start",
                    type: "string",
                    format: "time",
                },
                end: {
                    title: "End",
                    type: "string",
                    format: "time",
                },
            },
            // required: ['Do you have any pets?'],
        },
    },
};

const uiSchema = {
    monday: {
        items: {
            description: {
                "ui:widget": "textarea",
            },
        },
    },
    tuesday: {
        items: {
            description: {
                "ui:widget": "textarea",
            },
        },
    },
    wednesday: {
        items: {
            description: {
                "ui:widget": "textarea",
            },
        },
    },
    thursday: {
        items: {
            description: {
                "ui:widget": "textarea",
            },
        },
    },
    friday: {
        items: {
            description: {
                "ui:widget": "textarea",
            },
        },
    },
    saturday: {
        items: {
            description: {
                "ui:widget": "textarea",
            },
        },
    },
    sunday: {
        items: {
            description: {
                "ui:widget": "textarea",
            },
        },
    },
};

const formData = {
    monday: [
        {
            title: "Hello monday programs",
            uri: "https://www.ams.com.kh/fm97",
            description: "Hello this is the radio program",
            start: "06:00:00",
            end: "08:00:00",
        },
    ],
};

const HomePage = () => {
    return null;
};

export default HomePage;
