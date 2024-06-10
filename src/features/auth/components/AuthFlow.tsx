'use client';

import { useRouter } from 'next/navigation';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Box, Typography } from "@mui/material";
import { LoginType } from '../types/common.types';
import { yupLoginSchema } from '../validation/Form.validation';

import { LoginForm } from './Forms/LoginForm';
import { setCookie } from '@/services/cookies';
import { getRandomAvatarUrl } from '@/lib/constants';

type Props = {
  type: 'LOGIN';
};

const resolveSchemaByType = {
  LOGIN: yupLoginSchema,
};

const defaultValuesByType = {
  LOGIN: { email: '', password: '' } as LoginType,
};

export const AuthFlow = ({ type }: Props) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: defaultValuesByType[type] as DefaultValues<FieldValues>,
    resolver: yupResolver(resolveSchemaByType[type]),
  });

  const onSubmit = (data: FieldValues) => {
    const actionsByType = {
      LOGIN: () => {
        if (data.email === 'test@mentortools.com' && data.password === '123456789') {

          setCookie('userData', JSON.stringify({ email: data.email, avatar: getRandomAvatarUrl() }));  

          router.push('/dashboard');
        } else {
          alert('Invalid email or password');
        }
      },
      
    };

    return actionsByType[type]();
  };

  const authFormByType = {
    LOGIN: <LoginForm form={form} onSubmit={onSubmit} />,
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        borderRadius: 0,
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#113547",
          flex: 1,
          height: "100%",
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "center", color: "rgba(255, 255, 255, 0.7)" }}>
          Vuexy Chat Like
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          px: { xs: 4, md: 8 },
        }}
      >
        {authFormByType[type]}
      </Box>
    </Card>
  );
};
