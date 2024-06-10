import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { Contact } from '../../types';

type Props = {
  selectedContactId: string | null;
  contacts: Contact[];
  onSelectContact: (id: string) => void;
};

export const ContactList = ({ contacts, selectedContactId, onSelectContact }: Props) => {
  return (
    <Box
      sx={{
        display: { md: 'flex', xs: 'none' }, // hidden on small screens, flex on large screens
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: '400px',
        width: '100%',
        flexShrink: 0,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: { lg: '8px 0 0 8px' },
        flexGrow: 1,
        minWidth: '200px',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ p: 6.5, bgcolor: "white", borderRadius: "0 8px 0 0" }} />

      <Box sx={{ p: 4, borderRadius: '8px'}}>
        {contacts.map((contact) => {
          const isSelected = contact.id === selectedContactId;

          return (
            <Box
              key={contact.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.1s ease-in-out',
                backgroundColor: isSelected ? '#7366f0' : 'transparent',
                ':hover': {
                  backgroundColor: isSelected ? '#8175f1' : '#f8f7fa',
                },
              }}
              onClick={() => onSelectContact(contact.id)}
            >
              <Avatar src={contact.avatar} alt={contact.name} />

              <Typography
                variant="subtitle1"
                sx={{
                  ml: 2,
                  color: isSelected ? 'white' : 'black',
                }}
              >
                {contact.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};