<script>
    import Cart from "./Cart/Cart.svelte"
    import Products from "./Products/Products.svelte"
    import Button from "./UI/Button.svelte"
    import { timer } from "./timer-store.js"

    // $: count = $timer
    // $: console.log(count)

    let showCart = true
</script>

<Button on:click={() => (showCart = !showCart)}>Toggle Cart</Button>
{#if showCart}
    <Cart />
{/if}
<Products />
