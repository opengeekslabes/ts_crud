import React, { useState  } from 'react';
import "./index.css";

function AutorisationForm(): JSX.Element {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (event: { preventDefault: () => void; }): void => {
        event.preventDefault();
    
        if (email.includes("@") && password.length >= 8) {
          alert(`{"email":"${email}","password":"${password}"}`);
        } else {
          return alert("Fail");
        }
    
        setEmail("");
        setPassword("");
        window.location.href = "/app";
      };    

    return (
    <div className="container mt-5">
        <div className="display-4 mb-5">Autorisation form</div>
        <form className="border border-light rounded p-4">
        <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input
            type="email"
            className="form-control"
            value={email}
            autoComplete="username"
            name="inputEmail"
            id="inputEmail"
            aria-describedby="emailHelp"
            onChange={(e) => { setEmail(e.target.value) }}
            />
            <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
            </small>
        </div>
        <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
            type="password"
            className="form-control"
            value={password}
            autoComplete="current-password"
            name="inputPassword"
            id="inputPassword"
            aria-describedby="passwordHelp"
            onChange={(e) => { setPassword(e.target.value)} }
            />
            <small id="passwordHelp" className="form-text text-muted">
            Password must be at least 8 characters long.
            </small>
        </div>
        <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
        >
            Submit
        </button>
        </form>
    </div>
    );

};

export default AutorisationForm;