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


       $response = Http::get("https://testnet-api.monorail.xyz/v1/wallet/{$address}/balances");
    return $response->json();

    // return response()->json(
    //     json_decode($response->getBody()->getContents(), true)
    // );


    }
}
