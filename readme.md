# Kiosk Project

### 7/25 프로젝트 세팅

기본 라이브러리 다운로드
```
npm install -D @babel/cli @babel/core @babel/node @babel/preset-env prettier
npm install express cookie-parser dotenv mysql2 nodemon sequelize
```

바벨 기본 설정 세팅
```
// babel.config.json 
{
  "presets": ["@babel/preset-env"]
}
```