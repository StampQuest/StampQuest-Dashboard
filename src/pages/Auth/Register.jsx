import { Controller, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useStore from '../../stores/useUserStore.js';

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
    <div className="min-w-full flex flex-col justify-center items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ height: '25%', width: '350px', padding: '1rem', marginBottom: '1rem' }}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <h2>StampQuest</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex" style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.register.lastName"
                control={control}
                render={({ field }) => <Input type="text" label="Nom" {...field} className="mr-2" isRequired />}
              />
              <Controller
                name="auth.register.firstName"
                control={control}
                render={({ field }) => <Input type="text" label="Prénom" {...field} className="ml-2" isRequired />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.register.email"
                control={control}
                render={({ field }) => <Input type="email" label="Email" {...field} isRequired />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.register.password"
                control={control}
                render={({ field }) => <Input type="password" label="Mot de passe" {...field} isRequired />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Controller
                name="auth.register.checkPassword"
                control={control}
                render={({ field }) => (
                  <Input type="password" label="Confirmer le mot de passe" {...field} isRequired />
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" color="primary">
                S'inscrire
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      Tu es déjà inscrit ?
      <Link href="/auth/sign-in" color="primary">
        Connecte toi
      </Link>
    </div>
  );
};

export default Register;
