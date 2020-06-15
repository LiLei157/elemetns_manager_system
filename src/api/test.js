/*
 * @Author: your name
 * @Date: 2020-06-12 14:00:51
 * @LastEditTime: 2020-06-12 14:09:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\api\test.js
 */
import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 5000

export const postRequest = (url, params) => {
  axios({
    method: 'POST',
    url: `${url}`,
    data: params,
    params: {
      sessionId: 'mzytyyF50TsBuh6MK'
    }
  })
}
