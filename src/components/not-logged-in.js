import { Link } from "react-router-dom";
import {Button} from "@mui/material"
function LoginPrompt(props) {
    const {message} = props;
    return(
        <div>
          <p>{message}</p>
          <p>Existing User? Please Login.</p>
          <Link to="/login"> {/* Replace with the appropriate route */}
          <Button variant="contained" color="primary">
            Login
          </Button>
            </Link>
            <p>New to our website? Please create an account.</p>
            <Link to="/register"> {/* Replace with the appropriate route */}
            <Button variant="contained" color="primary">
                Create Account
            </Button>
            </Link>
        </div>
    )
}

export default LoginPrompt;