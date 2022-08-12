import {writable} from "svelte/store"

let items
    createCart().subscribe((data) => {
        items = data
    })

const checkItem = (id) => {
    console.log('checking item')
    console.log(items)

    return items.find((item) => {
        return item.id === id
    })
}

function createCart() {
    const cart = writable([
        {
            id: "p300",
            title: "Test",
            price: 9.99,
            description: "test1",
        },
        {
            id: "p200",
            title: "Test",
            price: 9.99,
            description: "test2",
        },
    ])
    return {
        subscribe: cart.subscribe,

        addItem: (item) => {
            console.log('adding ite')
            if (checkItem(item.id)){
                console.log('item already exists')
                return true
            }
            cart.update((items) => {
                if (items.find((i) => i.id === item.id)) {
                    return [...items]
                }
                return [...items, item]
            })
            console.log('successfully added item')
            return false
        },
        removeItem: (id) => {
            cart.update((items) => {
                return items.filter((i) => i.id !== id)
            })
        },
    }
}

export default createCart()
