<template>
  <section class="roulette-page">
    <div class="ring ring-large"></div>
    <div class="ring ring-small"></div>
    <div class="roulette-content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.roulette-page {
  position: relative;
  min-height: calc(100vh - 80px);
  margin: -40px clamp(-24px, -4vw, -56px);
  overflow: hidden;
  padding: 40px clamp(24px, 4vw, 56px);
  background: radial-gradient(130% 100% at 50% -10%, #34432f 0%, var(--ink) 55%, #211c17 100%);
  color: var(--paper);
}
.ring {
  position: absolute;
  left: 50%;
  border: 1px solid rgba(194, 160, 91, 0.15);
  border-radius: 999px;
  pointer-events: none;
  transform: translateX(-50%);
}
.ring-large { top: -260px; width: 760px; height: 760px; }
.ring-small { top: -150px; width: 500px; height: 500px; }
.roulette-content { position: relative; max-width: 1040px; margin: 0 auto; }
@media (max-width: 760px) {
  .roulette-page { margin: -24px; padding: 28px 18px; }
}
</style>
