import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { Button, Form, Input } from 'antd';
import { CURRENT_USER_QUERY, useUser } from "./User";
import React from "react";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter} from "next/router";

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export default function SignIn() {
  const formRef = React.createRef();
  const [signin, { data, loading }] = useMutation(SIGN_IN_MUTATION);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  const user = useUser();
  const router = useRouter();
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
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
      {user ? <h2>Welcome, {user.name}</h2> : <h2>Sign In</h2>}
      <Form
        ref={formRef}
        size="middle"
        name='control-ref'
        initialValues={{ remember: true }}
        onFinish={async (values) => {
          const res = await signin({
            variables: values,
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
          });
          console.log(res)
          res?.data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordSuccess' ?
            router.push('/') :
            console.log(res);
        }}
        onFinishFailed={onFinishFailed}
        style={{
          width: '50%',
          textAlign: 'center'
        }}
      >
        {error && <Form.Item>{error}</Form.Item>}
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
        <a className="login-form-forgot" href="/reset">
          Forgot Password
        </a>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={user}
            style={{
              width: "100%"
            }}
          >
            Sign In
          </Button>
          Or <a href="signup">Sign Up!</a>
        </Form.Item>
      </Form>
    </div>
  );
}
