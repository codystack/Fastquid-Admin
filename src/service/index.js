import axiosInstance from '../utils/axios';

class APIService {
  static fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

  static post = (url, body, config = {}) => axiosInstance.post(url, body, config).then((res) => res);

  static update = (url, id, body) => axiosInstance.patch(`${url}/${id}`, body).then((res) => res);

  static delete = (url, id) => axiosInstance.delete(`${url}/${id}`).then((res) => res);
}

export default APIService;
