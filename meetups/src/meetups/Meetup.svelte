<script>
    import meetups from "./meetups-store.js"
    import { createEventDispatcher } from "svelte"
    import Button from "../components/Button.svelte"
    import Badge from "../components/Badge.svelte"
    import Loading from "../components/Loading.svelte"

    export let meetup
    let isLoading = false
    let id = meetup.id
    const toggleFavorite = () => {
        console.log(id)
        isLoading = true

        fetch(`https://svelte-fa067-default-rtdb.firebaseio.com/meetups/${id}.json`, {
            method: "PATCH",
            body: JSON.stringify({ isFavorite: !meetup.isFavorite }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Some thing went wrong")
                }
                meetups.toggleFavorite(id)
                isLoading = false
            })
            .catch((err) => {
                isLoading = false
                console.log(err)
            })
    }
    const dispatch = createEventDispatcher()
</script>

<article>
    <header>
        <h1 class={meetup.isFavorite ? "is-favorite" : ""}>
            {meetup.title}
            {#if meetup.isFavorite}
                <Badge>Favorite</Badge>
            {/if}
        </h1>
        <h2>{meetup.subtitle}</h2>
        <p>{meetup.address}</p>
    </header>
    <div class="image">
        <img src={meetup.imageUrl} alt={meetup.title} />
    </div>
    <div class="content">
        <p>{meetup.description}</p>
    </div>
    <footer>
        <Button href="mailto:{meetup.contactEmail}">Contact</Button>
        <Button type="button" on:click={() => dispatch("show-details", id)}>Show Details</Button>
        {#if isLoading}
			<span>Changing...</span>
        {:else}
            <Button mode="outline" success={meetup.isFavorite ? null : "success"} type="button" on:click={toggleFavorite}
                >{meetup.isFavorite ? "Unfavorite" : "Favorite"}</Button
            >
        {/if}
    </footer>
</article>

<style>
    article {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: 5px;
        background: var(--white);
        margin: 1rem;
    }

    header,
    .content,
    footer {
        padding: 1rem;
    }

    .image {
        width: 100%;
        height: 14rem;
    }

    .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h1 {
        font-size: 1.25rem;
        margin: 0.5rem 0;
        font-family: "Roboto Slab", sans-serif;
    }

    h1.is-favorite {
        background: #01a129;
        color: white;
        padding: 0 0.5rem;
        border-radius: 5px;
    }

    h2 {
        font-size: 1rem;
        color: #808080;
        margin: 0.5rem 0;
    }

    p {
        font-size: 1.25rem;
        margin: 0;
    }

    div {
        text-align: right;
    }
</style>
