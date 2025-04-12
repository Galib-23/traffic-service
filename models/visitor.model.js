import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  ip: String,
  location: String,
  userAgent: String,
  viewCount: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
