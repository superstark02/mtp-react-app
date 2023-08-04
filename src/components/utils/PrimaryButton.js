import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)({
    boxShadow: 'none',
    backgroundColor: '#263238',
    borderRadius: '2px',
    color: "white",
    padding: "10px 20px",
    "&:hover" : {
        backgroundColor: '#263238',
        color: 'white'
    }
})

export default function PrimaryButton(props){
    return(
        <div>
            <StyledButton type="submit" >{props.content}</StyledButton>
        </div>
    )
}