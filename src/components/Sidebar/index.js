import "./style.scss";
import Button from "../Button";
import { useAuth } from "../../contexts";

export default function Sidebar(props) {
  const { children } = props;
  const { logout } = useAuth();

  return (
    <div className={`Sidebar ${props.className}`}>
      {children}
      <Button
        className="LogoutButton"
        onClick={logout}
        style={{ position: "absolute", bottom: "10px", left: "20px" }}
      >
        Logout
      </Button>
    </div>
  );
}
