import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navigation = () => {
  const { data: session, status } = useSession();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link href="/">My awesome app</Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          {/* <Link href="/sign_in" passHref>
                        <Nav.Link>Sign in</Nav.Link>
                    </Link>

                    <Link href="/register" passHref>
                        <Nav.Link>Register</Nav.Link>
                    </Link>

                    <Link href="/sign_out" passHref>
                        <Nav.Link>Sign out</Nav.Link>
                    </Link>

                    <Link href="/dashboard" passHref>
                        <Nav.Link>Dashboard</Nav.Link>
                    </Link> */}

          {!session && status != "loading" && (
            <Link
              href="/sign_in"
              style={{ color: "white", paddingRight: "20px" }}
            >
              Sign in
            </Link>
          )}

          {/* <Link
            href="/register"
            style={{ color: "white", paddingRight: "20px" }}
          >
            Register
          </Link> */}

          {session && status != "loading" && (
            <>
              <Link
                href="#"
                style={{ color: "white", paddingRight: "20px" }}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </Link>

              <Link href="/dashboard" style={{ color: "white" }}>
                Dashboard
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
