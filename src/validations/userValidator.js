import * as yup from 'yup';

const userValidationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('Username wajib diisi')
    .min(3, 'Username minimal 3 karakter'),

  password: yup
    .string()
    .required('Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),

  name: yup.string().trim().required('Nama lengkap wajib diisi'),

  phoneNumber: yup
    .string()
    .nullable() // Karena di mongoose required: false
    .notRequired(),

  address: yup.string().nullable().notRequired(),

  email: yup
    .string()
    .email('Format email tidak valid')
    .lowercase()
    .nullable()
    .notRequired(),

  userType: yup
    .string()
    .required('Tipe user wajib dipilih')
    .oneOf(['admin', 'user', 'officer', 'driver'], 'Tipe user tidak valid'),
});

export { userValidationSchema };
