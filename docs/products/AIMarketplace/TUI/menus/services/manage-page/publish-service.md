# Publish Service

Publish service with given metadata

<figure><img src="/assets/images/products/TUI/Screenshot 2024-08-17 at 6.06.26 PM.png" alt=""><figcaption><p>Publish service page</p></figcaption></figure>

<pre class="language-bash"><code class="lang-bash"><strong># Format of the command in the SNET CLI
</strong>
snet service publish [-h] [--metadata-file METADATA_FILE]
                     [--update-mpe-address]
                     [--multipartyescrow-at MULTIPARTYESCROW_AT]
                     [--registry-at REGISTRY_AT] [--gas-price GAS_PRICE]
                     [--wallet-index WALLET_INDEX] [--yes]
                     [--quiet | --verbose]
                     ORG_ID SERVICE_ID
</code></pre>

User Flow:

* Input the org id, service id and local metadata file path for the service
* Input any optional parameters you would like
* Click the "Publish Service" button