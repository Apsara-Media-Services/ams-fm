/**
 * External dependencies
 */
import { Col, Row } from "antd";
import ReactJson from "react-json-view";

/**
 * Internal dependencies
 */
import ProgramForm from "../../components/form/ProgramForm";

const Page = ({ onFinish, initialValue, onFieldsChange, reactJson }) => {
    return (
        <Row>
            <Col span={8}>
                <>
                    <ProgramForm
                        onFinish={onFinish}
                        initialValue={initialValue}
                        onFieldsChange={onFieldsChange}
                    />
                </>
            </Col>
            <Col span={16}>
                <ReactJson src={reactJson} />
            </Col>
        </Row>
    );
};
export default Page;
