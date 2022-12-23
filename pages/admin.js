import { getSession } from "next-auth/react";

const Admin = (props) => {
  return (
    <>
        <h1>Admin Page</h1>
        <div>{props.userSession && (
            <h5>{props.userSession.user.email}</h5>
        )}</div>
    </>
  )
};
  

export const getServerSideProps = async (context) => {

    console.log(context.req);

    const session = await getSession({req: context.req});

    // console.log(session.user);

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
