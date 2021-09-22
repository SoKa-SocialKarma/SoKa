import { useState, useEffect } from 'react';

export default function LoginQs() {
	const [info, setInfo] = useState([]);

	return (
		<div id='LoginQ'>
      <span>
			<h1>Personalize your account</h1>
      </span>
			<form action=''>
        <span>
				<label htmlFor='username'>Username:</label>
				<input type='text' value id='username' onChange />
        </span>
        <span>
				<label htmlFor='name'>Name:</label>
				<input type='text' value id='name' onChange />
        </span>
        <span>
				<label htmlFor='availability'>Availability:</label>
				<input type='date' value id='availability' onChange />
        </span>
        <span>
				<label htmlFor='location'>Location:</label>
				<input type='text' value id='location' onChange />
        </span>
        <span>
        <button>
          submit
        </button>
        </span>
			</form>
		</div>
	);
}
