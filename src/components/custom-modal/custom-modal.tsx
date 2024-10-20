import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { addRoomToFirestore } from '../../firebase/rooms';

interface ReusableModalProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

export const CustomModal: React.FC<ReusableModalProps> = ({ open, title, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await addRoomToFirestore(values);
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const afterClose = () => {
    form.resetFields();
  }

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Добавить"
      cancelText="Отмена"
      afterClose={afterClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="roomName"
          label="Название номера"
          rules={[{ required: true, message: 'Введите название номера' }]}
        >
          <Input placeholder="Введите название номера" />
        </Form.Item>

        <Form.Item
          name="seats"
          label="Количество мест:"
          style={{ flex: 1, marginRight: '8px' }}
          rules={[{ required: true, message: 'Введите количество взрослых' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} placeholder="Введите взрослых" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Описание"
          rules={[{ required: true, message: 'Введите описание номера' }]}
        >
          <Input.TextArea placeholder="Введите описание номера" />
        </Form.Item>

      </Form>
    </Modal>
  );
};
