export interface User {
    _id: string,
    name: String,
    phone: String,
    address: String,
    contacts: [],
    gender: String,
    photo: String,
    createdAt: Date,
    updatedAt: Date
}

export interface Help {
    _id: string,
    user: User,
    phone: string,
    active: boolean,
    status: string,
    createdAt: Date
    updatedAt: Date
}