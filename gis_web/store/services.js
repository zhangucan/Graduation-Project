
import axios from 'axios'
class Services {
  async fetchLayout(title) {
    return await axios.get(`/bigscreen?title=${title}`)
  }
}
export default new Services()
