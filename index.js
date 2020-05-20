import puppeteer from 'puppeteer'
import { URL } from 'url'
import { resolve as pathResolve } from 'path'
import ProgressBar from 'progress'

(async () => {
  var args = process.argv.slice(2)
  const url = args[0] || 'https://github.com'
  const width = +args[1] || 512
  const height = +args[2] || 512
  const stepSize = +args[3] || 25
  const dir = args[4] || './output/'

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  await page.goto(url)
  const totalHeight = await page.evaluate(_ => document.body.clientHeight)
  const files = Math.ceil((totalHeight - height) / stepSize)
  const digits = files.toString().length

  const bar = new ProgressBar('downloading [:bar] :percent  :current/:total :etas', {
    complete: '→',
    incomplete: ' ',
    width: 20,
    total: files
  })

  for (let y = 0; y < totalHeight - height; y += stepSize) {
    await page.evaluate(stepSize => {
      window.scrollBy(0, stepSize)
    }, stepSize)
    const file = `${new URL(url).hostname}-${(y / stepSize).toString().padStart(digits, '0')}.png`
    const path = pathResolve(dir, file)
    await page.screenshot({ path })
    bar.tick()
  }
  await browser.close()
})()
