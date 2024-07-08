import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { loginUser } from '../../services/auth.js';
import useStore from '../../stores/useUserStore.js';
import { Button, Card, CardBody, CardHeader, Input, CardLink } from 'reactstrap';

const useSignIn = () => useStore((state) => state.signIn);

const Login = () => {
  const { control, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  const signIn = useSignIn();

  const onSubmit = useCallback(() => {
    const { email, password } = getValues('auth.login');
    signIn(email, password)
      .then((res) => {
        if (res.status === 201) {
          toast.success('Vous êtes bien connecté');
          navigate('/');
        }
      })
      .catch(() => {
        toast.error('Une Erreur est survenue, vérifié votre email et mot de passe.');
      });
  }, [getValues]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ height: '25%', width: '350px', marginBottom: '1rem' }}>
        <CardHeader className="bg-transparent">
          <h2>StampQuest</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.login.email"
                control={control}
                render={({ field }) => <Input placeholder="Email" type="email" label="Email" {...field} isRequired />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.login.password"
                control={control}
                render={({ field }) => <Input placeholder="Mot de passe" type="password" label="Mot de passe" {...field} isRequired />}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button type="submit" color="primary">
                Se connecter
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      Tu n'as pas de compte ?
      <CardLink href="/auth/sign-up" color="primary">
        Inscrit toi
      </CardLink>
    </div>
  );
};

export default Login;
