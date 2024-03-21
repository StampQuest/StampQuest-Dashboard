import { BrowserRouter, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import Loading from './layout/Loading.jsx';
import './style/default.css';
import './style/index.scss';
import PrivateLayout from './layout/PrivateLayout.jsx';
import AuthLayout from './layout/AuthLayout.jsx';
import { Toaster } from 'react-hot-toast';

const Home = loadable(() => import('./pages/Home.jsx'), { fallback: <Loading /> });
const Login = loadable(() => import('./pages/Auth/Login.jsx'), { fallback: <Loading /> });
const Register = loadable(() => import('./pages/Auth/Register.jsx'), { fallback: <Loading /> });

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        toastOptions={{
          duration: 5000,
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/activity" element={<Home />} />
            <Route path="/book" element={<Home />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="sign-in" element={<Login />} />
            <Route path="sign-up" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
