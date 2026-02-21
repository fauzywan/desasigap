import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Pertanyaan tidak boleh kosong'],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, 'Jawaban tidak boleh kosong'],
    },
  },
  {
    timestamps: true, // Menambahkan createdAt dan updatedAt secara otomatis
  },
);

const Faq = mongoose.model('Faq', faqSchema);
export default Faq;
