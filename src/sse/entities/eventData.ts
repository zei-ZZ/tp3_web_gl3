import { UserEntity } from "src/auth/entities/user.entity";

export interface eventData{
    user: UserEntity;
    operation: string;
    }