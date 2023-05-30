/**
 * External dependencies
 */
import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { Col, Row } from "antd";
import ReactJson from "react-json-view";
import { compact } from "lodash";

/**
 * Internal dependencies
 */
import ProgramForm from "../../components/form/ProgramForm";
import { formatTimeRange } from "../../utils";

const resources = [];
const onFinishHandler = () => {
    return;
};

const Friday = () => {
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
        <Row>
            <Col span={8}>
                <>
                    <ProgramForm
                        onFinish={onFinishHandler}
                        initialValue={src}
                        onFieldsChange={onFieldsChangeHandler}
                    />
                </>
            </Col>
            <Col span={16}>
                <ReactJson src={formatTimeRange(src, true)} />
            </Col>
        </Row>
    );
};

export default Friday;
