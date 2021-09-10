
export default function SearchForm() {

    // function closeForm () {

    //     this.state = {
    //         show: false
    //     }
    // }
    // function openForm() {
    //     document.getElementById("myForm").style.display = "block";
    //   }
      
    //   function closeForm() {
    //     document.getElementById("myForm").style.display = "none";
    //   }

return (

 <div className="topBar">
 <form className="search-form">
   
     {/* <span> */}

<label htmlFor="">Goals:</label>
<input type="text" activity="activity"/>
     {/* </span>
     <span> */}

<label htmlFor="">Availability:</label>
<input type="date" />
     {/* </span>
<br />
<span> */}

<label htmlFor="location">Location:</label>
<input type="text" />
{/* </span> */}

{/* <span> */}

<label htmlFor="Activity">Activity:</label>
<select name="acitvity" id="activity">
    <option value="gym">gym</option>
    <option value="hiking">hiking</option>
    <option value="virtual">virtual</option>
</select>
{/* </span>
<br />
<span> */}
<button type="submit">Submit</button>
{/* </span> */}
 </form>

</div>
)
}
