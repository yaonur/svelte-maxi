<script>
    import ContactCard from "./ContactCard.svelte"

    let name = "dumbass"
    let jobTitle = "job"
    let description = "some description"
    let image='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg'
    let age = 30
    $: uppercaseName = name.toUpperCase()
    const incrementAge = () => {
        age += 1
    }
</script>

<h1>hello {uppercaseName} ,age is {age}</h1>
<button on:click={incrementAge}>add age</button>
<input type="text" bind:value={name} />
<input type="text" bind:value={jobTitle} />
<input type="text" bind:value={description} />
<input type="text" bind:value={image} />
<ContactCard userName={name} {jobTitle} {description} {image} />

<style>
    h1 {
        color: purple;
    }
</style>
