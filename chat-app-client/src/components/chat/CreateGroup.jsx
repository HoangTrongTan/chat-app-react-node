import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import UserGroup from "./UserGroup";

function CreateGroup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { userChats , createGroupChat , chooseUser } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create group chats
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{display:"flex" , gap: "1em"}}>
              {userChats?.map((chat, index) => {
                return (
                    <UserGroup key={index} chat={chat} user={user} />
                );
              })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ () => { handleClose(); createGroupChat(chooseUser, user); }  }>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateGroup;
