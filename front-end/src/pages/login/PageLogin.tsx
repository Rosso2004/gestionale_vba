import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from "../../components/CustomInput";
import { MdEmail, MdLock, MdLogin} from "react-icons/md";
import CustomButton from "../../components/CustomButton";
import {useGlobalState} from "../../global/GlobalStateContext";
import axios from "axios";

interface IFormData {
    emailUsername: string;
    password: string;
    error: {
        emailUsername: string;
        password: string;
    }
}

const PageLogin = () => {
    const navigate = useNavigate();

    const { setIsVerified } = useGlobalState();

    const [formData, setFormData] = useState<IFormData>({
        emailUsername: '',
        password: '',
        error: {
            emailUsername: '',
            password: ''
        }
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const toSubmit = {
            email: formData.emailUsername,
            username: formData.emailUsername,
            password: formData.password
        }
        axios
            .post(import.meta.env.VITE_URL_WEB_API + '/api/user/verifyUser', toSubmit)
            .then((response)=>{
                if (response.status === 200) {
                    setIsVerified(true)
                    navigate('/dashboard');
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setFormData((prevData) => ({
                        ...prevData,
                        error: {
                            emailUsername: error.response.data,
                            password: ''
                        }
                    }));
                } else if (error.response.status === 401) {
                    setFormData((prevData) => ({
                        ...prevData,
                        error: {
                            emailUsername: '',
                            password: error.response.data
                        }
                    }));
                }
            });
    };

    return (
        <div className="flex flex-col justify-center h-screen bg-gray-200">
            <div className="rounded-lg shadow-xl bg-white p-4 mx-auto">
                <img src="../../public/vba.svg" className="mx-auto h-44 mb-5" alt="Logo" />

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <h1 className="text-4xl mb-3">Login</h1>
                    <div className="flex flex-col items-center">
                    <CustomInput
                        ec="mb-2 w-80"
                        title="Email o Username"
                        placeholder="Inserisci la tua email"
                        StartIcon={<MdEmail/>}
                        value={formData.emailUsername}
                        error={formData.error.emailUsername}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                emailUsername: e.target.value
                            }));
                        }}
                    />

                    <CustomInput
                        ec="mb-2 w-80"
                        type="password"
                        title="Password"
                        placeholder="Inserisci la tua password"
                        StartIcon={<MdLock/>}
                        value={formData.password}
                        error={formData.error.password}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                password: e.target.value
                            }));
                        }}
                    />
                    <CustomButton
                      type="submit"
                      text="Login"
                      ec="mt-2"
                      icon={<MdLogin/>}
                    />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PageLogin;