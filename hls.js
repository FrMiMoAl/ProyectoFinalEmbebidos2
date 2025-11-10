// fuerza hls.js a modo live
function playHLS(url){
  vid.setAttribute('controls','');           // para depurar, luego lo puedes quitar
  vid.muted = true; vid.playsInline = true;

  if (vid.canPlayType('application/vnd.apple.mpegurl')) {
    vid.src = url; vid.play().catch(()=>{});
    return;
  }
  if (window.Hls && Hls.isSupported()) {
    const hls = new Hls({
      lowLatencyMode: true,
      liveSyncDurationCount: 2,
      maxLiveSyncPlaybackRate: 1.5
    });
    hls.loadSource(url);
    hls.attachMedia(vid);
    hls.on(Hls.Events.MANIFEST_PARSED, ()=> vid.play().catch(()=>{}));
    hls.on(Hls.Events.LEVEL_LOADED,   ()=> vid.play().catch(()=>{})); // reintenta
    hls.on(Hls.Events.ERROR, (e, data)=> console.warn('HLS error', data));
    window._hls = hls; // opcional, para ver en consola
  } else {
    alert('HLS no soportado aquí. Prueba Safari/iOS o usa MJPEG.');
  }
}
