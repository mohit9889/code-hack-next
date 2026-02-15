import dbConnect from './mongodb';
import Hack from '~/models/Hack';
import { populateComments } from '~/utils/populate';

// Ensure DB connection for all controller methods
const ensureDb = async () => {
  await dbConnect();
};

export const getTopHacks = async () => {
  await ensureDb();
  const hacks = await Hack.find()
    .sort({ like_count: -1 })
    .populate(populateComments());
  // Serialize for Next.js props (handle ObjectIds)
  return JSON.parse(JSON.stringify(hacks));
};

export const getNewHacks = async () => {
  await ensureDb();
  const hacks = await Hack.find()
    .sort({ created_at: -1 })
    .populate(populateComments());
  return JSON.parse(JSON.stringify(hacks));
};

export const getHotHacks = async () => {
  await ensureDb();
  const hacks = await Hack.find()
    .sort({ most_visited: -1 })
    .populate(populateComments());
  return JSON.parse(JSON.stringify(hacks));
};

export const getAllHacks = async () => {
  await ensureDb();
  const hacks = await Hack.find().populate(populateComments());
  return JSON.parse(JSON.stringify(hacks));
};

export const getHackById = async (id) => {
  await ensureDb();
  const hack = await Hack.findById(id).populate(populateComments());
  if (!hack) return null;
  return JSON.parse(JSON.stringify(hack));
};

export const createHack = async (data) => {
  await ensureDb();
  const newHack = new Hack(data);
  await newHack.save();
  return JSON.parse(JSON.stringify(newHack));
};
