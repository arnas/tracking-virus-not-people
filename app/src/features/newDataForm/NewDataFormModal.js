import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const validateMessages = {
  required: 'Šis laukas yra privalomas.',
};

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export const NewDataFormModal = (props) => {
  const onFinish = (values) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'data', ...values.data }),
    })
      .then(() => {
        message.success('Pranešimas apie vietą sėkmingai išsiųstas.');
        props.handleClose();
      })
      .catch((error) => message.error('Įvyko klaida. Bandykite dar kartą.'));
  };

  return (
    <Modal
      style={props.style && { top: '20px' }}
      title="Pranešk apie naują vietą"
      visible={props.visible}
      onCancel={props.handleClose}
      footer={null}
    >
      <Form
        {...layout}
        name="data"
        onFinish={onFinish}
        method="post"
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['data', 'place']}
          label="Vieta"
          rules={[{ required: true }]}
        >
          <Input name="place" />
        </Form.Item>
        <Form.Item
          name={['data', 'time']}
          label="Laikas"
          rules={[{ required: true }]}
        >
          <Input name="time" />
        </Form.Item>

        <Form.Item
          name={['data', 'source']}
          label="Šaltinis"
          rules={[{ required: true }]}
        >
          <Input name="source" />
        </Form.Item>
        <Form.Item name={['data', 'details']} label="Detalės">
          <Input.TextArea name="details" />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Pranešti
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
