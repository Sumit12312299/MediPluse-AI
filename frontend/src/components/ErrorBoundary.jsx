import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("[ErrorBoundary]", error, info); }
  render() {
    if (this.state.hasError) return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        minHeight:"100vh",background:"#0a0f1a",color:"#e2e8f0",fontFamily:"Inter,sans-serif",textAlign:"center",padding:"2rem"}}>
        <div style={{fontSize:"4rem"}}>??</div>
        <h1 style={{color:"#f87171",fontSize:"1.75rem",margin:"1rem 0 .5rem"}}>Something went wrong</h1>
        <p style={{color:"#94a3b8",maxWidth:"480px",marginBottom:"1.5rem"}}>
          MediPulse AI encountered an unexpected error. Please refresh the page.
        </p>
        <button onClick={() => this.setState({hasError:false,error:null})}
          style={{background:"linear-gradient(135deg,#3b82f6,#6366f1)",color:"#fff",border:"none",
            borderRadius:"8px",padding:".75rem 2rem",fontSize:"1rem",cursor:"pointer",fontWeight:600}}>
          Try Again
        </button>
      </div>
    );
    return this.props.children;
  }
}
export default ErrorBoundary;
