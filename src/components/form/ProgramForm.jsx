/**
 * External dependencies
 */
import { MediaUpload } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { useEffect, useRef, useState } from "react";
import {
    ImportOutlined,
    MinusCircleOutlined,
    PictureOutlined,
    PlusOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import {
    Button,
    TimePicker,
    Form,
    Input,
    Space,
    Image,
    Divider,
    Modal,
    TreeSelect,
} from "antd";

/**
 * External dependencies
 */
import { formatTimeRange } from "../../utils";

const ALLOWED_MEDIA_TYPES = ["image"];
const { RangePicker } = TimePicker;
const { TextArea } = Input;

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, open }) => {
    const prevOpenRef = useRef();
    useEffect(() => {
        prevOpenRef.current = open;
    }, [open]);

    const prevOpen = prevOpenRef.current;
    useEffect(() => {
        if (!open && prevOpen) {
            form.resetFields();
        }
    }, [form, prevOpen, open]);
};

const ModalForm = ({ open, onCancel }) => {
    const [form] = Form.useForm();
    useResetFormOnCloseModal({
        form,
        open,
    });
    const onOk = () => {
        form.submit();
    };
    return (
        <Modal
            title="Import programs"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical" name="importForm">
                <Form.Item
                    name="resources"
                    label="Paste from your clipboard"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const MediaLibrary = ({ value = [], onChange }) => {
    return (
        <span>
            <MediaUpload
                onSelect={(data) => onChange?.(data)}
                allowedTypes={ALLOWED_MEDIA_TYPES}
                multiple={true}
                gallery={true}
                value={value.map((i) => i.id)}
                render={({ open }) => (
                    <>
                        <Image.PreviewGroup>
                            {value.map((item) => (
                                <Image
                                    width={150}
                                    src={item?.sizes?.thumbnail?.url}
                                    preview={{
                                        src: item?.url,
                                    }}
                                />
                            ))}
                        </Image.PreviewGroup>
                        <Button
                            onClick={open}
                            type="dashed"
                            icon={<PictureOutlined />}
                        >
                            {__("Open Media Library", "ams")}
                        </Button>
                    </>
                )}
            />
        </span>
    );
};

const ProgramForm = ({ initialValue, onFieldsChange, onFinish }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Form.Provider
            onFormFinish={(name, { values, forms }) => {
                if (name === "importForm") {
                    try {
                        const { resourcesProvider } = forms;
                        const { resources } = eval(values);
                        const arrObj = JSON.parse(resources);
                        if (Array.isArray(arrObj)) {
                            resourcesProvider.setFieldsValue({
                                resources: formatTimeRange(arrObj),
                            });
                            setOpenModal(false);
                        }
                    } catch (e) {
                        // console.log(e);
                    }
                }
            }}
        >
            <Form
                onFinish={onFinish}
                onFieldsChange={(e) => onFieldsChange(e)}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                name={"resourcesProvider"}
            >
                <Form.List name={"resources"} initialValue={initialValue}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: "block" }}>
                                    <Form.Item
                                        label={"Select a category"}
                                        {...restField}
                                        name={[name, "category"]}
                                    >
                                        <TreeSelect />
                                    </Form.Item>
                                    <Form.Item
                                        label="Title"
                                        {...restField}
                                        name={[name, "title"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input title!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Description"
                                        {...restField}
                                        name={[name, "description"]}
                                    >
                                        <TextArea rows={4} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Slug"
                                        {...restField}
                                        name={[name, "slug"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input slug!",
                                            },
                                        ]}
                                    >
                                        <Input addonBefore="http://domain-name/" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Time"
                                        {...restField}
                                        name={[name, "time_range"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input time!",
                                            },
                                        ]}
                                    >
                                        <RangePicker />
                                    </Form.Item>

                                    <Form.Item
                                        label="Cover"
                                        {...restField}
                                        name={[name, "cover"]}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please select images!",
                                            },
                                        ]}
                                    >
                                        <MediaLibrary />
                                    </Form.Item>

                                    <Form.Item label=" " colon={false}>
                                        <Button
                                            type="dashed"
                                            onClick={() => remove(name)}
                                            block
                                            icon={<MinusCircleOutlined />}
                                        >
                                            Remove field
                                        </Button>
                                    </Form.Item>
                                    <Form.Item label=" " colon={false}>
                                        <Divider dashed />
                                    </Form.Item>
                                </Space>
                            ))}
                            <Form.Item label=" " colon={false}>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item label=" " colon={false}>
                    <Space>
                        <Button
                            icon={<SaveOutlined />}
                            type="primary"
                            htmlType="submit"
                        >
                            Save
                        </Button>
                        <Button
                            htmlType="button"
                            icon={<ImportOutlined />}
                            onClick={() => setOpenModal(true)}
                        >
                            Import
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            <ModalForm open={openModal} onCancel={() => setOpenModal(false)} />
        </Form.Provider>
    );
};
export default ProgramForm;
