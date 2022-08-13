<script>
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import { cubicIn } from "svelte/easing";
  import { fly, fade, draw, scale } from "svelte/transition";
  import Spring from "./Spring.svelte";

  const progress = tweened(0, {
    delay: 0,
    duration: 700,
    easing: cubicIn,
  });
  setTimeout(() => {
    progress.set(0.5);
  }, 1500);

  let box;
  let boxes = [];

  function addBox() {
    boxes = [...boxes, box];
  }

  function discard(value) {
    boxes = boxes.filter((item) => {
      console.log(value);
      return item !== value;
    });
  }

  let showParagraf = false;

  function toggle() {
    showParagraf = !showParagraf;
  }
</script>

<button on:click={toggle}>show</button>
{#if showParagraf}
  <p transition:fly={{ x: 300 }}>Can you see me</p>
{/if}

<!--<progress value={$progress} />-->
<!--<Spring></Spring>-->
<input type="text" bind:value={box} />
<button on:click={addBox}>Add</button>
{#if showParagraf}
  {#each boxes as box (box)}
    <div
      transition:fly|local={{
        delay: 0,
        duration: 500,
        easing: cubicIn,
        x: -100,
        y: 300,
      }}
      on:click={discard.bind(this, box)}
    >
      {box}
    </div>
  {/each}
{/if}

<style>
  div {
    width: 10rem;
    height: 10rem;
    background: #ccc;
    margin: 1rem;
    box-shadow: 0 2px 8px rgba(24, 20, 20, 0.1);
    padding: 1rem;
  }
</style>
