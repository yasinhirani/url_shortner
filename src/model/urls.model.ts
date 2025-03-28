import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  urlCode: { type: String, unique: true },
  longUrl: String,
  createdAt: { type: Date, default: Date.now(), expires: '180d' },  
});

const UrlWithoutUserIdSchema = new mongoose.Schema({
  urlCode: { type: String, unique: true },
  longUrl: String,
  createdAt: { type: Date, default: Date.now(), expires: '180d' },  
});

export const urlModel = mongoose.model("Urls", UrlSchema);
export const urlWithoutUserIdModel = mongoose.model("UrlsWithoutUserIds", UrlWithoutUserIdSchema);
