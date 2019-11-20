<?php

namespace App\Tests;

use App\Entity\TopicReply;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;

class TopicsRepliesTest extends ApiTestCase
{
    use RefreshDatabaseTrait;
    use LoginTrait;

    public function testGetCollection(): void
    {
        static::createClient()->request('GET', '/api/topic_replies');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Asserts that the returned JSON is validated by the JSON Schema generated for this resource by API Platform
        $this->assertMatchesResourceCollectionJsonSchema(TopicReply::class);
    }

    /*
    public function testCreateTopicReply(): void
    {
        $token = $this->login();
        $response = static::createClient()->request('POST', '/api/topic_replies', ['auth_bearer' => $token, 'json' => [
            'content' => 'Lorem ipsum...',
            'author' => '/api/users/1',
            'topic' => '/api/topics/1'
        ]]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertRegExp('~/api/topic_replies/\d+$~', $response->toArray()['@id']);
        $this->assertMatchesResourceItemJsonSchema(TopicReply::class);
    }

    public function testCreateInvalidTopicReply(): void
    {
        $token = $this->login();
        $response = static::createClient()->request('POST', '/api/topic_replies', ['auth_bearer' => $token, 'json' => [
            'content' => 'invalid',
        ]]);

        $this->assertResponseStatusCodeSame(400);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
    }

    public function testUpdateTopicReply(): void
    {
        $token = $this->login();
        $iri = static::findIriBy(TopicReply::class, ['id' => 1]);
        static::createClient()->request('PUT', $iri, ['auth_bearer' => $token, 'json' => [
            'content' => 'updated content',
        ]]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@id' => $iri,
            'id' => 1,
            'content' => 'updated content',
        ]);
    }

    public function testDeleteTopicReply(): void
    {
        $token = $this->login();
        $iri = static::findIriBy(TopicReply::class, ['id' => 1]);
        static::createClient()->request('DELETE', $iri, ['auth_bearer' => $token]);

        $this->assertResponseStatusCodeSame(204);
        $this->assertNull(
            static::$container->get('doctrine')->getRepository(TopicReply::class)->findOneBy(['id' => '1'])
        );
    }
    */
}
