# Tianditu (Sky Map) Developer Guide

## 1. Introduction
Tianditu (天地图) is the National Platform for Common Geospatial Information Services of China. It provides map services including Vector, Satellite (Image), and Terrain maps, along with geocoding, path planning, and other GIS services.

## 2. Getting Started

### 2.1 Obtain an API Key (Key/Token)
To use the Tianditu API, you must register and apply for a Key (tk).
1. Visit the [Tianditu Console](http://lbs.tianditu.gov.cn/server/apikey.html).
2. Register/Login.
3. Create a new application and choose "Browser-side" (for JS API) or "Server-side" (for Web Services).
4. Get your Key (tk).

### 2.2 Hello World
Include the JS API in your HTML file:
```html
<script src="http://api.tianditu.gov.cn/api?v=4.0&tk=YOUR_KEY"></script>
```

Initialize the map:
```javascript
var map = new T.Map("mapDiv"); // "mapDiv" is the ID of your container div
map.centerAndZoom(new T.Lnglat(116.40969, 39.89945), 12); // Center on Beijing
```

## 3. Map Types
Tianditu provides several base map types. You can switch them using `map.setMapType()`:
*   `TMAP_NORMAL_MAP`: Vector Map (Default)
*   `TMAP_SATELLITE_MAP`: Satellite Imagery
*   `TMAP_TERRAIN_MAP`: Terrain Map
*   `TMAP_HYBRID_MAP`: Hybrid (Satellite + Labels)

## 4. Coordinate System
Tianditu uses **CGCS2000** coordinate system, which is compatible with WGS84 for most practical web mapping purposes.
*   **Longitude**: -180 to 180
*   **Latitude**: -90 to 90

## 5. Controls
Common controls to add to the map:
```javascript
// Zoom Control
map.addControl(new T.Control.Zoom());
// Scale Control
map.addControl(new T.Control.Scale());
// Map Type Switcher
map.addControl(new T.Control.MapType());
```

## 6. Best Practices
*   **HTTPS**: The API supports HTTPS. Use `https://api.tianditu.gov.cn/...` if your site is HTTPS.
*   **Mobile**: Add `<meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>` for mobile optimization.
*   **Error Handling**: Check if `T` is defined after loading the script to ensure the API loaded successfully.
