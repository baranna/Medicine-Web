export interface Message {
    replies: string[];
    _id: string;
    author: string;
    content: string;
    timeStamp: string;
    isReply: boolean;
}
