import { PublicUser } from "./public_user";

export interface PublicPage{
    pageID: string,
    user:   PublicUser,
    timestamp: number
}