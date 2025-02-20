// script.js

document.addEventListener('DOMContentLoaded', function () {
  const paths = document.querySelectorAll('.cls-1');
  const body = document.body;

  paths.forEach(path => {
    path.addEventListener('click', function () {
      // Change the fill color of the clicked path
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      this.style.fill = randomColor;

      // Change the background color of the website
      const randomBgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      body.style.backgroundColor = randomBgColor;
    });
  });
});