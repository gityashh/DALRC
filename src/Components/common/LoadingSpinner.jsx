const LoadingSpinner = ({ size = "medium", className = "" }) => {
    const sizeClasses = {
      small: "h-4 w-4 border-2",
      medium: "h-8 w-8 border-2",
      large: "h-12 w-12 border-4",
    }
  
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <div
          className={`animate-spin rounded-full border-t-transparent border-blue-600 ${sizeClasses[size]}`}
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  
  export default LoadingSpinner
  