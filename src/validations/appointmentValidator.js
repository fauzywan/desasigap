import * as yup from 'yup';

export const appointmentValidationSchema = yup.object({
  user: yup
    .string()
    .nullable()
    .matches(/^[0-9a-fA-F]{24}$/, 'User ID tidak valid'),

  meetingWith: yup
    .string()
    .required('Petugas desa wajib dipilih')
    .matches(/^[0-9a-fA-F]{24}$/, 'meetingWith harus ObjectId'),

  date: yup.date().required('Tanggal wajib diisi'),
  cancelReason: yup.string().nullable(),
  rejectionReason: yup.string().nullable(),
  time: yup
    .string()
    .required('Waktu wajib diisi')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format waktu HH:mm'),

  location: yup.string().trim().default('Kantor Desa'),
});
