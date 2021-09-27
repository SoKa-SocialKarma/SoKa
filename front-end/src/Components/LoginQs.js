import { Card, CardContent, Grid, Typography, TextField, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';

export default function LoginQs() {
	const [info, setInfo] = useState([]);

	return (
		<div id='LoginQ'>
			<Typography>Personalize your account</Typography>
			<Card style={{ padding: 50, height: '70vh', width: 480, margin: '20px auto' }}>
				<CardContent>
					<form>
						<Grid container spacing={1}>
							<Grid xs={12} sm={0} item>
								<TextField
									label='Username'
									placeholder='Enter username'
									variant='outlined'
									required
								/>
							</Grid>
							<Grid xs={12} sm={0} item>
								<TextField
									label='Name'
									placeholder='Enter name'
									variant='outlined'
									required
								/>
							</Grid>
							<Grid xs={12} sm={0} item>
								<InputLabel id='location'>Experience</InputLabel>
								<Select id='location' autoWidth required>
									<MenuItem value={1}>Beginner</MenuItem>
									<MenuItem value={2}>Intermediate</MenuItem>
									<MenuItem value={3}>Advance</MenuItem>
								</Select>
							</Grid>
							<Grid xs={12} sm={0} item>
								<InputLabel id='location'>Radius</InputLabel>
								<Select id='location' autoWidth required>
									<MenuItem value={1}>5 miles</MenuItem>
									<MenuItem value={2}>10 miles</MenuItem>
									<MenuItem value={3}>15 miles</MenuItem>
									<MenuItem value={4}>20 miles</MenuItem>
									<MenuItem value={5}>25 miles</MenuItem>
								</Select>
							</Grid>
							<Grid xs={12} item>
								<Button type='submit' variant='contained' color='primary' autoWidth>
									Submit
								</Button>
							</Grid>
						</Grid>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
