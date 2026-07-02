import { Animator } from "../animator";
import { Scroller } from "../scroller";

interface PathData {
  path: string;
  fill?: string;
  stroke?: string;
  strokeW?: number;
}

interface PathShape {
  paths: PathData[];
  w: number;
  h: number;
  ogW: number;
  ogH: number;
  fill?: string;
  stroke?: string;
  strokeW?: number;
}

interface CanvasObject {
  x: number;
  y: number;
  speed: number;
  shape: PathShape;
}

export type { CanvasObject, PathData, PathShape };

export class ObjectsCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private objects: CanvasObject[];
  private scroller: Scroller;
  private dpr: number;
  private displayWidth: number;
  private displayHeight: number;
  private cycleWidth: number;
  private shapeCache: Map<PathShape, OffscreenCanvas> = new Map();
  private animator = Animator.getInstance();

  constructor(
    canvasEl: HTMLCanvasElement,
    objects: CanvasObject[],
    scroller: Scroller,
    cycleWidth: number,
  ) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext("2d")!;
    this.objects = objects;
    this.cycleWidth = cycleWidth;
    this.scroller = scroller;
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.style.display = "block";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.displayWidth = (this.canvas.parentElement as HTMLElement).offsetWidth;
    this.displayHeight = (
      this.canvas.parentElement as HTMLElement
    ).offsetHeight;
    this.setupCanvas();
    this.renderOffscreen();
    this.render();
    // this.startAnimation();

    this.animator.register(() => {
      this.render();
    });
  }

  private renderOffscreen(): void {
    const uniqueShapes = new Set(this.objects.map((obj) => obj.shape));
    for (const shape of uniqueShapes) {
      // Initialize original dimensions on first render if not set
      if (!shape.ogW) {
        shape.ogW = shape.w;
        shape.ogH = shape.h;
      }

      const offscreen = new OffscreenCanvas(
        shape.w * this.dpr,
        shape.h * this.dpr,
      );
      const offCtx = offscreen.getContext("2d")!;
      offCtx.scale(this.dpr, this.dpr);

      // Scale path to fit current dimensions
      const scaleX = shape.w / (shape.ogW || shape.w);
      const scaleY = shape.h / (shape.ogH || shape.h);
      offCtx.scale(scaleX, scaleY);

      this.drawShape(offCtx, shape);
      this.shapeCache.set(shape, offscreen);
    }
  }

  private setupCanvas(): void {
    const pixelWidth = this.displayWidth * this.dpr;
    const pixelHeight = this.displayHeight * this.dpr;
    this.canvas.width = pixelWidth;
    this.canvas.height = pixelHeight;
    this.canvas.style.width = `${this.displayWidth}px`;
    this.canvas.style.height = `${this.displayHeight}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  private render(): void {
    this.ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);

    for (const obj of this.objects) {
      const baseX = obj.x * this.displayWidth;
      const visualX = baseX - this.scroller.scrollX * obj.speed;
      const objY = obj.y * this.displayHeight;

      // calc cycle indices that could be visible in viewport
      const minCycleIndex = Math.floor(-visualX / this.cycleWidth) - 1;
      const maxCycleIndex =
        Math.ceil((this.displayWidth - visualX) / this.cycleWidth) + 1;

      for (let i = minCycleIndex; i <= maxCycleIndex; i++) {
        const x = visualX + i * this.cycleWidth;
        if (x + obj.shape.w > 0 && x < this.displayWidth) {
          this.renderOffscreenShape(
            obj.shape,
            x,
            objY,
            obj.shape.w,
            obj.shape.h,
          );
        }
      }
    }
  }

  private renderOffscreenShape(
    shape: PathShape,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    const offscreen = this.shapeCache.get(shape);
    if (!offscreen) return;
    this.ctx.drawImage(offscreen as any, x, y, width, height);
  }

  private drawShape(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    shape: PathShape,
  ): void {
    const defaultFill = shape.fill || "black";
    const defaultStroke = shape.stroke;
    const defaultStrokeWidth = shape.strokeW || 1;

    for (const pathData of shape.paths) {
      const fill = pathData.fill ?? defaultFill;
      const stroke = pathData.stroke ?? defaultStroke;
      const strokeWidth = pathData.strokeW ?? defaultStrokeWidth;

      ctx.fillStyle = fill;
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeWidth;
      }

      const path = new Path2D(pathData.path);
      ctx.fill(path);
      if (stroke) {
        ctx.stroke(path);
      }
    }
  }

  resize(): void {
    const prevDisplayWidth = this.displayWidth;
    const prevDisplayHeight = this.displayHeight;

    this.displayWidth = (this.canvas.parentElement as HTMLElement).offsetWidth;
    this.displayHeight = (
      this.canvas.parentElement as HTMLElement
    ).offsetHeight;

    const scaleX = this.displayWidth / prevDisplayWidth;
    const scaleY = this.displayHeight / prevDisplayHeight;
    const scale = Math.min(scaleX, scaleY);

    for (const obj of this.objects) {
      obj.shape.w = Math.min(obj.shape.ogW, obj.shape.w * scale);
      obj.shape.h = Math.min(obj.shape.ogH, obj.shape.h * scale);
    }

    this.cycleWidth *= scale;

    this.setupCanvas();
    this.shapeCache.clear();
    this.renderOffscreen();
    this.render();
  }
}
