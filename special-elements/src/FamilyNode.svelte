<script context="module">
	console.log("Runs once")
	let deactivateNode
</script>
<script>
  export let member;
  let isActive;
  
  console.log("runs multible times")
  function activate(){
	  if (deactivateNode){
		  deactivateNode()
	  }
	  isActive=true
	  deactivateNode=deactivate
	  
  }
  function deactivate(){
	  isActive=false
  }
</script>

<div on:click={activate} class:active={isActive}>
	<h1>{member.name}</h1>
{#if member.isParent}
    {#each member.children as child}
	    <svelte:self member="{child}"></svelte:self>
    {/each}
{/if}
<hr>

</div>

<style>
	div{
		margin-left:2rem;
	}
	.active{
		color:red;
	}
</style>