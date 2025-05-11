
import { useState } from "react";
import { trpc } from "../../lib/trpc";
import { Input } from "../../components/Input";
import { Button} from "../../components/Button";

const SignUp = () => {
	const [success, setSuccess] = useState(false);
	const [formValue, setFormValue] = useState({
		name: '',
		phone: '',
		email: '',
		password: '',
	});

	const signUpMutation = trpc.signUp.useMutation({
		onSuccess: (data) => {
			console.log('User created successfully:', data);
			setSuccess(true);
			// Очистка формы после успешной отправки
			setFormValue({
				name: '',
				phone: '',
				email: '',
				password: '',
			});
		},
		onError: (error) => {
			console.error('Error creating user:', error);
		}
	});
	const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	return (
		<div>  
			<h1>Sign Up</h1>
			<form 
			onSubmit={e=>{
				e.preventDefault()
				signUpMutation.mutate(formValue)
				console.log('user is create!');
			}}>
				<Input
					id="Name"
					type="text"
					value={formValue.name}
					onChange={e => handlerOnChange(e)}
				/>
        				<Input
					id="Phone"
					type="tel"
					value={formValue.phone}
					onChange={e => handlerOnChange(e)}
				/>
        				<Input
					id="Email"
					type="email"
					value={formValue.email}
					onChange={e => handlerOnChange(e)}
				/>
        				<Input
					id="Password"
					type="password"
					value={formValue.password}
					onChange={e => handlerOnChange(e)}
				/>
				{success && <div>User is sign up!</div>}
				<Button type="submit">Submit</Button>
			</form>

      

         <div>©Copyright 2025 All Rights Are Reserved.</div>
    </div>
 
  )
}

export default SignUp