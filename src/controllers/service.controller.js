import Appointment from '../models/appointment.model.js';
import Report from '../models/report.model.js';
import ServiceReport from '../models/service.model.js';
import Transport from '../models/transport.model.js';

export const getMyInActiveService = async (req, res) => {
  try {
    const { id } = req.params;
    let params = { status: { $in: ['completed', 'resolved'] } };
    if (id) {
      params.user = id;
    }
    const appointments = await Appointment.find(params).lean();

    const reports = await Report.find(params).lean();

    const transports = await Transport.find(params).lean();

    // Tambah serviceType
    const appointmentData = appointments.map((item) => ({
      id: item._id,
      title: 'Janji Temu',
      status: item.status,
      serviceType: 'appointments',
      date: item.createdAt,
    }));

    const reportData = reports.map((item) => ({
      id: item._id,
      title: item.title,

      date: item.createdAt,
      status: item.status,
      serviceType: 'reports',
    }));

    const transportData = transports.map((item) => ({
      id: item._id,
      title: `Pengadaan ${item.transportType}`,
      status: item.status,
      serviceType: 'transportations',
      date: item.createdAt,
    }));

    // Gabung semua
    const data = [...appointmentData, ...reportData, ...transportData];
    if (data.length > 4) {
      const returnData = data.slice(0, 4);
      return res
        .status(200)
        .json({ data: returnData, message: 'Getting Data Successfully' });
    }
    return res.status(200).json({ data, message: 'Getting Data Successfully' });
  } catch (err) {
    return res.status(500).json({
      message: 'Server error',
    });
  }
};
export const getMyActiveService = async (req, res) => {
  try {
    const { id } = req.params;
    let params = { status: { $nin: ['completed', 'resolved'] } };
    if (id) {
      params.user = id;
    }
    const appointments = await Appointment.find(params).lean();

    const reports = await Report.find(params).lean();

    const transports = await Transport.find(params).lean();
    // Tambah serviceType
    const appointmentData = appointments.map((item) => ({
      id: item._id,
      title: 'Janji Temu',
      status: item.status,
      serviceType: 'appointments',
      date: item.createdAt,
    }));

    const reportData = reports.map((item) => ({
      id: item._id,
      title: item.title,

      date: item.createdAt,
      status: item.status,
      serviceType: 'reports',
    }));

    const transportData = transports.map((item) => ({
      id: item._id,
      title: `Pengadaan ${item.transportType}`,
      status: item.status,
      serviceType: 'transportations',
      date: item.createdAt,
    }));

    // Gabung semua
    const data = [...appointmentData, ...reportData, ...transportData];
    if (data.length > 4) {
      const returnData = data.slice(0, 4);
      return res
        .status(200)
        .json({ data: returnData, message: 'Getting Data Successfully' });
    }
    return res.status(200).json({ data, message: 'Getting Data Successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};
export const getInActiveService = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      status: { $in: ['completed', 'resolved'] },
    }).lean();

    const reports = await Report.find({
      status: { $in: ['completed', 'resolved'] },
    }).lean();

    const transports = await Transport.find({
      status: { $in: ['completed', 'resolved'] },
    }).lean();

    // Tambah serviceType
    const appointmentData = appointments.map((item) => ({
      id: item._id,
      title: 'Janji Temu',
      status: item.status,
      serviceType: 'appointments',
      date: item.createdAt,
    }));

    const reportData = reports.map((item) => ({
      id: item._id,
      title: item.title,

      date: item.createdAt,
      status: item.status,
      serviceType: 'reports',
    }));

    const transportData = transports.map((item) => ({
      id: item._id,
      title: `Pengadaan ${item.transportType}`,
      status: item.status,
      serviceType: 'transportations',
      date: item.createdAt,
    }));

    // Gabung semua
    const data = [...appointmentData, ...reportData, ...transportData];
    if (data.length > 4) {
      const returnData = data.slice(0, 4);
      return res
        .status(200)
        .json({ data: returnData, message: 'Getting Data Successfully' });
    }
    return res.status(200).json({ data, message: 'Getting Data Successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};
export const getActiveService = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      status: { $nin: ['completed', 'resolved'] },
    }).lean();

    const reports = await Report.find({
      status: { $nin: ['completed', 'resolved'] },
    }).lean();

    const transports = await Transport.find({
      status: { $nin: ['completed', 'resolved'] },
    }).lean();

    // Tambah serviceType
    const appointmentData = appointments.map((item) => ({
      id: item._id,
      title: 'Janji Temu',
      status: item.status,
      serviceType: 'appointments',
      date: item.createdAt,
    }));

    const reportData = reports.map((item) => ({
      id: item._id,
      title: item.title,

      date: item.createdAt,
      status: item.status,
      serviceType: 'reports',
    }));

    const transportData = transports.map((item) => ({
      id: item._id,
      title: `Pengadaan ${item.transportType}`,
      status: item.status,
      serviceType: 'transportations',
      date: item.createdAt,
    }));

    // Gabung semua
    const data = [...appointmentData, ...reportData, ...transportData];
    if (data.length > 4) {
      const returnData = data.slice(0, 4);
      return res
        .status(200)
        .json({ data: returnData, message: 'Getting Data Successfully' });
    }
    return res.status(200).json({ data, message: 'Getting Data Successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};
export const getInActiveWithTypeService = async (req, res) => {
  try {
    const { type } = req.params; // Mengambil type dari request body
    const statusQuery = { status: { $in: ['completed', 'resolved'] } };
    let data = [];

    // Logika kondisional berdasarkan type
    if (type === 'appointments') {
      const appointments = await Appointment.find(statusQuery).lean();
      data = appointments.map((item) => ({
        id: item._id,
        title: 'Janji Temu',
        status: item.status,
        serviceType: 'appointments',
        date: item.createdAt,
      }));
    } else if (type === 'reports') {
      const reports = await Report.find(statusQuery).lean();
      data = reports.map((item) => ({
        id: item._id,
        title: item.title,
        status: item.status,
        serviceType: 'reports',
        date: item.createdAt,
      }));
    } else if (type === 'transportations') {
      const transports = await Transport.find(statusQuery).lean();
      data = transports.map((item) => ({
        id: item._id,
        title: `Pengadaan ${item.transportType}`,
        status: item.status,
        serviceType: 'transportations',
        date: item.createdAt,
      }));
    } else {
      // Jika type tidak dikirim atau tidak cocok, ambil semua (Logic Awal)
      const [appointments, reports, transports] = await Promise.all([
        Appointment.find(statusQuery).lean(),
        Report.find(statusQuery).lean(),
        Transport.find(statusQuery).lean(),
      ]);

      const appointmentData = appointments.map((item) => ({
        id: item._id,
        title: 'Janji Temu',
        status: item.status,
        serviceType: 'appointments',
        date: item.createdAt,
      }));
      const reportData = reports.map((item) => ({
        id: item._id,
        title: item.title,
        status: item.status,
        serviceType: 'reports',
        date: item.createdAt,
      }));
      const transportData = transports.map((item) => ({
        id: item._id,
        title: `Pengadaan ${item.transportType}`,
        status: item.status,
        serviceType: 'transportations',
        date: item.createdAt,
      }));

      data = [...appointmentData, ...reportData, ...transportData];
    }

    // Urutkan berdasarkan tanggal terbaru (Opsional tapi disarankan)
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Batasi maksimal 4 data
    const returnData = data.slice(0, 4);

    return res.status(200).json({
      data: returnData,
      message: 'Getting Data Successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};
export const getActiveWithTypeService = async (req, res) => {
  try {
    const { type } = req.params; // Mengambil type dari request body
    // Query untuk status yang BELUM selesai
    const statusQuery = { status: { $nin: ['completed', 'resolved'] } };
    let data = [];

    if (type === 'appointments') {
      // Hanya ambil Janji Temu
      const appointments = await Appointment.find(statusQuery).lean();
      data = appointments.map((item) => ({
        id: item._id,
        title: 'Janji Temu',
        status: item.status,
        serviceType: 'appointments',
        date: item.createdAt,
      }));
    } else if (type === 'reports') {
      // Hanya ambil Laporan
      const reports = await Report.find(statusQuery).lean();
      data = reports.map((item) => ({
        id: item._id,
        title: item.title,
        status: item.status,
        serviceType: 'reports',
        date: item.createdAt,
      }));
    } else if (type === 'transportations') {
      // Hanya ambil Pengadaan Transportasi
      const transports = await Transport.find(statusQuery).lean();
      data = transports.map((item) => ({
        id: item._id,
        title: `Pengadaan ${item.transportType}`,
        status: item.status,
        serviceType: 'transportations',
        date: item.createdAt,
      }));
    } else {
      // Jika type tidak didefinisikan, ambil semua secara paralel (limit tetap dijaga)
      const [appointments, reports, transports] = await Promise.all([
        Appointment.find(statusQuery).lean(),
        Report.find(statusQuery).lean(),
        Transport.find(statusQuery).lean(),
      ]);

      const appointmentData = appointments.map((item) => ({
        id: item._id,
        title: 'Janji Temu',
        status: item.status,
        serviceType: 'appointments',
        date: item.createdAt,
      }));
      const reportData = reports.map((item) => ({
        id: item._id,
        title: item.title,
        status: item.status,
        serviceType: 'reports',
        date: item.createdAt,
      }));
      const transportData = transports.map((item) => ({
        id: item._id,
        title: `Pengadaan ${item.transportType}`,
        status: item.status,
        serviceType: 'transportations',
        date: item.createdAt,
      }));

      data = [...appointmentData, ...reportData, ...transportData];
    }

    // Sortir berdasarkan tanggal terbaru agar data aktif yang paling baru muncul di atas
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Kembalikan maksimal 4 data sesuai logika awal Anda
    const returnData = data.slice(0, 4);

    return res.status(200).json({
      data: returnData,
      message: 'Getting Active Data Successfully',
    });
  } catch (err) {
    console.error('Error in getActiveWithTypeService:', err);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};
export const getServiceWithLimitByUser = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 2;
    const userId = req.params.id;

    const appointments = await Appointment.find({ user: userId })
      .limit(limit)
      .lean();

    const reports = await Report.find({ user: userId }).limit(limit).lean();

    const transports = await Transport.find({ user: userId })
      .limit(limit)
      .lean();

    // Tambah serviceType
    const appointmentData = appointments.map((item) => ({
      id: item._id,
      title: 'Janji Temu',
      status: item.status,
      serviceType: 'appointments',
      date: item.createdAt,
    }));

    const reportData = reports.map((item) => ({
      id: item._id,
      title: item.title,

      date: item.createdAt,
      status: item.status,
      serviceType: 'reports',
    }));

    const transportData = transports.map((item) => ({
      id: item._id,
      title: `Pengadaan ${item.transportType}`,
      status: item.status,
      serviceType: 'transportations',
      date: item.createdAt,
    }));

    // Gabung semua
    const data = [...appointmentData, ...reportData, ...transportData];
    if (data.length > 4) {
      const returnData = data.slice(0, 4);
      return res
        .status(200)
        .json({ data: returnData, message: 'Getting Data Successfully' });
    }
    return res.status(200).json({ data, message: 'Getting Data Successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};
export const getServiceWithLimit = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 2;

    const appointments = await Appointment.find().limit(limit).lean();

    const reports = await Report.find().limit(limit).lean();

    const transports = await Transport.find().limit(limit).lean();

    // Tambah serviceType
    const appointmentData = appointments.map((item) => ({
      id: item._id,
      title: 'Janji Temu',
      status: item.status,
      serviceType: 'appointments',
      date: item.createdAt,
    }));

    const reportData = reports.map((item) => ({
      id: item._id,
      title: item.title,

      date: item.createdAt,
      status: item.status,
      serviceType: 'reports',
    }));

    const transportData = transports.map((item) => ({
      id: item._id,
      title: `Pengadaan ${item.transportType}`,
      status: item.status,
      serviceType: 'transportations',
      date: item.createdAt,
    }));

    // Gabung semua
    const data = [...appointmentData, ...reportData, ...transportData];
    if (data.length > 4) {
      const returnData = data.slice(0, 4);
      return res
        .status(200)
        .json({ data: returnData, message: 'Getting Data Successfully' });
    }
    return res.status(200).json({ data, message: 'Getting Data Successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};

export const getAllService = async (req, res) => {
  const appointment = await Appointment.find({ status: { $ne: 'complete' } });
  const data = { appointment };
  return res.json({ data: data });
};
export const createServiceReport = async (req, res) => {
  try {
    const { reporter, serviceType, serviceId, notes } = req.body;
    /* ================= VALIDASI ================= */

    /* ================= AMBIL FOTO ================= */

    const photos = req.files
      ? req.files.map((file) => file.path.replace(/\\/g, '/'))
      : [];

    /* ================= CEK SERVICE ================= */

    let serviceData = null;

    if (serviceType === 'appointments') {
      serviceData = await Appointment.findById(serviceId);
    } else if (serviceType === 'transports') {
      serviceData = await Transport.findById(serviceId);
    } else if (serviceType === 'reports') {
      serviceData = await Report.findById(serviceId);
    }

    if (!serviceData) {
      return res.status(404).json({
        message: 'Data layanan tidak ditemukan',
      });
    }

    /* ================= SIMPAN ================= */

    const newReport = await ServiceReport.create({
      reporter,
      serviceType,
      serviceId,
      photo: photos[0] || null, // ambil foto pertama
      notes,
    });

    /* ================= UPDATE STATUS ================= */

    serviceData.status = 'completed';
    await serviceData.save();

    return res.status(201).json({
      message: 'Laporan admin berhasil dikirim',
      data: newReport,
    });
  } catch (err) {
    console.error('CREATE SERVICE REPORT ERROR:', err);

    return res.status(500).json({
      message: 'Gagal membuat service report: ' + err.message,
    });
  }
};
