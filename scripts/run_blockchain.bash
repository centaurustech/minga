geth --datadir /tmp/eth/364 \
	  --networkid=364 \
	 --genesis=./genesis.json \
	 --unlock 0 \
	 --password <(echo -n notsosecret) \
	 --rpc --rpcport 8545 \
	 --rpccorsdomain="*" \
	 --mine \
	 --minerthreads 4
	 console


