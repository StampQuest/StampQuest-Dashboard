import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { Button, Card, CardBody, CardHeader, Input, Link } from '@nextui-org/react';
import { loginUser } from '../../services/auth.js';

const Login = () => {
  const { control, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();

  const onSubmit = useCallback(() => {
    const { email, password } = getValues('auth.login');
    loginUser(email, password)
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem('access_token', res.data.access_token);
          toast.success('Vous êtes bien connecté');
          navigate('/');
        }
      })
      .catch(() => {
        toast.error('Une Erreur est survenue, vérifié votre email et mot de passe.');
      });
  }, [getValues]);

  return (
    <div className="min-w-full flex flex-col justify-center items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ height: '25%', width: '350px', padding: '1rem', marginBottom: '1rem' }}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <h2>StampQuest</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.login.email"
                control={control}
                render={({ field }) => <Input type="email" label="Email" {...field} isRequired />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.login.password"
                control={control}
                render={({ field }) => <Input type="password" label="Mot de passe" {...field} isRequired />}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" color="primary">
                Se connecter
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      Tu n'as pas de compte ?
      <Link href="/auth/sign-up" color="primary">
        Inscrit toi
      </Link>
    </div>
  );
};

export default Login;
