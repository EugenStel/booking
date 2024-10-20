import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, Radio, Button, InputNumber, Space, Col, Row } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.utils';
import dayjs from 'dayjs';

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
    const [rooms, setRooms] = useState<any[]>([]);
    const [bookingStatuses, setBookingStatuses] = useState<any[]>([]);

    const fetchRooms = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'rooms'));
            const roomList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRooms(roomList);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const fetchBookingStatuses = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'bookingStatuses'));
            const statusesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBookingStatuses(statusesList);
        } catch (error) {
            console.error('Error fetching booking statuses:', error);
        }
    };

    useEffect(() => {
        fetchRooms();
        fetchBookingStatuses();
    }, []);

    const handleCheckInChange = (date: any) => {
        setCheckInDate(date);
        if (date && checkOutDate) {
            const days = dayjs(checkOutDate).diff(date, 'day');
            setNumberOfDays(days);
        }
        console.log(numberOfDays)
    };

    const handleCheckOutChange = (date: any) => {
        setCheckOutDate(date);
        if (date && checkInDate) {
            const days = dayjs(date).diff(checkInDate, 'day');
            setNumberOfDays(days);
        }
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            console.log(values);
            onClose();
        });
    };

    const afterClose = () => {
        form.resetFields();
    };

    return (
        <Modal
            title="Добавить клиента"
            open={open}
            onCancel={onClose}
            footer={null}
            afterClose={afterClose}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="ФИО" name="fullName" rules={[{ required: true, message: 'Введите ФИО' }]}>
                    <Input placeholder="Введите ФИО" />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Дата заселения" name="checkInDate">
                            <DatePicker placeholder="Дата заселения" onChange={handleCheckInChange} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Дата выселения" name="checkOutDate">
                            <DatePicker placeholder="Дата выселения" onChange={handleCheckOutChange} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Количество дней" name="numberOfDays">
                    <Input value={numberOfDays || ''} disabled />
                </Form.Item>

                <Form.Item label="Номер" name="room" rules={[{ required: true, message: 'Выберите номер' }]}>
                    <Select placeholder="Выберите номер">
                        {rooms.map(room => (
                            <Option key={room.id} value={room.id}>
                                {room.roomName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="total"
                            label="Общая сумма"
                            rules={[{ required: false }]}
                        >
                            <InputNumber style={{ width: '100%' }} min={0} placeholder="Введите общую сумму" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="prepay"
                            label="Предоплата"
                            rules={[{ required: false }]}
                        >
                            <InputNumber style={{ width: '100%' }} min={0} placeholder="Введите сумму предоплаты" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="adults" label='Взрослые' style={{ width: '100%' }}>
                            <Select placeholder="Взрослые" defaultValue={2}>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <Option key={num} value={num}>{num}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="children" label='Дети' style={{ width: '100%' }}>
                            <Select placeholder="Дети" defaultValue={0}>
                                {[0, 1, 2, 3, 4, 5].map(num => (
                                    <Option key={num} value={num}>{num}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Статус бронирования" name="bookingStatus">
                    <Radio.Group>
                        <Space direction="vertical">
                            {bookingStatuses.map(status => (
                                <Radio key={status.id} value={status.id} style={{ color: status.color }}>
                                    <span style={{ color: status.color }}>{status.statusName}</span>
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="comment"
                    label="Комментарий"
                    rules={[{ required: false }]}
                >
                    <Input.TextArea placeholder="Введите комментарий" />
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
