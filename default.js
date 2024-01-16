document.addEventListener('DOMContentLoaded', function () {
  let intervalId;
  const FRAMERATE = 2;

  const canvas = document.getElementById('ambilight');
  const context = canvas.getContext('2d');
  const video = document.getElementById('player');

  function repaintAmbilight() {
    // Réduire la taille de l'image à 1/3 de la taille d'origine (ajustez selon vos besoins)
    const scaledWidth = video.videoWidth / 3;
    const scaledHeight = video.videoHeight / 3;
  
    context.drawImage(video, 0, 0, scaledWidth, scaledHeight);
  }
  
  function startAmbilightRepaint() {
    intervalId = window.setInterval(repaintAmbilight, 1000 / FRAMERATE);
  }

  function stopAmbilightRepaint() {
    clearInterval(intervalId);
  }

  video.addEventListener('play', startAmbilightRepaint);
  video.addEventListener('pause', stopAmbilightRepaint);
  video.addEventListener('ended', stopAmbilightRepaint);
  video.addEventListener('seeked', repaintAmbilight);
  video.addEventListener('load', repaintAmbilight);

  repaintAmbilight(); // Load first frame
  video.currentTime = 0;
});
