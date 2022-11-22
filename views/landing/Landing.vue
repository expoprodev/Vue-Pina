<template>
  <div>
    <div class="landing-layer">
      <div class="container">
        <nav>
          <a class="logo" href=""><img src="~@/assets/img/logo.png" alt="" /></a>
          <ul>
            <li class="cursor-pointer" @click="onClickRegister">Register</li>
            <li class="cursor-pointer" @click="onClickLogin">Login</li>
          </ul>
        </nav>
        <div class="top-landing-content">
          <h3>
            <span class="light-titr"> Creating Technology to</span>
            Unlock the world of Digital Physics
          </h3>
          <p>
            Our mission is to unlock the world of digital physics for creativity
            and imagination A place where the limits are far beyond the human
            mind and imagination. We are architecting and designing a platform
            that makes implementation, validation, and predictions of physics
            equations friendlier, feasible, and scalable.
          </p>
        </div>
      </div>
    </div>
    <div class="diphyx-adv">
      <div class="diphyx-adv-header">
        <h3><span class="light-titr">why</span> Diphyx</h3>
      </div>
      <div class="diphyx-adv-body">
        <div class="landing-card-container">
          <div class="landing-card">
            <div class="card-icon">
              <img src="~@/assets/img/landing-img/first-card-icon.svg" alt="learn" />
            </div>
            <h6 class="titr-card">Learn</h6>
            <p>Quickly learn how to use and deploy the Physics model</p>
          </div>
          <div class="landing-card">
            <div class="card-icon">
              <img src="~@/assets/img/landing-img/second-card-icon.svg" alt="create" />
            </div>
            <h6 class="titr-card">Create</h6>
            <p>
              Easily create, organize, and collaborate on physics formulation
              projects using collaborative notebooks
            </p>
          </div>
          <div class="landing-card">
            <div class="card-icon">
              <img src="~@/assets/img/landing-img/third-card-icon.svg" alt="share" />
            </div>
            <h6 class="titr-card">Share</h6>
            <p>
              Freely share your work with other users to collaborate on, or by
              publishing posts, project files, and generated results to the
              community.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container diphyx-container">
      <div class="middle-content">
        <div class="middle-item first-middle-item">
          <div class="middle-item-img">
            <img src="~@/assets/img/landing-img/computational.png" alt="" />
          </div>
          <div class="middle-item-text">
            <h5>
              Computational Power
              <span class="light-titr">at Your Services</span>
            </h5>
            <p>
              With the advancement of computational devices (CPU, GPU, TPU,
              etc.), we are providing a platform to harness this power
              addressing questions that have never been answered before. This
              requires a world-class team to re-engineer current technologies
              and add layers of innovative abstraction to them.
            </p>
          </div>
        </div>
        <div class="middle-item second-middle-item">
          <div class="middle-item-img">
            <img src="~@/assets/img/landing-img/designinglanding.png" alt="" />
          </div>
          <div class="middle-item-text">
            <h5>Designed <span class="light-reg">for Everyone</span></h5>
            <p>
              The technology is poised to help a wide range of communities from
              researchers, engineers, educators to science enthusiasts and
              provide all the necessary tools you need to start.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="landing-register">
      <div class="register-content">
        <h5>Register <span class="light-titr">for updates</span></h5>
        <h6>Subscribe here to receive latest news</h6>
        <div class="input-group">
          <input type="text" class="form-control form-input" placeholder="example@info.com" />
        </div>
        <button class="btn btn-style">Subscribe</button>
      </div>
    </div>
    <div class="diphyx-contact">
      <div class="contact-info">
        <div class="contact-info-text">
          <h3>Contact us</h3>
          <p>
            Feel free to conact us any time. we will get back to you as soon as
            we can.
          </p>
          <div class="contact-item">
            <div class="contact-icon"><i class="far fa-envelope"></i></div>

            Example@info.com
          </div>
          <div class="contact-item">
            <div class="contact-icon"><i class="far fa-phone"></i></div>
            +00 000 000 0000
          </div>
        </div>
        <div class="contact-card">
          <div class="input-group">
            <input type="text" class="form-control form-input" placeholder="Name" />
          </div>
          <div class="input-group">
            <input type="text" class="form-control form-input" placeholder="Email" />
          </div>
          <div class="input-group">
            <textarea name="" placeholder="Messege"></textarea>
          </div>
          <button class="btn btn-style">Send</button>
        </div>
      </div>
    </div>
    <footer>
      <h6>2022 © Diphyx.com | All right researved</h6>
    </footer>
  </div>
</template>
<script>
import router from "@/router/index.js";

export default {
  setup() {
    const onClickLogin = () => {
      router.push({ name: 'Login' })
    }

    const onClickRegister = () => {
      router.push({ name: 'RegisterInformation' })
    }

    return { onClickLogin, onClickRegister }
  },
}
</script>
<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}
</style>