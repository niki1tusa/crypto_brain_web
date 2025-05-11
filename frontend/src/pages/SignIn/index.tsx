
import { useState } from "react";
import { trpc } from "../../lib/trpc";
import { Input } from "../../components/Input";
import { Button} from "../../components/Button";

const SignIn = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false);
    const [formValue, setFormValue] = useState({
        name: '',
        password: '',
    });

    const signInMutation = trpc.signIn.useMutation({
        onSuccess: (data) => {
            console.log('User login is successfull:', data);
            setSuccess(true);
            // Очистка формы после успешной отправки
            setFormValue({
                name: '',
                password: '',
            });
        },
        onError: (error) => {
            console.error('Error is invalid:', error);
            setError(error.message)
        }
    });
    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    return (
        <div>  
            <h1>Sign In</h1>
            <form 
            onSubmit={e=>{
                e.preventDefault()
                signInMutation.mutate(formValue)
                console.log('user is true!');
            }}>
                <Input
                    id="Name"
                    type="text"
                    value={formValue.name}
                    onChange={e => handlerOnChange(e)}
                />
                        <Input
                    id="Password"
                    type="password"
                    value={formValue.password}
                    onChange={e => handlerOnChange(e)}
                />
                {success && <div>User is sign in!</div>}
                <Button type="submit">Submit</Button>
            </form>
            {error && <div style={{color: 'red'}}>{error}</div>}
         <div>©Copyright 2025 All Rights Are Reserved.</div>
    </div>
 
  )
}

export default SignIn