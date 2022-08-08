<script lang="ts">
export default {
  name: "Book"
}
</script>

<template>
  <div class="scene">
    <div class="book-wrap">
      <div class="left-side">
        <div class="book-cover-left"></div>
        <div class="layer1">
          <div class="page-left"></div>
        </div>
        <div class="layer2">
          <div class="page-left"></div>
        </div>
        <div class="layer3">
          <div class="page-left"></div>
        </div>
        <div class="layer4">
          <div class="page-left"></div>
        </div>
        <div class="layer-text">
          <div class="page-visible left">
            <div class="corner"></div>
            <div class="corner2"></div>
            <div class="corner-fold"></div>
            <div class="page-text">
              <slot name="page-left"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="center"></div>
      <div class="right-side">
        <div class="book-cover-right"></div>
        <div class="layer1">
          <div class="page-right"></div>
        </div>
        <div class="layer2 right">
          <div class="page-right"></div>
        </div>
        <div class="layer3 right">
          <div class="page-right"></div>
        </div>
        <div class="layer4 right">
          <div class="page-right"></div>
        </div>
        <div class="layer-text right">
          <div class="page-visible right">
            <div class="page-text">
              <slot name="page-right"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './src/assets/theme';

// from https://codepen.io/sabanna/pen/ZxQXQv
.scene {
  --scene-height: 70vw;
  --max-scene-height: 2000px;
  --book-width: calc(var(--scene-height)/0.947);
  --max-book-width: calc(var(--max-scene-height)/0.947);
  --corner-size: calc(var(--scene-height)/10.8);
  --max-corner-size: calc(var(--max-scene-height)/10.8);
  --corner-fold-size: calc(var(--scene-height)/15.429);
  --max-corner-fold-size: calc(var(--max-scene-height)/15.429);

  display: flex;
  width: 100%;
  height: var(--scene-height);
  max-height: var(--max-scene-height);
  justify-content: center;
  align-items: stretch;
  perspective: 4000px;
  perspective-origin: 50% 0;
  @media (max-width: 991px) {
    --scene-height: 80vw;
  }
  @media (max-width: 479px) {
    --scene-height: 90vw;
  }
}

.book-wrap {
  position: relative;
  display: flex;
  width: var(--book-width);
  max-height: var(--max-book-width);
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding-right: 1%;
  padding-left: 1%;
  justify-content: center;
  perspective: 4000px;
  perspective-origin: 50% 50%;
  transform: translate3d(0px, 5%, -264px) rotateX(27deg) rotateY(0deg) rotateZ(-10deg);
  transition: -webkit-transform 2000ms cubic-bezier(.165, .84, .44, 1);
  transition: transform 2000ms cubic-bezier(.165, .84, .44, 1), -webkit-transform 2000ms cubic-bezier(.165, .84, .44, 1);
  transform-style: preserve-3d;
  color: theme.$color-dark;
  font-size: 1.5rem;
  &:hover {
    transform: translate3d(0px, 5%, -264px) rotateX(13deg) rotateY(0deg) rotateZ(-3deg);
  }
}

.book-cover-right, .book-cover-left {
  flex: 1;
  background-color: #2e1800;
}
.book-cover-left {
  border-top-left-radius: 4%;
  border-bottom-left-radius: 4%;
  box-shadow: inset 4px -4px 4px 1px #635648, inset 7px -7px 4px 0 #221b14;
  perspective: 4000px;
  transform: translate3d(0px, 0px, -1px);
  transform-style: preserve-3d;
}

.book-cover-right {
  border-top-right-radius: 4%;
  border-bottom-right-radius: 4%;
  box-shadow: inset -4px -4px 4px 1px #635648, inset -7px -7px 4px 0 #221b14;
}

.layer1 {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  margin: 20px 10px 10px;
  justify-content: flex-start;
  transform: translate3d(0px, 0px, 5px);
  transform-style: preserve-3d;
}

.page-left {
  flex: 1;
  border-top-left-radius: 1%;
  border-bottom-left-radius: 1%;
  background-color: #fff;
  box-shadow: inset 0 0 26px 2px #d8cccc, -1px 1px 13px 0 rgba(34, 27, 20, .81);
}

.layer-text {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  width: 97%;
  margin: 20px 10px 18px;
  justify-content: flex-start;
  backface-visibility: hidden;
  perspective: 4000px;
  perspective-origin: 50% 50%;
  transform: translate3d(0px, 0px, 32px);
  transform-style: preserve-3d;
  @media (max-width: 767px) {
    width: 94%;
    transform: translate3d(0px, 0px, 20px);
  }
  &.right {
    transform: translate3d(-37px, 0px, 32px);
    transform-style: preserve-3d;
    @media (max-width: 767px) {
      justify-content: flex-end;
      transform: translate3d(-34px, 0px, 24px);
    }
  }
}

.left-side {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 49%;
  backface-visibility: hidden;
  perspective: 4000px;
  perspective-origin: 0 50%;
  transform: rotateX(0deg) rotateY(20deg) rotateZ(0deg);
  transform-origin: 100% 50%;
  transform-style: preserve-3d;
}

.right-side {
  position: relative;
  display: flex;
  width: 49%;
  perspective: 4000px;
  perspective-origin: 0 50%;
  transform: rotateX(0deg) rotateY(-1deg) rotateZ(0deg);
  transform-style: preserve-3d;
}

