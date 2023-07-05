import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from "../../components/CustomInput";
import { MdEmail, MdLock, MdLogin} from "react-icons/md";
import CustomButton from "../../components/CustomButton";
import PocketBase from 'pocketbase';
import {useGlobalState} from "../../global/GlobalStateContext";

const PageLogin = () => {
    const navigate = useNavigate();

    const { setIsVerified } = useGlobalState();

    //Stati che salvano il contenuto degliinput tramite onChange
    const [emailValue, setEmailValue] = useState('simone.rosso004@gmail.com');
    const [passwordValue, setPasswordValue] = useState('Simone04');

    //Stato per il tipo di errore ricevuto dal backend
    const [wrongCredential, setWrongCredential] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const pb = new PocketBase('http://127.0.0.1:8090');
        try {
            // const authData =
            const authData = await pb.collection('users').authWithPassword(emailValue, passwordValue);

            setWrongCredential('');
            // console.log('Autenticazione riuscita');
            // console.log(pb.authStore.isValid);
            console.log("auto: ", authData);

            if (pb.authStore.isValid) {
                setIsVerified(true)
                navigate('/dashboard');
            }

            pb.authStore.clear();
        } catch (error) {
            const errorObj: Error = error as Error;
            if (errorObj.message === 'Failed to authenticate.') {
                setWrongCredential('Credenzieli errate')
                setIsVerified(false)
            }
        }
    };

    return (
        <>

            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl mb-10">Login</h1>
                <div className="flex flex-col items-center">
                <CustomInput
                    ec="mb-2 w-80"
                    type="email"
                    title="Email"
                    placeholder="Inserisci la tua email"
                    StartIcon={<MdEmail/>}
                    value={emailValue}
                    error={wrongCredential}
                    onChange={(e) => {
                        setEmailValue(e.target.value);
                    }}
                />

                <CustomInput
                    ec="mb-2 w-80"
                    type="password"
                    title="Password"
                    placeholder="Inserisci la tua password"
                    StartIcon={<MdLock/>}
                    value={passwordValue}
                    error={wrongCredential}
                    onChange={(e) => {
                        setPasswordValue(e.target.value);
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