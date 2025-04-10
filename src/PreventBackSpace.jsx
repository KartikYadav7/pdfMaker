import { useEffect } from 'react';
import React from 'react';

const PreventBackspace = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isEditable = (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      );

      if (e.key === 'Backspace' && !isEditable) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Backspace blocked");
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false, capture: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);

  return null;
};

class ErrorBoundary extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // This lifecycle method is called when an error is thrown in a child component
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // You can also log error info here if desired
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    // Render a fallback UI if an error has occurred
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, textAlign: "center", color: "red" }}>
          Something went wrong while generating the PDF.If the link is Generated , you can still download it. 
        </div>
        
      );
    }
    // Otherwise, render the children components normally
    return this.props.children;
    
  }
}

export { ErrorBoundary};

export default PreventBackspace;



