<?php

namespace App\Tests;

use App\Entity\Subcategory;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;

class SubcategoriesTest extends ApiTestCase
{
    use RefreshDatabaseTrait;

    public function testGetCollection(): void
    {
        $response = static::createClient()->request('GET', '/api/subcategories');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertCount(27, $response->toArray()['hydra:member']);

        // Asserts that the returned JSON is validated by the JSON Schema generated for this resource by API Platform
        $this->assertMatchesResourceCollectionJsonSchema(Subcategory::class);
    }

    /*
    public function testUpdateSubcategory(): void
    {
        $client = static::createClient();
        $iri = static::findIriBy(Subcategory::class, ['id' => 1]);

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

    public function testDeleteSubcategory(): void
    {
        $client = static::createClient();
        $iri = static::findIriBy(Subcategory::class, ['id' => 1]);

        $client->request('DELETE', $iri);

        $this->assertResponseStatusCodeSame(204);
        $this->assertNull(
            static::$container->get('doctrine')->getRepository(Subcategory::class)->findOneBy(['id' => '1'])
        );
    }
    */
}
