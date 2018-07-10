import fs from 'fs'
import os from 'os'

//const UPLOAD_PATH = `${os.homedir()}/frameUploads`;
const LOCAL_PATH = `../static/uploads`;

/*export const checkRoot = (req, res, next) => {
  fs.exists(UPLOAD_PATH, (exists) => {
    if (exists) {
      next()
    } else {
      fs.mkdir(UPLOAD_PATH, (error) => {
        if (error) {
          console.log(error.message || error);
          next()
        }
        next()
      })
    }
  })
}*/

export const checkPath = (req, res, next) => {
  let USER_PATH = `${LOCAL_PATH}/${req.user.user_id}`
  fs.exists(USER_PATH, (exists) => {
    if (exists) {
      next()
    } else {
      fs.mkdir(USER_PATH, (error) => {
        if (error) {
          console.log(error.message || error);
          next()
        }
        next()
      })
    }
  })
}