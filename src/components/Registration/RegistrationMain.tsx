import React, { useEffect } from 'react';
import './RegistrationMain.css';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  message,
} from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

const RegistrationMain = observer(() => {
  const { sharedStore } = useStore();
  const { postRegistrationInfo, getIndustries, industries, doesUserInSystem } =
    sharedStore;
  const navigate = useNavigate();

  useEffect(() => {
    if (industries.length === 0) {
      getIndustries();
    }
  }, []);

  useEffect(() => {
    if (doesUserInSystem) {
      navigate('/cabinet');
    }
  }, [doesUserInSystem]);

  const onFinish = (values: any) => {
    postRegistrationInfo(values);
    message.info('Регистрируемся...');
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="registration_main_text__magin">
        <Title level={3}>Регистрация</Title>
      </div>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Text strong>Фамилия</Text>
        <Form.Item
          name="last_name"
          rules={[
            { required: true, message: 'Пожалуйста введите вашу Фамилию' },
          ]}
        >
          <Input />
        </Form.Item>

        <Text strong>Имя</Text>
        <Form.Item
          name="first_name"
          rules={[{ required: true, message: 'Пожалуйста введите ваше Имя' }]}
        >
          <Input />
        </Form.Item>

        <Text strong>Отчество</Text>
        <Form.Item name="middle_name">
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Название организации</Text>
            <Form.Item name="organization">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Text strong>Веб-сайт организации</Text>
            <Form.Item name="site">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Text strong>ИНН</Text>
            <Form.Item
              name="INN"
              rules={[
                { required: true, message: 'Пожалуйста введите ваш ИНН' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Text strong>Отрасль ведения хозяйственной деятельности</Text>
        <Form.Item name="industry_id">
          <Select
            showSearch
            placeholder="Начните печатать"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '')
                // @ts-ignore
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={industries.length !== 0 ? industries : []}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Страна</Text>
            <Form.Item name="country">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Text strong>Город</Text>
            <Form.Item name="city">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Text strong>Должность</Text>
        <Form.Item name="job">
          <Input />
        </Form.Item>

        <Text strong>Адрес электронной почты</Text>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Пожалуйста введите вашу Почту' }]}
        >
          <Input />
        </Form.Item>

        <Text strong>Password</Text>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Пожалуйста введите ваш Пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </>
  );
});

export default RegistrationMain;
