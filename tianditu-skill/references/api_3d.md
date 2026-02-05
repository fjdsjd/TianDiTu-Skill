# Tianditu 3D API Reference

## 1. Introduction
Tianditu provides a separate 3D map API based on WebGL. It is not compatible with the 2D API (`v=4.0`).
*   **API URL**: `http://api.tianditu.gov.cn/api3d?v=0.1&tk=YOUR_KEY`

## 2. Core Classes

### T.Map3d
The main 3D map class.
*   **Constructor**: `new T.Map3d(containerId, options)`
*   **Methods**:
    *   `centerAndZoom(lnglat, altitude)`: Sets center and camera altitude (meters).
    *   `flyTo(lnglat, altitude)`: Smoothly animates camera to location.
    *   `addOverLay(overlay)`: Adds 3D overlay.

### T.Marker3d
A 3D billboard marker.
*   **Constructor**: `new T.Marker3d(lnglat, options)`
    *   `options`: `{ height: 100, iconUrl: "..." }` (height is meters above ground).

## 3. Usage Example
```javascript
// Initialize
var map3d = new T.Map3d("mapDiv", {});

// Set View (Long, Lat, Altitude)
map3d.centerAndZoom(new T.LngLat(116.40969, 39.89945), 5000);

// Add Marker
var marker = new T.Marker3d(new T.LngLat(116.40969, 39.89945), {
    height: 50,
    iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png"
});
map3d.addOverLay(marker);
```
