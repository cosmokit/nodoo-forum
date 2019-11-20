<?php

namespace App\Tests;

use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;

class UsersTest extends ApiTestCase
{
    use RefreshDatabaseTrait;
    use LoginTrait;

    public function testGetCollection(): void
    {
        static::createClient()->request('GET', '/api/users');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Asserts that the returned JSON is validated by the JSON Schema generated for this resource by API Platform
        $this->assertMatchesResourceCollectionJsonSchema(User::class);
    }

    public function testCreateUser(): void
    {
        $response = static::createClient()->request('POST', '/api/users', ['json' => [
            'username' => 'demo',
            'email' => 'demo@demo.fr',
            'password' => 'demo1234'
        ]]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertRegExp('~/api/users/\d+$~', $response->toArray()['@id']);
        $this->assertMatchesResourceItemJsonSchema(User::class);
    }

    public function testCreateInvalidUser(): void
    {
        static::createClient()->request('POST', '/api/users', ['json' => [
            'username' => 'invalid',
        ]]);

        $this->assertResponseStatusCodeSame(400);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
    }

    /*
    public function testUpdateUser(): void
    {
        $token = $this->login();
        $iri = static::findIriBy(User::class, ['id' => 1]);
        $response = static::createClient()->request('PUT', $iri, ['auth_bearer' => $token, 'json' => [
            'username' => 'updated username',
            'password' => 'demo1234'
        ]]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
    }

    public function testDeleteUser(): void
    {
        $token = $this->login();
        $iri = static::findIriBy(User::class, ['id' => 1]);
        static::createClient()->request('DELETE', $iri, ['auth_bearer' => $token]);

        $this->assertResponseStatusCodeSame(204);
        $this->assertNull(
            static::$container->get('doctrine')->getRepository(User::class)->findOneBy(['id' => '1'])
        );
    }
    */
}
