const formatVideoLink = (rawLink) => {
  if (rawLink.includes('youtube')) {
    let linkArr = rawLink.split('/');
    let videoCode = linkArr[3].split('=')[1].split('&')[0]
    return 'https://youtube.com/embed/' + videoCode
  } else {
    return rawLink;
  }
}

export default formatVideoLink;
