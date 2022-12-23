import { useSession } from "next-auth/react";

const Home = () => {

  const {data: session, status} = useSession();

  console.log(session);
  console.log(status);

  return (
    <div className="container">
      <h1>
        Home
      </h1>
      {
        session && status != 'loading' && (
          <div>
            User is logged in.
          </div>
        )
      }
    </div>
  )
}

export default Home
