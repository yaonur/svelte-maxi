<script>
    import { createEventDispatcher } from "svelte"
    import Meetup from "./Meetup.svelte"
    import MeetupFilter from "./MeetupFilter.svelte"
    import Button from "../components/Button.svelte"

    export let meetups
    let favsOnly = false
    const dispatch = createEventDispatcher()
    
    $: filteredMeetups = favsOnly ? meetups.filter((m) => m.isFavorite) : meetups
    const setFilter = (event) => {
        favsOnly = event.detail === 1
    }
</script>

<section id="meetup-controls">
    <MeetupFilter on:select={setFilter} />
    <Button on:click={()=>dispatch('add')}>New Meetup</Button>
</section>
<section id="meetups">
    {#each filteredMeetups as meetup (meetup.id)}
        <Meetup {meetup} on:show-details />
    {/each}
</section>

<style>
    #meetups {
        margin-top: 5rem;
    }

    #meetup-controls {
        margin: 1rem;
	    display:flex;
	    justify-content:space-between;
    }

    section {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    @media (min-width: 768px) {
        #meetups {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
