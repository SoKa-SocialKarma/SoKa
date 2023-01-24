export const apiURL = () => {
  return window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : 'https://soka-api.onrender.com'
}

export const sokaURL = () => {
  return window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://social-karma.netlify.app'
}
