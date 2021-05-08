run: node_modules
	@yarn dev -- --port 5757

lint:
	@yarn $@

node_modules:
	@yarn

.PHONY: \
	run \
	lint
