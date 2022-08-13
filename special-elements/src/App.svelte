<script>
  import CartItem from "./CartItem.svelte";
  import Product from "./Product.svelte";
  import FamilyNode from "./FamilyNode.svelte";

  let currentTitle="My title"
  let close=false
  let familyStructure = [
    {
      isParent: true,
      name: "Chris",
      children: [
        {
          isParent: true,
          name: "Moe",
          children: [{ isParent: false, name: "Dan" }],
        },
      ],
    },
    { isParent: false, name: "Anna" },
  ];

  let renderedComponent = { cmp: Product, title: "Test Product", id: "p1" };

  function toggle() {
    if (renderedComponent.cmp === Product) {
      renderedComponent = { cmp: CartItem, title: "Test Cart", id: "p2" };
    } else {
      renderedComponent = { cmp: Product, title: "Test Product", id: "p1" };
    }
	close=!close
  }
  function keyDown(e){
	  console.log(e.key)
  }
</script>

<!--<svelte:body on:mousemove={(e)=>console.log(e.screenX+':'+e.screenY)}></svelte:body>-->
<svelte:window on:keydown={keyDown}></svelte:window>
<svelte:head>
	<title>{currentTitle}</title>
</svelte:head>
<button on:click={()=>currentTitle="My app"}>Toggle title</button>

<button on:click={toggle}>Toggle Display</button>

<svelte:component
  this={renderedComponent.cmp}
  title={renderedComponent.title}
  id={renderedComponent.id}
/>
{#if close}

{#each familyStructure as familyMember}
  <FamilyNode member={familyMember} />
{/each}
{/if}
