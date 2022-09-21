import './App.scss';
import Routes from "./pages/Routes"
import "bootstrap/dist/js/bootstrap.bundle";
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from 'context/AuthContext';



function App() {
  return (

    <>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
}

export default App;
