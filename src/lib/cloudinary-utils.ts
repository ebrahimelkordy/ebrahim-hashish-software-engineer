/**
 * Transforms a Cloudinary URL to force a download by adding the 'fl_attachment' flag.
 * If the URL is not from Cloudinary, it returns the original URL.
 */
export function getDownloadUrl(url: string) {
  if (!url) return "";
  
  // Only apply to Cloudinary URLs
  if (url.includes("res.cloudinary.com")) {
    // Insert 'fl_attachment' after 'upload/' or similar resource type segment
    // Pattern: /upload/v12345/... -> /upload/fl_attachment/v12345/...
    return url.replace("/upload/", "/upload/fl_attachment/");
  }

  return url;
}
