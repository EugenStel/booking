import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, Radio, Button, InputNumber } from 'antd';

// import styles from './add-client-modal.module.css';

const { Option } = Select;

interface AddClientModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddClientModal: React.FC<AddClientModalProps> = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [numberOfDays, setNumberOfDays] = useState<number | null>(null);
    const [checkInDate, setCheckInDate] = useState<any>(null);
    const [checkOutDate, setCheckOutDate] = useState<any>(null);

    const handleCheckInChange = (date: any) => {
        setCheckInDate(date);
        if (date && checkOutDate) {
            const days = checkOutDate.diff(date, 'days');
            setNumberOfDays(days);
        }
    };

    const handleCheckOutChange = (date: any) => {
        setCheckOutDate(date);
        if (date && checkInDate) {
            const days = date.diff(checkInDate, 'days');
            setNumberOfDays(days);
        }
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            console.log(values);
            onClose();
        });
    };

    return (
        <Modal
            title="Добавить клиента"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="ФИО" name="fullName" rules={[{ required: true, message: 'Введите ФИО' }]}>
                    <Input placeholder="Введите ФИО" />
                </Form.Item>

                <Form.Item label="Даты" style={{ marginBottom: 0 }}>
                    <Form.Item name="checkInDate" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 4px' }}>
                        <DatePicker placeholder="Дата заселения" onChange={handleCheckInChange} />
                    </Form.Item>
                    <Form.Item name="checkOutDate" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 4px' }}>
                        <DatePicker placeholder="Дата выселения" onChange={handleCheckOutChange} />
                    </Form.Item>
                </Form.Item>

                <Form.Item label="Номер" name="room" rules={[{ required: true, message: 'Выберите номер' }]}>
                    <Select placeholder="Выберите номер">
                        <Option value="room1">Номер 1</Option>
                        <Option value="room2">Номер 2</Option>
                        <Option value="room3">Номер 3</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="children"
                    label="Предоплата"
                    style={{ marginBottom: 0, flex: 1 }}
                    rules={[{ required: false }]}
                >
                    <InputNumber style={{ width: '100%' }} min={0} placeholder="Введите сумму предоплаты" />
                </Form.Item>

                <Form.Item label="Количество дней" name="numberOfDays">
                    <Input value={numberOfDays || ''} disabled />
                </Form.Item>

                <Form.Item label="Количество" style={{ marginBottom: 0 }}>
                    <Form.Item name="adults" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 4px' }}>
                        <Select placeholder="Взрослые">
                            {[1, 2, 3, 4, 5].map(num => (
                                <Option key={num} value={num}>{num}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="children" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 4px' }}>
                        <Select placeholder="Дети">
                            {[0, 1, 2, 3, 4, 5].map(num => (
                                <Option key={num} value={num}>{num}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form.Item>

                <Form.Item label="Статус бронирования" name="bookingStatus">
                    <Radio.Group>
                        <Radio value="confirmed">Подтверждено</Radio>
                        <Radio value="pending">В ожидании</Radio>
                        <Radio value="canceled">Отменено</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
