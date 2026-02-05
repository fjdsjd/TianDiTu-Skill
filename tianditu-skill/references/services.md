# Tianditu Web Services

## 1. Geocoding (Inverse)
Convert coordinates to an address.

### HTTP API
*   **URL**: `http://api.tianditu.gov.cn/geocoder`
*   **Method**: GET
*   **Parameters**:
    *   `postStr`: JSON string like `{'lon':116.37304,'lat':39.92594,'ver':1}`
    *   `type`: `geocode`
    *   `tk`: Your API Key
*   **Example**:
    ```
    http://api.tianditu.gov.cn/geocoder?postStr={'lon':116.37304,'lat':39.92594,'ver':1}&type=geocode&tk=YOUR_KEY
    ```
*   **Response**:
    ```json
    {
        "result": {
            "formatted_address": "北京市西城区...",
            "addressComponent": { "city": "北京市", "road": "..." }
        },
        "status": "0",
        "msg": "OK"
    }
    ```

### JS API (`T.Geocoder`)
*   **Constructor**: `var geocoder = new T.Geocoder();`
*   **Method**: `geocoder.getLocation(lnglat, callback)`
*   **Example**:
    ```javascript
    var geoc = new T.Geocoder();
    geoc.getLocation(new T.Lnglat(116.40969, 39.89945), function(result) {
        if(result.getStatus() == 0){
            alert(result.getAddress()); // formatted address
        }
    });
    ```

## 2. Driving Route Planning
Plan a driving route between two points.

### JS API (`T.DrivingRoute`)
*   **Constructor**: `var driving = new T.DrivingRoute(map, options);`
    *   `map`: The map instance to draw the route on.
    *   `options`: `{ policy: 0, onSearchComplete: function(result){} }`
*   **Method**: `driving.search(startLngLat, endLngLat);`
*   **Example**:
    ```javascript
    var driving = new T.DrivingRoute(map, {
        policy: 0, // 0: Fastest, 1: Shortest, 2: Avoid Highways
        onSearchComplete: function(result) {
            // result contains the route data
            // The map automatically displays the route if 'map' was passed to constructor
        }
    });
    driving.search(new T.Lnglat(116.409, 39.90), new T.Lnglat(116.30, 39.95));
    ```

### Search Result Object
*   `getPlan(i)`: Gets the i-th route plan.
*   `getDistance()`: Total distance.
*   `getDuration()`: Total duration.

## 3. Other Services
*   **Bus**: `T.BusRoute`
*   **Local Search**: `T.LocalSearch` (Points of Interest)
*   **Administrative**: `T.Administrative` (District boundaries)
