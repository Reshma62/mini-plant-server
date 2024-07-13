import { Document, Model, FilterQuery } from "mongoose";

export interface IQuery {
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
  query: IQuery,
  searchFields: string[]
): Promise<PaginateResult<T>> => {
  const page = parseInt(query?.page || "1", 10);
  const limit = parseInt(query?.limit || "10", 10);
  const sort = query?.sort || "-createdAt";

  const { page: _, limit: __, sort: ___, search, ...otherQuery } = query;

  const searchQuery: FilterQuery<T> = search
    ? ({
        $or: searchFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        })),
      } as FilterQuery<T>)
    : {};

  const filterQuery: Partial<FilterQuery<T>> = {};

  Object.keys(otherQuery).forEach((key) => {
    if (key !== "price" && key !== "limit" && otherQuery[key] !== undefined) {
      (filterQuery as any)[key] = otherQuery[key];
    }
  });

  const combinedQuery: FilterQuery<T> = {
    ...filterQuery,
    ...searchQuery,
    isDeleted: { $ne: true },
  };

  let queryBuilder = model
    .find(combinedQuery)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  const data = await queryBuilder.exec();
  const count = await model.countDocuments(combinedQuery);

  return { data, count };
};
