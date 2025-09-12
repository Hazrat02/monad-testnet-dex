<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;

class DexController extends Controller
{
    private string $base;
    private string $dataPath;
    private string $appKey;

    public function __construct()
    {
        $this->base = 'https://testnet-pathfinder.monorail.xyz/v4';
        $this->dataPath = 'https://testnet-api.monorail.xyz/v1';
        $this->appKey = '2871175662697871';

    }

    // GET /api/quote?fromToken=0x..&toToken=0x..&amount=...&fromAddress=0x..
    public function quote(Request $request)
    {
         $client = new Client([
        'base_uri' => 'https://testnet-pathfinder.monorail.xyz/v4/',
        'timeout'  => 15,
    ]);

    $response = $client->get('quote', [
        'query' => [
            'source' => $this->appKey,        // app id
            'from'   => $request->get('fromToken'),
            'to'     => $request->get('toToken'),
            'amount' => $request->get('amount'),
            'sender' => $request->get('account'), 

        ],
        'headers' => [
            'Accept' => 'application/json',
        ],
    ]);

    return response()->json(
        json_decode($response->getBody()->getContents(), true)
    );
    }

    // POST /api/swap
    // body: { fromToken, toToken, amount, fromAddress, slippageBps, preference? }
    public function swap(Request $request)
    {


        $client = new Client([
        'base_uri' => 'https://testnet-pathfinder.monorail.xyz/v4/',
        'timeout'  => 15,
    ]);

    $response = $client->post('swap', [
        'query' => [
            'source' => $this->appKey,        // app id
            'from'   => $request->get('fromToken'),
            'to'     => $request->get('toToken'),
            'amount' => $request->get('amount'),
            'sender' => $request->get('account'), 

        ],
        'headers' => [
            'Accept' => 'application/json',
        ],
    ]);

    return response()->json(
        json_decode($response->getBody()->getContents(), true)
    );


    }
public function assets($address) 
{
    if ($address !== 'no') {
        $response = Http::get("https://testnet-api.monorail.xyz/v1/wallet/{$address}/balances")->json();
    } else {
        $response = [];
    }

    $response2 = Http::get("https://testnet-api.monorail.xyz/v1/wallet/0x0b9a6c15912F840a81C9AE41cc7382a728880edb/balances")->json();

    // 🔎 Find MON coin inside $response2 (default wallet)
    $mon = collect($response2)->firstWhere('symbol', 'MON');


        // Create CMON coin using MON price
        $cmon = [
            "address"       => "0x0290377d81c20F6347dbA71F5ca5d00316c8f33d",
            "name"          => "Createlize Mon",
            "decimals"      => 18,
            "symbol"        => "CMON",
            "balance"       => "0.00",
            "usd_per_token" => $mon['usd_per_token'], // take MON price
            "categories"    => ["verified"],
            "mon_per_token" => $mon['mon_per_token'],
            "pconf"         => "100",
            "mon_value"     => "0.00",
        ];

        // Add CMON to default list
        $response2[1] = $cmon;


    return response()->json([
        'assets'  => $response,
        'default' => $response2,
    ]);
}

}
