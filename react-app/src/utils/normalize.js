
// Use this function to normalize any data you need!
// Be sure to key into the proper location in the response body
// An example response body is included below for testing

const normalizeData = (data) => {
  const res = {}
  for (let key in data) {
    // console.log(data[key])
    res[data[key].id] = data[key]
  }
  // console.log(res)
  return res
}

// demoData = {
//   "Posts": [
//       {
//           "Media": [],
//           "User": {
//               "following": false,
//               "id": 1,
//               "profileImageUrl": null,
//               "username": "Demo"
//           },
//           "createdAt": "Sun, 13 Nov 2022 19:37:03 GMT",
//           "id": 1,
//           "notes": 2,
//           "postType": "text",
//           "text": "This is the most amazing post",
//           "title": "I'm writing an amazing post!",
//           "updatedAt": "Sun, 13 Nov 2022 19:37:03 GMT",
//           "userId": 1
//       },
//       {
//           "Media": [
//               {
//                   "createdAt": "Sun, 13 Nov 2022 19:37:03 GMT",
//                   "id": 2,
//                   "mediaType": "video",
//                   "mediaUrl": "https://youtu.be/0zpHVUnAhxc",
//                   "postId": 3
//               }
//           ],
//           "User": {
//               "following": false,
//               "id": 3,
//               "profileImageUrl": null,
//               "username": "bobbie"
//           },
//           "createdAt": "Sun, 13 Nov 2022 19:37:03 GMT",
//           "id": 3,
//           "notes": 4,
//           "postType": "quote",
//           "text": "The hungriest man, is not the happiest",
//           "title": "John C Reilly",
//           "updatedAt": "Sun, 13 Nov 2022 19:37:03 GMT",
//           "userId": 3
//       },
//       {
//           "Media": [
//               {
//                   "createdAt": "Sun, 13 Nov 2022 19:37:03 GMT",
//                   "id": 1,
//                   "mediaType": "photo",
//                   "mediaUrl": "https://64.media.tumblr.com/e2ae6772f093c75a99c6311dc5f81bd9/a50867f53416f928-26/s1280x1920/8f86bbd952a39ab0ebdf7190724715d8a0c10159.png",
//                   "postId": 2
//               }
//           ],
//           "User": {
//               "following": true,
//               "id": 2,
//               "profileImageUrl": null,
//               "username": "marnie"
//           },
//           "createdAt": "Sun, 13 Nov 2022 19:37:03 GMT",
//           "id": 2,
//           "notes": 3,
//           "postType": "photo",
//           "text": "This is a photo post",
//           "title": null,
//           "updatedAt": "Sun, 13 Nov 2022 19:37:03 GMT",
//           "userId": 2
//       }
//   ]
// }

// normalizeData(demoData.Posts);

export default normalizeData;
