import { getSession } from "next-auth/react";

const Admin = (props) => {
  return (
    <>
      <h1>Admin Page</h1>
      <h3>{props.session}</h3>
    </>
  );
};

export const getServerSideProps = async (context) => {

    console.log(context.req);

    const session = await getSession({req: context.req});

    if (!session) {
        return {
            redirect: {
                destination: '/sign_in',
                permanent: false
            }
        }
    }

    return {
        props: {
            userSession: session,
        }
    }
   
}

export default Admin;
