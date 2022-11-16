const formatVideoLink = (rawLink) => {
  if (rawLink.includes('youtube')) {
    let linkArr = rawLink.split('/');
    let videoCode = linkArr[3].split('=')[1].split('&')[0]
    return 'https://youtube.com/embed/' + videoCode
  } else {
    return rawLink;
  }
}

let formattedLink = formatVideoLink("https://www.youtube.com/watch?v=IvYgRXYXW20&ab_channel=Jorbs")
// console.log(formattedLink)
let formattedLink2 = formatVideoLink("https://www.youtube.com/watch?v=5n8bn46XQ8U&ab_channel=DivekickInfinite")
// console.log(formattedLink2)

export default formatVideoLink;
