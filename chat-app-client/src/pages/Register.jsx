import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Alert , Button , Form , Row , Col , Stack } from 'react-bootstrap';
function Register() {

    const { register , updateRegisterInfo , registerUser , registerError , isRegisterLoading } = useContext(AuthContext);

    return ( <>
        <Form onSubmit={registerUser}>
            <Row style={{
                height: "100vh",
                justifyContent:"center",
                paddingTop: "10%"
            }}>
                <Col>
                    <Stack gap={3}>
                        <h2>Register</h2>
                        <Form.Control type='text' placeholder='name' onChange={ e => {
                            updateRegisterInfo({ ...register, username: e.target.value });
                        } } />
                        <Form.Control type='email' placeholder='email' onChange={ e => {
                            updateRegisterInfo({ ...register, email: e.target.value });
                        } } />
                        <Form.Control type='password' placeholder='Password' onChange={ e => {
                            updateRegisterInfo({ ...register, password: e.target.value });
                        } } />
                        <Button variant='primary' type='submit'>
                            { isRegisterLoading ? "Creating your account" : "Register" }
                        </Button>
                        {
                            registerError?.error && (
                                <Alert variant='danger'>
                                    <p>{registerError?.message}</p>
                                </Alert>
                            )
                        }
                    </Stack>
                </Col>
            </Row>
        </Form>
    </> );
}

export default Register;