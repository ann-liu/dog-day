export const initScreenshots = (btn: HTMLButtonElement) => {
  const dialog = document.getElementById(
    "screenshots-dialog",
  ) as HTMLDialogElement;

  btn.addEventListener("click", () => {
    dialog.showModal();
  });

  dialog.addEventListener("click", (e) => {
    const r = dialog.getBoundingClientRect();
    const isBackdrop =
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom;

    if (isBackdrop) {
      dialog.close();
    }
  });
};
