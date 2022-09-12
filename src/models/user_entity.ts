


export interface UserEntity{
    id:             string,
    details:        Details,
    skills:         Skill[],
    qualifications: Qualification[],
    experiences:    Experience[],
    timestamp:      number,
    share:          string,
        
    
};

export interface Details{
    firstName:  string,
    lastName:   string,
    email:      string,
    birthday:   number,
    skillLevel: SkillLevel,
    picture?:   string
};
export enum SkillLevel{
    intern = 'Intern',
    junior = 'Junior',
    middle = 'Middle',
    senior = 'Senior',
};
export interface Skill{
    skillName:          string,
    skillDescription:   string,
    experience:         number
};
export interface Qualification{
    place:          string,
    duration:       number,
    description:    string

}
export interface Experience{
    title:          string,
    place:          string,
    description:    string,
    from:           number,
    to:             number,
    inProgress:     boolean,
}