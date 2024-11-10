import { cache } from "react";

import connectDB from "./connectdb";

import SponsorType from "@/models/soponsors/sponsor-types.model";

export const getSponsorsTypes = cache(async () => {
  try {
    connectDB();
    const sponsorsTypes = await SponsorType.find({})
      .sort({ createdAt: -1 })
      .lean();

    return sponsorsTypes;
  } catch (error) {
    throw new Error("Failed to fetch sponsors types!");
  }
});

export const getAllSponsors = cache(async () => {
  try {
    connectDB();
    const sponsorsList = await SponsorType.aggregate([
      {
        $lookup: {
          from: "sponsors",
          localField: "_id",
          foreignField: "sponsor_type",
          as: "sponsors",
        },
      },
      {
        $project: {
          sectionTitle: "$sponsorship_type",
          serial_number: 1, // Include serial_number in the output
          sponsors: {
            $map: {
              input: "$sponsors",
              as: "sponsor",
              in: {
                id: "$$sponsor._id",
                name: "$$sponsor.sponsorship_name",
                img_url: "$$sponsor.sponsor_img",
              },
            },
          },
        },
      },
      {
        $sort: { serial_number: 1 }, // Sort by serial_number in ascending order
      },
    ]);

    return sponsorsList;
  } catch (error) {
    throw new Error("Failed to fetch sponsors types!");
  }
});
