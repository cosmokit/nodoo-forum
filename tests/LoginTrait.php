<?php

namespace App\Tests;

trait LoginTrait
{
    /**
     * Create a client with a default Authorization header.
     */
    private function login(): string
    {
        $response = static::createClient()->request(
            'POST',
            '/authentication_token',
            ['json' => [
                'username' => 'demoUser',
                'password' => 'demo1234'
            ]]
        );

        return $response->toArray()['token'];
    }
}
