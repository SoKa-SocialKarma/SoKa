export default function SearchForm() {
	return (
		<div className="topBar">
			<form className="search-form">
				<label htmlFor="">Goals:</label>
				<input type="text" activity="activity" />

				<label htmlFor="">Availability:</label>
				<input type="date" />

				<label htmlFor="location">Location:</label>
				<input type="text" />

				<label htmlFor="Activity">Activity:</label>
				<select name="acitvity" id="activity">
					<option value="gym">gym</option>
					<option value="hiking">hiking</option>
					<option value="virtual">virtual</option>
				</select>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
