import { Experience, Skill } from "./user_entity";

export interface PublicUser{
    skills:         Skill[],
    birthDay:       number,
    experiences:    Experience[],
    
}