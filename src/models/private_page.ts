import { UserEntity } from "./user_entity";

export interface PrivatePage{
    pageID: string,
    user:UserEntity,
    invites:{email:string,code:string}[],
    timestamp:number
}