import yup from './yup';

const login = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default {
  login,
};