.center {
  width: 3%;
  background-image: radial-gradient(circle farthest-corner at 56% -8%, #fff 8%, transparent 0), radial-gradient(circle farthest-corner at 50% 108%, #fff 8%, transparent 0), linear-gradient(90deg, #635648, #2e1800 21%, #635648 30%, #2e1800 48%, #635648 68%, #2e1800 79%, #635648);
}


.page-visible {
  position: relative;
  flex: 1;
  background-color: #fff;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  &.right {
    border-top-right-radius: 1%;
    border-bottom-right-radius: 1%;
    box-shadow: inset 0 0 7px 4px hsla(0, 13%, 82%, .43), 1px 1px 13px 0 rgba(34, 27, 20, .49);
    transform: rotateX(0deg) rotateY(-3deg) rotateZ(0deg);
    transform-origin: 0 50%;
    transition: transform 850ms ease;
    overflow-y: auto;
    &:hover {
      transform: rotateX(0deg) rotateY(-17deg) rotateZ(0deg);
    }
    @media (max-width: 991px) {
      padding-left: 5%;
    }
    @media (max-width: 767px) {
      width: 92%;
      flex: 0 auto;
    }
  }
  &.left {
    border-top-left-radius: 18%;
    border-bottom-left-radius: 1%;
    box-shadow: inset 0 0 7px 4px hsla(0, 13%, 82%, .43), -1px 1px 13px 0 rgba(34, 27, 20, .49);
    transform: rotateX(0deg) rotateY(17deg) rotateZ(0deg);
    transform-origin: 100% 50%;
    transition: transform 650ms cubic-bezier(.165, .84, .44, 1);
    overflow: visible;
    &:hover {
      transform: rotateX(0deg) rotateY(7deg) rotateZ(0deg);
    }

    @media (max-width: 991px) {
      border-top-left-radius: 20%;
    }
    @media (max-width: 767px) {
      border-top-left-radius: 23%;
      transform: rotateX(0deg) rotateY(17deg) rotateZ(0deg) translate(9px, 0px);
    }
  }
}

.corner-fold {
  position: absolute;
  left: 0;
  top: 0;
  width: var(--corner-fold-size);
  height: var(--corner-fold-size);
  max-width: var(--max-corner-fold-size);
  max-height: var(--max-corner-fold-size);
  border-right: 1px solid hsla(0, 13%, 82%, .55);
  border-bottom: 1px solid hsla(0, 13%, 82%, .55);
  background-image: -webkit-linear-gradient(315deg, transparent 47%, #f0f0f0 48%, #fff 55%, #f6f6f6);
  background-image: linear-gradient(135deg, transparent 47%, #f0f0f0 48%, #fff 55%, #f6f6f6);
  box-shadow: 6px 6px 9px -4px hsla(0, 13%, 82%, .53);
}

.corner {
  position: absolute;
  left: 0;
  top: calc(var(--corner-size)/1.54);
  width: var(--corner-size);
  height: var(--corner-size);
  max-width: var(--max-corner-size);
  max-height: var(--max-corner-size);
  background-image: linear-gradient(135deg, #fff 30%, transparent);
  box-shadow: inset 13px 0 17px -12px hsla(0, 13%, 82%, .43);
}

.corner2 {
  position: absolute;
  left: calc(var(--corner-size)/1.54);
  top: 0;
  width: var(--corner-size);
  height: var(--corner-size);
  box-shadow: inset 0 13px 17px -12px hsla(0, 13%, 82%, .43);
  background: #ffffff;
}

.page-text {
  position: relative;
  display: block;
  width: 80%;
  margin: 1.5rem auto;
  font-family: theme.$font-family-hand;
  word-wrap: break-word;
  @media (max-width: 767px) {
    margin-top: calc(var(--corner-size)/2);
  }
  a {
    color: theme.$color-secondary;
  }
}

.layer2 {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  margin: 20px 10px 13px;
  justify-content: flex-start;
  transform: translate3d(2px, 0px, 10px);
  transform-style: preserve-3d;
  @media (max-width: 767px) {
    transform: translate3d(2px, 0px, 6px);
  }
  &.right {
    transform: translate3d(-5px, 0px, 10px);
    transform-style: preserve-3d;
    @media (max-width: 767px) {
      transform: translate3d(-5px, 0px, 6px);
    }
  }
}

.layer3 {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  margin: 20px 10px 13px;
  justify-content: flex-start;
  transform: translate3d(4px, 0px, 20px);
  transform-style: preserve-3d;
  @media (max-width: 767px) {
    transform: translate3d(4px, 0px, 12px);
  }
  &.right {
    transform: translate3d(-10px, 0px, 20px);
    transform-style: preserve-3d;
    @media (max-width: 767px) {
      transform: translate3d(-10px, 0px, 12px);
    }
  }
}

.layer4 {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  margin: 20px 10px 15px;
  justify-content: flex-start;
  transform: translate3d(6px, 0px, 30px);
  transform-style: preserve-3d;
  @media (max-width: 767px) {
    transform: translate3d(6px, 0px, 18px);
  }
  &.right {
    transform: translate3d(-15px, 0px, 30px);
    transform-style: preserve-3d;
    @media (max-width: 767px) {
      transform: translate3d(-15px, 0px, 18px);
    }
  }
}

.page-right {
  flex: 1;
  border-top-right-radius: 1%;
  border-bottom-right-radius: 1%;
  background-color: #fff;
  box-shadow: inset 0 0 26px 2px #d8cccc, 1px 1px 13px 0 rgba(34, 27, 20, .81);
}

</style>