import { Space, Form, Input } from 'antd';

export default function ShippingForm() {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  return (
    <Space style={{marginBottom: "4vh"}}>
      <Form
        {...formItemLayout}
        name="shipping information"
        style={{
          padding: "2vh",
          background: "white",
          borderRadius: "2%"
        }}
      >
        <Form.Item
          name="first name"
          label="First Name"
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input placeholder="Your first name..."/>
        </Form.Item>
        <Form.Item
          name="last name"
          label="Last Name"
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input placeholder="Your last name..."/>
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input placeholder="Your address..."/>
        </Form.Item>
        <Form.Item
          name="Address Line 2"
          label="Address"
        >
          <Input placeholder="Apartment, suite, etc. (optional)"/>
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input placeholder="Your city..."/>
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input placeholder="Your State..."/>
        </Form.Item>
        <Form.Item
          name="zip code"
          label="ZIP code"
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input placeholder="Your ZIP code..."/>
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input
            type="tel"
            placeholder="Your phone number..."
          />
        </Form.Item>
      </Form>
    </Space>
  )
}