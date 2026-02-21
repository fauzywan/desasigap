import report from '../models/report.model.js';
import mongoose from 'mongoose';
import ReportCategory from '../models/reportCategory.model.js';
import ServiceReport from '../models/service.model.js';
import reviewModel from '../models/review.model.js';
import reviewModelCopy from '../models/review.model copy.js';

export const getMyReport = async (req, res, next) => {
  const { status, category } = req.query;
  const { limit, id } = req.params;

  const filter = {};
  if (id) filter.user = id;
  if (status) filter.status = status;
  if (category) filter.category = category;

  let query = report
    .find(filter)
    .populate('category', 'name')
    .populate('user', 'name')
    .sort({ createdAt: -1 });

  if (limit) {
    query = query.limit(Number(limit));
  }

  const reports = await query;

  res.status(200).json({
    data: reports,
    total: reports.length,
    message: 'Berhasil mengambil data laporan',
  });
};
export const getAllReport = async (req, res, next) => {
  const { status, category } = req.query;
  const { limit } = req.params;

  const filter = {};
  if (status) filter.status = status;
  if (category) filter.category = category;

  let query = report
    .find(filter)
    .populate('category', 'name')
    .populate('user', 'name')
    .sort({ createdAt: -1 });

  if (limit) {
    query = query.limit(Number(limit));
  }

  const reports = await query;

  res.status(200).json({
    data: reports,
    total: reports.length,
    message: 'Berhasil mengambil data laporan',
  });
};
export const createReport = async (req, res) => {
  try {
    const { title, description, category, user } = req.body;

    // Ambil path file dan ubah format path Windows (\) ke format URL (/)
    const photos = req.files
      ? req.files.map((file) => file.path.replace(/\\/g, '/'))
      : [];

    const newReport = await report.create({
      user: user || null,
      title,
      description,
      category: category || null,
      photos: photos, // Simpan array string path
      status: 'pending',
    });

    res.status(201).json({
      message: 'Laporan berhasil dibuat',
      data: newReport,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Gagal membuat laporan: ' + err.message,
    });
  }
};

export const getReportById = async (req, res) => {
  const { id } = req.params;
  const data = await report.findById(id);
  const proof = await reviewModelCopy.findOne({
    serviceId: id,
    type: 'report',
  });
  const review = await reviewModelCopy.findOne({
    serviceId: id,
    type: 'review',
  });

  return res.status(200).json({
    data,
    proof: proof || null,
    review: review || null,
    message: 'Getting Transport request successfully',
  });
};

export const acceptReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid report ID' });
  }

  const ReportData = await report.findById(id);

  if (!ReportData) {
    return res.status(404).json({ message: 'Report not found' });
  }

  if (ReportData.status !== 'pending') {
    return res.status(400).json({
      message: 'Report cannot be accepted',
    });
  }

  ReportData.status = 'in_progress';
  await ReportData.save();

  res.status(200).json({
    message: 'Report accepted successfully',
    data: ReportData,
  });
};

/* ================= RESOLVE ================= */
export const resolveReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid report ID' });
  }

  const reportData = await report.findById(id);

  if (!reportData) {
    return res.status(404).json({ message: 'Report not found' });
  }

  if (reportData.status !== 'in_progress') {
    return res.status(400).json({
      message: 'Only in-progress reports can be resolved',
    });
  }

  reportData.status = 'resolved';
  await reportData.save();

  res.status(200).json({
    message: 'Report resolved successfully',
    data: reportData,
  });
};

/* ================= REJECT ================= */
export const rejectReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid report ID' });
  }

  const report = await Report.findById(id);

  if (!report) {
    return res.status(404).json({ message: 'Report not found' });
  }

  if (report.status !== 'pending') {
    return res.status(400).json({
      message: 'Only pending reports can be rejected',
    });
  }

  report.status = 'rejected';
  await report.save();

  res.status(200).json({
    message: 'Report rejected successfully',
    data: report,
  });
};
