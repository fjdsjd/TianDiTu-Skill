/**
 * CoordinateUtils
 * 坐标转换工具类
 * 提供 CGCS2000 (天地图)、GCJ-02 (高德/腾讯)、BD-09 (百度) 之间的坐标转换。
 * 
 * 坐标系说明：
 * 1. CGCS2000 (2000国家大地坐标系): 天地图官方使用。在 Web 地图应用精度范围内，可视为与 WGS-84 等同。
 * 2. GCJ-02 (火星坐标系): 高德地图、腾讯地图、谷歌地图(中国)使用。是对真实坐标进行国家保密插件加密后的坐标。
 * 3. BD-09 (百度坐标系): 百度地图使用。在 GCJ-02 基础上再次加密。
 */
export class CoordinateUtils {
    // 算法常量
    private static readonly X_PI = 3.14159265358979324 * 3000.0 / 180.0;
    private static readonly PI = 3.1415926535897932384626;
    private static readonly A = 6378245.0; // 长半轴
    private static readonly EE = 0.00669342162296594323; // 偏心率平方

    /**
     * 百度坐标系 (BD-09) -> 火星坐标系 (GCJ-02)
     * @param bdLon 百度经度
     * @param bdLat 百度纬度
     * @returns { lng: number, lat: number } GCJ-02 坐标
     */
    public static bd09ToGcj02(bdLon: number, bdLat: number): { lng: number, lat: number } {
        let x = bdLon - 0.0065;
        let y = bdLat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.X_PI);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.X_PI);
        let gcjLon = z * Math.cos(theta);
        let gcjLat = z * Math.sin(theta);
        return { lng: gcjLon, lat: gcjLat };
    }

    /**
     * 火星坐标系 (GCJ-02) -> 百度坐标系 (BD-09)
     * @param gcjLon GCJ-02 经度
     * @param gcjLat GCJ-02 纬度
     * @returns { lng: number, lat: number } BD-09 坐标
     */
    public static gcj02ToBd09(gcjLon: number, gcjLat: number): { lng: number, lat: number } {
        let z = Math.sqrt(gcjLon * gcjLon + gcjLat * gcjLat) + 0.00002 * Math.sin(gcjLat * this.X_PI);
        let theta = Math.atan2(gcjLat, gcjLon) + 0.000003 * Math.cos(gcjLon * this.X_PI);
        let bdLon = z * Math.cos(theta) + 0.0065;
        let bdLat = z * Math.sin(theta) + 0.006;
        return { lng: bdLon, lat: bdLat };
    }

    /**
     * CGCS2000/WGS84 -> 火星坐标系 (GCJ-02)
     * 适用于将天地图/GPS 坐标转换为 高德/腾讯地图 坐标
     * @param lng CGCS2000/WGS84 经度
     * @param lat CGCS2000/WGS84 纬度
     * @returns { lng: number, lat: number } GCJ-02 坐标
     */
    public static cgcs2000ToGcj02(lng: number, lat: number): { lng: number, lat: number } {
        if (this.outOfChina(lng, lat)) {
            return { lng, lat };
        }
        let dLat = this.transformLat(lng - 105.0, lat - 35.0);
        let dLng = this.transformLng(lng - 105.0, lat - 35.0);
        let radLat = lat / 180.0 * this.PI;
        let magic = Math.sin(radLat);
        magic = 1 - this.EE * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((this.A * (1 - this.EE)) / (magic * sqrtMagic) * this.PI);
        dLng = (dLng * 180.0) / (this.A / sqrtMagic * Math.cos(radLat) * this.PI);
        return { lng: lng + dLng, lat: lat + dLat };
    }

    /**
     * 火星坐标系 (GCJ-02) -> CGCS2000/WGS84
     * 适用于将 高德/腾讯地图 坐标转换为 天地图/GPS 坐标
     * @param lng GCJ-02 经度
     * @param lat GCJ-02 纬度
     * @returns { lng: number, lat: number } CGCS2000/WGS84 坐标
     */
    public static gcj02ToCgcs2000(lng: number, lat: number): { lng: number, lat: number } {
        if (this.outOfChina(lng, lat)) {
            return { lng, lat };
        }
        let dLat = this.transformLat(lng - 105.0, lat - 35.0);
        let dLng = this.transformLng(lng - 105.0, lat - 35.0);
        let radLat = lat / 180.0 * this.PI;
        let magic = Math.sin(radLat);
        magic = 1 - this.EE * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((this.A * (1 - this.EE)) / (magic * sqrtMagic) * this.PI);
        dLng = (dLng * 180.0) / (this.A / sqrtMagic * Math.cos(radLat) * this.PI);
        let mgLat = lat + dLat;
        let mgLng = lng + dLng;
        return { lng: lng * 2 - mgLng, lat: lat * 2 - mgLat };
    }

    // 兼容性别名 (Aliases)
    public static wgs84ToGcj02(lng: number, lat: number) { return this.cgcs2000ToGcj02(lng, lat); }
    public static gcj02ToWgs84(lng: number, lat: number) { return this.gcj02ToCgcs2000(lng, lat); }

    // 内部辅助函数
    private static transformLat(x: number, y: number): number {
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    private static transformLng(x: number, y: number): number {
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
    }

    private static outOfChina(lng: number, lat: number): boolean {
        // 简略的中国国境范围判断，超出范围则不进行偏移
        return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271));
    }
}
