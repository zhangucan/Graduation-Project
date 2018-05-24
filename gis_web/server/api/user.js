import mongoose from 'mongoose'
const User = mongoose.model('User')
export function useLogin(obj) {
  return new Promise((resolve, reject) => {
    User.findOne(obj, (err, data) => {
      if (err) reject(err)
      if (data) {
        resolve(data)
      }
    })
  })
}
