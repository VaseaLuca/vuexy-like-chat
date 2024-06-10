import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { AuthFormType } from '../../types/common.types';

export const LoginForm = ({ form, onSubmit }: AuthFormType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Card
      sx={{
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: "350px",
      }}
    >
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
            Login
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center" }}>
            Enter your credentials to access your account
          </Typography>

          <TextField
            size='medium'
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />

          <TextField
            size='medium'
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />
          
          <Button type="submit" variant="contained" color="primary">
            Sign in
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
