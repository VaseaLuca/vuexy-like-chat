import { Telegram } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<FieldValues>;
  onSubmit: (data: FieldValues) => void;
}

export const PromptBox = ({ form, onSubmit }: Props) => {
  const { register, handleSubmit } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", marginTop: "16px", display: "flex", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <TextField
        fullWidth
        focused={false}
        autoComplete="off"
        sx={{
          width: "100%",
          border: "none",
          "&:hover": {
            borderColor: "transparent",
          },
          "&:focus": {
            borderColor: "transparent",
          },
        }}
        {...register("message")}
        InputProps={{
          endAdornment: (
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#7366f0",
                "&:hover": {
                  backgroundColor: "#7366f0",
                },
                "&:active": {
                  backgroundColor: "#7366f0",
                },
              }}
            >
              Send
              
              <Telegram sx={{ marginLeft: "8px" }} fontSize="small" />
            </Button>
          ),
        }}
      />
    </form>
  );
}