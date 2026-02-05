---
name: tianditu-skill
description: Comprehensive guide and tools for developing with Tianditu (Sky Map) API. Use this skill when the user wants to integrate maps, geocoding, path planning, or other GIS features using Tianditu services.
---

# Tianditu Skill

## Overview
This skill provides documentation, code patterns, and templates for building applications with the Tianditu (天地图) JavaScript API v4.0. It covers map initialization, overlays, event handling, and web services like geocoding and driving directions.

## When to Use
Use this skill when the user asks to:
*   "Show a map" using Tianditu.
*   "Get coordinates for an address" (Geocoding).
*   "Plan a route" (Driving/Walking).
*   "Show a 3D map" or "Add 3D markers".
*   "Add markers or polygons" to a map.
*   "Switch between Vector and Satellite maps".
*   "Convert coordinates" between GCJ02/BD09 and Tianditu.

## Workflow
1.  **Setup**: Ensure the user has an API Key (tk). Refer to [Guide](references/guide.md).
2.  **Implementation**:
    *   For basic map display, use the template in `assets/map_template.html`.
    *   For 3D map display, use the template in `assets/map_3d_template.html`.
    *   For adding markers/shapes, see [API Reference](references/api.md).
    *   For search/routing, see [Services](references/services.md).

## Resources

### Documentation
*   [Developer Guide](references/guide.md): Quick start, API Key, Basic Map.
*   [API Reference](references/api.md): Core Classes (`T.Map`, `T.Marker`, `T.LocalSearch`, Traffic).
*   [3D API Reference](references/api_3d.md): 3D Map Classes (`T.Map3d`, `T.Marker3d`).
*   [Services Reference](references/services.md): Geocoding, Driving Route.
*   [Server-Side Examples](references/server_side.md): Node.js/Python integration.
*   [Testing Guide](references/testing.md): Strategies for Unit and Integration testing.

### Assets & Tools
*   [Map Template](assets/map_template.html): A complete HTML5 starter file.
*   [3D Map Template](assets/map_3d_template.html): Starter for 3D globe.
*   [TypeScript Definitions](references/tianditu.d.ts): Type definitions for `T` namespace.
*   [Coordinate Utils](assets/CoordinateUtils.ts): Conversion between WGS84, GCJ02, BD09.

## Quick Snippets

### Initialize Map
```javascript
var map = new T.Map("mapDiv");
map.centerAndZoom(new T.Lnglat(116.40969, 39.89945), 12);
```

### Add Marker
```javascript
var marker = new T.Marker(new T.Lnglat(116.40969, 39.89945));
map.addOverLay(marker);
```

### Geocoding
```javascript
var geocoder = new T.Geocoder();
geocoder.getLocation(lnglat, function(result){ ... });
```
