function UserMessages() {
	return (
		<div id="chat">
			<span>
				<h4>All Messages</h4>
				<p>Daniel</p>
				<p>Esay</p>
				<p>Sarah</p>
				<p>Yesi</p>
			</span>
			<span>
			<h1>Daniel </h1>
			<p id="recieved">Daniel: Hey, Are you ready for Chest day! </p>
			<p id="sent">Talia: Definately, drinking this pre-workout right now</p>
			<p id="recieved">Daniel: Ok sounds good. Let's meet at the gym near you @ 8pm.</p>
			<p id="sent">Talia: Perfect. Leaving my house soon, should be there in half hour. </p>

			<input type="text"  placeholder="..." />
			<button>Send</button>
			</span>
		</div>
	);
}
export default UserMessages;
