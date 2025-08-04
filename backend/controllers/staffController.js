import Staff from '../models/Staff.js';

// Add new pickup staff (admin use)
export const createStaff = async (req, res) => {
  try {
    const { name, phone, assignedZone } = req.body;

    const staff = new Staff({ name, phone, assignedZone });
    await staff.save();

    res.status(201).json({ msg: 'Staff created successfully', staff });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all staff
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
