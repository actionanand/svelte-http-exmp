<script>
  import { onMount } from 'svelte';

  export let appName;

  let hobbyInput;
  let hobbies = [];
  let isLoading = false;

  const getHobbies = fetch('https://vue-http-exmp-default-rtdb.firebaseio.com/svelte-hobbies.json')
    .then(res => {
      if(!res.ok) {
        throw new Error('Error fatching the hobbies')
      }
      return res.json();
    })
    .then(data => {
      hobbies = Object.values(data);
      return hobbies;
    })
    .catch(err => {
      console.log(err.message);
    });


  function addHobby() {
    hobbies = [hobbyInput.value, ...hobbies];

    isLoading = true;

    fetch('https://vue-http-exmp-default-rtdb.firebaseio.com/svelte-hobbies.json', {
      method: 'POST',
      body: JSON.stringify(hobbyInput.value),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      isLoading = false;
      hobbyInput.value = '';
      if(!res.ok) {
        throw new Error('Error saving the hobby')
      }
      console.log(res);
    }).catch(err => {
      isLoading = false;
      hobbyInput.value = '';
      console.log(err.message);
    });
  }
</script>

<div class="title-wrap">
  <h1 class="capitalize-it">{appName}</h1>
</div>

<div>
  <label for="hobby"></label>
  <input type="text" id="hobby" bind:this="{hobbyInput}">
  <button on:click="{addHobby}">Add Hobby</button>
</div>

<!-- <div>
  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <ul>
      {#each hobbies as hobby}
        <li>{hobby}</li>
      {/each}
    </ul>
  {/if}
</div> -->

<div>
  {#await getHobbies}
    <p>Loading...</p>
  {:then hobbiesData} 
    <ul>
      {#each hobbiesData as hobby}
        <li>{hobby}</li>
      {/each}
    </ul> 
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

<style>
  .title-wrap {
    display: flex;
    justify-content: center;
  }

  .capitalize-it {
    text-transform: capitalize;
  }

  button {
    cursor: pointer;
  }
</style>


