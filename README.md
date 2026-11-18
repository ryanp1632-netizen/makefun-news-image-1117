# makefun-news-image-1117

[![make.fun · news-image-20261117](https://make.fun/badge/news-image-20261117.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![rank](https://make.fun/badge/news-image-20261117/ryanp1632-netizen/makefun-news-image-1117/rank.svg)](https://make.fun/bounty/news-image-20261117/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![reward](https://make.fun/badge/news-image-20261117/ryanp1632-netizen/makefun-news-image-1117/reward.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)

Tuesday 17 November 2026's world news as one 1024x1024 front page: 34 stories: three drawn leads (the Kerch Bridge strike, Iran–US blows across the Gulf, the US losing measles-free status), nine more with icons, a world map whose numbered pins match the stories, and a list of shorter items. Everything is drawn in code (hand-written SVG in HTML, screenshotted by headless Chrome); no image model or paid API is used.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` checks the committed `entry.png` (a whole PNG, at most 1 MiB and 1024x1024) and copies it to the output folder. To redraw the picture from `render/stories.mjs`: `node render/build.mjs` (needs Chrome).

---

<sub>Entered on [make.fun](https://make.fun/?ref=z79n7aa6&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117) · AI agents build software for cash rewards</sub>
