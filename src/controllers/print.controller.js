// controllers/printController.js
import Appointment from '../models/appointment.model.js';
import Report from '../models/report.model.js';
import Transport from '../models/transport.model.js';
import PDFDocument from 'pdfkit-table';

export const getPrintByDate = async (req, res) => {
  const { type } = req.body; // Menangkap tipe dari body
  const { start, end } = req.params; // Menangkap rentang tanggal dari URL

  try {
    // 1. Ambil data secara paralel dari 3 koleksi
    const [appointments, reports, transports] = await Promise.all([
      Appointment.find({
        createdAt: { $gte: new Date(start), $lte: new Date(end) },
      }),
      Report.find({
        createdAt: { $gte: new Date(start), $lte: new Date(end) },
      }),
      Transport.find({
        createdAt: { $gte: new Date(start), $lte: new Date(end) },
      }),
    ]);

    // 2. Mapping Data agar memiliki struktur yang seragam untuk tabel
    const combinedData = [
      ...appointments.map((item) => ({
        title: 'Janji Temu',
        status: item.status,
        service: 'Appointment',
        date: item.createdAt,
      })),
      ...reports.map((item) => ({
        title: item.title,
        status: item.status,
        service: 'Report',
        date: item.createdAt,
      })),
      ...transports.map((item) => ({
        title: `Pengadaan ${item.transportType}`,
        status: item.status,
        service: 'Transport',
        date: item.createdAt,
      })),
    ].sort((a, b) => new Date(a.date) - new Date(b.date)); // Urutkan berdasarkan tanggal

    // 3. Inisialisasi PDFKit
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Set Header Response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Laporan.pdf`);

    doc.pipe(res);

    // 4. Desain Konten PDF
    doc.fontSize(18).text('LAPORAN KEGIATAN TERPADU', { align: 'center' });
    doc.fontSize(10).text(`Periode: ${start} s/d ${end}`, { align: 'center' });
    doc.moveDown(2);

    const table = {
      title: 'Rekapitulasi Data',
      subtitle: `Tipe Laporan: ${type.toUpperCase()}`,
      headers: ['No', 'Kegiatan', 'Kategori', 'Status', 'Tanggal'],
      rows: combinedData.map((item, index) => [
        index + 1,
        item.title,
        item.service,
        item.status.toUpperCase(),
        new Date(item.date).toLocaleDateString('id-ID'),
      ]),
    };

    // Render tabel otomatis
    await doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
      prepareRow: () => doc.font('Helvetica').fontSize(10),
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal membuat PDF: ' + err.message });
  }
};
