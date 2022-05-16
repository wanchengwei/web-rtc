<template>
  <div class="main">
    <div class="control">
      <input v-model="telId" class="id-area" type="text" placeholder="请输入对方id">
      <button class="btn-send" @click="reqCall">拨打</button>
      <button class="btn-send" @click="recCall">接听</button>
      <button class="btn-cancel">挂断</button>
    </div>
    <div class="video-container">
      <div class="big-box">
        <video class="video" ref="bigVideo"></video>
      </div>
      <div class="small-box">
        <video class="video" ref="smallVideo"></video>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref, reactive, toRefs, defineComponent, onMounted, getCurrentInstance } from 'vue';
import { Peer } from "peerjs";
import { useRoute } from "vue-router";
let peer = null
// let conn = null
export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup(props, context) {
    const bigVideo = ref(null)
    const smallVideo = ref(null)
    const state = reactive({
      telId: '',
      isCalled: false,
    })
    const internalInstance = getCurrentInstance(); 
    const self = internalInstance.proxy
    onMounted(() => {
      const route = useRoute()
      peer = new Peer(route.query.id);
      recCall()
    })
    const reqCall = () => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        smallVideo.value.srcObject = stream
        smallVideo.value.onloadedmetadata = function(e) {
          this.play();
        };
        const call = peer.call(state.telId, stream);
        call.on("stream", (remoteStream) => {
          console.log('remoteStream',remoteStream);
          bigVideo.value.srcObject = remoteStream
          bigVideo.value.onloadedmetadata = function(e) {
            this.play();
          };
        });
      })
    }
    const recCall = () => {
      peer.on("call", (call) => {
        console.log(call);
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        }).then(stream => {
          smallVideo.value.srcObject = stream
          smallVideo.value.onloadedmetadata = function(e) {
            this.play();
          };
          call.answer(stream)
        })
        call.on("stream", (remoteStream) => {
          bigVideo.value.srcObject = remoteStream
          bigVideo.value.onloadedmetadata = function(e) {
            this.play();
          };
        });
      });
    }
    return {
      bigVideo,
      smallVideo,
      ...toRefs(state),
      reqCall
    }
  }
})
</script>
<style>
  *{
    padding: 0;
    margin: 0;
  }
</style>
<style lang="scss" scoped>
  .main{
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .control{
    display: flex;
    padding: 10px;
    .id-area{
      flex: 1;
    }
    .btn-send{
      margin: 0 10px;
    }
  }
  .video-container{
    flex: 1;
    position: relative;
    width: 100%;
    .big-box{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .video{
        width: 100%;
        height: 100%;
      }
    }
    .small-box{
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 200px;
      .video{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>