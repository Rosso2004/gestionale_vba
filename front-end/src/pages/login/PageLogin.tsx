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
        emailUsername: 'simone.rosso004@gmail.com',
        password: 'Simone04',
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
            .post('http://localhost:5000/api/user/verifyUser', toSubmit)
            .then((response)=>{
                if (response.status === 200) {
                    setIsVerified(true)
                    navigate('/dashboard');
                }
            })
            .catch((error) => {
                console.log(error.er)
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
        <>

            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl mb-10">Login</h1>
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
                  icon={<MdLogin/>}
                />
                </div>
            </form>
        </>
    )
}

export default PageLogin;