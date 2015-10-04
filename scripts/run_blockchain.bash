geth --datadir /tmp/eth/364 \
	  --networkid=364 \
	 --genesis=./genesis.json \
	 --unlock 0 \
	 --password <(echo -n notsosecret) \
	 --rpc --rpcport 8666 \
	 --rpccorsdomain="*" \
	 --mine \
	 --minerthreads 4 \
	 --nodiscover \
	 --maxpeers 0 \
	 console


