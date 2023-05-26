import { createContext, useContext } from 'react'

import { stores } from '../stores/stores'

const StoreContext = createContext(stores())

StoreContext.displayName = 'StoreContext'

const useStore = () => useContext(StoreContext)

export { StoreContext, useStore }
