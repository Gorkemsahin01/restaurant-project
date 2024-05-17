import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cardItems, setcardItems] = useState({})
  const [tableNumber, setTableNumber] = useState('')
  const url = 'http://localhost:4000'
  const [token, setToken] = useState('')
  const [food_list, setFoodlist] = useState([])

  const addTocard = async (itemId) => {
    if (!cardItems[itemId]) {
      setcardItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setcardItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if (token) {
      await axios.post(url + '/api/card/add', { itemId }, { headers: { token } })
    }
  }

  const removeFromcard = async (itemId) => {
    setcardItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token) {
      await axios.post(url + '/api/card/remove', { itemId }, { headers: { token } })
    }
  }

  const getTotalcardAmount = () => {
    let totalAmount = 0
    for (const item in cardItems) {
      if (cardItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item)
        totalAmount += itemInfo.price * cardItems[item]
      }
    }
    return totalAmount
  }

  const fetchFoodList = async () => {
    const response = await axios.get(url + '/api/food/list')
    setFoodlist(response.data.data)
  }

  // const loadcardData = async (token) => {
  //   const response = await axios.post(url + '/api/card/get', {}, { headers: { token } })
  //   setcardItems(response.data.cardData)
  // }

  const getTableNumber = (number) => {
    setTableNumber(number)
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList()
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
        // await loadcardData(localStorage.getItem('token'))
      }
    }
    loadData()
  }, [])

  const contextValue = {
    food_list,
    cardItems,
    setcardItems,
    addTocard,
    removeFromcard,
    getTotalcardAmount,
    tableNumber,
    getTableNumber,
    url,
    token,
    setToken,
  }

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>
}

export default StoreContextProvider
