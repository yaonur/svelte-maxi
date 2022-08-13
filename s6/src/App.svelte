<script>
    import Product from "./Product.svelte"
    import Modal from "./Modal.svelte"
    import { tick } from "svelte"

    let closeable = false

    let products = [
        {
            id: "p1",
            title: "a book",
            price: 9.99,
        },
    ]
    let showModal = false
    let text = "this is dummy text"

    const addToCart = (e) => {
        console.log(e)
    }
    const onDelete = (e) => {
        console.log(e.detail)
    }
    const showModel = () => {
        showModal = true
    }

    function transform(event) {
        if (event.which !== 9) {
            return
        }
        event.preventDefault()
        const selectionStart = event.target.selectionStart
        const selectionEnd = event.target.selectionEnd
        const value = event.target.value
        text = value.slice(0, selectionStart) + value.slice(selectionStart, selectionEnd).toUpperCase() + value.slice(selectionEnd)
        tick().then(() => {
            event.target.selectionStart = selectionStart
            event.target.selectionEnd = selectionEnd
        })
    }
</script>

{#each products as product (product.id)}
    <Product {...product} on:add-to-cart={addToCart} on:onDelete={onDelete} />
{/each}
<button on:click={showModel}>Show Modal</button>
{#if showModal}
    <Modal on:cancel={() => (showModal = false)} on:close={() => (showModal = false)} let:didAgree={closeable}>
        <h1 slot="header">Hey!!!</h1>
        <p>This works</p>

        <button slot="footer" on:click={() => (showModal = false)} disabled={!closeable}>Confirm</button>
    </Modal>
{/if}

<textarea row="5" value={text} on:keydown={transform} />
