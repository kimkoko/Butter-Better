function loadHTML(file, targetElement) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
              var allText = rawFile.responseText;
              targetElement.innerHTML= allText;
          }
      }
  };
  rawFile.send(null);
}

window.addEventListener('load', () => {
    document.querySelectorAll('[data-load-html]').forEach((element) => {
        const filePath = element.dataset.loadHtml
        loadHTML(filePath, element)
    })
})
