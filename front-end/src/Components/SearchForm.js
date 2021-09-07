export default function SearchForm() {
return (

    <div>    
 <form type="onsubmit">
     <h2>
        Who are you looking for today?
     </h2>
     <span>

<label htmlFor="">Goals:</label>
<input type="text" activity="activity"/>
     </span>
     <span>

<label htmlFor="">Availability:</label>
<input type="date" />
     </span>
<br />
<span>

<label htmlFor="location">Location:</label>
<input type="text" />
</span>

<span>

<label htmlFor="Activity">Activity:</label>
<select name="acitvity" id="activity">
    <option value="gym">gym</option>
    <option value="hiking">hiking</option>
    <option value="virtual">virtual</option>
</select>
</span>
<br />
<span>
<button>Submit</button>
</span>
 </form>
</div>

)
}
