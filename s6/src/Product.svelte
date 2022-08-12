<script>
    import { createEventDispatcher } from "svelte"

    export let id
    export let title
    export let price
    export let bestseller=false;

    const dispatch = createEventDispatcher()
    const addToCart=()=>{
		dispatch('add-to-cart',{id:'p1'})
    }
	const onDelete=()=>{
		dispatch('onDelete',{id:'d1'})
	}
</script>

<article>
    <h1>{title}</h1>
	<h2>${price}</h2>
	{#if bestseller}
		<h3>{bestseller}</h3>
	{/if}
    <button on:click={addToCart}>Add to Cart</button>
    <button on:click={onDelete}>Delete</button>
</article>
