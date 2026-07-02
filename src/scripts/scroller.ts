import { Animator } from "./animator";

export class Scroller {
  scrollX = 0;
  private animator = Animator.getInstance();

  constructor(
    private keys: Set<string>,
    public speed: number,
    private isPaused: () => boolean = () => false,
  ) {
    this.animator.register(() => this.update());
    this.animator.start();
  }

  private update() {
    if (this.isPaused()) return;
    if (this.keys.has("ArrowLeft")) this.scrollX -= this.speed;
    if (this.keys.has("ArrowRight")) this.scrollX += this.speed;
  }

  get paused(): boolean {
    return this.isPaused();
  }
}
