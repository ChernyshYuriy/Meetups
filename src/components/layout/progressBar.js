import { useRef } from "react";

function ProgressBar() {
  const progressBarRef = useRef();

  // const progressBar = document.querySelector(".progress-bar");
  window.addEventListener("scroll", fillScroll);
  function fillScroll() {
    const windowH = window.innerHeight;
    const fullH = document.body.clientHeight;
    const scrolled = window.scrollY;
    const presentScrolled = (scrolled / (fullH - windowH)) * 100;
    // console.log(`${presentScrolled.toFixed(2)}%`);
    // console.log(progressBarRef.current);
    // console.log(progressBarRef.colorPicker);
    progressBarRef.current.style.width = `${presentScrolled.toFixed(2)}%`;
    // progressBarRef.style.width = `${presentScrolled.toFixed(2)}%`;
    // return `${presentScrolled.toFixed(2)}%`
  }

  return (
    <div
      ref={progressBarRef}
      id="progress-bar"
      className="progress-bar js-progress-bar"
    ></div>
  );
}

export default ProgressBar;
