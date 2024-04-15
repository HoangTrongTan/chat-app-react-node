import { Stack } from "react-bootstrap";
import img from '../../assets/avartar_group.svg';
import moment from "moment";

function UserGroupChat({ group }) {

  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="user-card align-items-center p-2 justify-content-between"
        role="button"
      >
        <div className="d-flex" style={{ color: "#000" }}>
          <div className="me-2">
            <img src={img} alt="" height={45} />
          </div>
          <div className="text-content">
            <div className="name">name text</div>
            <div className="text">{<span>text message</span>}</div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="date">{moment(group.createdAt).calendar()}</div>
            <div></div>
            {/* <div className={isOnline ? "user-online" : ""}></div> */}
          </div>
        </div>
      </Stack>
    </>
  );
}

export default UserGroupChat;
