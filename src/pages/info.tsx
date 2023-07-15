import { GetServerSideProps } from "next";
import { getSession } from "../lib/session";

type Props = {
  accessToken: string;
};

const UserInfoPage = (props: Props) => {
  return (
    <>
      <h1>UserInfo</h1>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getSession(req, res);
  console.log(session);
  console.log(session.accessToken);

  return {
    props: {},
  };
};

export default UserInfoPage;
