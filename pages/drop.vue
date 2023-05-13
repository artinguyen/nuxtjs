<template>
  <div class="container">
    <div @dragover.prevent @drop.prevent>
      <div id="dragfile" @drop="dragFile">
        Drag the file here
        <div v-if="listFile.length">
          <ul v-for="(file, idx) in listFile" :key="idx">
            <li><img class="preview" :ref="'preview'+parseInt( idx )"/>{{file.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexPage',
  data: function() {
    return {
      listFile: []
    };
  },
  methods: {
    getImagePreviews(){
        /*
          Iterate over all of the files and generate an image preview for each one.
        */
        for( let i = 0; i < this.listFile.length; i++ ){
          /*
            Ensure the file is an image file
          */
          if ( /\.(jpe?g|png|gif)$/i.test( this.listFile[i].name ) ) {
            /*
              Create a new FileReader object
            */
            let reader = new FileReader();
            /*
              Read the data for the file in through the reader. When it has
              been loaded, we listen to the event propagated and set the image
              src to what was loaded from the reader.
            */
            reader.readAsDataURL(this.listFile[i]);
            reader.onloadend = () => {
              this.$refs['preview'+parseInt( i )][0].src = reader.result;
            };
          }
        }
    },
    dragFile(e) {
      this.listFile = e.dataTransfer.files;
      this.getImagePreviews();
    }
  },
  
}
</script>
<style>
#dragfile {
  background-color: #dee9de;
  padding: 10px;
  min-height: 200px;
}
ul {
  list-style: none;
}
li img{
  max-with: 200px;
  max-height: 200px;
  border-radius: 2px;
  margin: 5px;
}
</style>