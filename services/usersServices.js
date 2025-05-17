import mongoose from "mongoose";
import UserModel from "../models/userModel.js"
import { isValidId } from "./userUtils.js";

class UserServices {
    static async getPaginatedUsers(page, limit, sortBy = 'createdAt') {
        try {
            limit = limit && limit > 0 ? limit : 10
            page = page && page > 0 ? page : 1

            const users = await UserModel.find()
                .sort({ [sortBy]: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .select("-password -status -permissions")
                .lean();

            const totalUsers = await UserModel.countDocuments()

            const pagination = {
                total: totalUsers,
                page,
                limit,
                totalPages: Math.ceil(totalUsers / limit)
            }

            return {
                status: 200,
                users,
                pagination
            }
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Server error"
            };
        }
    }

    static async getUser(id) {
        try {
            if (!isValidId(id)) {
                return {
                    status: 400,
                    message: 'Invalid user ID'
                }
            }

            const user = await UserModel.findById(id).select("-password").lean()

            if (!user) {
                return {
                    status: 404,
                    message: "No such user"
                }
            }

            return {
                status: 200,
                user
            }
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Server error"
            };
        }
    }

    static async updateUser(id, updateData) {
        try {
            if (Object.keys(updateData).length == 0) {
                return {
                    status: 400,
                    message: "No valid fields to update"
                }
            }

            if (!isValidId(id)) {
                return {
                    status: 400,
                    message: 'Invalid user ID'
                }
            }

            const user = await UserModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            ).lean();

            if (!user) {
                return {
                    status: 404,
                    message: "User not Found"
                }
            }

            return {
                status: 200,
                message: "Information changed",
                user
            }
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Server error"
            };
        }
    }

    static async updateRole(id, role) {
        try {
            if (!isValidId(id)) {
                return {
                    status: 400,
                    message: 'Invalid user ID'
                }
            }

            if (role !== 'user' && role !== 'admin') {
                return {
                    status: 400,
                    message: "Invalid role"
                }
            }


            const user = await UserModel.findByIdAndUpdate(
                id,
                { role },
                { new: true, runValidators: true }
            ).lean();

            if (!user) {
                return {
                    status: 404,
                    message: "User not Found"
                }
            }

            return {
                status: 200,
                message: "Role change successful",
                user
            }
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Server error"
            };
        }
    }

    static async deleteUser(id) {
        try {
            if (!isValidId(id)) {
                return {
                    status: 400,
                    message: 'Invalid user ID'
                }
            }

            const user = await UserModel.findByIdAndDelete(id);

            if (!user) {
                return {
                    status: 404,
                    message: "User not found"
                }
            }

            return {
                status: 200,
                message: "User deleted successfully",
                user
            }
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Server error"
            };
        }
    }
}

export default UserServices