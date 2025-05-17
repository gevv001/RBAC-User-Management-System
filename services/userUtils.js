import mongoose from "mongoose";

export function secureUpdateData(data) {
    const forbiddenFields = ['password', 'createdAt', 'status', 'role', 'permissions', '_id'];
    for (const field of forbiddenFields) {
        delete data[field];
    }
    return data;
}

export function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}