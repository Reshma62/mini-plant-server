"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginateDataService = void 0;
const getPaginateDataService = (model, query, searchFields) => __awaiter(void 0, void 0, void 0, function* () {
    // Parse page and limit to integers, using nullish coalescing to provide defaults
    const page = parseInt((query === null || query === void 0 ? void 0 : query.page) || "1", 10);
    const limit = parseInt((query === null || query === void 0 ? void 0 : query.limit) || "10", 10);
    const sort = (query === null || query === void 0 ? void 0 : query.sort) || "-createdAt"; // Default sort by descending order of createdAt
    const { page: _, limit: __, sort: ___, search } = query, otherQuery = __rest(query, ["page", "limit", "sort", "search"]);
    // Construct the search query
    const searchQuery = search
        ? {
            $or: searchFields.map((field) => ({
                [field]: { $regex: search, $options: "i" },
            })),
        }
        : {};
    // Combine the search query with other queries
    const combinedQuery = Object.assign(Object.assign(Object.assign({}, otherQuery), searchQuery), { isDeleted: { $ne: true } });
    // Prepare the query
    let queryBuilder = model
        .find(combinedQuery)
        .sort(sort) // Apply sorting
        .skip((page - 1) * limit) // Skip the appropriate number of documents
        .limit(limit); // Limit the number of documents to be returned
    // Execute the query
    const data = yield queryBuilder.exec();
    // Calculate the total count of matching documents
    const count = yield model.countDocuments(combinedQuery);
    return { data, count };
});
exports.getPaginateDataService = getPaginateDataService;
