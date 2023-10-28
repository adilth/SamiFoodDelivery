export const foodRowsSides = {
  options: {
    cover: true,
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
        fixedWidth: 160,
      },
      1024: {
        perPage: 3.2,
        gap: "1.5rem",
        fixedWidth: 240,
      },
      746: {
        fixedWidth: 200,
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
