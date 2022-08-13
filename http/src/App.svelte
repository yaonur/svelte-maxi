<script>
  import { onMount } from "svelte";
  import hobbyStore from './hobby-store.js'

  let hobbies = [];
  let hobbyInput;
  let keys;
  let isLoading = false;

  isLoading = true;
  fetch(
    "https://svelte-fa067-default-rtdb.firebaseio.com/hobbies.json"
  )
    .then((res) => {
      isLoading = false;
      if (!res.ok) {
        throw new Error("Failed!");
      }
      return res.json();
    })
    .then((data) => {
      hobbies = Object.values(data);
	  hobbyStore.setHobbies(hobbies)
    })
    .catch((err) => {
      console.log(`could not fetch data:${err.message}`);
    });

  function addHobby() {
	hobbyStore.addHobby(hobbyInput.value)
    isLoading = true;
    fetch("https://svelte-fa067-default-rtdb.firebaseio.com/hobbies.json", {
      method: "POST",
      body: JSON.stringify(hobbyInput.value),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        isLoading = false;
        if (!res.ok) {
          throw new Error("failed");
        }
        alert("Saved Data!");
      })
      .catch((err) => {
        isLoading = false;
        console.log(err);
      });
  }
</script>

<label for="hobby">Hobby</label>
<input type="text" id="hobby" bind:this={hobbyInput} />
<button on:click={addHobby}>Add hobby</button>
{#if isLoading}
  <p>Loading...</p>
{:else}
  <ul>
    {#each $hobbyStore as hobby}
      <li>{hobby}</li>
    {/each}
  </ul>
{/if}
<!--{#await getHobbies}-->
<!--	<p>Loading...</p>-->
<!--	{:then hobbyData}-->
<!--	<ul>-->
<!--		{#each hobbyData as hobby }-->
<!--			<li>{hobby}</li>-->
<!--		{/each}-->
<!--	</ul>-->
<!--	{:catch error}-->
<!--	<p>{error.message}</p>-->
<!--{/await}-->
