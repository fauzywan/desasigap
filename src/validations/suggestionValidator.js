import * as yup from 'yup';

export const suggestionValidationSchema = yup.object({
  isAnonymous: yup.boolean().default(true),

  user: yup.string().nullable(),

  content: yup
    .string()
    .trim()
    .min(5, 'Isi saran minimal 5 karakter')
    .required('Isi saran wajib diisi'),
});
