import { response } from 'express';
import User from '../models/user.model.js';
import { userValidationSchema } from '../validations/userValidator.js';
import bcrypt from 'bcryptjs';
export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password, confirmPassword } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not Found' });
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    await user.save();
    return res.status(201).json({ message: 'Update Password Berhasil' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const registerAdmin = async (req, res) => {
  try {
    const { username, phoneNumber, name, password, confirmPassword, email } =
      req.body;
    // 1. Validasi password
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Password dan konfirmasi tidak sama',
      });
    }

    // 2. Cek user sudah ada
    const existingUser = await User.findOne({
      phoneNumber: phoneNumber,
    });
    console.log(existingUser);

    if (existingUser) {
      return res.status(409).json({
        message: 'Nomor Telepon sudah terdaftar',
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Simpan user
    const newUser = await User.create({
      username: username.toLowerCase(),
      phoneNumber,
      email: email,
      name,
      password: hashedPassword,
      userType: 'admin',
    });

    // 5. Response tanpa password
    const { password: _, ...safeUser } = newUser.toObject();

    return res.status(201).json({
      message: 'Register berhasil',
      data: safeUser,
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);

    return res.status(500).json({
      message: 'Server error',
    });
  }
};
export const register = async (req, res) => {
  try {
    const { username, phoneNumber, name, password, confirmPassword, email } =
      req.body;
    // 1. Validasi password
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Password dan konfirmasi tidak sama',
      });
    }

    // 2. Cek user sudah ada
    const existingUser = await User.findOne({
      phoneNumber: phoneNumber,
    });
    console.log(existingUser);

    if (existingUser) {
      return res.status(409).json({
        message: 'Nomor Telepon sudah terdaftar',
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Simpan user
    const newUser = await User.create({
      username: username.toLowerCase(),
      phoneNumber,
      email: email,
      name,
      password: hashedPassword,
      userType: 'user',
    });

    // 5. Response tanpa password
    const { password: _, ...safeUser } = newUser.toObject();

    return res.status(201).json({
      message: 'Register berhasil',
      data: safeUser,
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);

    return res.status(500).json({
      message: 'Server error',
    });
  }
};
export const update = async (req, res) => {
  const { id } = req.params;
  const { username, phoneNumber, email, address, name } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      name: name,
      username: username,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
    },
  );

  console.log(user);
  return res.status(200).json({ message: 'aaaa' });
};
export const updateUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const { name, phoneNumber, address, email, userType } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (address) updateData.address = address;
    if (email) updateData.email = email;
    if (userType) updateData.userType = userType;

    const user = await User.findOneAndUpdate(
      { username },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User tidak ditemukan',
      });
    }

    return res.status(200).json({
      message: 'User berhasil diupdate',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
export const getOfficer = async (req, res) => {
  try {
    const users = await User.find({
      userType: { $ne: 'user' },
    })
      .select('-password')
      .lean();
    res.status(200).json({ data: users, total: users.length });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error ${error.message}` });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select(`-password`).lean();
    res.status(200).json({ data: users, total: users.length });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error ${error.message}` });
  }
};
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const data = await User.findById(id).select('-password');
  return res.status(200).json({ data });
};
export const getyserByName = async (req, res) => {
  const { username } = req.params;
  const data = await User.findOne({ username });
  const result = {
    username: data.username,
    name: data.name,
    userType: data.userType,
  };
  return res.status(200).json({ data: result });
};

export const deleteUserById = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await user.findOneAndDelete({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
