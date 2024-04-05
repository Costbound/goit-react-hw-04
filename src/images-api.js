import axios from 'axios'

axios.defaults.baseURL = 'https://api.unsplash.com'
axios.defaults.headers.common['Authorization'] = 'Client-ID 3iN7uzAOU3LijAYutWepFIDfcXWT_xvy4thjPul5E1E'


export const fetchImages = async (searchWord, page) => {
    const resp = await axios.get('/search/photos', {
        params: {
            query: searchWord,
            page: page,
            per_page: 12
        }
    })
    return resp.data.results
}
