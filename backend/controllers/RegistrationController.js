import Registration from "../models/Registration.js";
import User from "../models/User.js";
import { registrationApprovedTemplate, registrationRejectedTemplate } from "../utils/emailTemplates.js";
import SendMail from "../utils/SendMail.js";

export const newRegistration = async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({
      success: true,
      message: "Registration submitted successfully",
      data: registration,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    console.log("registration.......",registration)
    if (!registration) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    let mailOptions;

    if (status === "approved") {
      const generatedPassword = Math.random().toString(36).slice(-8);

      const newUser = new User({
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        password: generatedPassword, 
        role: "student",
        status: "active",
      });
      await newUser.save();

      mailOptions = registrationApprovedTemplate(
        registration.name,
        registration.email,
        generatedPassword
      );
    } else if (status === "rejected") {
      mailOptions = registrationRejectedTemplate(registration.name);
    }

    if (mailOptions) {
      await SendMail(registration.email, mailOptions.subject, mailOptions.text, mailOptions.html);
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: registration,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    console.log("api is running....");
    console.log(req.params.id)
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
