import { Link } from "react-router-dom";

export function LoginPage() {
    return (
        <div className="cadastro">
            <h1>Login</h1>
            <Link to="/cadastro">Criar conta</Link>
        </div>
    )
}
