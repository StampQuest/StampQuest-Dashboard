import { Controller, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useStore from '../../stores/useUserStore.js';
import { Button, Card, CardBody, CardHeader, CardLink, Input } from 'reactstrap';

const useSignUp = () => useStore((state) => state.signUp);

const Register = () => {
  const { control, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  const signUp = useSignUp();

  const onSubmit = useCallback(() => {
    const { firstName, lastName, email, password, checkPassword } = getValues('auth.register');
    if (password === checkPassword) {
      signUp(firstName, lastName, email, password)
        .then(() => {
          toast.success('Vous êtes bien enregistré');
          navigate('/auth/sign-in');
        })
        .catch((e) => {
          console.log(e);
          toast.error('Une Erreur est survenue, vérifié votre email et mot de passe.');
        });
    } else {
      toast.error('Les mots de passe ne sont pas identique');
    }
  }, [getValues]);

  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ height: '25%', width: '350px', marginBottom: '1rem' }}>
        <CardHeader className="p-4 bg-transparent">
          <h2>StampQuest</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex" style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.register.lastName"
                control={control}
                render={({ field }) => <Input type="text" placeholder="Nom"  {...field} className="me-2"
                                              isRequired />}
              />
              <Controller
                name="auth.register.firstName"
                control={control}
                render={({ field }) => <Input type="text" placeholder="Prénom"  {...field}
                                              className="ml-2" isRequired />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.register.email"
                control={control}
                render={({ field }) => <Input placeholder="Email" type="email"  {...field} isRequired />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.register.password"
                control={control}
                render={({ field }) => <Input placeholder="Mot de passe" type="password"  {...field}
                                              isRequired />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.register.checkPassword"
                control={control}
                render={({ field }) => (
                  <Input type="password" placeholder="Confirmer le mot de passe" {...field} isRequired />
                )}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button type="submit" color="primary">
                S'inscrire
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      Tu es déjà inscrit ?
      <CardLink href="/auth/sign-in" color="primary">
        Connecte toi
      </CardLink>
    </div>
  );
};

export default Register;
