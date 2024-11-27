'use client';
import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function CarInfo() {
    const [carModel, setCarModel] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Lahore');
    const [numCopies, setNumCopies] = useState(0);
    const [pictures, setPictures] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         router.push('/login');
    //     }
    // }, [router]);

    const handlePictureUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + pictures.length > numCopies) {
            setError(`You can only upload up to ${numCopies} pictures.`);
            return;
        }
        setPictures((prev) => [...prev, ...files]);
        setError('');
    };

    const handlePictureDelete = (index) => {
        setPictures((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!carModel || !price || !phone || !city || numCopies <= 0 || pictures.length !== numCopies) {
            setError('Please fill out all fields and upload the required number of pictures.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('carModel', carModel);
            formData.append('price', price);
            formData.append('phone', phone);
            formData.append('city', city);
            formData.append('numCopies', numCopies);
            pictures.forEach((picture, index) => {
                formData.append(`picture${index}`, picture);
            });

            console.log('Form Submitted:', { carModel, price, phone, city, numCopies, pictures });
            setError('');
        } catch (err) {
            setError('Failed to submit car information.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Enter Car Information
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Car Model"
                variant="outlined"
                fullWidth
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ marginBottom: 2 }}
            />
            <FormControl sx={{ marginBottom: 2 }}>
                <FormLabel>City</FormLabel>
                <RadioGroup row value={city} onChange={(e) => setCity(e.target.value)}>
                    <FormControlLabel value="Lahore" control={<Radio />} label="Lahore" />
                    <FormControlLabel value="Karachi" control={<Radio />} label="Karachi" />
                </RadioGroup>
            </FormControl>
            <TextField
                label="No of Copies"
                type="number"
                variant="outlined"
                fullWidth
                value={numCopies}
                onChange={(e) => setNumCopies(Number(e.target.value))}
                sx={{ marginBottom: 2 }}
            />
            <Button
                variant="contained"
                component="label"
                disabled={pictures.length >= numCopies}
                sx={{ marginBottom: 2 }}
            >
                Upload Pictures
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handlePictureUpload}
                />
            </Button>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 2 }}>
                {pictures.map((pic, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'relative',
                            width: 100,
                            height: 100,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={URL.createObjectURL(pic)}
                            alt={`Upload ${index}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <Button
                            onClick={() => handlePictureDelete(index)}
                            size="small"
                            variant="contained"
                            color="error"
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                minWidth: 'auto',
                                padding: '0 6px',
                            }}
                        >
                            X
                        </Button>
                    </Box>
                ))}
            </Box>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
                Submit
            </Button>
            <Button
                variant="outlined"
                fullWidth
                onClick={handleLogout}
                sx={{ marginTop: 2 }}
            >
                Logout
            </Button>
        </Box>
    );
}
