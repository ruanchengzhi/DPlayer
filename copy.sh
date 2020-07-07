yarn run build
chmod a+x ./dist/*
# 复制文件
cp -R ./dist/* ../vue-dplayer/node_modules/dplayer/dist/
cp -R ./dist/* /Users/ruancz/Documents/tfsdisney/vue-app/node_modules/dplayer/dist/
cp -R ./dist/* /Users/ruancz/Documents/tfsdisney/vue-app/node_modules/vue-dplayer/node_modules/dplayer/dist/
echo 'copyfile finished.'