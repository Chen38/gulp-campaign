## gulp_campaign

`gulp` 配置，用于公司 `campaign`。

### 开发步骤介绍

主要是开始项目之前的一些基本说明，怕自己忘记。

#### 1. 根据 `package.json` 和 `bower.json` 先下载依赖的库

这两个文件中只列出了经常会用到的一些库，后面如果需要多的开发库可自行添加。

> 运行命令：`npm run install`

***

#### 2. 所有库下载好之后需要在 `gulpfile.js` 里面配置将库文件转移到指定的开发目录

根据个人情况来配置。

#### 3. 精灵图的合成

这个看个人需要，如果希望页面加载快点，可以使用，因为我是处女座，用了一次之后停不下来了，不过确实也是好。

> 运行命令：`gulp sprite`

***

#### 4. 开始项目的编写

建议开始之前先看设计稿，大致了解一下布局，`html` 文件全部放在 `views/` 目录下，最后会统一打包，打包过程中会替换开发时的文件路径，因为是自己的，所以这些目录都自己规定。

样式语言采用 `sass`，编译后直接放在 `dist/css` 目录下。

这边还配置了修改保存 `sass` 文件后，浏览器无刷新的更新样式，其中的域名地址可能会根据需要来修改。

> 运行命令：`gulp dev`

***

#### 5. 开发完成之后需要将全部文件打包

其实前面的 `4` 步已经将所需的资源打包的差不多了，这边只是去合并 `js` 和压缩 `html`。

一般来说我会使用 `requirejs` 来进行模块化编写，最后全部合并成一个压缩文件，也会帮助加载时阻塞页面渲染。

其中的配置也需要根据开发时的配置来修改。

> 运行命令：`gulp build`

***

到这里基本上一个项目开发完成的差不多了，但是还有一点就是，图片资源的压缩，开始配置的是 `gulp` 来压缩，但是貌似压缩的不好，决定还是手动来进行压缩，使用 `TinyPNG`，压缩效果确实不错。

#### 6. 代码的发布

不要把本地一些不必要的资源上传，这边只是为了把整体结构上传，所以在 `.gitignore` 没有写三个目录：

```js
asset/
img/
view/
```

这三个是开发时所需目录，正式提交代码的时候不需要，记得写进 `.gitignore` 文件里。

***

到这里项目完成了，除非有 `bug` 修改，重复上面几个步骤就好。