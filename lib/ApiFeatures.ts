import mongoose, { Model, Document, SortOrder } from "mongoose";

import connectDB from "./connectdb";

interface SearchParams {
  [key: string]: any; // Define more specific types if needed
  limit?: string;
  page?: string;
  search?: string;
  sort?: string;
}

class ApiFeatures<T extends Document> {
  private model: Model<T>;
  private searchParams: SearchParams;
  private query: mongoose.Query<T[], T>;
  private limit: number;

  constructor(model: Model<T>, searchParams: SearchParams) {
    this.model = model;
    this.searchParams = searchParams;
    this.query = this.model.find();
    this.limit = parseInt(this.searchParams?.limit ?? "10", 10); // Default items per page
  }

  private async connectToDB(): Promise<void> {
    // Ensure the connection happens once in the app lifecycle
    await connectDB();
  }

  filterBy(field: keyof SearchParams): this {
    const searchTerm = this.searchParams?.[field];

    if (searchTerm) {
      this.query.where(field as string, searchTerm);
    }

    return this;
  }

  searchByFields(fields: string[]): this {
    const searchTerm = this.searchParams?.search;

    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");

      this.query = this.model.find({
        $or: fields.map(
          (field) => ({ [field]: { $regex: regex } }) as Record<string, any>,
        ), // Type assertion
      });
    } else {
      this.query = this.model.find();
    }

    return this;
  }

  paginate(): this {
    const page = parseInt(this.searchParams?.page ?? "1", 10);
    const skip = (page - 1) * this.limit;

    this.query = this.query.skip(skip).limit(this.limit);

    return this;
  }

  select(fields: string): this {
    this.query = this.query.select(fields);

    return this;
  }

  populate(fields: string): this {
    this.query = this.query.populate(fields);

    return this;
  }

  /*
          ! Old code for SORT::
          query.sort('createdAt'); // Sort by a single field in ascending order
          query.sort({ createdAt: -1 }); // Sort by a single field in descending order
          query.sort([['createdAt', -1], ['name', 1]]); // Sort by multiple fields

          sort( fields: | string | { [key: string]: SortOrder | { $meta: any } } | [string, SortOrder][], ): this {

            if(fields){
              this.query = this.query.sort(fields);
            }

            return this;
          }
    */

  sort(): this {
    const { sort } = this.searchParams as { sort?: string };

    if (sort) {
      let sortFields: [string, SortOrder][] = [];

      // Split the fields by commas and map to an array of tuples [field, order]
      sortFields = sort.split(",").map((field) => {
        const order = field.startsWith("-") ? -1 : 1;
        const fieldName = field.replace("-", "");

        return [fieldName, order] as [string, SortOrder];
      });
      // Apply sort fields to the query
      if (sortFields.length > 0) {
        this.query = this.query.sort(sortFields);
      }
    }

    return this;
  }

  async getTotalPages(): Promise<number> {
    try {
      await this.connectToDB();
      const count = await this.model.countDocuments(this.query.getFilter());

      return Math.ceil(count / this.limit);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get total pages");
    }
  }

  async execute(): Promise<T[]> {
    try {
      await this.connectToDB(); // Ensure DB is connected

      return await this.query;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to execute query");
    }
  }
}

export default ApiFeatures;
