export interface UserModelServer{
    id: Number;
    username: String;
    email: String;
    fname: String;
    lname: String;
    age: Number;
    role: Number;
    photoUrl: String;
    
}

export interface odgovor {
    count: Number;
    korisnici: UserModelServer[];
}