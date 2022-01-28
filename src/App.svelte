<script>
  export let appName;

  let hobbyInput;
  let hobbies = [];

  function addHobby() {
    hobbies = [hobbyInput.value, ...hobbies];
    hobbyInput.value = '';

    fetch('https://vue-http-exmp-default-rtdb.firebaseio.com/svelte-hobbies.json', {
      method: 'POST',
      body: JSON.stringify(hobbies),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(!res.ok) {
        throw new Error('Error saving the hobby')
      }
      console.log(res);
    }).catch(err => {
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

<div>
  <ul>
    {#each hobbies as hobby}
      <li>{hobby}</li>
    {/each}
  </ul>
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


