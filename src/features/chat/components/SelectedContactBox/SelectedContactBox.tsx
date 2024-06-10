import { useEffect, useRef, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Box, TextField, Avatar, Typography, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Contact } from "../../types";

type Props = {
  form: UseFormReturn<FieldValues>;
  selectedContact?: Contact;
  clearHighlightedMessage: () => void;
  onSubmit: (data: FieldValues) => void;
}

export const SelectedContactBox = ({ form, clearHighlightedMessage, onSubmit, selectedContact }: Props) => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { register, handleSubmit } = form;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setIsSearching(false);

        clearHighlightedMessage();
        form.reset();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


const onClickSearchIcon: () => void = () => setIsSearching(true);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} ref={searchBoxRef}>
      <Avatar src={selectedContact?.avatar} />
      
      <Typography variant="subtitle1" sx={{ ml: 2 }}>
        {selectedContact?.name}
      </Typography>

      <Box sx={{ ml: 'auto' }}>
        {isSearching ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              focused={false}
              size='small'
              autoComplete='off'
              {...register("searchQuery")}
              placeholder="Search..."
              InputProps={{
                endAdornment: (
                  <IconButton type="submit">
                    <Search />
                  </IconButton>
                ),
              }}
            />
          </form>
        ) : (
          <Box sx={{ ml: 'auto' }}>
            <IconButton onClick={onClickSearchIcon}>
              <Search />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};