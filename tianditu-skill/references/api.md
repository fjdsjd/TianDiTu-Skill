# Tianditu JavaScript API Reference

## 1. Core Classes

### T.Map
The main map class.
*   **Constructor**: `new T.Map(containerId)`
*   **Methods**:
    *   `centerAndZoom(lnglat, zoom)`: Sets center and zoom level.
    *   `panTo(lnglat)`: Pans to a coordinate.
    *   `setMapType(mapType)`: Changes base map layer.
    *   `addOverLay(overlay)`: Adds an overlay (Marker, Polyline, etc.).
    *   `removeOverLay(overlay)`: Removes an overlay.
    *   `clearOverLays()`: Clears all overlays.
    *   `getZoom()`: Returns current zoom level.
    *   `getCenter()`: Returns center `T.Lnglat`.

### T.Lnglat
Represents a geographical coordinate.
*   **Constructor**: `new T.Lnglat(lng, lat)`
*   **Properties**: `lng` (Longitude), `lat` (Latitude).

## 2. Overlays

### T.Marker
A point marker.
*   **Constructor**: `new T.Marker(lnglat)`
*   **Methods**:
    *   `setPosition(lnglat)`: Updates position.
    *   `addEventListener(event, callback)`: Adds event listener (e.g., 'click').
    *   `openInfoWindow(infoWin)`: Opens an info window at the marker.

### T.Polyline
A line overlay.
*   **Constructor**: `new T.Polyline(points, options)`
    *   `points`: Array of `T.Lnglat`.
    *   `options`: `{color: "blue", weight: 3, opacity: 0.5, lineStyle: "solid"}`.

### T.Polygon
A closed polygon.
*   **Constructor**: `new T.Polygon(points, options)`
    *   `options`: `{color, weight, opacity, fillColor, fillOpacity}`.

### T.InfoWindow
A popup window.
*   **Constructor**: `new T.InfoWindow(content, options)`
*   **Methods**:
    *   `setContent(content)`: Sets HTML content.
    *   `setLngLat(lnglat)`: Sets position.

## 3. Events
Maps and overlays emit events.
*   **Common Events**: `click`, `dblclick`, `mouseover`, `mouseout`, `dragstart`, `dragend`.
*   **Usage**:
    ```javascript
    map.addEventListener("click", function(e) {
        console.log("Clicked at: " + e.lnglat.lng + "," + e.lnglat.lat);
    });
    ```

## 4. Tools (Controls)
*   `T.Control.Zoom`: Zoom buttons and slider.
*   `T.Control.Scale`: Scale bar.
*   `T.Control.MapType`: Switcher for Vector/Satellite/Terrain.
*   `T.Control.OverviewMap`: Mini-map overview.

## 5. Advanced Features

### Real-time Traffic
Tianditu does not have a built-in traffic toggle. You must overlay a traffic tile layer from a third-party provider or a specific Tianditu node.
```javascript
// Example: Overlaying a tile layer
// Replace URL with actual traffic tile service
var trafficUrl = "http://traffic-server/layer?x={x}&y={y}&z={z}";
var trafficLayer = new T.TileLayer(trafficUrl, { opacity: 0.8, zIndex: 100 });
map.addLayer(trafficLayer);
```

### POI Search (LocalSearch)
Search for points of interest (restaurants, hotels, etc.).
```javascript
var localSearch = new T.LocalSearch(map, {
    pageCapacity: 10,
    onSearchComplete: function(result) {
        var pois = result.getPois();
        if(pois) {
            for(var i = 0; i < pois.length; i++) {
                var poi = pois[i];
                console.log(poi.name, poi.address, poi.lonlat);
                // Add marker
                var coords = poi.lonlat.split(" ");
                var marker = new T.Marker(new T.LngLat(coords[0], coords[1]));
                map.addOverLay(marker);
            }
        }
    }
});
localSearch.search("Hotel");
```
