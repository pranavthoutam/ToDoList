import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// function Signup() {

//     const [userName, setUserName] = useState("");
//     const [userEmail, setUserEmail] = useState("");
//     const [userPassword, setUserPassword] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const users = JSON.parse(localStorage.getItem("users")) || [];
//         const newUser = { id: Date.now(), username, email, password };

//         users.push(newUser);
//         localStorage.setItem("users", JSON.stringify(users));

//         alert("Signup successful! Please login.");
//         navigate("/login");
//     };

//     return (
//         <form onSubmit={(e) => { handleSubmit(e) }}>
//             <h2>SignUp</h2>
//             <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} placeholder="Username.." />
//             <input type="email" value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} placeholder="Email.." />
//             <input type="password" value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} placeholder="Password.." />
//             <button type="submit" >Sign Up</button>
//         </form>
//     );

// }

function SignUp() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists
        const emailExists = users.some((user) => user.email === data.email);
        if (emailExists) {
            alert("Email is already registered. Please login instead.");
            return;
        }

        const newUser = { id: Date.now(), ...data };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful! Please login.");
        reset();
        navigate("/login");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Signup</h2>
            <input type="text" placeholder="Username" {...register("username", { required: "Username is required" })} />
            {errors.username && (<p style={{ color: "red" }}>{errors.username.message}</p>)}

            <input
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                    },
                })}
            />
            {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
            )}

            {/* Password */}
            <input
                type="password"
                placeholder="Password"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                    },
                })}
            />
            {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
            <button type="submit">Signup</button>
        </form>
    );
}
export default SignUp;