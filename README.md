# Tianditu Skill (天地图开发技能包)

[![Tianditu API](https://img.shields.io/badge/Tianditu%20API-v4.0-blue.svg)](http://lbs.tianditu.gov.cn/api/js4.0/guide.html)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

一个基于 Claude Skill 框架构建的专业天地图（Tianditu）开发工具包。本 Skill 旨在帮助开发者和 AI Agent 快速集成天地图的 GIS 能力，涵盖了从基础地图加载到高级 3D 可视化的全套解决方案。

## ✨ 核心特性

*   **🗺️ 全面覆盖**: 支持 2D 矢量/影像/地形图及 **3D 地球**模式。
*   **🛠️ 开箱即用**: 提供 HTML5 模板、TypeScript 类型定义 (`.d.ts`) 和坐标转换工具。
*   **🚦 高级功能**: 集成实时路况叠加方案、POI 搜索、路径规划等高频场景。
*   **📐 坐标处理**: 内置 WGS84 (CGCS2000) ↔ GCJ02 ↔ BD09 高精度转换算法。
*   **💻 多端集成**: 包含 Node.js 和 Python 的服务端地理编码示例。

## 📂 目录结构

```text
tianditu-skill/
├── SKILL.md                  # Skill 核心定义与工作流入口
├── assets/                   # [资源] 可直接使用的代码资产
│   ├── map_template.html     # 2D 地图标准 HTML5 模板
│   ├── map_3d_template.html  # 3D 地球模式模板
│   └── CoordinateUtils.ts    # 坐标系转换工具类 (TS)
└── references/               # [文档] API 规范与开发指南
    ├── guide.md              # 快速入门与密钥获取
    ├── api.md                # 2D 核心 API (Map, Overlay, Traffic)
    ├── api_3d.md             # 3D 核心 API (Map3d, Marker3d)
    ├── services.md           # Web 服务 (地理编码, 路径规划)
    ├── server_side.md        # 服务端调用示例 (Node/Python)
    ├── testing.md            # 测试策略指南
    └── tianditu.d.ts         # TypeScript 类型定义文件
```

## 🚀 快速开始

### 1. 获取密钥 (TK)
在使用本 Skill 提供的任何代码前，请务必前往 [天地图控制台](http://lbs.tianditu.gov.cn/server/apikey.html) 申请 API Key (tk)。

### 2. 使用模板
复制 `assets/map_template.html` 到你的项目中，并替换密钥：
```html
<script src="http://api.tianditu.gov.cn/api?v=4.0&tk=您的密钥"></script>
```

### 3. 坐标转换 (TypeScript)
```typescript
import { CoordinateUtils } from './assets/CoordinateUtils';

// 将 百度坐标 转为 天地图(CGCS2000) 坐标
const gcj = CoordinateUtils.bd09ToGcj02(116.404, 39.915);
const wgs = CoordinateUtils.gcj02ToCgcs2000(gcj.lng, gcj.lat);
console.log(wgs); // { lng: 116.xxx, lat: 39.xxx }
```

## 📚 详细文档

| 文档 | 说明 |
|------|------|
| [开发指南](references/guide.md) | 环境搭建、Hello World 与最佳实践 |
| [2D API 参考](references/api.md) | 地图控制、覆盖物、事件监听、实时路况 |
| [3D API 参考](references/api_3d.md) | 3D 地球模式、3D 标记、视角控制 |
| [Web 服务](references/services.md) | 地理编码、逆地理编码、驾车/公交路线规划 |
| [服务端集成](references/server_side.md) | Node.js / Python 后端调用示例 |

## 🤝 贡献
欢迎提交 Issue 或 PR 来改进此 Skill 包。请确保所有新添加的代码都经过了测试验证。

## 📄 许可证
本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

---
*注：本项目非天地图官方出品，仅为方便开发者使用的第三方工具包。天地图 API 版权归国家基础地理信息中心所有。*
