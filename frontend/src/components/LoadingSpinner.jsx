const LoadingSpinner = ({ fullscreen=false, message="Loading...", size="md" }) => {
  const px = {sm:28,md:48,lg:72}[size]||48;
  const spinner = (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"}}>
      <svg width={px} height={px} viewBox="0 0 50 50" style={{animation:"spin .9s linear infinite"}}>
        <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
        <circle cx="25" cy="25" r="20" fill="none" stroke="url(#g)" strokeWidth="4" strokeLinecap="round" strokeDasharray="90 150"/>
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#6366f1"/>
        </linearGradient></defs>
      </svg>
      {message && <p style={{color:"#94a3b8",fontSize:".9rem",margin:0}}>{message}</p>}
    </div>
  );
  if (fullscreen) return (
    <div style={{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
      background:"rgba(10,15,26,.85)",backdropFilter:"blur(6px)",zIndex:9999}}>{spinner}</div>
  );
  return spinner;
};
export default LoadingSpinner;
