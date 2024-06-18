import { model, Schema } from "mongoose";
import { IUser, IUserMethods, IUserModel } from "./users.interface";
import bcrypt from "bcrypt";

const dataSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      select: 0,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
// Password hashing using bcrypt
dataSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

// Check if a user exists by email
dataSchema.static("checkExistUser", async function (email: string) {
  return await this.findOne({ email }).select("+password");
});

// Compare passwords
dataSchema.method("comparePassword", async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
});
export const UserModel = model<IUser, IUserModel>("User", dataSchema);
