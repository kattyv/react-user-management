import { User } from "../interfaces/User";
import { useAppSelector } from "./useReduxTyped";

export const useAuth = () => {
    const users: User[] = useAppSelector(state => state.users.value);

    const checkUser = (username: string, password: string) => {
        return new Promise((res, rej) => {
          const userFound = users.find(us => us.username === username);

          if(userFound) {
            if (userFound.password === password) {
                res(userFound)   
            } else {
              rej('Wrong username or password');  
            }  
          }
          else if(username === '' || password === '') {
            rej('Fill in login credentials');
          }
          else {
            rej('User not found')
          }
          
        })
    }

    return { checkUser };
}