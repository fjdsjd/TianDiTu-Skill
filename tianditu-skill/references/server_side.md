# Server-Side Integration Examples

## 1. Node.js (Axios)

### Install
```bash
npm install axios
```

### Geocoding Example
```javascript
const axios = require('axios');
const API_KEY = 'YOUR_KEY';

async function getCoordinates(address) {
    const url = 'http://api.tianditu.gov.cn/geocoder';
    const params = {
        ds: JSON.stringify({ keyWord: address }),
        tk: API_KEY
    };

    try {
        const response = await axios.get(url, { params });
        if (response.data.status === '0') {
            console.log(response.data.location); // { lon, lat }
        } else {
            console.error(response.data.msg);
        }
    } catch (error) {
        console.error(error);
    }
}
```

## 2. Python (Requests)

### Install
```bash
pip install requests
```

### Geocoding Example
```python
import requests
import json

API_KEY = 'YOUR_KEY'

def get_coordinates(address):
    url = 'http://api.tianditu.gov.cn/geocoder'
    params = {
        'ds': json.dumps({'keyWord': address}),
        'tk': API_KEY
    }
    
    try:
        response = requests.get(url, params=params)
        data = response.json()
        if data['status'] == '0':
            print(data['location']) # {'lon': ..., 'lat': ...}
        else:
            print("Error:", data.get('msg'))
    except Exception as e:
        print("Request failed:", e)

# Usage
get_coordinates("北京市朝阳区")
```
