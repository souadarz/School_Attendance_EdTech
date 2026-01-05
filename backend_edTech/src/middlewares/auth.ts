import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "../../../shared/index";
import { User } from "../entities/User";
import { AppDataSource } from "../config/ormConfig";

const JWT_SECRET = process.env.JWT_SECRET!;
const userRepository = AppDataSource.getRepository(User);

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };;

    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token." });
    }

    // const user = await userRepository.findOne({
    //   where: { id: decoded.id },
    //   select: ["id", "email", "role"],
    // });

    // if (!user) {
    //   return res.status(401).json({
    //     message: "User not found",
    //   });
    // }
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export const roleMiddleware = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }
    const user = await userRepository.findOne({
      where: { id: req.userId },
      select: ["id", "role"],
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: role not authorized" });
    }
    next();
  };
};
