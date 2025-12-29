install:
  npm install

build:
  npx @11ty/eleventy

serve:
  npx @11ty/eleventy --serve

deploy:
  npx @11ty/eleventy
  git add docs/
  git commit -m "Build for deploy" || true
  git push origin main
  git push origin $(git subtree split --prefix docs main):gh-pages --force