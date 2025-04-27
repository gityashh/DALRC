/**
 * Format file size in human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 B"
  
    const units = ["B", "KB", "MB", "GB", "TB"]
    let size = bytes
    let unitIndex = 0
  
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
  
    return `${size.toFixed(1)} ${units[unitIndex]}`
  }
  
  /**
   * Get file icon based on file type
   * @param {string} fileType - MIME type of the file
   * @returns {string} Icon name
   */
  export const getFileIcon = (fileType) => {
    if (!fileType) return "file"
  
    if (fileType.startsWith("image/")) return "image"
    if (fileType.startsWith("video/")) return "video"
    if (fileType.startsWith("audio/")) return "music"
    if (fileType.includes("pdf")) return "file-text"
    if (fileType.includes("word") || fileType.includes("document")) return "file-text"
    if (fileType.includes("excel") || fileType.includes("spreadsheet")) return "file-spreadsheet"
    if (fileType.includes("presentation") || fileType.includes("powerpoint")) return "file-presentation"
    if (fileType.includes("zip") || fileType.includes("compressed")) return "archive"
  
    return "file"
  }
  
  /**
   * Check if file is an image
   * @param {string} fileType - MIME type of the file
   * @returns {boolean} True if file is an image
   */
  export const isImage = (fileType) => {
    return fileType && fileType.startsWith("image/")
  }
  
  /**
   * Get file extension from file name
   * @param {string} fileName - Name of the file
   * @returns {string} File extension
   */
  export const getFileExtension = (fileName) => {
    if (!fileName) return ""
    return fileName.split(".").pop().toLowerCase()
  }
  