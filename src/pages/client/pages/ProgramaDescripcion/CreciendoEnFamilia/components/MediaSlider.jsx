import { useState, useRef, useEffect } from 'react';

import video from "../../../../../../assets/video_test.mp4";

const MOCK_MEDIA = [
  {
    type: 'image',
    ruta: 'https://www.du.edu.om/wp-content/uploads/2020/08/783px-Test-Logo.svg.png',
    alt: 'Primera imagen de prueba'
  },
  {
    type: 'video',
    ruta: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: '/api/placeholder/800/600'
  },
  {
    type: 'audio',
    ruta: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
    thumbnail: '/api/placeholder/800/600'
  }
];

export const MediaSlider = ({ contenido = MOCK_MEDIA }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef(null);
  const mediaRefs = useRef({});

  useEffect(() => {
    if (!isDragging && contenido[currentIndex]) {
      const currentMedia = contenido[currentIndex];
      if (currentMedia.type === 'video' || currentMedia.type === 'audio') {
        const mediaElement = mediaRefs.current[currentIndex];
        if (mediaElement) {
          mediaElement.addEventListener('ended', handleMediaEnd);
          if (currentMedia.type === 'video') {
            // Pause the video if it's the first slide
            if (currentIndex === 0) {
              mediaElement.pause();
            } else {
              mediaElement.play().catch(err => console.log('Error al reproducir:', err));
            }
          } else {
            // Always play the audio
            mediaElement.play().catch(err => console.log('Error al reproducir:', err));
          }
          return () => mediaElement.removeEventListener('ended', handleMediaEnd);
        }
      }
    }
  }, [isDragging, currentIndex, contenido]);

  useEffect(() => {
    Object.entries(mediaRefs.current).forEach(([index, mediaRef]) => {
      if (parseInt(index) !== currentIndex && mediaRef) {
        mediaRef.pause();
      } else if (mediaRef && (contenido[currentIndex]?.type === 'video' || contenido[currentIndex]?.type === 'audio')) {
        mediaRef.pause()
      }
    });
  }, [currentIndex, contenido]);

  const handleMediaEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contenido.length);
  };

  const handleDragStart = (e) => {
    if (contenido.length <= 1) return;
    setIsDragging(true);
    setStartX(e.type === 'mousedown' ? e.pageX : e.touches[0].pageX);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
    const diff = currentX - startX;
    const sliderWidth = sliderRef.current.offsetWidth;
    setTranslateX(Math.max(Math.min(diff, sliderWidth), -sliderWidth));
  };

  const handleDragEnd = () => {
    if (!isDragging || !sliderRef.current) return;
    const sliderWidth = sliderRef.current.offsetWidth;
    const moveRatio = translateX / sliderWidth;
    if (moveRatio < -0.2 && currentIndex < contenido.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (moveRatio > 0.2 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    setIsDragging(false);
    setTranslateX(0);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderMediaItem = (item, index) => {
    switch (item.type) {
      case 'video':
        return (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <video
              ref={el => (mediaRefs.current[index] = el)}
              src={item.ruta}
              poster={item.poster}
              className="w-full h-full"
              style={{ objectFit: 'contain' }}
              controls
              playsInline
              preload="metadata"
            />
          </div>
        );
      case 'audio':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <audio
              ref={el => (mediaRefs.current[index] = el)}
              src={item.ruta}
              className="w-full max-w-2xl"
              controls
              preload="metadata"
            />
          </div>
        );
      default: // image
        return (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <img
              src={item.ruta}
              alt={item.alt || `Slide ${index + 1}`}
              className="w-full h-full"
              style={{ objectFit: 'contain' }}
              draggable="false"
            />
          </div>
        );
    }
  };

  if (!contenido || contenido.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No media available</span>
      </div>
    );
  }

  const translateValue = -currentIndex * 100 + (translateX / (sliderRef.current?.offsetWidth || 1) * 100);

  return (
    <div className="w-full aspect-square max-w-[600px] mx-auto relative overflow-hidden bg-black">
      <div
        ref={sliderRef}
        className="w-full h-full"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out h-full relative"
          style={{
            transform: `translateX(${translateValue}%)`,
          }}
        >
          {contenido.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full relative">
              {renderMediaItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm font-medium">
        {currentIndex + 1}/{contenido.length}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={() => goToSlide(currentIndex - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          aria-label="Previous slide"
        >
          <span className="text-white font-bold">&lt;</span>
        </button>
      )}
      {currentIndex < contenido.length - 1 && (
        <button
          onClick={() => goToSlide(currentIndex + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          aria-label="Next slide"
        >
          <span className="text-white font-bold">&gt;</span>
        </button>
      )}
    </div>
  );
};

export default MediaSlider;