import { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {handleResetPassword, success, error} = useContext(AuthContext);
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return setError("Las contraseñas no coinciden");
        }
        try {
            await handleResetPassword(token, newPassword); // Pasa token y newPassword
            navigate('/login'); // Redirige después del éxito
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container-addData">
            <form className="container-form" onSubmit={handleSubmit}>
                <h2>Restablecer Contraseña</h2>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Actualizar contraseña</button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    );
};