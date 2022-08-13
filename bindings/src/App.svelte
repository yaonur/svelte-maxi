<script>
  import CustomInput from "./CustomInput.svelte";
  import Toggle from "./Toggle.svelte";

  let value = "";
  let price;
  let agreed;
  let favColor = "green";
  let singleFavColor = "red";
  let customVal
  $: console.log(value);
  $: console.log(price);
  $: console.log(agreed);
  $: console.log(favColor);
  $: console.log(customVal)

  const setValue = (event) => {
    value = event.target.value;
  };
  let userNameInput;
  const saveData = () => {
    console.log(document.querySelector("#username").value);
    console.log(userNameInput.value);
    console.dir(userNameInput);
  };
</script>
<CustomInput bind:val={value} bind:this={customVal}></CustomInput>

<!--<input type="text" value="{value}" on:input={setValue}>-->
<!--<input type="text" bind:value={value}>-->
<!--<input type="text" bind:value>-->
<!--<CustomInput bind:val={value} />-->
<!--<h1>{value}</h1>-->
<!--<Toggle bind:chosenOption={value} />-->
<!--<h1>{value}</h1>-->
<!--&lt;!&ndash; returns string&ndash;&gt;-->
<!--<input-->
<!--  type="number"-->
<!--  value={price}-->
<!--  on:input={(event) => console.log(event.target.value)}-->
<!--/>-->
<!--&lt;!&ndash;return number&ndash;&gt;-->
<!--<input type="number" bind:value={price} />-->

<!--<label for="">-->
<!--	<input type="checkbox" bind:checked={agreed}>-->
<!--	Agree to terms?-->
<!--</label>-->
<!--<h1>Favorite Color?</h1>-->
<!--<label for="">-->
<!--	<input type="radio" name="color" value="red" bind:group={favColor}>-->
<!--	red-->
<!--</label>-->
<!--<label for="">-->
<!--	<input type="radio" name="color" value="green" bind:group={favColor}>-->
<!--	green-->
<!--</label>-->
<!--<label for="">-->
<!--	<input type="radio" name="color" value="blue" bind:group={favColor}>-->
<!--	blue-->
<!--</label>-->
<!--<h1>Favorite Color?</h1>-->
<!--<label for="">-->
<!--	<input type="checkbox" name="color" value="red" bind:group={favColor}>-->
<!--	red-->
<!--</label>-->
<!--<label for="">-->
<!--	<input type="checkbox" name="color" value="green" bind:group={favColor}>-->
<!--	green-->
<!--</label>-->
<!--<label for="">-->
<!--	<input type="checkbox" name="color" value="blue" bind:group={favColor}>-->
<!--	blue-->
<!--</label>-->
<!--<select name="" id="" bind:value={singleFavColor}>-->
<!--  <option value="green">Green</option>-->
<!--  <option value="red">Red</option>-->
<!--  <option value="blue">Blue</option>-->
<!--</select>-->
<!--<h1>{singleFavColor}</h1>-->

<!--<input type="text" id="username" />-->
<!--<input type="text" bind:this={userNameInput} />-->
<!--<button on:click={saveData}>Save</button>-->
