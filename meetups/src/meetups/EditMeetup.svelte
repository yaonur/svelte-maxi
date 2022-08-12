<script>
    import meetups from "./meetups-store.js"
    import { createEventDispatcher } from "svelte"
    import TextInput from "../components/TextInput.svelte"
    import Button from "../components/Button.svelte"
    import Modal from "../components/Modal.svelte"
    import { isEmpty, isValidEmail } from "../helpers/validation.js"

    let title = ""
    let subtitle = ""
    let description = ""
    let imageUrl = ""
    let address = ""
    let contactEmail = ""
    export let id = null
    if (id) {
        const unsubscribe = meetups.subscribe((items) => {
            const selectedMeetup = items.find((i) => i.id === id)
            title = selectedMeetup.title
            subtitle = selectedMeetup.subtitle
            description = selectedMeetup.description
            imageUrl = selectedMeetup.imageUrl
            address = selectedMeetup.address
            contactEmail = selectedMeetup.contactEmail
        })
        unsubscribe()
    }
    const deleteMeetup = () => {
        meetups.removeMeetup(id)
        dispatch("save")
    }

    $: titleValid = !isEmpty(title)
    $: subtitleValid = !isEmpty(subtitle)
    $: descriptionValid = !isEmpty(description)
    $: imageUrlValid = !isEmpty(imageUrl)
    $: addressValid = !isEmpty(address)
    $: contactEmailValid = isValidEmail(contactEmail)
    $: formIsValid = titleValid && subtitleValid && descriptionValid && imageUrlValid && addressValid && contactEmailValid

    const dispatch = createEventDispatcher()
    const submitForm = () => {
        const meetupData = {
            title,
            subtitle,
            description,
            imageUrl,
            address,
            contactEmail,
        }
        if (id) {
            meetups.editMeetup(id, meetupData)
        } else {
            meetups.addMeetup(meetupData)
        }
        dispatch("save")
    }
    const cancel = () => {
        dispatch("cancel")
    }
</script>

<Modal title="Edit Meetup Data" on:cancel>
    <form action="" on:submit|preventDefault={submitForm}>
        <TextInput
            valid={titleValid}
            value={title}
            validityMessage="Please enter a valid title"
            idName="title"
            label="Title"
            on:input={(event) => (title = event.target.value)}
        />
        <TextInput
            idName="subtitle"
            label="Subtitle"
            value={subtitle}
            valid={subtitleValid}
            validityMessage="Please enter a valid title"
            on:input={(event) => (subtitle = event.target.value)}
        />
        <TextInput
            idName="description"
            label="Description"
            controlType="textarea"
            valid={descriptionValid}
            validityMessage="Please enter a valid title"
            bind:value={description}
        />
        <TextInput
            idName="image"
            label="Image"
            value={imageUrl}
            valid={imageUrlValid}
            validityMessage="Please enter a valid title"
            on:input={(event) => (imageUrl = event.target.value)}
        />
        <TextInput
            idName="address"
            label="Address"
            value={address}
            valid={addressValid}
            validityMessage="Please enter a valid title"
            on:input={(event) => (address = event.target.value)}
        />
        <TextInput
            idName="contactEmail"
            label="Email"
            value={contactEmail}
            valid={contactEmailValid}
            validityMessage="Please enter a valid email"
            on:input={(event) => (contactEmail = event.target.value)}
        />
    </form>
    <div slot="footer">
        <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
        <Button on:click={cancel} mode="outline">Cancel</Button>
        {#if id}
            <Button type="button" on:click={deleteMeetup}>Delete</Button>
        {/if}
    </div>
</Modal>

<style>
    form {
        width: 100%;
    }
</style>
