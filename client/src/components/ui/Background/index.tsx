import './main.css';

function Background() {
  return (
    <div className="video-background">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-content"
      >
        <source src="/fire.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default Background;