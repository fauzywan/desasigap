import Faq from '../models/faq.model.js';

// Get all FAQs
export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create FAQ
export const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = await Faq.create({ question, answer });
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update FAQ
export const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!faq)
      return res.status(404).json({ success: false, message: 'FAQ not found' });

    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete FAQ
export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findByIdAndDelete(id);

    if (!faq)
      return res.status(404).json({ success: false, message: 'FAQ not found' });

    res.status(200).json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
