import './App.css';
import router from './routes/router';
import {RouterProvider} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
    <ToastContainer></ToastContainer>
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;