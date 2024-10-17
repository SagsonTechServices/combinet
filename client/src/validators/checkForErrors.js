import emailValidator from "./emailValidator";

export default function checkForErrors(userData, setError){
    // validate email 
    if(userData.username === '' || userData.email === '' || userData.password === '' || userData.confirm === ''){
      setError({text: 'Empty fields are not accepted.', type: 'warning'});
      return true;
    }
    if(!emailValidator(userData.email)){
      setError({text: 'Invalid email address.', type: 'warning'})
      return true;
    }
    if(userData.password !== userData.confirm){
      setError({text: 'Passwords do not match.', type: 'warning'});
      return true;
    }
    setError({text: "", type: ""});
    return false;
  }