export interface User {
    name: string; // required with minimum 5 characters
    phone: string;
    email: string;
    address: {
        street?: string; // required
        postcode?: string;
        state: string;
    }
}