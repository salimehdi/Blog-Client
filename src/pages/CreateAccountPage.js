import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth , createUserWithEmailAndPassword } from 'firebase/auth'
const CreateAccountPage = ()=>{
    const navigate = useNavigate()
    const [email,setName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setError] = useState('')

    const signUpFunction = async ()=>{
        try {
            if(password !== confirmPassword){
                setError('Password and Confirm Password does not match')
                return ;
            }
            else {
            await createUserWithEmailAndPassword(getAuth(),email , password)
            navigate('/article')
            }
        } catch (e) {
            setError(e.message)
        }
    }

    return(
        <>
        <h1>Sign Up</h1>
        {error && <p className="error">{error}</p>}
        <input 
        type="text"
        placeholder="Your Email"
        value={email}
        onChange={e=> setName(e.target.value)}
        />
        <input 
        type="password"
        placeholder="Your Password"
        value={password}
        onChange={e=> setPassword(e.target.value)}
        />
        <input 
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e=> setConfirmPassword(e.target.value)}
        />
        <button onClick={signUpFunction}>
            Sign Up
        </button>
        <Link to="/login">
            Already have a account, login here
        </Link>
        </>
    )
}
export default CreateAccountPage