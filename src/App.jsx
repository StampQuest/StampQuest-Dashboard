import { BrowserRouter, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import Loading from './layout/Loading.jsx';
import PrivateLayout from './layout/PrivateLayout.jsx';
import AuthLayout from './layout/AuthLayout.jsx';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.scss';
import CommonLayout from './layout/CommonLayout.jsx';

const Home = loadable(() => import('./pages/Home.jsx'), { fallback: <Loading /> });
const HomeCommon = loadable(() => import('./pages/Common/Home.jsx'), { fallback: <Loading /> });
const Login = loadable(() => import('./pages/Auth/Login.jsx'), { fallback: <Loading /> });
const Activities = loadable(() => import('./pages/Activity/ListActivity.jsx'), { fallback: <Loading /> });
const Register = loadable(() => import('./pages/Auth/Register.jsx'), { fallback: <Loading /> });
const Categories = loadable(() => import('./pages/Categories/Categories.jsx'), { fallback: <Loading /> });

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CommonLayout />}>
            <Route path="" element={<HomeCommon />} />
          </Route>
          <Route path="/admin/dashboard" element={<PrivateLayout />}>
            <Route path="" element={<Home />} />
            <Route path="activity" element={<Activities />} />
            <Route path="categories" element={<Categories />} />
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
