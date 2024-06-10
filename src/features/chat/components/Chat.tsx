"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useLiveQuery } from "dexie-react-hooks";
import { fetchAIResponse } from "../services/openai";
import { SelectedContactBox } from "./SelectedContactBox/SelectedContactBox";
import { ChatMessage } from "../types/common.types";
import { ChatBoxContainer } from "./ChatBoxContainer/ChatBoxContainer";
import { addMessageToContact, contactsTable } from "@/services/db";
import { getCookie } from "@/services/cookies";
import { ContactList } from "./ContactList/ContactList";
import { initialContacts } from "../lib/constants";

export const Chat = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);
  const messageListRef = useRef<HTMLUListElement>(null);
  const form = useForm();
  const userData = getCookie('userData') as { email: string; avatar: string } | undefined;

  const contacts = useLiveQuery(() => contactsTable.orderBy("createdAt").toArray(), []);
  const selectedContact = useLiveQuery(
    () => contactsTable.get(selectedContactId || ''),
    [selectedContactId]
  );

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (contacts && contacts?.length <= 0) {
      const initializeContacts = async () => await contactsTable.bulkAdd(initialContacts);

      initializeContacts();
    }
    
  }, [contacts]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedContact?.messages]);
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!selectedContactId) return;

    if (data.message) {
      const userMessage: ChatMessage = {
        id: uuidv4(),
        text: data.message,
        sender: "user",
        avatar: userData?.avatar|| "User",
        timeStamp: new Date(),
      };

      const botMessage: ChatMessage = {
        id: uuidv4(),
        text: await fetchAIResponse(data.message),
        sender: "bot",
        avatar: selectedContact?.avatar || " ",
        timeStamp: new Date(),
      };

      await addMessageToContact(selectedContactId, userMessage);
      await addMessageToContact(selectedContactId, botMessage);

      form.reset();
    }

    if (data.searchQuery) {
      const foundMessage = selectedContact?.messages.find((message: ChatMessage) =>
        message.text?.toLowerCase().includes(data.searchQuery.toLowerCase())
      );

      if (foundMessage) {
        setHighlightedMessageId(foundMessage.id);
        document.getElementById(foundMessage.id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleClearHightlightedMessage = () => {
    setHighlightedMessageId(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: 10 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <ContactList
          selectedContactId={selectedContactId}
          contacts={contacts || []}
          onSelectContact={setSelectedContactId}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', bgcolor: '#f8f7fa', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: { md: '0 8px 0px 0px', xs: '8px' } }}>
          <Box sx={{ p: 4, bgcolor: "white",  borderRadius: { md: '0 8px 0px 0px', xs: '8px 8px 0 0' } }}>
            <SelectedContactBox
              form={form}
              onSubmit={onSubmit}
              clearHighlightedMessage={handleClearHightlightedMessage}
              selectedContact={selectedContact}
            />
          </Box>

          <ChatBoxContainer
            selectedContactId={selectedContactId}
            highlightedMessageId={highlightedMessageId}
            messages={selectedContact?.messages || []}
            messageListRef={messageListRef}
            onSubmit={onSubmit}
            form={form}
          />
        </Box>
      </Box>
    </Box>
  );
};
