<template>
	<div id="app">
		<div class="app__phone">
			<div class="phone-header">
				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/vue_gram_logo_cp.png" />
				<p class="cancel-cta" v-if="step === 2 || step === 3" @click="goToHome">Cancel</p>
				<p class="next-cta" v-if="step === 2" @click="step++">Next</p>
				<p class="next-cta" v-if="step === 3" @click="sharePost">Share</p>
			</div>
			<transition name="fade">
				<div class="feed" v-if="step === 1" v-dragscroll.y="true">
					<instagram-post v-for="post in posts"
													:post="post"
													:key="posts.indexOf(post)">
					</instagram-post>
				</div>
			</transition>
			<div v-if="step === 2">
				<div class="selected-image"
						:class="filterType"
						:style="{ backgroundImage: 'url(' + image + ')' }"></div>
				<div class="filter-container" v-dragscroll.x="true">
					<filter-type v-for="filter in filters"
											:filter="filter"
											:image="image"
											:key="filter.name">
					</filter-type>
				</div>
			</div>
			<div v-if="step === 3">
				<div class="selected-image"
						:class="filterType"
						:style="{ backgroundImage: 'url(' + image + ')' }"></div>
				<div class="caption-container">
					<textarea class="caption-input"
										placeholder="Write a caption..."
										type="text"
										v-model="caption">
					</textarea>
				</div>
			</div>
			<div class="phone-footer">
				<div class="home-cta" @click="goToHome">
					<i class="fas fa-home fa-lg"></i>
				</div>
				<div class="upload-cta">
					<input type="file"
								name="file"
								id="file"
								class="inputfile"
                v-on:change="fileUpload"
								:disabled="step !== 1"/>
					<label for="file">
						<i class="far fa-plus-square fa-lg"></i>
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import InstagramPost from "./components/InstagramPost";
import FilterType from "./components/FilterType";
import EventBus from "../event-bus.js";

import posts from "./data/posts";
import filters from "./data/filters";

export default {
  data() {
    return {
      posts,
      filters,
      image:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/downtown.jpg",
      caption: "",
      filterType: "normal",
      step: 1,
      showDetails: false,
      fileInput: ""
    };
  },
  created() {
    EventBus.$on("selectFilter", evt => {
      this.filterType = evt.filter;
    });
  },
  methods: {
    fileUpload(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.image = files[0];
      this.createImage();
    },
    createImage() {
      const reader = new FileReader();
      reader.onload = e => {
        this.image = e.target.result;
        this.step = 2;
      };
      reader.readAsDataURL(this.image);
    },
    goToHome() {
      this.image =
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/downtown.jpg";
      this.caption = "";
      this.filterType = "normal";
      this.step = 1;
    },
    sharePost() {
      const post = {
        username: "codepen",
        userImage:
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/codepen_logo.png",
        postImage: this.image,
        likes: 0,
        caption: this.caption,
        filter: this.filterType
      };

      this.posts.unshift(post);
      this.goToHome();
    }
  },
  components: {
    "instagram-post": InstagramPost,
    "filter-type": FilterType
  }
};
</script>

<style lang="scss" src="./styles/app.scss">
#app {
  height: 100%;
  // styles in ./styles/app.scss
}
</style>
