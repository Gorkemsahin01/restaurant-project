import mongoose from 'mongoose'

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://gorkemsahin012:gorkem5379@cluster0.iy9p8az.mongodb.net/Restauant-projesi').then(() => {
    console.log('Database bağlandı')
  })
}
