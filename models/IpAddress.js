import mongoose, { Schema, model, models } from "mongoose";

// Define the IP Schema
const IpSchema = new Schema(
  {
    ipaddress: { type: String, required: true }, // Required IP address field
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt timestamps
);

// Create or retrieve the model
const IpAddress = models.IpAddress || model("IpAddress", IpSchema);

// Export the model
export default IpAddress;
