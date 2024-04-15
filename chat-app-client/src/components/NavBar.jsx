import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notification from "./chat/Notification";

function NavbarComp() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
        <Container>
          <Link to={"/"} className="link-light text-decoration-none">
            Chat app
          </Link>
          {user && (
            <span className="text-warning">
              Logged in as " {user?._doc?.username} "
            </span>
          )}
          <Nav>
            <Stack direction="horizontal" gap={3}>
              {user && (
                <>
                  <Link
                    onClick={() => logoutUser()}
                    to={"/login"}
                    className="link-light text-decoration-none"
                  >
                    Logout
                  </Link>
                  <Notification />
                </>
              )}
              {!user && (
                <>
                  <Link
                    to={"/login"}
                    className="link-light text-decoration-none"
                  >
                    Login app
                  </Link>
                  <Link
                    to={"/register"}
                    className="link-light text-decoration-none"
                  >
                    Register app
                  </Link>
                </>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
