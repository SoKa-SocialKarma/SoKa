import { Grid, Typography, createTheme, ThemeProvider, Box, Container, Avatar, TextField, Button, CssBaseline, Select, InputLabel, MenuItem } from '@material-ui/core'



const theme = createTheme();

export default function SignUp() {
	

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
					<Typography component='h1' variant='h5'>
						Personalize your account
					</Typography>
					<Box component='form' noValidate sx={{ mt: 3 }}>
						<Grid container spacing={5}>
							<Grid item xs={12} sm={0}>
								<TextField
									autoComplete='fname'
									name='firstName'
									required
									fullWidth
									id='firstName'
									label='First Name'
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={0}>
								<TextField
									required
									fullWidth
									id='lastName'
									label='Last Name'
									name='lastName'
									autoComplete='lname'
									variant='standard'
								/>
							</Grid>
							<Grid item xs={12}>
								<InputLabel id='experience'>Experience</InputLabel>
								<Select label='experience' fullWidth>
									<MenuItem value={1}>Beginner</MenuItem>
									<MenuItem value={2}>Intermediate</MenuItem>
									<MenuItem value={3}>Advanced</MenuItem>
								</Select>
							</Grid>
							<Grid item xs={12}>
								<InputLabel id='radius'>Radius</InputLabel>
								<Select label='radius' fullWidth>
									<MenuItem value={1}>5 miles</MenuItem>
									<MenuItem value={2}>10 miles</MenuItem>
									<MenuItem value={3}>15 miles</MenuItem>
									<MenuItem value={4}>25 miles</MenuItem>
								</Select>
							</Grid>
							<Grid item xs={12}></Grid>
						</Grid>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Submit
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
