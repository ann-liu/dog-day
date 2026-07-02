import { CanvasObject } from ".";
import { COLORS } from "../colors";

export const objects: CanvasObject[] = [
  {
    // sun
    x: 0.14,
    y: 0.125,
    speed: 0,
    shape: {
      w: 100,
      h: 100,
      ogW: 100,
      ogH: 100,
      paths: [
        {
          path: "M27.273 0v10h-9.091v10H9.09v10H0v40h9.09v10h9.092v10h9.09v10h45.455V90h9.091V80h9.091V70H100V30h-9.09V20h-9.092V10h-9.09V0z",
          fill: COLORS.yellow,
        },
        {
          path: "M40 30H30v10H20v20h10v10h10v10h20V70h10V60h10V40H70V30H60V20H40z",
          fill: COLORS.yellowD,
        },
      ],
    },
  },
  {
    // single flower
    x: 2.2,
    y: 0.77,
    speed: 1,
    shape: {
      w: 60,
      h: 73,
      ogW: 60,
      ogH: 73,
      paths: [
        {
          path: "M30 33v10H20V33h5V20h10v13z",
          fill: COLORS.greenD,
        },
        {
          path: "M20 20v-5H10V5h5V0h30v5h5v10H40v5H20m5-15v5h10V5z",
          fill: COLORS.yellowD,
        },
        {
          path: "M25 10V5h10v5z",
          fill: COLORS.white,
        },
        {
          path: "M40 33h10v10H40zM50 23h10v10H50zM25 73h10V53h5V43H30v10H15v10h10zM15 53V43H0v10z",
          fill: COLORS.greenD,
        },
      ],
    },
  },
  {
    // grass
    x: 1.2,
    y: 0.9,
    speed: 1,
    shape: {
      w: 60,
      h: 20,
      ogW: 30,
      ogH: 10,
      paths: [
        {
          path: "M5 0h20v5h5v5H0V5h5z",
          fill: COLORS.greenD,
        },
      ],
    },
  },
  {
    // double flower
    x: 0.14,
    y: 0.7,
    speed: 1,
    shape: {
      w: 90,
      h: 105,
      ogW: 90,
      ogH: 105,
      paths: [
        {
          path: "M45 85h10v20H45zM25 55h10v10H25zM20 45h10v10H20zM60 45h10v10H60zM50 35h10v10H50zM60 25h10v10H60zM45 85h10V75h5V55H50v20h-5V65H35v20z",
          fill: COLORS.greenD,
        },
        {
          path: "M5 30h10v10H5zM35 30h10v10H35zM15 25h20v20H15z",
          fill: COLORS.yellowD,
        },
        {
          path: "M20 32h10v5H20z",
          fill: COLORS.white,
        },
        {
          path: "M55 20h20v5H55zM45 10h40v10H45zM55 5h20v5H55z",
          fill: COLORS.yellowD,
        },
        {
          path: "M58 12h15v5H58z",
          fill: COLORS.white,
        },
      ],
    },
  },
  {
    // cloud 2
    x: 1.6,
    y: 0.24,
    speed: 0.2,
    shape: {
      w: 270,
      h: 90,
      ogW: 270,
      ogH: 90,
      paths: [
        {
          path: "M10 55H0v10h40v5h90v-5h70v-5h10v-5h30v-5h30V40h-10V30h-10V20h-30v-5h-10V5h-40V0h-40v10h-10v10h-20v5H60v10H30v5H20v10H10z",
          fill: COLORS.whiteA,
        },
        {
          path: "M0 75h10V65H0z",
          fill: COLORS.medGrayA,
        },
        {
          path: "M40 70v-5H10v10h30v5h90v-5h70v-5h10v-5h30v-5h30V50h-30v5h-30v5h-10v5h-70v5z",
          fill: COLORS.lightGrayA,
        },
        {
          path: "M40 75H10v10h30v5h90v-5h70v-5h10v-5h30v-5h20V60h-20v5h-30v5h-10v5h-70v5H40z",
          fill: COLORS.medGrayA,
        },
      ],
    },
  },
  {
    // cloud 1
    x: 0.5,
    y: 0.21,
    speed: 0.2,
    shape: {
      w: 160,
      h: 70,
      ogW: 160,
      ogH: 70,
      paths: [
        {
          path: "M150 40h10v10h-10zM10 55H0v10h10v5h50v-5h10v-5h80V50H70v5H60v5H10z",
          fill: COLORS.medGrayA,
        },
        {
          path: "M0 45h10v5h50v-5h10v-5h80v10H70v5H60v5H10v-5H0z",
          fill: COLORS.lightGrayA,
        },
        {
          path: "M60 45h10v-5h80V20h-10V10h-20V0H60v10H20v5H10v20H0v10h10v5h50z",
          fill: COLORS.whiteA,
        },
      ],
    },
  },
  {
    // sm cloud 1
    x: 0.05,
    y: 0.33,
    speed: 0.2,
    shape: {
      w: 30,
      h: 20,
      ogW: 30,
      ogH: 20,
      paths: [
        {
          path: "M0 15h30v5H0z",
          fill: COLORS.medGrayA,
        },
        {
          path: "M0 15h30V5h-5V0H5v5H0z",
          fill: COLORS.whiteA,
        },
      ],
    },
  },
  {
    // sm cloud 2
    x: 1.4,
    y: 0.24,
    speed: 0.2,
    shape: {
      w: 50,
      h: 25,
      ogW: 60,
      ogH: 25,
      paths: [
        {
          path: "M0 15h20v5H0zm60 10v-5H20v5z",
          fill: COLORS.medGrayA,
        },
        {
          path: "M0 15h20v5h40V10H50V0H10v5H0z",
          fill: COLORS.whiteA,
        },
      ],
    },
  },
  {
    // sm cloud 3
    x: 2.65,
    y: 0.1,
    speed: 0.2,
    shape: {
      w: 70,
      h: 29,
      ogW: 70,
      ogH: 29,
      paths: [
        {
          path: "M63 24.002h7v-5.048L63 19zm0 0H19v5h44zm-63-5v5h19v-5z",
          fill: COLORS.medGrayA,
        },
        {
          path: "M0 10.906v8.095h19v5h44v-5l7-.047v-14h-7V0H31v4.954H10v5.952z",
          fill: COLORS.whiteA,
        },
      ],
    },
  },
  {
    // sm cloud 4
    x: 1.0,
    y: 0.345,
    speed: 0.2,
    shape: {
      w: 56,
      h: 25,
      ogW: 56,
      ogH: 25,
      paths: [
        {
          path: "M56 19.048H0V25h56z",
          fill: COLORS.lightGrayA,
        },
        {
          path: "M19 0v5.952h-9v5.953H0v7.143h56V5.952h-8.5V0z",
          fill: COLORS.whiteA,
        },
      ],
    },
  },
];
