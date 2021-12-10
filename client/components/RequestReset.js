import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { Button, Form, Input } from 'antd';
import { CURRENT_USER_QUERY } from "./User";
import React from "react";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import router from "next/router";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`;

export default function RequestReset() {
  const formRef = React.createRef();
  const [requestReset, { data, loading }] = useMutation(REQUEST_RESET_MUTATION);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  return (
    <div className="form-div"
      style={{
        margin: "6vh auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Sign In</h2>
      <Form
        ref={formRef}
        size="middle"
        name='control-ref'
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values) => {
          requestReset({
            variables: values,
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
          });
          router.push({
            pathname: '/'
          })
        }}
        onFinishFailed={onFinishFailed}
        style={{
          width: '50%',
          textAlign: 'center'
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your Email'
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Your Email Address"
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="reset-form-button"
            style={{
              width: "100%"
            }}
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
