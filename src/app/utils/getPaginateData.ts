import { Document, Model, FilterQuery } from "mongoose";

interface Query {
  page?: string;
  limit?: string;
  sort?: string;
  search?: string;
  [key: string]: any;
}

interface PaginateResult<T> {
  data: T[];
  count: number;
}

export const getPaginateDataService = async <T extends Document>(
  model: Model<T>,
  query: Query,
  searchFields: string[]
): Promise<PaginateResult<T>> => {
  // Parse page and limit to integers, using nullish coalescing to provide defaults
  const page = parseInt(query?.page || "1", 10);
  const limit = parseInt(query?.limit || "10", 10);
  const sort = query?.sort || "-createdAt"; // Default sort by descending order of createdAt

  const { page: _, limit: __, sort: ___, search, ...otherQuery } = query;

  // Construct the search query
  const searchQuery: FilterQuery<T> = search
    ? ({
        $or: searchFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        })),
      } as FilterQuery<T>)
    : {};

  // Combine the search query with other queries
  const combinedQuery: FilterQuery<T> = {
    ...otherQuery,
    ...searchQuery,
    isDeleted: { $ne: true },
  };

  // Prepare the query
  let queryBuilder = model
    .find(combinedQuery)
    .sort(sort) // Apply sorting
    .skip((page - 1) * limit) // Skip the appropriate number of documents
    .limit(limit); // Limit the number of documents to be returned

  // Execute the query
  const data = await queryBuilder.exec();

  // Calculate the total count of matching documents
  const count = await model.countDocuments(combinedQuery);

  return { data, count };
};
