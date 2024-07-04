import { catchAsyncError } from "../middlewares/catchAsync.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    gender,
    dob,
    nic,
    department,
    appointment_date,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !gender ||
    !dob ||
    !nic ||
    !department ||
    !appointment_date ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form !", 400));
  }
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartement: department,
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found!", 400));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email or Phone!",
        400
      )
    );
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    gender,
    dob,
    nic,
    department,
    appointment_date,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
    doctorId,
    patientId,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
  });
  res.status(200).json({
    success: true,
    message: "Appointment Send Successfully",
    appointment,
  });
});

export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  const appointment = await Appointment.find();
  res.status(200).json({
    success: true,
    appointment,
  });
});

export const updateAppointmentStatus = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment Not Found", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated",
      appointment,
    });
  }
);

export const deleteAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found", 404));
  }
  await appointment.deleteOne();

  res.status(200).json({
    succes: true,
    message: "Appointment Deleted!",
  });
});
