import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { Button, Form, Input } from 'antd';
import { CURRENT_USER_QUERY } from "./User";
import React from "react";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import router from "next/router";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($email: String!, $password: String!, $token: String!) {
    redeemUserPasswordResetToken(email: $email, password: $password token: $token) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const formRef = React.createRef();
  const [reset, { data, loading }] = useMutation(RESET_MUTATION);
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
      <h2>Reset Your Password</h2>
      {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in</p>
        )}
      <Form
        ref={formRef}
        size="middle"
        name='control-ref'
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values) => {
          reset({
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
            // autoComplete="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter a new password'
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            // autoComplete="password"
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
