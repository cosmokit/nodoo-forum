<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Subcategory;
use App\Entity\Topic;
use App\Entity\TopicReply;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $this->loadUsers($manager);
        $this->loadCategories($manager);
        $this->loadSubcategories($manager);
        $this->loadTopics($manager);
        $this->loadTopicsReplies($manager);
    }

    private function loadUsers(ObjectManager $manager): void
    {
        $faker = Factory::create('en_US');
        for ($i = 0; $i <= 40; $i++) {
            $user = new User();
            $user->setUsername($faker->userName)
                ->setEmail($faker->email)
                ->setPassword($this->passwordEncoder->encodePassword($user, 'demo1234'))
                ->setCreatedAt($faker->dateTime);

            $manager->persist($user);
            $this->addReference('user-' . $i, $user);
        }
        $manager->flush();
    }

    private function loadCategories(ObjectManager $manager): void
    {
        $faker = Factory::create('en_US');
        for ($i = 0; $i <= 5; $i++) {
            $category = new Category();
            $category->setName($faker->sentence)
                ->setSlug($faker->slug);

            $manager->persist($category);
            $this->addReference('category-' . $i, $category);
        }
        $manager->flush();
    }

    private function loadSubcategories(ObjectManager $manager): void
    {
        $faker = Factory::create('en_US');
        for ($i = 0; $i <= 18; $i++) {
            $subcategory = new Subcategory();
            $subcategory->setName($faker->sentence)
                ->setSlug($faker->slug)
                ->setCategory($this->getReference('category-' . mt_rand(1, 5)));

            $manager->persist($subcategory);
            $this->addReference('subcategory-' . $i, $subcategory);
        }
        $manager->flush();
    }

    private function loadTopics(ObjectManager $manager): void
    {
        $faker = Factory::create('en_US');
        for ($i = 0; $i <= 96; $i++) {
            $topic = new Topic();
            $topic->setTitle($faker->sentence)
                ->setContent($faker->text)
                ->setSlug($faker->slug)
                ->setCreatedAt($faker->dateTime)
                ->setAuthor($this->getReference('user-' . mt_rand(1, 40)))
                ->setSubcategory($this->getReference('subcategory-' . mt_rand(1, 18)));

            $manager->persist($topic);
            $this->addReference('topic-' . $i, $topic);
        }
        $manager->flush();
    }

    private function loadTopicsReplies(ObjectManager $manager): void
    {
        $faker = Factory::create('en_US');
        for ($i = 0; $i <= 218; $i++) {
            $topicReply = new TopicReply();
            $topicReply->setContent($faker->text)
                ->setCreatedAt($faker->dateTime)
                ->setAuthor($this->getReference('user-' . mt_rand(1, 40)))
                ->setTopic($this->getReference('topic-' . mt_rand(1, 96)));

            $manager->persist($topicReply);
            $this->addReference('topicReply-' . $i, $topicReply);
        }
        $manager->flush();
    }
}
