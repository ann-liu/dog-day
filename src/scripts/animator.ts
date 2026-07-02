export class Animator {
  private static instance: Animator | null = null;
  private animationId: number | null = null;
  private updaters: (() => void)[] = [];

  static getInstance(): Animator {
    if (!Animator.instance) {
      Animator.instance = new Animator();
    }
    return Animator.instance;
  }

  register(update: () => void): void {
    this.updaters.push(() => {
      update();
    });
  }

  start(): void {
    const tick = () => {
      this.updaters.forEach((u) => u());
      this.animationId = requestAnimationFrame(tick);
    };
    this.animationId = requestAnimationFrame(tick);
  }

  destroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
