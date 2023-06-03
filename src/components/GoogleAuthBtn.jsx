import googleIcon from "../assets/googleIcon.svg";
import { googleAuth } from '../api-services/authService'

const GoogleAuthBtn = () => {

    return ( 
        <a href={googleAuth()}>
            <button className="w-full rounded-lg font-bold text-textPrimary border-2 border-[#ededed] py-3 flex justify-center items-center gap-2 mt-4">
                <img src={googleIcon} alt="" width="26px" />
                Continue with Google
            </button>
        </a>
     );
}
 
export default GoogleAuthBtn;