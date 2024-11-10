"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { handleError } from "./errorHandler";

import connectDB from "@/lib/connectdb";
import SponsorType from "@/models/soponsors/sponsor-types.model";
import uploadFileHandler from "@/utils/file-upload-helpers";
import Sponsor from "@/models/soponsors/sponsors.model";
import deleteFilePath from "@/utils/delete-file-from-path";

const sponsorTypeSchema = z.object({
  sponsorship_type: z.string(),
});
const sponsorSchema = z.object({
  sponsor_type: z.string(),
  sponsorship_name: z.string(),
});

export const addSponsorTypeAction = async (formData: FormData) => {
  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { sponsorship_type } = sponsorTypeSchema.parse(formDataObj);

    await connectDB();
    await SponsorType.create({ sponsorship_type });

    return {
      success: true,
      message: "Form submitted successfully!!!",
    };
  } catch (error) {
    handleError(error);
  } finally {
    revalidatePath("/sponsorship");
  }
};

export const deleteSponsorType = async (sponsorID: any) => {
  try {
    await connectDB();
    const sponsorType = await SponsorType.findById(sponsorID);

    if (!sponsorType) {
      // console.log("not found");
      throw new Error("Sponsor Type does not exist!");
    }
    // TODO: Delete Corresponding Sponsors
    // Find all sponsors associated with this sponsor type
    const sponsors = await Sponsor.find({ sponsor_type: sponsorID });

    if (sponsors.length > 0) {
      // Loop through each sponsor and delete them
      for (const sponsor of sponsors) {
        if (sponsor?.sponsor_img) {
          // Delete the sponsor image from the server
          await deleteFilePath(sponsor.sponsor_img);
        }
        // Delete the sponsor document from the database
        await Sponsor.deleteOne({ _id: sponsor._id });
      }
    }
    await SponsorType.deleteOne({ _id: sponsorID });

    // console.log(res);
    revalidatePath("/sponsorship");

    return {
      success: true,
      message: "Form submitted successfully!!!",
    };
  } catch (error) {
    return handleError(error);
  }
};

export const updateSponsorTypeName = async (
  sponsorTypeId: string,
  formData: FormData
) => {
  const { sponsorship_type, serial_number } = Object.fromEntries(
    formData.entries()
  );

  if (!sponsorship_type) throw new Error("Please Provide a valid name!!!");
  connectDB();
  try {
    await SponsorType.findByIdAndUpdate(
      sponsorTypeId,
      { sponsorship_type, serial_number },
      { new: true }
    );

    revalidatePath("/sponsorship");

    return {
      success: true,
      message: "Form submitted successfully!!!",
    };
  } catch (error) {
    return handleError(error);
  }
};

export const addSponsor = async (prevState: any, formData: FormData) => {
  let uploadedLink = "";

  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { sponsor_type, sponsorship_name } = sponsorSchema.parse(formDataObj);
    const file = formData.get("sponsor_img") as File;

    // upload file
    uploadedLink = await uploadFileHandler({
      file,
      extensionArray: ["png", "jpg", "jpeg"],
      destinationPath: "/images/sponsors",
    });

    await connectDB();

    await Sponsor.create({
      sponsor_type,
      sponsorship_name,
      sponsor_img: uploadedLink,
    });

    return {
      success: true,
      message: "Form submitted successfully!!!",
      data: {},
      isError: false,
      error: {},
    };
  } catch (error) {
    if (uploadedLink) {
      await deleteFilePath(uploadedLink);
    }

    return handleError(error);
  } finally {
    revalidatePath("/sponsorship");
  }
};
export const deleteSponsor = async (id: string) => {
  try {
    if (!id) throw new Error("Please provide an ID");
    connectDB();
    const sponsor = await Sponsor.findOne({ _id: id });

    if (!sponsor) {
      throw new Error("Sponsor logo not available");
    }
    // Delete images
    if (sponsor?.sponsor_img) {
      await deleteFilePath(sponsor?.sponsor_img);
    }
    // delete the sponsor ::
    await Sponsor.deleteOne({ _id: id });

    revalidatePath("/sponsorship");

    return {
      success: true,
      message: "Deleted successfully!!!",
      data: {},
      isError: false,
      error: {},
    };
  } catch (error: any) {
    return handleError(error);
  }
};
