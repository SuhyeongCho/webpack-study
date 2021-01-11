# 웹팩 개념

## Webpack 이란?

FE 프레임워크에서 가장 많이 사용되는 **모듈 번들러**

**모듈 번들러**란 웹 어플리케이션을 구성하는 **자원**(HTML, CSS, Javascript, Image 등)을 **모두 각각의 모듈로 보고 이를 조합해서 하나의 결과물을 만드는 도구**를 의미

웹팩은 애플리케이션을 처리할 때 프로젝트에 필요한 **모든 모듈을 매핑하고 하나 이상의 번들을 생성**하는 **종속성 그래프(Dependency Graph)**를 내부적으로 빌드

하나의 파일이 다른 파일에 의존 할 때 마다 웹팩은 이것을 **종속성(dependencies)**으로 취급
웹팩은 애플리케이션에 필요한 모든 모듈을 포함하는 **종속성 그래프**를 재귀적으로 빌드

웹팩을 이해하려면 다음 **핵심 개념**들을 이해해야함

## Entry

**Entry**는 웹팩에서 웹 자원을 변환하기 위해 필요한 **최초 진입점**이자 자바스크립트 파일 경로

```tsx
module.exports = {
  entry: "./src/index.js",
};
```

Entry Point는 다음과 같이 여러 개가 될 수도 있음

```tsx
module.exports = {
  entry: {
    app: "./src/index.js",
    search: "./src/search.js",
  },
};
```

## Ouput

**Ouput**은 웹팩을 돌리고 난 **결과물**의 파일 경로

```tsx
const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
};
```

`filename` 속성은 웹팩으로 **빌드한 파일의 이름**을 의미하고, `path` 속성은 **해당 파일의 경로**를 의미

`path` 속성에 사용된 `path.resolve()` 코드는 인자로 넘어온 경로를 조합하여 **유효한 파일 경로를 생성**

`filename` 속성에는 다음과 같이 여러가지 옵션을 넣을 수 있음

1. 결과 파일 이름에 `**entry` 속성\*\*을 포함하는 옵션

   ```tsx
   module.exports = {
     entry: {
       app: "./src/index.js",
       search: "./src/search.js",
     },
     output: {
       filename: "[name].js",
       path: __dirname + "/dist",
     },
   };
   // writes to ./dist/app.js, ./dist/search.js
   ```

2. 결과 파일 이름에 웹팩 내부적으로 사용하는 **모듈 ID**를 포함하는 옵션

   ```tsx
   module.exports = {
     output: {
       filename: "[id].bundle.js",
     },
   };
   ```

3. 매 빌드시 마다 **고유 해시 값**을 붙이는 옵션

   ```tsx
   module.exports = {
     output: {
       filename: "[name].[hash].bundle.js",
     },
   };
   ```

4. 웹팩의 각 모듈 내용을 기준으로 **생성된 해시 값**을 붙이는 옵션

   ```tsx
   module.exports = {
     output: {
       filename: "[chunckhash].bundle.js",
     },
   };
   ```

## Loaders

웹팩은 **Javascript**와 **JSON**파일만 이해함

**Loader**를 사용하여 **자바스크립트 파일이 아닌 웹 자원**(HTML, CSS, Images 등)**을 변환할 수 있도록 도와줌**

웹팩으로 다음 코드를 빌드해보면, `app.js` 파일에서 import한 `common.css` **파일을 해석하기 위한** **적절한 로더를 추가**해 달라는 메세지와 함께 에러가 발생함

```tsx
import "./common.css";

console.log("css loaded");
```

```css
p {
  color: blue;
}
```

```tsx
module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js",
  },
};
```

다음과 같이 CSS 로더를 설치하고 웹팩 설정 파일을 바꿔서 에러를 해결

```bash
npm i css-loader -D
```

```tsx
module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [{ test: /\.css$/, use: ["css-loader"] }],
  },
};
```

**Loader**는 entry와 ouput과 달리 `module` 라는 이름을 사용

`rules` 배열 안에 객체 한 쌍을 추가했는데, 그 객체에 2개의 속성이 포함되어 있음

`test` : **로더를 적용할 파일 유형** (일반적으로 정규표현식 사용)

`use` : **해당 파일에 적용할 로더의 이름**

로더를 여러 개 사용하는 경우 다음과 같이 `**rules` 배열에 로더 옵션을 추가\*\*

특정 파일에 대해 여러 개의 로더를 사용하는 경우 로더는 **오른쪽에서 왼쪽 순**으로 적용

```tsx
module.exports = {
	...
	module: {
		rules: [
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'scss-loader'] },
			{ test: /\.ts$/, use: ['ts-loader'] },
		]
	}
}
```

## Plugin

**Plugin**은 웹팩의 기본적인 동작에 **추가적인 기능**을 제공하는 속성

Loader는 파일을 해석하고 변환하는 과정이라면, **Plugin은 해당 결과물의 형태를 바꾸는 역할을 수행**

```tsx
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	...
	plugins: [
		new HtmlWebpackPlugin(), // 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
		new webpack.ProgressPlugin() // 웹팩의 빌드 진행율을 표시해주는 플러그인
	]
}
```

## Mode

**Mode** 속성에 `development`, `production` 으로 설정하면 웹팩의 최적화를 활성화할 수 있음

기본값은 `production`

```tsx
module.exports = {
	mode: 'production',
	...
}
```
