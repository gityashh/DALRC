const ProgressBar = ({ progress, className = "", height = "h-2.5" }) => {
    return (
      <div className={`w-full bg-gray-200 rounded-full ${height} ${className}`}>
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )
  }
  
  export default ProgressBar
  