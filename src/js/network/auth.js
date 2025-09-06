import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
const Auth = {
    async register({name, email, password}) {
        return await axios.post(ApiEndpoint.REGISTER, {name, email, password});
    },

    async login({email, password}) {
        return await axios.post(ApiEndpoint.LOGIN, {email, password});
    },
};

export default Auth;