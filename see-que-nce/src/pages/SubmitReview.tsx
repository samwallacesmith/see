import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
    rating: yup.number().required('Rating is required').min(1).max(5),
    email: yup.string().email('Enter a valid email').required('Email is required'),
});

const SubmitReview = () => {
    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            rating: '',
            email: '', // User's email address for notification
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.post('http://localhost:1337/api/submitted-reviews', {
                    data: values
                });
                alert('Review submitted successfully!');
            } catch (error) {
                console.error('Error submitting review:', error);
                alert('Failed to submit review. Please try again.');
            }
        },
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Submit Review</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="content"
                    name="content"
                    label="Content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    helperText={formik.touched.content && formik.errors.content}
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TextField
                    fullWidth
                    id="rating"
                    name="rating"
                    label="Rating"
                    type="number"
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    error={formik.touched.rating && Boolean(formik.errors.rating)}
                    helperText={formik.touched.rating && formik.errors.rating}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Your Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                />
                <Button color="primary" variant="contained" type="submit">Submit</Button>
            </form>
        </Container>
    );
};

export default SubmitReview;
