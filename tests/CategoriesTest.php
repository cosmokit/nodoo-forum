<?php

namespace App\Tests;

use App\Entity\Category;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;

class CategoriesTest extends ApiTestCase
{
    use RefreshDatabaseTrait;

    public function testGetCollection(): void
    {
        $response = static::createClient()->request('GET', '/api/categories');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertCount(5, $response->toArray()['hydra:member']);

        // Asserts that the returned JSON is validated by the JSON Schema generated for this resource by API Platform
        $this->assertMatchesResourceCollectionJsonSchema(Category::class);
    }

    /*
    public function testUpdateCategory(): void
    {
        $client = static::createClient();
        $iri = static::findIriBy(Category::class, ['id' => 1]);

        $client->request('PUT', $iri, ['json' => [
            'name' => 'updated name',
        ]]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@id' => $iri,
            'id' => 1,
            'name' => 'updated name',
        ]);
    }

    public function testDeleteCategory(): void
    {
        $client = static::createClient();
        $iri = static::findIriBy(Category::class, ['id' => 1]);

        $client->request('DELETE', $iri);

        $this->assertResponseStatusCodeSame(204);
        $this->assertNull(
            static::$container->get('doctrine')->getRepository(Category::class)->findOneBy(['id' => '1'])
        );
    }
    */
}
