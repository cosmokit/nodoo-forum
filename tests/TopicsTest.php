<?php

namespace App\Tests;

use App\Entity\Topic;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;

class TopicsTest extends ApiTestCase
{
    use RefreshDatabaseTrait;
    use LoginTrait;

    public function testGetCollection(): void
    {
        static::createClient()->request('GET', '/api/topics');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Asserts that the returned JSON is validated by the JSON Schema generated for this resource by API Platform
        $this->assertMatchesResourceCollectionJsonSchema(Topic::class);
    }

    /*
    public function testCreateTopic(): void
    {
        $token = $this->login();
        $response = static::createClient()->request('POST', '/api/topics', ['auth_bearer' => $token, 'json' => [
            'title' => 'demo',
            'content' => 'Lorem ipsum...',
            'author' => '/api/users/1',
            'subcategory' => '/api/subcategories/1'
        ]]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertRegExp('~/api/topics/\d+$~', $response->toArray()['@id']);
        $this->assertMatchesResourceItemJsonSchema(Topic::class);
    }

    public function testCreateInvalidTopic(): void
    {
        $token = $this->login();
        $response = static::createClient()->request('POST', '/api/topics', ['auth_bearer' => $token, 'json' => [
            'title' => 'invalid',
        ]]);

        $this->assertResponseStatusCodeSame(400);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
    }

    public function testUpdateTopic(): void
    {
        $token = $this->login();
        $iri = static::findIriBy(Topic::class, ['id' => 1]);
        $response = static::createClient()->request('PUT', $iri, ['auth_bearer' => $token, 'json' => [
            'title' => 'updated title',
        ]]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@id' => $iri,
            'id' => 1,
            'title' => 'updated title',
        ]);
    }

    public function testDeleteTopic(): void
    {
        $token = $this->login();
        $iri = static::findIriBy(Topic::class, ['id' => 1]);
        $response = static::createClient()->request('DELETE', $iri, ['auth_bearer' => $token]);

        $this->assertResponseStatusCodeSame(204);
        $this->assertNull(
            static::$container->get('doctrine')->getRepository(Topic::class)->findOneBy(['id' => 1])
        );
    }
    */
}
