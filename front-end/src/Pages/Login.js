import {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { logIn } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            await logIn(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        }catch(error){
            const message = error.message.split(" ")
            .filter((word)=> 
            { return word !== "Firebase:" 
            && word !=="(auth/user-not-found)." 
            && word !=="(auth/wrong-password)."}).join(" ")
            setError(`Failed to Sign In. ${message}`);
        }
        setLoading(false);
    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4" >Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Log In</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </Card.Body>
        </Card>            
        <div className="w100 text-center mt-2">
            Need an account? <Link to ='/signup'>Sign Up</Link>
        </div>
        </>
    );
};

export default Login;
