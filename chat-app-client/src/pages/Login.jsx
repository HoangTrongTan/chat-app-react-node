import { useContext } from 'react';
import { Alert , Button , Form , Row , Col , Stack } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
function Login() {
    const { updateLoginInfo , logininfo , loginUser , registerError } = useContext(AuthContext);

    return ( <>
        <Form onSubmit={loginUser}>
            <Row style={{
                height: "100vh",
                justifyContent:"center",
                paddingTop: "10%"
            }}>
                <Col>
                    <Stack gap={3}>
                        <h2>Login</h2>
                        <Form.Control type='email' placeholder='email' onChange={ (e) => updateLoginInfo( { ...logininfo , email: e.target.value  } ) } />
                        <Form.Control type='password' placeholder='Password' onChange={ (e) => updateLoginInfo( { ...logininfo , password: e.target.value  } ) } />
                        <Button variant='primary' type='submit'>
                            Login
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

export default Login;