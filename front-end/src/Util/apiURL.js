export const apiURL = () => {
  return window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : 'https://social-karma.herokuapp.com'
}

export const sokaURL = () => {
  return window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://social-karma.netlify.app'
}
