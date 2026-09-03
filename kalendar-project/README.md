# Kalendar

一个简单的月历小 app 雏形(React + Vite)。

## 本地运行

```bash
npm install
npm run dev
```

打开终端提示的地址(通常是 http://localhost:5173)即可预览。

## 部署到 GitHub Pages

这个项目已经带好了 `.github/workflows/deploy.yml`,只要把代码推到 GitHub 的 `main` 分支,GitHub Actions 会自动构建并发布,你不需要手动跑 `npm run build` 再上传。

步骤:

1. 把这个项目文件夹的内容推到你的仓库(比如 `Yuri12-3/kalendar`):

   ```bash
   git init
   git add .
   git commit -m "calendar app prototype"
   git branch -M main
   git remote add origin https://github.com/Yuri12-3/kalendar.git
   git push -u origin main
   ```

2. 打开仓库的 `Settings → Pages`,把 **Source** 改成 `GitHub Actions`(不是 "Deploy from a branch")。

3. 推送后进入仓库的 `Actions` 标签页,能看到 "Deploy to GitHub Pages" 这个工作流在跑。跑成功(绿勾)之后,`Settings → Pages` 顶部会出现网站地址,一般是:

   ```
   https://yuri12-3.github.io/kalendar/
   ```

## 注意

- `vite.config.js` 里的 `base: "/kalendar/"` 要和你的仓库名一致,如果仓库改名了,这里也要改,否则页面会打开但样式/资源加载不出来。
- 如果仓库名正好是 `你的用户名.github.io`,则 `base` 应改成 `"/"`。
