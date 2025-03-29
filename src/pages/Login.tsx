import { Button, TextField, Box, Typography } from '@mui/material';

export default function Login() {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Acesse o Marketo Flow
      </Typography>
      <TextField label="E-mail" fullWidth margin="normal" />
      <TextField label="Senha" type="password" fullWidth margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        Entrar
      </Button>
    </Box>
  );
}