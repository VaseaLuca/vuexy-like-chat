import React, { Fragment } from 'react';
import { Box, List, ListItem, Avatar, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { formatTime } from '@/lib/time';
import { PromptBox } from "../PromptBox/PromptBox";
import { ChatMessage } from '../../types';

const ChatBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  overflowY: 'auto',
  maxHeight: '100vh',
  minHeight: '100vh',
  justifyContent: 'space-between',
}));

const MessageItem = styled(ListItem)(({ message, highlightedMessageId }: { message: ChatMessage, highlightedMessageId: string | null }) => ({
  justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
  textAlign: message.sender === "user" ? "right" : "left",
  padding: "8px 16px",
  backgroundColor: message.sender === "user" ? "#7366f0" : "#FFFFFF",
  color: message.sender === "user" ? "#FFFFFF" : "#000000",
  borderRadius: message.sender === "user" ? "8px 0 8px 8px" : "0 8px 8px 8px",
  borderColor: highlightedMessageId === message.id ? "rgb(234 179 8)" : "transparent",
  borderWidth: highlightedMessageId === message.id ? "3px" : "0",
  marginBottom: "48px",
  maxWidth: "70%",
  alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
}));

type Props = {
  selectedContactId: string | null;
  highlightedMessageId: string | null;
  messages: ChatMessage[];
  messageListRef: React.RefObject<HTMLUListElement>;
  form: UseFormReturn<FieldValues>;
  onSubmit: (data: FieldValues) => void;
};

export const ChatBoxContainer = ({ selectedContactId, highlightedMessageId, messages, messageListRef, onSubmit, form }: Props) => {
  
  return (
    <ChatBox>
      {!selectedContactId ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Typography>Please select a contact from left to continue chatting</Typography>
        </Box>
      ) : (
        <>
          <List sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }} ref={messageListRef}>
            {messages.map((message) => {
              return (
                <Fragment key={message.id}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      width: "fit-content",
                      marginLeft: message.sender === "user" ? "auto" : "0",
                    }}
                  >
                    {message.sender === "bot" && <Avatar src={message.avatar} alt="Bot Avatar" />}

                    <MessageItem
                      sx={{ position: 'relative' }}
                      id={message.id}
                      {...{ message, highlightedMessageId }}
                    >
                      <Typography variant="body1">{message.text}</Typography>

                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{
                          position: 'absolute',
                          whiteSpace: 'nowrap',
                          bottom: '-28px',
                          textAlign: message.sender === "user" ? "right" : "left",
                          right: message.sender === "user" ? "4px" : "auto",
                          left: message.sender === "user" ? "auto" : "4px",
                        }}
                      >
                        {formatTime(message.timeStamp)}
                      </Typography>
                    </MessageItem>

                    {message.sender === "user" && <Avatar src={message.avatar} alt="User Avatar" />}
                  </Box>
                </Fragment>
              );
            })}
          </List>

          <PromptBox onSubmit={onSubmit} form={form} />
        </>
      )}
    </ChatBox>
  );
}