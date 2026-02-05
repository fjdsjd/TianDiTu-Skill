declare namespace T {
    /**
     * Basic LngLat Coordinate
     */
    class LngLat {
        constructor(lng: number, lat: number);
        lng: number;
        lat: number;
        getLng(): number;
        getLat(): number;
    }

    /**
     * Map View
     */
    class Map {
        constructor(container: string | HTMLElement, opts?: MapOptions);
        centerAndZoom(lnglat: LngLat, zoom: number): void;
        panTo(lnglat: LngLat): void;
        setMapType(mapType: MapType): void;
        addOverLay(overlay: Overlay): void;
        removeOverLay(overlay: Overlay): void;
        clearOverLays(): void;
        addControl(control: Control): void;
        removeControl(control: Control): void;
        getZoom(): number;
        getCenter(): LngLat;
        addEventListener(event: string, handler: (e: any) => void): void;
    }

    interface MapOptions {
        projection?: string;
        minZoom?: number;
        maxZoom?: number;
    }

    type MapType = any;

    /**
     * Overlays
     */
    class Overlay {}

    class Marker extends Overlay {
        constructor(lnglat: LngLat, opts?: MarkerOptions);
        setPosition(lnglat: LngLat): void;
        openInfoWindow(infoWin: InfoWindow): void;
        addEventListener(event: string, handler: (e: any) => void): void;
    }

    interface MarkerOptions {
        icon?: Icon;
        title?: string;
        zIndexOffset?: number;
        opacity?: number;
    }

    class Polyline extends Overlay {
        constructor(points: LngLat[], opts?: PolylineOptions);
    }

    interface PolylineOptions {
        color?: string;
        weight?: number;
        opacity?: number;
        lineStyle?: string;
    }

    class InfoWindow extends Overlay {
        constructor(content: string | HTMLElement, opts?: any);
    }

    class Icon {
        constructor(opts: { iconUrl: string; iconSize: Point; iconAnchor: Point });
    }

    class Point {
        constructor(x: number, y: number);
    }

    /**
     * Controls
     */
    class Control {}
    namespace Control {
        class Zoom extends Control {}
        class Scale extends Control {}
        class MapType extends Control {}
    }

    /**
     * Services
     */
    class LocalSearch {
        constructor(map: Map, opts: LocalSearchOptions);
        search(keyword: string): void;
        setPageCapacity(capacity: number): void;
    }

    interface LocalSearchOptions {
        pageCapacity?: number;
        onSearchComplete?: (result: LocalSearchResult) => void;
    }

    interface LocalSearchResult {
        getPois(): Poi[];
        getCount(): number;
    }

    interface Poi {
        name: string;
        address: string;
        lonlat: string; // "lon lat" string
    }

    class Geocoder {
        constructor();
        getLocation(lnglat: LngLat, callback: (result: GeocoderResult) => void): void;
        getPoint(address: string, callback: (result: GeocoderPointResult) => void): void;
    }

    interface GeocoderResult {
        getStatus(): number;
        getAddress(): string;
        getAddressComponent(): any;
    }
    
    interface GeocoderPointResult {
        getLocation(): LngLat;
    }

    /**
     * 3D Map Classes
     */
    class Map3d {
        constructor(container: string | HTMLElement, opts?: any);
        centerAndZoom(lnglat: LngLat, altitude: number): void;
        flyTo(lnglat: LngLat, altitude: number): void;
        addOverLay(overlay: any): void;
    }

    class Marker3d {
        constructor(lnglat: LngLat, opts?: Marker3dOptions);
    }

    interface Marker3dOptions {
        height?: number;
        iconUrl?: string;
    }
}

// Global constants
declare const TMAP_NORMAL_MAP: any;
declare const TMAP_SATELLITE_MAP: any;
declare const TMAP_TERRAIN_MAP: any;
