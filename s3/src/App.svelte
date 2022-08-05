<script>
    import ContactCard from "./ContactCard.svelte"

    let name = "Max"
    let title = ""
    let image = ""
    let description = ""
    let formState = false
    let createdContacts = []

    const addContact = () => {
        if (name.trim().length === 0 || title.trim().length === 0 || image.trim().length === 0 || description.trim().length === 0) {
            formState = "invalid"
            return
        }
        createdContacts = [
            {
                name: name,
                title: title,
                image: image,
                description: description,
                id: Math.random(),
            },
            ...createdContacts,
        ]
        formState = true
    }
    const deleteFirst = () => {
        createdContacts = createdContacts.slice(1)
    }
    const deleteLast = () => {
        createdContacts = createdContacts.slice(0, -1)
    }
</script>

<form id="form">
    <div class="form-control">
        <label for="userName">User Name</label>
        <input type="text" bind:value={name} id="userName" />
    </div>
    <div class="form-control">
        <label for="jobTitle">Job Title</label>
        <input type="text" bind:value={title} id="jobTitle" />
    </div>
    <div class="form-control">
        <label for="image">Image URL</label>
        <input type="text" bind:value={image} id="image" />
    </div>
    <div class="form-control">
        <label for="desc">Description</label>
        <textarea rows="3" bind:value={description} id="desc" />
    </div>
    <button on:click|preventDefault={addContact}>Add Contact Card</button>
</form>

<button on:click={deleteFirst}>Delete First</button>
<button on:click={deleteLast}>Delete Last</button>
{#if formState === "invalid"}
    <h1>Invalid form input</h1>
{:else}
    <p>Please enter some data and push add button</p>
{/if}
{#each createdContacts as contact, i (contact.id)}
    <h2>#{i + 1}</h2>
    <ContactCard userName={contact.name} jobTitle={contact.title} description={contact.description} userImage={contact.image} />
{:else}
    <p>Please start adding some contacts, no contacts yet</p>
{/each}

<style>
    #form {
        width: 30rem;
        max-width: 100%;
	    margin:4px 0;
    }
</style>
