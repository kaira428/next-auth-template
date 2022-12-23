import { getSession } from "next-auth/react";

const Admin = (props) => {
  return (
    <>
        <h1>Admin Page</h1>
        <div>{props.userSession && (
            <h5>Have Session</h5>
        )}</div>
    </>
  )
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
