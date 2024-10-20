import React, { useState } from 'react';
import { Modal, Form, Input, Button, ColorPicker } from 'antd';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.utils';

interface BookingStatusModalProps {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
}

export const BookingStatusModal: React.FC<BookingStatusModalProps> = ({ open, onCancel, onSubmit }) => {
    const [form] = Form.useForm();
    const [color, setColor] = useState<string>('#fff');

    const handleSubmit = async (values: any) => {
        try {
            await addDoc(collection(db, 'bookingStatuses'), {
                ...values,
                color,
            });
            onSubmit(values);
            form.resetFields();
        } catch (error) {
            console.error("Ошибка при добавлении статуса бронирования:", error);
        }
    };

    const afterClose = () => {
        form.resetFields();
    }

    return (
        <Modal
            title="Добавить статус бронирования"
            open={open}
            onCancel={onCancel}
            footer={null}
            afterClose={afterClose}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Название статуса"
                    name="statusName"
                    rules={[{ required: true, message: 'Введите название статуса' }]}
                >
                    <Input placeholder="Введите название статуса" />
                </Form.Item>

                <Form.Item label="Выберите цвет">
                    <ColorPicker value={color} onChange={(value) => setColor(value.toHexString())} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
