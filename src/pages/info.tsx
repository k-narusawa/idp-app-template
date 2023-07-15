import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/config";
import axios from "axios";

type User = {
  userId: string;
  isLock: boolean;
  failedAttempts: number;
  lockTime: Date;
  isDisabled: boolean;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  accessToken: string;
  user: User;
};

const UserInfoPage = (props: Props) => {
  return (
    <>
      <h1>UserInfo</h1>
      <table>
        <tbody>
          <tr>
            <td>userId</td>
            <td>{props.user.userId}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res, query }) {
    console.log(req.session.token.access_token);
    const user = await axios.get("http://localhost:8080/api/user", {
      headers: {
        Authorization: `Bearer ${req.session.token.access_token}`,
      },
    });
    return {
      props: {
        accessToken: req.session.token.access_token,
        user: user.data,
      },
    };
  },
  ironOptions
);

export default UserInfoPage;
