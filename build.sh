#/bin/sh
export PHANTOMJS2_DOWNLOAD_URL=http://cl1ck0ne.net/phantomjs-2.0.0.zip
npm prune
npm install
jspm install
gulp test
gulp build
