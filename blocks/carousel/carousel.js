export default function decorate(block) {
  [...block.children].forEach((row, rowIndex) => {
    [...row.children].forEach((col) => {
      const imgs = col.querySelectorAll('img');

      if (imgs.length > 0) {
        col.classList.add('carousel-img');
        let currentIndex = 0;

        const nextBtn = document.createElement('div');
        nextBtn.classList.add('carousel-arrow', 'right');
        nextBtn.textContent = '>>';

        const prevBtn = document.createElement('div');
        prevBtn.classList.add('carousel-arrow', 'left');
        prevBtn.textContent = '<<';

        col.appendChild(nextBtn);
        col.appendChild(prevBtn);

        function showImage(index) {
          imgs.forEach((img, i) => {
            img.style.opacity = i === index ? '1' : '0';
          });
        }

        function nextImage() {
          currentIndex = (currentIndex + 1) % imgs.length;
          showImage(currentIndex);
        }

        function prevImage() {
          currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
          showImage(currentIndex);
        }

        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);

        setInterval(nextImage, 2000);
        showImage(currentIndex);
      } else {
        col.classList.add('carousel-text');
      }
    });

    if (rowIndex === 0) {
      row.classList.add('carousel-row-first');
      row.textContent = '>>';
    } else if (rowIndex === block.children.length - 1) {
      row.classList.add('carousel-row-last');
      row.textContent = '<<';
    } else {
      row.classList.add('carousel-row');
    }
  });
}
