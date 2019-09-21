import axios from 'axios'

export default {
  pet: {
    /** Add a new pet to the store */
    post(data: Pet) {
      const method = 'post'
      return axios('/pet', { method, data })
    },
    /** Update an existing pet */
    put(data: Pet) {
      const method = 'put'
      return axios('/pet', { method, data })
    },
    /**
     * Finds Pets by status
     * @explain Multiple status values can be provided with comma separated strings
     */
    getFindByStatus(params: { status: ('available'|'pending'|'sold')[] }) {
      const method = 'get'
      return axios('/pet/findByStatus', { method, params })
    },
    /**
     * Finds Pets by tags
     * @explain Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
     */
    getFindByTags(params: { tags: string[] }) {
      const method = 'get'
      return axios('/pet/findByTags', { method, params })
    },
    /**
     * Find pet by ID
     * @explain Returns a single pet
     */
    getBypetId(path: { petId: number }) {
      const method = 'get'
      return axios(`/pet/${path.petId}`, { method })
    },
    /** Updates a pet in the store with form data */
    postBypetId(path: { petId: number }, formData: { name?: string, status?: string }) {
      const method = 'post'
      const data = new FormData()
      for(let name in formData)
        data.append(name, (formData as any)[name])
      return axios(`/pet/${path.petId}`, { method, data })
    },
    /** Deletes a pet */
    deleteBypetId(path: { petId: number }) {
      const method = 'delete'
      return axios(`/pet/${path.petId}`, { method })
    },
    /** uploads an image */
    postBypetIdUploadImage(path: { petId: number }, formData: { additionalMetadata?: string, file?: any }) {
      const method = 'post'
      const data = new FormData()
      for(let name in formData)
        data.append(name, (formData as any)[name])
      return axios(`/pet/${path.petId}/uploadImage`, { method, data })
    },
  },
  store: {
    /**
     * Returns pet inventories by status
     * @explain Returns a map of status codes to quantities
     */
    getInventory() {
      const method = 'get'
      return axios('/store/inventory', { method })
    },
    /** Place an order for a pet */
    postOrder(data: Order) {
      const method = 'post'
      return axios('/store/order', { method, data })
    },
    /**
     * Find purchase order by ID
     * @explain For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
     */
    getOrderByorderId(path: { orderId: number }) {
      const method = 'get'
      return axios(`/store/order/${path.orderId}`, { method })
    },
    /**
     * Delete purchase order by ID
     * @explain For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
     */
    deleteOrderByorderId(path: { orderId: number }) {
      const method = 'delete'
      return axios(`/store/order/${path.orderId}`, { method })
    },
  },
  user: {
    /**
     * Create user
     * @explain This can only be done by the logged in user.
     */
    post(data: User) {
      const method = 'post'
      return axios('/user', { method, data })
    },
    /** Creates list of users with given input array */
    postCreateWithArray(data: User[]) {
      const method = 'post'
      return axios('/user/createWithArray', { method, data })
    },
    /** Creates list of users with given input array */
    postCreateWithList(data: User[]) {
      const method = 'post'
      return axios('/user/createWithList', { method, data })
    },
    /** Logs user into the system */
    getLogin(params: { username: string, password: string }) {
      const method = 'get'
      return axios('/user/login', { method, params })
    },
    /** Logs out current logged in user session */
    getLogout() {
      const method = 'get'
      return axios('/user/logout', { method })
    },
    /** Get user by user name */
    getByusername(path: { username: string }) {
      const method = 'get'
      return axios(`/user/${path.username}`, { method })
    },
    /**
     * Updated user
     * @explain This can only be done by the logged in user.
     */
    putByusername(path: { username: string }, data: User) {
      const method = 'put'
      return axios(`/user/${path.username}`, { method, data })
    },
    /**
     * Delete user
     * @explain This can only be done by the logged in user.
     */
    deleteByusername(path: { username: string }) {
      const method = 'delete'
      return axios(`/user/${path.username}`, { method })
    },
  },
}

export interface Order {
  id?: number
  petId?: number
  quantity?: number
  shipDate?: string
  status?: ('placed'|'approved'|'delivered')
  complete?: boolean
}
export interface User {
  id?: number
  username?: string
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  phone?: string
  userStatus?: number
}
export interface Category {
  id?: number
  name?: string
}
export interface Tag {
  id?: number
  name?: string
}
export interface Pet {
  id?: number
  category?: Category
  name?: string
  photoUrls?: string[]
  tags?: Tag[]
  status?: ('available'|'pending'|'sold')
}
export interface ApiResponse {
  code?: number
  type?: string
  message?: string
}
