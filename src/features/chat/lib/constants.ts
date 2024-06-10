import { v4 as uuidv4 } from "uuid";
import { Contact } from "../types";
import { getRandomAvatarUrl } from "@/lib/constants";

export const initialContacts: Contact[] = [
  {
    id: uuidv4(),
    name: 'John Doe',
    avatar: getRandomAvatarUrl(),
    createdAt: new Date(),
    updatedAt: new Date(),
    messages: []
  },
  {
    id: uuidv4(),
    name: 'Jane Smith',
    avatar: getRandomAvatarUrl(),
    createdAt: new Date(),
    updatedAt: new Date(),
    messages: []
  },
  {
    id: uuidv4(),
    name: 'Jack Doris',
    avatar: getRandomAvatarUrl(),
    createdAt: new Date(),
    updatedAt: new Date(),
    messages: []
  },
  {
    id: uuidv4(),
    name: 'Leo Tolstoy',
    avatar: getRandomAvatarUrl(),
    createdAt: new Date(),
    updatedAt: new Date(),
    messages: []
  },
  {
    id: uuidv4(),
    name: 'William Shakespeare',
    avatar: getRandomAvatarUrl(),
    createdAt: new Date(),
    updatedAt: new Date(),
    messages: []
  }
];