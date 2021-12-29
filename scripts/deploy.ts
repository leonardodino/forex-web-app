import { copyFileSync, writeFileSync } from 'fs'
import { publish } from 'gh-pages'

copyFileSync('build/index.html', 'build/404.html')
writeFileSync('build/.nojekyll', '')
publish(
  'build',
  {
    silent: false,
    message: ':package: update',
    history: false,
    user: {
      name: 'github-actions[bot]',
      email: 'github-actions[bot]@users.noreply.github.com',
    },
  },
  err => {
    if (!err) return console.log('published!')
    console.log(err)
    process.exit(1)
  },
)
