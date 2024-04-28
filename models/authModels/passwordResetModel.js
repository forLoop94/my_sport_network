import mongoose from 'mongoose';

const PasswordResetSchema = new mongoose.Schema(
  {
    userId: String,
    resetString: String,
    newPassword: String,
    createdAt: Date,
    expiresAt: Date
  }
)

const PasswordReset = mongoose.model("PasswordReset", PasswordResetSchema);

export default PasswordReset;