
/**
 * Returned by the `get_account` RPC call.
 * @external https://docs.eosnetwork.com/apis/spring/latest/chain.api#operation/get_account
 */
interface WAXAccountInfo
    extends
        Record<'account_name', string>,
        Record<'head_block_num', number>,
        Record<'head_block_time', string>,
        Record<'last_code_update', string>,
        Record<'created', string>,
        Record<'refund_request', Record<"owner" | "request_time" | "net_amount" | "cpu_amount", string>>,
        Record<'ram_quota', string>,
        Record<'net_limit', Record<'max' | 'available' | 'used', string>>,
        Record<'cpu_limit', Record<'max' | 'available' | 'used', string>>,
        Record<'total_resources', Record<'owner' | 'net_weight' | 'cpu_weight' | 'ram_bytes', string>>,
        Record<'self_delegated_bandwidth', Record<'from' | 'to' | 'net_weight' | 'cpu_weight', string>>,
        Record<'net_weight', string>,
        Record<'cpu_weight', string>,
        Record<'ram_usage', string>,
        Record<'privileged', boolean>,
        Record<'permissions', Array<
            Record<'perm_name' | 'parent',  string>
            | Record<'required_auth', Array<Record<'waits', Array<Record<'wait_sec' | 'weight', number>>>
            | Record<'threshold', number>
            | Record<'keys', Array<Record<'key' | 'weight', string>>>
            | Record<'accounts', Array<Record<'weight', number> | Record<'permission', Record<'actor' | 'permission', string>>>>>>>>,
        Record<'voter_info', Record<'owner' | 'proxy' | 'staked' | "last_vote_weight" | "proxied_vote_weight" | 'reserved3', string>
            | Record<'is_proxy' | 'flags1' | 'reserved2', number> 
            | Record<'producers', Array<string>>> {}



interface WAXChainInfo
    extends
        Record<'server_version', string>,
        Record<'server_version_string', string>,
        Record<'chain_id', string>,
        Record<'head_block_num', number>,
        Record<'head_block_id', string>,
        Record<'head_block_time', string>,
        Record<'head_block_producer', string>,
        Record<'last_irreversible_block_num', number>,
        Record<'last_irreversible_block_id', string>,
        Record<'virtual_block_cpu_limit', number>,
        Record<'virtual_block_net_limit', number>,
        Record<'block_cpu_limit', number>,
        Record<'block_net_limit', number>,
        Record<'fork_db_head_block_num', number>,
        Record<'fork_db_head_block_id', string> {}


interface WAXBlockInfo
    extends
        Record<'block_num', number>,
        Record<'ref_block_num', number>,
        Record<'id', string>,
        Record<'timestamp', string>,
        Record<'producer', string>,
        Record<'confirmed', number>,
        Record<'previous', string>,
        Record<'transaction_mroot', string>,
        Record<'action_mroot', string>,
        Record<'schedule_version', number>,
        Record<"producer_signature", string>,
        Record<"new_producers", Record<"version" | "producers", string>>,
        Record<'transactions', Array<Record<'status' | 'cpu_usage_us' | 'net_usage_words' | 'trx' | 'receipt', string>>>,
        Record<'ref_block_prefix', number> {}

export {
    type WAXAccountInfo,
    type WAXChainInfo,
    type WAXBlockInfo
}