import PickupRequest from '../models/PickupRequest.js';
import Staff from '../models/Staff.js';


// Create new pickup request (user)
export const createPickupRequest = async (req, res) => {
  try {
    const { requestedDate, address, wasteType, notes } = req.body;
    const userId = req.user.id;

    const newRequest = new PickupRequest({
      user: userId,
      requestedDate,
      address,
      wasteType,
      notes,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : '', // assuming multer uploads here
    });
    console.log("-----newRequest",newRequest);

    await newRequest.save();
    res.status(201).json({ msg: 'Pickup request created', newRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin assigns staff to pickup
export const assignStaff = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { staffId } = req.body;

    const pickup = await PickupRequest.findById(requestId);
    if (!pickup) return res.status(404).json({ message: 'Pickup request not found' });

    const staff = await Staff.findById(staffId);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    pickup.staff = staffId; // ✅ Correct field name as per schema
    pickup.status = 'scheduled'; // ✅ Must match enum in schema
    pickup.isAssigned = true; // Optional: track assignment flag
    await pickup.save();

    res.status(200).json({ message: 'Staff assigned successfully', pickup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to assign staff' });
  }
};


// Get all pickup requests (admin)
export const getAllPickupRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find()
      .populate('user', 'name email')
      .populate('staff', 'name phone'); // lowercase 'staff'

    console.log("Requests:", requests);
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get my pickup requests (user)
export const  getUserPickupRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await PickupRequest.find({ user: userId });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




