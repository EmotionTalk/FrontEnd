import './App.css';
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {router} from './routes/router'
import { theme } from './theme/theme';
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <ThemeProvider theme={theme}>
       <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={5000}/>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;
