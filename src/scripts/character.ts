export class Character {
  flipping: boolean = false;
  bouncing: boolean = false;
  direction: -1 | 1 = 1;
  character: HTMLElement;
  svg: SVGSVGElement;
  still: HTMLElement;
  right: HTMLElement;

  front: HTMLElement;
  side: HTMLElement;

  private keys: Set<string>;

  constructor(character: HTMLElement, keys: Set<string>) {
    this.character = character;
    this.svg = character.querySelector("svg") as SVGSVGElement;
    this.still = character.querySelector(".s") as HTMLElement;
    this.right = character.querySelector(".w") as HTMLElement;
    this.front = character.querySelector(".front") as HTMLElement;
    this.side = character.querySelector(".side") as HTMLElement;

    this.keys = keys;
  }

  bounce() {
    if (this.bouncing) {
      return;
    }
    this.bouncing = true;
    this.character.classList.remove("bounce");

    this.still.style.opacity = "1";
    this.right.style.opacity = "0";

    this.front.style.opacity = "1";
    this.side.style.opacity = "0";

    void this.character.offsetWidth;

    this.character.classList.add("bounce");

    this.front.style.opacity = "0";
    this.side.style.opacity = "1";

    this.still.style.opacity = "0";
    this.right.style.opacity = "1";

    this.character.addEventListener(
      "animationend",
      () => {
        this.bouncing = false;
        this.character.classList.remove("bounce");

        this.still.style.opacity = "1";
        this.right.style.opacity = "0";

        this.front.style.opacity = this.keys.size > 0 ? "0" : "1";
        this.side.style.opacity = this.keys.size > 0 ? "1" : "0";
      },
      { once: true },
    );
  }

  move(facing: -1 | 1): boolean {
    if (this.flipping) {
      return true;
    }

    if (facing === this.direction) {
      this.bounce();
      return true;
    }

    const from = this.direction;
    const to = facing;

    this.flipping = true;

    this.svg.style.setProperty("--from", String(from));
    this.svg.style.setProperty("--to", String(to));

    this.svg.classList.remove("flip");
    void this.svg.getBoundingClientRect();
    this.svg.classList.add("flip");

    this.svg.addEventListener(
      "animationend",
      () => {
        this.direction = to;
        this.flipping = false;
        this.svg.style.transform = `scaleX(${to})`;
        this.svg.classList.remove("flip");
      },
      { once: true },
    );
    return false;
  }
}
