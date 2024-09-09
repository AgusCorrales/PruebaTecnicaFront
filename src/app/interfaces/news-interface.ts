export interface NewsInterface {
    _id?: string; 
    title: string;
    description: string;
    date: string;
    content: string;
    auth: string;
    likes?: string[];
    createdAt?: string;
}
