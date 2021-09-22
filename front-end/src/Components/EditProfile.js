import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { apiURL } from '../Util/apiURL';
import axios from 'axios';

const API = apiURL();

export default function EditProfile() {
	//let { index } = useParams();
	let history = useHistory();
	let index = 14;
	const [update, setUpdate] = useState({
		username: '',
		img: '',
		Availability: '',
		Activity: '',
		Goal: '',
		Experience: '',
	});
	useEffect(() => {
		axios.get(`${API}/users/${index}`).then(
			(response) => setUpdate(response.data[0]),
			(error) => history.push(`/not-found`)
		);
	}, [index, history, API]);

	//updateprofile
	const updateProfile = (profileinfo, index) => {
		try {
			axios.put(`${API}/users/${index}`, profileinfo).then(() => {
				// const updateA = [...update];
				// update[index]= updatedA;
				// setUpdate(updateA);
				history.push(`/profile/${index}`);
			});
		} catch (error) {
			console.warn('catch', error);
		}
	};

	const handleChange = (event) => {
		setUpdate({ ...update, [event.target.id]: event.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		updateProfile(update, index);
	};
	return (
		<div id='form'>
			<form onSubmit={handleSubmit}>
				<h4>Edit</h4>
				<span>
					<label htmlFor='username'>Username:</label>
					<input type='text' value={update.username} id='username' onChange={handleChange} />
				</span>
				<br />
				<span>
					<label htmlFor='name'>Name:</label>
					<input type='text' placeholder='name' />
				</span>
				<br />
				<span>
					<label htmlFor='img'>Image:</label>
					<input
						type='text'
						id='img'
						value={update.img}
						placeholder='http://'
						onChange={handleChange}
						disabled
					/>
				</span>
				<br />
				<span>
					<label htmlFor='availability'>Availability:</label>
					<input
						type='date'
						id='availability'
						value={update.availability}
						onChange={handleChange}
					/>
				</span>
				<br />
				<span>
					<label htmlFor='gender'>Gender:</label>
					<select name='' id=''>
						<option value='female'>Female</option>
						<option value='male'>Male</option>
						<option value='other'>Perferred not to answer</option>
					</select>
				</span>

				<br />

				{/* <input
            type='text'
            id='experience'
            value={details.experience}
            onChange={handleChange}
          /> */}
				{/* </span> */}

				<span>
					<label htmlFor='goals'>Goals:</label>
					<select name='goals' id=''>
						<option value='abs'>Abs</option>
						<option value='chest'>Chest</option>
						<option value='cardio'>Cardio</option>
						<option value='back'>Back</option>
						<option value='legs'>Legs</option>
					</select>
					{/* <input
            type='text'
            id='goals'
            value={details.goals}
            onChange={handleChange}
          /> */}
				</span>
				<br />
				<br />
				<span>
					<button type='submit'>Submit</button>
				</span>
			</form>
		</div>
	);
}
