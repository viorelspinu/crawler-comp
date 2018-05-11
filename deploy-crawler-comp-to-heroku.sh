cd ..
rm ./crawler-comp-web/ -rf
#heroku login
heroku git:clone -a crawler-comp-web
cd crawler-comp/client/
ng build
cp ./dist/crawler-comp/* ../../crawler-comp-web/web/ -rf
cd ..
cd ..
cd crawler-comp-web/
mv ./web/index.html ./web/index.php
git add .
git commit -am "update code"
git push heroku master
heroku open
