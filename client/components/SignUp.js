import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { Button, Form, Input, Typography } from 'antd';
import { CURRENT_USER_QUERY, useUser } from "./User";
import React from "react";
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!,
    $email: String!,
    $password: String!
  ) {
    createUser(data: {name: $name, email: $email, password: $password}) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const formRef = React.createRef();
  const Title = Typography;
  const [signup, { data, loading }] = useMutation(SIGN_UP_MUTATION);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const user = useUser();
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
      {!user ? <h2>Sign Up</h2>
        : <h2>Welcome, {user.name}</h2>
      }
      <Form
        ref={formRef}
        size="middle"
        name='control-ref'
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values) => (
          signup({
            variables: values,
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
          })
        )}
        onFinishFailed={onFinishFailed}
        style={{
          width: '50%',
          textAlign: 'center'
        }}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter your name'
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="name"
            placeholder="Your Name"
            autoComplete="name"
            disabled={user}
          />
        </Form.Item>
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
            disabled={user}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password'
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            autoComplete="password"
            disabled={user}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            data-testid="sign-up-button"
            disabled={user}
            style={{
              width: "100%"
            }}
          >
            {user ? <span>Signed In!</span>
              : <span>Sign Up</span>}
          </Button>
          Or <a href="signin">Sign In</a>
        </Form.Item>
      </Form>
    </div>
  );
}
