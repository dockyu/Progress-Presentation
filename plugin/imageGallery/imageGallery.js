// imageGallery.js
window.onload = function() {
  var imageContainers = document.querySelectorAll('.image-container');

  imageContainers.forEach(function(container) {
    var imageUrls = JSON.parse(container.getAttribute('data-image-urls'));
    var imageShownIndex = 0;
    var canvas = container.querySelector('.image_canvas');
    var canvasContext = canvas.getContext('2d');
    var previousButton = container.querySelector('.previous_button');
    var nextButton = container.querySelector('.next_button');

    // 創建並隱藏每個圖片的 <img> 元素，同時設置 data-src 屬性
    var imageElements = [];
    imageUrls.forEach(function(url, index) {
      var img = new Image();
      img.setAttribute('data-src', url); // 設置 data-src 屬性
      img.style.display = 'none'; // 隱藏圖片
      container.appendChild(img);
      imageElements.push(img);
    });

    function goToPreviousImage() {
      imageShownIndex = (imageShownIndex == 0) ? imageUrls.length - 1 : imageShownIndex - 1;
      updateImage();
    }

    function goToNextImage() {
      imageShownIndex = (imageShownIndex == imageUrls.length - 1) ? 0 : imageShownIndex + 1;
      updateImage();
    }

    function updateImage() {
      var img = new Image();
      img.src = imageUrls[imageShownIndex];
    
      img.onload = function() {
        // 確定圖像的實際寬度和高度
        var imageWidth = img.width;
        var imageHeight = img.height;
    
        // 計算縮放比例，確保圖像適應 canvas 大小並保持縱橫比
        var scaleX = 1;
        var scaleY = 1;
        if (imageWidth > canvas.width || imageHeight > canvas.height) {
          scaleX = canvas.width / imageWidth;
          scaleY = canvas.height / imageHeight;
          var minScale = Math.min(scaleX, scaleY);
          scaleX = minScale;
          scaleY = minScale;
        }
    
        // 計算圖像在 canvas 中的位置，使其居中
        var offsetX = (canvas.width - imageWidth * scaleX) / 2;
        var offsetY = (canvas.height - imageHeight * scaleY) / 2;
    
        // 清空 canvas
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    
        // 繪製圖像，按計算的縮放比例和位置
        canvasContext.drawImage(img, offsetX, offsetY, imageWidth * scaleX, imageHeight * scaleY);
      };
    }
    

    // 綁定按鈕的點擊事件
    previousButton.addEventListener('click', goToPreviousImage);
    nextButton.addEventListener('click', goToNextImage);

    // 初始化顯示第一張圖片
    updateImage();
  });
};

// document.addEventListener('DOMContentLoaded', function() {
//     var imageContainers = document.querySelectorAll('.image-container');
  
//     imageContainers.forEach(function(container) {
//       var imageUrls = JSON.parse(container.getAttribute('data-image-urls'));
//       var imageShownIndex = 0;
//       var canvas = container.querySelector('.image_canvas');
//       var canvasContext = canvas.getContext('2d');
//       var previousButton = container.querySelector('.previous_button');
//       var nextButton = container.querySelector('.next_button');

//       // 創建並隱藏每個圖片的 <img> 元素，同時設置 data-src 屬性
//       var imageElements = [];
//       imageUrls.forEach(function(url, index) {
//         var img = new Image();
//         img.setAttribute('data-src', url); // 設置 data-src 屬性
//         img.style.display = 'none'; // 隱藏圖片
//         container.appendChild(img);
//         imageElements.push(img);
//       });
  
//       function goToPreviousImage() {
//         imageShownIndex = (imageShownIndex == 0) ? imageUrls.length - 1 : imageShownIndex - 1;
//         updateImage();
//       }
  
//       function goToNextImage() {
//         imageShownIndex = (imageShownIndex == imageUrls.length - 1) ? 0 : imageShownIndex + 1;
//         updateImage();
//       }
  
//       function updateImage() {
//         var img = new Image();
//         img.src = imageUrls[imageShownIndex];
      
//         img.onload = function() {
//           // 確定圖像的實際寬度和高度
//           var imageWidth = img.width;
//           var imageHeight = img.height;
      
//           // 計算縮放比例，確保圖像適應 canvas 大小並保持縱橫比
//           var scaleX = 1;
//           var scaleY = 1;
//           if (imageWidth > canvas.width || imageHeight > canvas.height) {
//             scaleX = canvas.width / imageWidth;
//             scaleY = canvas.height / imageHeight;
//             var minScale = Math.min(scaleX, scaleY);
//             scaleX = minScale;
//             scaleY = minScale;
//           }
      
//           // 計算圖像在 canvas 中的位置，使其居中
//           var offsetX = (canvas.width - imageWidth * scaleX) / 2;
//           var offsetY = (canvas.height - imageHeight * scaleY) / 2;
      
//           // 清空 canvas
//           canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      
//           // 繪製圖像，按計算的縮放比例和位置
//           canvasContext.drawImage(img, offsetX, offsetY, imageWidth * scaleX, imageHeight * scaleY);
//         };
//       }
      
  
//       // 綁定按鈕的點擊事件
//       previousButton.addEventListener('click', goToPreviousImage);
//       nextButton.addEventListener('click', goToNextImage);
  
//       // 初始化顯示第一張圖片
//       updateImage();
//     });
//   });