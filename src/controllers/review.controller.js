import Appointment from '../models/appointment.model.js';
import Transport from '../models/transport.model.js';
import Report from '../models/report.model.js';
import ReviewSchema from '../models/review.model copy.js';
// export const createReview = async (req, res) => {
//   try {
//     const { user, rating, comment, serviceType, idService } = req.body;
//     const review = await Review.create({
//       user,
//       rating,
//       comment,
//       serviceType,
//       idService,
//     });

//     res.status(201).json({
//       message: 'Review berhasil dikirim',
//       data: review,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };

export const createReviewService = async (req, res) => {
  try {
    const {
      type, // 'review' | 'report'
      serviceType,
      serviceId,
      rating,
      comment,
      notes,
      user,
    } = req.body;

    /* ================= VALIDASI TYPE ================= */

    if (!['review', 'report'].includes(type)) {
      return res.status(400).json({
        message: 'Type harus review atau report',
      });
    }

    /* ================= CEK SERVICE ================= */

    let serviceData = null;

    if (serviceType === 'appointments') {
      serviceData = await Appointment.findById(serviceId);
    } else if (serviceType === 'transportations') {
      serviceData = await Transport.findById(serviceId);
    } else if (serviceType === 'reports') {
      serviceData = await Report.findById(serviceId);
    }
    if (!serviceData) {
      return res.status(404).json({
        message: 'Data layanan tidak ditemukan',
      });
    }

    /* ================= AMBIL FOTO ================= */

    const photos = req.files
      ? req.files.map((file) => file.path.replace(/\\/g, '/'))
      : [];

    /* ================= BUILD DATA ================= */

    const payload = {
      user: user,
      type,
      serviceType,
      serviceId,
    };

    // Kalau review
    if (type === 'review') {
      if (!rating || !comment) {
        return res.status(400).json({
          message: 'Rating dan comment wajib diisi',
        });
      }

      payload.rating = rating;
      payload.comment = comment;
    }

    // Kalau report
    if (type === 'report') {
      if (!notes) {
        return res.status(400).json({
          message: 'Notes wajib diisi',
        });
      }

      payload.notes = notes;
      payload.photo = photos[0] || null;
      payload.status = 'submitted';
    }

    /* ================= SIMPAN ================= */

    const result = await ReviewSchema.create(payload);

    /* ================= UPDATE STATUS ================= */

    if (type === 'report') {
      serviceData.status = 'completed';
      await serviceData.save();
    }

    return res.status(201).json({
      message:
        type === 'review'
          ? 'Review berhasil dikirim'
          : 'Laporan admin berhasil dikirim',
      data: result,
    });
  } catch (err) {
    console.error('CREATE ACTIVITY ERROR:', err);

    return res.status(500).json({
      message: err.message,
    });
  }
};
