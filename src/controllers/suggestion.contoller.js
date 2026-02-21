import suggestion from '../models/suggestion.model.js';
import { suggestionValidationSchema } from '../validations/suggestionValidator.js';

export const getAllSuggestion = async (req, res) => {
  try {
    const data = await suggestion.aggregate([
      {
        $lookup: {
          from: 'suggestionlikes', // NAMA COLLECTION (plural & lowercase)
          localField: '_id',
          foreignField: 'suggestion',
          as: 'likes',
        },
      },
      {
        $addFields: {
          totalLikes: { $size: '$likes' },
        },
      },
      {
        $project: {
          likes: 0, // buang array likes, biar response ringan
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return res.status(200).json({
      data,
      message: 'Getting suggestion successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch suggestions',
    });
  }
};
import mongoose from 'mongoose';

export const deleteSuggestion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid suggestion ID',
      });
    }

    const data = await suggestion.findById(id);

    if (!data) {
      return res.status(404).json({
        message: 'Suggestion not found',
      });
    }

    await data.deleteOne();

    return res.status(200).json({
      message: 'Delete suggestion successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const storeSuggestion = async (req, res) => {
  try {
    const newData = await suggestionValidationSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    console.log(newData);
    const data = await suggestion.create(newData);

    return res.status(201).json({
      data,
      message: 'Adding suggestion successfully',
    });
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error ' + error,
        errors: error,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
