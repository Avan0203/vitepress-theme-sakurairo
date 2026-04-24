---
title: Hello vitepress-theme-sakurairo
cover: https://www.loliapi.com/acg/
layout: page
publish: 2024-02-25 11:29:00
update: 2025-02-13 01:22:00
tags: ["test", "vitepress"]
prev: "/posts/film"
next: "/posts/glsl/glsl"
---

# title test

# Hello vitepress-theme-sakurairo

## Hello vitepress-theme-sakurairo

### Hello vitepress-theme-sakurairo

#### Hello vitepress-theme-sakurairo

##### Hello vitepress-theme-sakurairo

###### Hello vitepress-theme-sakurairo

# 测试图片

## 本地图片

![测试图片1](../public/bg.jpeg#pic-center=300x200)

```markdown
//本地图片
![测试图片1](../public/bg.jpeg#pic-center=300x200)
```

## 在线图片

![测试图片](https://eo-img.loliapi.cn/i/pc/img496.webp)

```markdown
//在线图片
![测试图片](https://esa-img.544521.xyz/i/pc/img496.webp)
```

## html 图片

<img src="https://eo-img.loliapi.cn/i/pc/img113.webp" alt="测试图片" style="width:100%" ></img>

```markdown
//html图片
<img src="https://eo-img.loliapi.cn/i/pc/img113.webp" alt="测试图片" style="width:100%" ></img>
```

# test Code

```js
function hello() {
  console.log("Hello, world!"); // [!code focus]
}
hello();
```

# video

<video src="https://www.youtube.com/8111c092-f731-4dcc-9baa-22fb36811508" controls="controls"></video>

<hr/>

# ul li

## '-'

- 测试1
- 测试2
- 测试3
- 测试4

## '\*'

- 测试1
- 测试2
- 测试3
- 测试4

## '+'

- 测试1
- 测试2
- 测试3
- 测试4

# table

| 表头1   | 表头2   | 表头3   |
| ------- | ------- | ------- |
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |

# ol li

## '1.'

1. 测试1
2. 测试2
3. 测试3
4. 测试4

## 'a.'

a. 测试1
b. 测试2
c. 测试3
d. 测试4

## 'i.'

i. 测试1
ii. 测试2
iii. 测试3
iv. 测试4

# blockquote

> One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one's cheeks burned with the silent imputation of parsimony that such close dealing implied. Three times Della counted it. One dollar and eighty-seven cents. And the next day would be Christmas

# Iframe

<iframe width="100%" height="400" src="https://avan0203.github.io/threejs-demo/src/shader/rainEffect.html" title="three.js demo display" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Math jax

$$
P_{\text{persp}} = \begin{bmatrix}
\frac{2}{\text{right} - \text{left}} & 0 & 0 & -\frac{\text{right} + \text{left}}{\text{right} - \text{left}} \\
0 & \frac{2}{\text{top} - \text{bottom}} & 0 & -\frac{\text{top} + \text{bottom}}{\text{top} - \text{bottom}} \\
0 & 0 & -\frac{2}{\text{far} - \text{near}} & -\frac{\text{far} + \text{near}}{\text{far} - \text{near}} \\
0 & 0 & 0 & 1
\end{bmatrix}
\cdot
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & \frac{\text{far} + \text{near}}{\text{near} - \text{far}} & \frac{2 \cdot \text{far} \cdot \text{near}}{\text{near} - \text{far}} \\
0 & 0 & -1 & 0
\end{bmatrix}
$$

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

**Maxwell's equations:**

| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | divergence of $\vec{\mathbf{B}}$ is zero                                               |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |
