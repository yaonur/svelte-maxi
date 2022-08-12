<script>
    import meetups from "./meetups/meetups-store.js"
    import Header from "./components/Header.svelte"
    import MeetupGrid from "./meetups/MeetupGrid.svelte"
    import MeetupDetail from "./meetups/MeetupDetail.svelte"
    import EditMeetup from "./meetups/EditMeetup.svelte"
    import TextInput from "./components/TextInput.svelte"
    import Button from "./components/Button.svelte"

    let editMode
    let page = "overview"

    const addMeetup = (e) => {
        editMode = null
    }
    // const toggleFavorite = (e) => {
    //     const id = e.detail
    //     meetups.toggleFavorite(id)
    // }
    const cancelEdit = () => {
        editMode = "cancel"
    }

    function showDetails(e) {
        page=e.detail
    }
</script>

<Header />
<main>
    {#if page === "overview"}
        
        {#if editMode === "add"}
            <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
        {/if}
        <MeetupGrid meetups={$meetups} on:add={()=>editMode = "add"}  on:show-details={showDetails} />
    {:else}
        <MeetupDetail id="{page}" on:close={()=>page="overview"}/>
    {/if}
</main>

<style>
    main {
        margin-top: 30px;
    }

    
</style>
