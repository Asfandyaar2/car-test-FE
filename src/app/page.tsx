// /app/login/page.js
"use client";
import { useState, MouseEvent } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log("eee", email, password);
      // // Make the API call to the backend for login
      // const response = await axios.post(
      //   "http://localhost:5000/api/auth/login",
      //   {
      //     email,
      //     password,
      //   }
      // );
      // localStorage.setItem("token", response.data.token); // Store token in localStorage
      router.push("/carinfo"); // Redirect to car info page after login
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleLogin} fullWidth>
        Login
      </Button>
    </Box>
  );
}
