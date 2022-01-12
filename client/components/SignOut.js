import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import { Button } from "antd";
// import router from "next/router";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <>
      <Button
        onClick={ async (e) => {
          const res = await signout();
          console.log(res)
          // router.push({
          //   pathname: '/'
          // })
        }}>
        Sign Out
      </Button>
    </>
  );
};