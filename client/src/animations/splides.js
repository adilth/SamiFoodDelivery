export const foodRowsSides = {
  options: {
    // fixedHeight: 70,
    cover: true,
    // updateOnMove: true,
    perPage: 4.4,
    pagination: false,
    focus: "center",
    rewind: false,
    arrows: false,
    drag: true,
    gap: "1.2rem",
    breakpoints: {
      402: {
        perPage: 2,
        gap: "1.2rem",
      },
      1024: {
        perPage: 3.2,
        gap: "1.5rem",
      },
      746: {
        fixedWidth: 160,
        perPage: 2.2,
        gap: "1.2rem",
        focus: "start",
      },
    },
  },
};
export const splideMenu = {
  options: {
    arrows: false,
    pagination: false,
    drag: true,
    perPage: 8,
    focus: "center",
    breakpoints: {
      1080: {
        perPage: 6.5,
      },
    },
    gap: "2rem",
  },
};
