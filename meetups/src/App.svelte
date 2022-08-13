<script>
    import { scale } from "svelte/transition"
    import meetups from "./meetups/meetups-store.js"
    import Header from "./components/Header.svelte"
    import MeetupGrid from "./meetups/MeetupGrid.svelte"
    import MeetupDetail from "./meetups/MeetupDetail.svelte"
    import EditMeetup from "./meetups/EditMeetup.svelte"
    import TextInput from "./components/TextInput.svelte"
    import Button from "./components/Button.svelte"
    import meetupsStore from "./meetups/meetups-store.js"
    import Loading from "./components/Loading.svelte";

    let editMode
    let page = "overview"
    let isLoading = true

    const addMeetup = (e) => {
        editMode = null
    }
    fetch("https://svelte-fa067-default-rtdb.firebaseio.com/meetups.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Fetching Meetups failed")
            }
            return res.json()
        })
        .then((data) => {
            const loadedMeetups = []
            for (const key in data) {
                loadedMeetups.push({
                    id: key,
                    ...data[key],
                })
            }
            setTimeout(() => {
                isLoading = false
                meetupsStore.setMeetups(loadedMeetups)
            }, 1000)
        })
        .catch((err) => console.log(err))
    // const toggleFavorite = (e) => {
    //     const id = e.detail
    //     meetups.toggleFavorite(id)
    // }
    const cancelEdit = () => {
        editMode = "cancel"
    }

    function showDetails(e) {
        page = e.detail
    }
</script>

<Header />
<main>
    {#if page === "overview"}
        {#if editMode === "add"}
            <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
        {/if}
        {#if isLoading}
           <Loading></Loading>
        {:else}
            <MeetupGrid meetups={$meetups} on:add={() => (editMode = "add")} on:show-details={showDetails} />
        {/if}
    {:else}
        <MeetupDetail id={page} on:close={() => (page = "overview")} />
    {/if}
</main>

<style>
    main {
        margin-top: 30px;
    }
</style>
