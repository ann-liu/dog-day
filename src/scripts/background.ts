import { Animator } from "./animator";

type BackgroundElement = {
  el: HTMLElement;
  svge: SVGSVGElement;
  x: number;
  y: number;
  speed: number;
  originalWidth: number;
  originalHeight: number;
  autoSpeed: number;
};

export type { BackgroundElement };

export class Background {
  private container: HTMLElement;
  private elements: BackgroundElement[] = [];
  private scrollX = 0;
  private width: number;

  private keys: Set<string>;
  private scrollSpeed: number;
  private cycleWidth: number;
  private edge: number;
  private animator = Animator.getInstance();

  constructor(
    svgElements: HTMLElement[],
    k: Set<string>,
    speed: number,
    cycleWidth: number,
    container: HTMLElement,
  ) {
    this.width = container.offsetWidth;

    this.keys = k;
    this.scrollSpeed = speed;
    this.cycleWidth = cycleWidth;
    this.edge = container.offsetWidth;
    this.container = container;
    this.elements = svgElements.map((el) => {
      const svge = el.querySelector("svg") as SVGSVGElement;
      return {
        el,
        svge,
        x: parseFloat(el.dataset.x ?? "0") * this.container.offsetWidth,
        y: parseFloat(el.dataset.y ?? "0") * this.container.offsetHeight,
        speed: parseFloat(el.dataset.speed ?? "1"),
        originalWidth: svge.width.baseVal.value,
        originalHeight: svge.height.baseVal.value,
        autoSpeed: parseFloat(el.dataset.autoSpeed ?? "0"),
      };
    });
    this.resize = this.resize.bind(this);
    // this.animate();

    this.animator.register(() => {
      this.update();
    });
    this.animator.start();
  }

  private recycleElement(
    element: BackgroundElement,
    scrollX: number,
    worldWidth: number,
  ) {
    const screenX = element.x - scrollX * element.speed;
    // wrap left → right
    if (screenX < -this.edge) {
      element.x += worldWidth;
    }
    // wrap right → left
    else if (screenX > this.width + this.edge) {
      element.x -= worldWidth;
    }
  }

  private update() {
    if (this.keys.has("ArrowLeft")) {
      this.scrollX += -this.scrollSpeed;
    }
    if (this.keys.has("ArrowRight")) {
      this.scrollX += this.scrollSpeed;
    }
    this.elements.forEach((el) => {
      el.x += el.autoSpeed;
      this.recycleElement(el, this.scrollX, this.cycleWidth);
      const screenX = el.x - this.scrollX * el.speed;
      el.el.style.transform = `translate(${screenX}px, ${el.y}px)`;
    });
  }

  resize() {
    if (this.container.clientWidth === this.width) return;

    this.elements.forEach((e) => {
      e.x = parseFloat(e.el.dataset.x ?? "0") * this.container.clientWidth;
      e.y = parseFloat(e.el.dataset.y ?? "0") * this.container.clientHeight;
    });
  }
}
