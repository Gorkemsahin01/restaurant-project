import userModel from '../models/UserModel.js'

// add items to user card
const addTocard = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId)
    let cardData = userData.cardData || [] // Varsa mevcut sepet verisini al, yoksa boş dizi oluştur
    const { itemId } = req.body
    const existingItemIndex = cardData.findIndex((item) => item.itemId === itemId)

    if (existingItemIndex !== -1) {
      // Eğer ürün sepette varsa miktarını artır
      cardData[existingItemIndex].quantity += 1
    } else {
      // Eğer ürün sepette yoksa yeni bir öğe olarak ekle
      cardData.push({ itemId, quantity: 1 })
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cardData })
    res.json({ success: true, message: 'Sepete Eklendi' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Hata' })
  }
}

// remove items from user card
const removeFromcard = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId)
    let cardData = userData.cardData || []
    const { itemId } = req.body
    const existingItemIndex = cardData.findIndex((item) => item.itemId === itemId)

    if (existingItemIndex !== -1 && cardData[existingItemIndex].quantity > 0) {
      // Eğer ürün sepette varsa ve miktarı 0'dan büyükse miktarını azalt
      cardData[existingItemIndex].quantity -= 1
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cardData })
    res.json({ success: true, message: 'Sepetten Kaldırıldı' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Hata' })
  }
}

// fetch user card data
const getcard = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId)
    let cardData = userData.cardData || []
    res.json({ success: true, cardData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Hata' })
  }
}

export { addTocard, removeFromcard, getcard }
