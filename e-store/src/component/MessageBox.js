import Alert from 'react-bootstrap/Alert'
export default function MessageBox(props){
    return(
        <Alert varaint={props.varaint || 'infor'}>{props.children}</Alert>
    )
}