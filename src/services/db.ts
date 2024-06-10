import Dexie from "dexie";
import { ChatMessage, Contact } from "@/features/chat/types";

const db = new Dexie('vuexy-chat-db');

db.version(1).stores({
  contacts: '++id, name, createdAt, updatedAt', // Primary key and indexed properties
});

export const contactsTable = db.table<Contact>('contacts');

const addMessageToContact = async (contactId: string, message: ChatMessage) => {
  const contact = await contactsTable.get(contactId);

  if (contact) {
    contact.messages.push(message);
    
    contact.updatedAt = new Date();

    await contactsTable.put(contact);
  }
};

export { db, addMessageToContact };
