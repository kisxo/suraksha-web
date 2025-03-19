npm run build

tar -cvf dist.tar dist 
#configure kisxo in .ssh/config with ip and pubkey
scp -r dist.tar kisxo:/home/kisxo/work/suraksha-web
rm -rf dist
rm -rf dist.tar
ssh kisxo 'cd /home/kisxo/work/suraksha-web && tar -xvf dist.tar && rm dist.tar'