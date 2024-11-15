import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// Get all payments with filters
router.get("/", async (req, res) => {
  try {
    const { status, type, semester, studentId } = req.query;
    let query = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (semester) query.semester = semester;
    if (studentId) query.studentId = studentId;

    const payments = await Payment.find(query).sort({ date: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
});

// Get payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment", error: error.message });
  }
});

// Create new payment
router.post("/", async (req, res) => {
  try {
    const {
      studentName,
      studentId,
      amount,
      type,
      status,
      date,
      paymentMethod,
      semester,
      notes
    } = req.body;

    // Validate required fields
    if (!studentName || !studentId || !amount || !type || !status || !date || !paymentMethod || !semester) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new payment
    const payment = new Payment({
      studentName,
      studentId,
      amount,
      type,
      status,
      date,
      paymentMethod,
      semester,
      notes
    });

    // Save to database
    await payment.save();

    res.status(201).json(payment);
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ 
      message: "Error creating payment", 
      error: error.message 
    });
  }
});

// Update payment status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: "Error updating payment status", error: error.message });
  }
});

// Get student payment history
router.get("/student/:studentId", async (req, res) => {
  try {
    const payments = await Payment.find({ 
      studentId: req.params.studentId 
    }).sort({ date: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student payments", error: error.message });
  }
});

// Get overdue payments
router.get("/status/overdue", async (req, res) => {
  try {
    const payments = await Payment.find({ status: "overdue" })
      .sort({ date: 1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching overdue payments", error: error.message });
  }
});

// Get payments by semester
router.get("/semester/:semester", async (req, res) => {
  try {
    const payments = await Payment.find({ 
      semester: req.params.semester 
    }).sort({ date: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching semester payments", error: error.message });
  }
});

// Get payment statistics
router.get("/stats", async (req, res) => {
  try {
    const [totalCollected, pendingPayments, overduePayments] = await Promise.all([
      Payment.aggregate([
        { $match: { status: 'paid' } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Payment.aggregate([
        { $match: { status: 'pending' } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Payment.aggregate([
        { $match: { status: 'overdue' } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ])
    ]);

    const thisMonth = await Payment.aggregate([
      { 
        $match: { 
          status: 'paid',
          date: { 
            $gte: new Date(new Date().setDate(1)), 
            $lte: new Date() 
          }
        }
      },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalStudents = await Payment.distinct('studentId').length;

    res.status(200).json({
      totalCollected: totalCollected[0]?.total || 0,
      pendingPayments: pendingPayments[0]?.total || 0,
      thisMonth: thisMonth[0]?.total || 0,
      overduePayments: overduePayments[0]?.total || 0,
      totalStudents
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment stats", error: error.message });
  }
});

export default router;
