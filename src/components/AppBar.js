import Button from '@mui/material/Button';
import "../style/AppBar.css"
import { Link } from 'react-router-dom';

export default function AppBar(){
    return(
        <div className="app-bar" >
            <div>
                <Link to="/" >
                    go-mmt logo
                </Link>
            </div>
            <div>
                <Link to="login" >
                    <Button style={{color:"white"}} >Login</Button>
                </Link>
                <Link to={"sign-up"} >
                    <Button  style={{color:"white"}}  >Sign Up</Button>
                </Link>
            </div>
        </div>
    )
}