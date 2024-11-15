# Update Metadata

Update metadata on blockchain, pulling from local metadata file

<ImageViewer src="/assets/images/products/AIMarketplace/TUI/UpdateMetadataPage.webp" alt="Update Metadata"/>


```bash
# Format of the command in the SNET CLI

snet organization update-metadata [-h] [--metadata-file METADATA_FILE]
                                  [--members ORG_MEMBERS]
                                  [--gas-price GAS_PRICE]
                                  [--wallet-index WALLET_INDEX] [--yes]
                                  [--quiet | --verbose]
                                  [--registry-at REGISTRY_ADDRESS]
                                  ORG_ID
```

User Flow:

* Input the organization ID, and local metadata file path
* Input any optional parameters you would like (And if you would like quiet or verbose transaction data)
* Click the "Update metadata" button
* Confirm/Deny the gas fee charges for the deposit transaction
