import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cardItems, setCardItems] = useState({})
  const [tableNumber, setTableNumber] = useState('')
  const url = 'http://localhost:4000'
  const [token, setToken] = useState('')
  const [food_list, setFoodlist] = useState([])

  const addToCard = (itemId) => {
    if (!cardItems[itemId]) {
      setCardItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCardItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
  }

  const removeFromCard = (itemId) => {
    setCardItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const getTotalCardAmount = () => {
    let totalAmount = 0
    for (const item in cardItems) {
      if (cardItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item)
        totalAmount += itemInfo.price * cardItems[item]
      }
    }
    return totalAmount
  }

  const feetchFoodList = async () => {
    const response = await axios.get(url + '/api/food/list')
    setFoodlist(response.data.data)
  }

  const getTableNumber = (number) => {
    setTableNumber(number)
  }

  useEffect(() => {
    async function loadData() {
      await feetchFoodList()
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
      }
    }
    loadData()
  }, [])

  const contextValue = {
    food_list,
    cardItems,
    setCardItems,
    addToCard,
    removeFromCard,
    getTotalCardAmount,
    tableNumber,
    getTableNumber,
    url,
    token,
    setToken,
  }

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>
}

export default StoreContextProvider
