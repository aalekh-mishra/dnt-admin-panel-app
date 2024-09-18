import { Navigate } from 'react-router-dom';


export const ProtectedRoute = ({children, isLoggedIn, redirect="/sign-in"}:any) => {
 
  if(!isLoggedIn) return <Navigate to={redirect} />

  return children;
}